import PropTypes from 'prop-types';
// @mui
import { Box, Chip, Typography } from '@mui/material';
import {PATH_PAGE} from "@/routes/paths";
// next
import { useRouter } from 'next/router';
import useIsMountedRef from "@/hooks/useIsMountedRef";
import axios from 'axios';
import { useState } from 'react';
// components

// ----------------------------------------------------------------------

VideoPostTags.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function VideoPostTags({ post }) {
    const { query } = useRouter();
    const isMountedRef = useIsMountedRef();
    const[source,setSource]=useState([]);

    const { id } = query;
  let { tags,episodes,type } = post;
    const { push } = useRouter();

    const handleChangeEpisode = async (episodeId) => {
        try {
            if (id&&episodeId) {
                const response = await axios.get(`/api/episode/${id}`,{
                    params: {
                      id: id,
                        episode:episodeId
                    },
                });

                if (isMountedRef.current) {
                    setSource(response.data);
                    //push(PATH_PAGE.tv(title));
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
  return (
    <>
    <Box sx={{ py: 3 }}>
        <Typography variant="h6" sx={{ mb: 5 }}>
            Tags
        </Typography>
      {tags &&
        tags.map((tag) => <Chip key={tag} label={tag} sx={{ m: 0.5 }} variant={'outlined'} />)}
    </Box>
        {type==='TV Series'&&(
    <Box sx={{ py: 3 }}>
        <Typography variant="h6" sx={{ mb: 5 }}>
            Episodes
        </Typography>
        {episodes &&
            episodes.map((episode) => <Chip key={episode.id} label={episode.title} sx={{ m: 0.5 }} color={'primary'} onClick={(e)=>handleChangeEpisode(episode.id)}/>)}
    </Box>)}
    </>
  );
}
