import PropTypes from 'prop-types';
// @mui
import { Grid, Typography } from '@mui/material';
//
import VideoPostCard from './VideoPostCard';

// ----------------------------------------------------------------------

VideoPostRecent.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default function VideoPostRecent({ posts }) {
  return (
    <>
      <Typography variant="h4" sx={{ mt: 10, mb: 5 }}>
        Recommended movies
      </Typography>

      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid key={post.id} item xs={12} sm={6} md={3}>
            <VideoPostCard video={post} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
