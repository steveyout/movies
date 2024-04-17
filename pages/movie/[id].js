import NextLink from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Card, Container, Stack, Tooltip, Typography } from '@mui/material';
// routes
import { PATH_PAGE } from '@/routes/paths';
// hooks
import useSettings from '@/hooks/useSettings';
import useIsMountedRef from '@/hooks/useIsMountedRef';
// utils
import axios from '@/utils/axios';
import { MOVIES } from 'wikiextensions-flix';
// layouts
import Layout from '@/layouts';
// components
import Page from '@/components/Page';
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs';
import { SkeletonPost } from '@/components/skeleton';
// sections
import { VideoPostHero, VideoPostTags, VideoPostRecent } from '@/sections/movies';
import Iconify from '@/components/Iconify';
import { useSnackbar } from 'notistack';

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));
// ----------------------------------------------------------------------

BlogPost.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function BlogPost({ data }) {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const { query } = useRouter();

  const { id } = query;
  const [movie, setMovie] = useState(data);
  const [loading, setLoading] = useState(true);
  const [streamingServer,setStreamingServer]=useState({
    isChanging:false,
    server:'UpCloud'
  })
  const { enqueueSnackbar } = useSnackbar();

  const [error, setError] = useState(null);

  const getMovie = useCallback(async (server,isChanging) => {
    try {
      if (!movie||isChanging) {
        setLoading(true)
        const response = await axios.get(`/api/movie/${id}`,{params:{server:server}});

        if (isMountedRef.current) {
          setMovie(response.data);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      enqueueSnackbar('Oops! Something went wrong,Please try again later', { variant: 'error' });
    }
  }, [isMountedRef]);

  useEffect(() => {
    getMovie(streamingServer.server,streamingServer.isChanging);
  }, [getMovie,streamingServer]);

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Movie",
    "name": movie ? sentenceCase(movie.title) : sentenceCase(id),
    "productionCompany": {
      "@type": "Organization",
      "name": movie&&movie.production
    },
    "countryOfOrigin": {
      "@type": "Country",
      "name": movie&&movie.country
    }
  };
  return (
    <Page
      title={movie ? sentenceCase(movie.title) : sentenceCase(id)}
      meta={
        <>
          <meta name="description" content={movie?movie.description:id} />
          <meta name="keywords" content={movie ? `${movie.tags} ${movie.genres} ${movie.casts}`:''} />
        </>
      }
      structuredData={structuredData}
    >
      <RootStyle>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Movie"
            links={[
              { name: 'Home', href: '/' },
              { name: 'Movies', href: PATH_PAGE.movies },
              { name: movie ? sentenceCase(movie.title) : sentenceCase(id) },
            ]}
          />

          {!loading && (
            <Card>
              <VideoPostHero post={movie} setStreamingServer={setStreamingServer} streamingServer={streamingServer}/>

              <Box sx={{ p: { xs: 3, md: 5 } }}>
                <Stack flexWrap="wrap" direction="row" justifyContent="space-between">
                  <Typography variant="h6" sx={{ mb: 5 }}>
                    {movie.title}
                  </Typography>

                  <Box>
                    <Tooltip title={`Join Telegram channel`}>
                      <NextLink href={'https://t.me/youplexannouncments'} passHref>
                        <Button variant="contained" startIcon={<Iconify icon={'la:telegram'}/>}>
                          Telegram
                        </Button>
                      </NextLink>
                    </Tooltip>
                    <Box sx={{m:3}}/>
                    <Tooltip title={`Join Our Discord`}>
                      <NextLink href={'https://discord.gg/vJMwAZDgwX'} passHref>
                        <Button variant="contained" color={'secondary'} startIcon={<Iconify icon={'iconoir:discord'} />}>
                          Discord
                        </Button>
                      </NextLink>
                    </Tooltip>
                  </Box>
                </Stack>
                <Box>
                  <VideoPostTags post={movie} />
                </Box>
                {movie.description}
              </Box>
            </Card>
          )}

          {loading && !error && <SkeletonPost />}

          {error && <Typography variant="h6">404 {error}!</Typography>}

          {!loading && <VideoPostRecent posts={movie.recommended} />}
        </Container>
      </RootStyle>
    </Page>
  );
}

export async function getServerSideProps(context) {
  try {
    const id = context.params.id;
    const flixhq = new MOVIES.FlixHQ();
    const videoResult= {
      sources: [],
      subtitles: [],
    }
    const movie = await flixhq.fetchMovieInfo(`movie/${id}`);
    const servers=await flixhq.fetchEpisodeServers(`movie/${id}`,movie.episodes[0].id);
    const i = servers.findIndex(s => s.name === 'UpCloud');
    const { data } = await axios.get(`${process.env.BASE_URL}/ajax/sources/${servers[i].id}`);
    const videoUrl = new URL(data.link);
    const mid = videoUrl.href.split('/').pop()?.split('?')[0];
    let sources =await axios.post(`${process.env.API}/api/sources/upcloud`, { "id": mid })
    let res2 = await axios.get(sources.data.source);
    res2=res2.data
    const urls = res2.split('\n').filter((line) => line.includes('.m3u8'));
    const qualities = res2.split('\n').filter((line) => line.includes('RESOLUTION='));
    const TdArray = qualities.map((s, i) => {
      const f1 = s.split('x')[1];
      const f2 = urls[i];

      return [f1, f2];
    });

    for (const [f1, f2] of TdArray) {
      videoResult.sources.push({
        url: f2,
        quality: f1,
        isM3U8: f2.includes('.m3u8'),
      });
    }

    videoResult.sources.push({
      url: sources.data.source,
      isM3U8: sources.data.source.includes('.m3u8'),
      quality: 'auto',
    });

    videoResult.subtitles = sources.data.subtitle.map((s) => ({
      url: s.file?s.file:s,
      lang: s.label ? s.label : s,
    }));
    movie.sources = videoResult.sources;
    movie.subtitles=videoResult.subtitles
    return {
      props: {
        data: movie,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: null,
      }, // will be passed to the page component as props
    };
  }
}
