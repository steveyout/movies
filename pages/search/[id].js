import orderBy from 'lodash/orderBy';
import { m } from 'framer-motion';
import { useEffect, useCallback, useState } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
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
import { MOVIES } from '@consumet/extensions';
import { SearchForm } from "@/sections/forms";
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
  const { query } = useRouter();

  const { id } = query;

  const [videos, setVideos] = useState(data.results);
  const [loading, setLoading] = useState(videos.length === 0);
  const [url, setUrl] = useState(data.hasNextPage);
  let [page, setPage] = useState(1);


  const getAllPosts = useCallback(async () => {
    try {
      setLoading(true)
      if (videos && !videos.length) {
        const response = await axios.get(`/api/search/`, {
          params: {query: id},
        });

        if (isMountedRef.current) {
          setVideos(response.data.results);
          setLoading(false);
          setUrl(response.data.hasNextPage)
          setPage(page++);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);


  ///more
  const handleLoadMore = useCallback(async () => {
    try {
      if (!url || url === '') return;
      if (page===1){
        setPage(page++);
      }
      const response = await axios.get(`/api/search/`, {
        params: {query: id,page:page},
      });

      if (isMountedRef.current) {
        setVideos((prev) => [...prev, ...response.data.results]);
        setPage(page++);
        setUrl(response.data.hasNextPage);
      }
    } catch (error) {
      console.error(error);
    }
  }, [url]);

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
            heading="Movies"
            links={[{ name: 'Home', href: '/' }, { name: 'Movies',href: PATH_PAGE.movies },{ name: id,href:PATH_PAGE.filter(id) }]}
          />
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
            hasMore={url===true}
            threshold={2500}
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
                <Grid item xs={12} sm={12} md={12}>
                <Box sx={{ width:'100%', margin: 'auto', textAlign: 'center' }}>
                  <EmptyContent
                    title={'No results'}
                    img={'/images/empty.jpg'}
                    description={'Try again'}
                  />
                </Box>
                <Box sx={{margin:2}}>
                <SearchForm />
                </Box>
                </Grid>
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
    const id = context.params.id;
    const flixhq = new MOVIES.FlixHQ();
    const movies = await flixhq.search(id);
    return {
      props: {
        data: JSON.parse(JSON.stringify(movies)),
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
