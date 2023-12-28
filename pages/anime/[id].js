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
import axios from 'axios';
// layouts
import Layout from '@/layouts';
// components
import Page from '@/components/Page';
import Markdown from '@/components/Markdown';
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs';
import { SkeletonPost } from '@/components/skeleton';
// sections
import { VideoPostHero, VideoPostTags, VideoPostRecent } from '@/sections/movies';
import Iconify from '@/components/Iconify';
import {ANIME } from "@consumet/extensions";
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
  const { enqueueSnackbar } = useSnackbar();

  const [error, setError] = useState(null);

  const getMovie = useCallback(async () => {
    try {
      if (!movie) {
        const response = await axios.get(`/api/anime/${id}`);

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
    getMovie();
  }, [getMovie]);

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
            heading="Anime"
            links={[
              { name: 'Home', href: '/' },
              { name: 'Anime', href: PATH_PAGE.anime },
              { name: movie ? sentenceCase(movie.title) : sentenceCase(id) },
            ]}
          />

          {!loading && (
            <Card>
              <VideoPostHero post={movie} />

              <Box sx={{ p: { xs: 3, md: 5 } }}>
                <Stack flexWrap="wrap" direction="row" justifyContent="space-between">
                  <Typography variant="h6" sx={{ mb: 5 }}>
                    {movie.title}
                  </Typography>

                  <Box>
                    <Tooltip title={`Join Telegram channel`}>
                      <NextLink href={'https://t.me/youplexannouncments'} passHref>
                        <Button variant="contained" startIcon={<Iconify icon={'la:telegram'} />}>
                          Telegram
                        </Button>
                      </NextLink>
                    </Tooltip>
                  </Box>
                </Stack>
                <Box>
                  <VideoPostTags post={movie} setMovie={setMovie}/>
                </Box>
                {movie.description}
              </Box>
            </Card>
          )}

          {loading && !error && <SkeletonPost />}

          {error && <Typography variant="h6">404 {error}!</Typography>}

          {!loading&&movie.recommendations&& <VideoPostRecent posts={movie.recommendations} />}
        </Container>
      </RootStyle>
    </Page>
  );
}

export async function getServerSideProps(context) {
  try {
    const id = context.params.id;
    const anime =new ANIME.AnimeSaturn();
    const movie = await anime.fetchAnimeInfo(id);
    const sources = await anime.fetchEpisodeSources( movie.episodes[0].id);
    movie.sources = sources.sources;
    movie.subtitles=sources.subtitles
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
