import orderBy from 'lodash/orderBy';
import { m } from 'framer-motion';
import { useEffect, useCallback, useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Button, Container, Stack, Box, Alert, AlertTitle } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
import useIsMountedRef from '../hooks/useIsMountedRef';
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
import { MOVIES } from '@consumet/extensions';
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
  const [url, setUrl] = useState('');
  let [page, setPage] = useState(1);

  const [filters, setFilters] = useState('latest');

  const sortedVideos = applySort(videos, filters);

  const getAllPosts = useCallback(async () => {
    try {
      if (videos && !videos.length) {
        const response = await axios.get(`/api/movies/trending`);

        if (isMountedRef.current) {
          setVideos(response.data);
          setPage(page++);
          setLoading(false);
        }
      } else {
        setPage(page++);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
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

  return (
    <Page title="Youplex movies">
      <RootStyle>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Movies"
            links={[{ name: 'Home', href: '/' }, { name: 'Movies',href: PATH_PAGE.movies },{ name: 'Trending' }]}
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
                We are still under development.Join or{' '}
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
    const flixhq = new MOVIES.FlixHQ();
    const movies = await flixhq.fetchTrendingMovies();
    return {
      props: {
        data: movies,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    console.error('error loading data');
    return {
      props: {
        data: [],
      }, // will be passed to the page component as props
    };
  }
}
