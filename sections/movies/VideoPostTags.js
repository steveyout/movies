import PropTypes from 'prop-types';
// @mui
import { Box, Chip, Avatar, Checkbox, AvatarGroup, Tooltip, FormControlLabel } from '@mui/material';
// components

// ----------------------------------------------------------------------

VideoPostTags.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function VideoPostTags({ post }) {
  let { tags } = post;
  return (
    <Box sx={{ py: 3 }}>
      {tags &&
        tags.map((tag) => <Chip key={tag} label={tag} sx={{ m: 0.5 }} variant={'outlined'} />)}
    </Box>
  );
}
