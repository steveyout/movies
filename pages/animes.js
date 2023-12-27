import orderBy from 'lodash/orderBy';
import { m } from 'framer-motion';
import { useEffect, useCallback, useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Button, Container, Stack, Box, Alert, AlertTitle } from '@mui/material';
// hooks
import useSettings from '@/hooks/useSettings';
import useIsMountedRef from '@/hooks/useIsMountedRef';
// utils
import axios from 'axios';
// routes
import { PATH_PAGE, PATH_DASHBOARD } from '@/routes/paths';
// layouts
import Layout from '@/layouts';
// components
import Page from '@/components/Page';
import Iconify from '@/components/Iconify';
import { SkeletonPostItem } from '@/components/skeleton';
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs';
// sections
import { VideoPostCard, VideoPostsSort, VideoPostsSearch } from '@/sections/movies';
import EmptyContent from '@/components/EmptyContent';
import InfiniteScroll from 'react-infinite-scroller';
import { varFade } from '@/components/animate';
import { ANIME } from '@consumet/extensions';
import { useSnackbar } from 'notistack';
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

Videos.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

const applySort = (posts, sortBy) => {
  if (sortBy === 'latest') {
    return orderBy(posts, ['createdAt'], ['desc']);
  }
  if (sortBy === 'oldest') {
    return orderBy(posts, ['createdAt'], ['asc']);
  }
  if (sortBy === 'popular') {
    return orderBy(posts, ['view'], ['desc']);
  }
  return posts;
};
export default function Videos({ data }) {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const [videos, setVideos] = useState(data);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(null);
  let [page, setPage] = useState(1);
  const { enqueueSnackbar } = useSnackbar();

  const [filters, setFilters] = useState('latest');

  const sortedVideos = applySort(videos, filters);

  const getAllPosts = useCallback(async () => {
    try {
      if (videos && !videos.length) {
        const response = await axios.get(`/api/animes/recent`);

        if (isMountedRef.current) {
          setVideos(response.data.results);
          setPage(page++);
          setLoading(false);
        }
      } else {
        setPage(page++);
        setLoading(false);
      }
    } catch (error) {
      enqueueSnackbar('Oops! Something went wrong,Please try again later', { variant: 'error' });
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  ///more
  const handleLoadMore = useCallback(async () => {
    try {
      if (!url || url === '') return;
      const response = await axios.get(url);

      if (isMountedRef.current) {
        setVideos((prev) => [...prev, ...response.data]);
        setPage(page++);
        setUrl(`/api/movies/${page}`);
      }
    } catch (error) {
      console.error(error);
    }
  }, [url]);
  const handleChangeSort = (value) => {
    if (value) {
      setFilters(value);
    }
  };
  ////////////structured data
  const list=[]
  videos&&videos.map((movie,index)=>{
    list.push({
      "@type": "ListItem",
      "position": index,
      "item": {
        "@type": "Movie",
        "url": movie.id.includes('movie')?PATH_PAGE.movie(movie.id.split('movie/')[1]):PATH_PAGE.tv(movie.id.split('tv/')[1]),
        "name": movie.title,
        "image": movie.image,
        "dateCreated": movie.releaseDate,
      }
    })
  })
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": list
  };

  return (
    <Page title="Youplex movies" structuredData={structuredData}>
      <RootStyle>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Anime"
            links={[{ name: 'Home', href: '/' }, { name: 'Anime',href: PATH_PAGE.movies },{ name: 'Recent' }]}
          />

          <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
            <VideoPostsSearch />
            <VideoPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
          </Stack>

          <Stack
            sx={{
              width: '100%',
              position: 'relative',
              zIndex: 10,
            }}
            spacing={2}
            mb={5}
          >
            <m.div variants={varFade().inRight}>
              <Alert variant="filled" severity="info">
                <AlertTitle>Important</AlertTitle>
                Sharing is caring,Remember to spread the word and help others.Join our{' '}
                <a
                  href={'https://t.me/youplexannouncments'}
                  style={{ textDecoration: 'underline', color: 'blue' }}
                >
                  Telegram
                </a>{' '}
                channel for more updates
              </Alert>
            </m.div>
          </Stack>

          <InfiniteScroll
            pageStart={0}
            loadMore={handleLoadMore}
            hasMore={url != null}
            loader={
              <Grid container spacing={3} mt={1}>
                {[...Array(8)].map((post, index) =>
                  post ? (
                    <Grid key={post.id} item xs={12} sm={6} md={3}>
                      <VideoPostCard video={post} index={index} />
                    </Grid>
                  ) : (
                    <SkeletonPostItem key={index} />
                  )
                )}
              </Grid>
            }
          >
            <Grid container spacing={3}>
              {loading ? (
                [...Array(12)].map((post, index) =>
                  post ? (
                    <Grid key={post.id} item xs={12} sm={6} md={3}>
                      <VideoPostCard video={post} index={index} />
                    </Grid>
                  ) : (
                    <SkeletonPostItem key={index} />
                  )
                )
              ) : !loading && videos.length === 0 ? (
                <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                  <EmptyContent
                    title={'Empty'}
                    img={'/images/empty.jpg'}
                    description={'no more listings'}
                  />
                </Box>
              ) : (
                videos.map((post, index) => (
                  <Grid key={post.id} item xs={12} sm={6} md={3}>
                    <VideoPostCard video={post} index={index} />
                  </Grid>
                ))
              )}
            </Grid>
          </InfiniteScroll>
        </Container>
      </RootStyle>
    </Page>
  );
}

export async function getServerSideProps(context) {
  try {
    const anime = new ANIME.Zoro();
    const movies = await anime.fetchRecentEpisodes();
    return {
      props: {
        data: movies.results,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    console.error('error loading data'+error);
    return {
      props: {
        data: [],
      }, // will be passed to the page component as props
    };
  }
}
