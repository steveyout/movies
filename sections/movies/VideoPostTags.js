import PropTypes from 'prop-types';
// @mui
import { Box, Chip, Typography,LinearProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
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

export default function VideoPostTags({ post,setMovie }) {
    const { query } = useRouter();
    const[active,setActive]=useState(0);
    const[loading,setLoading]=useState(false)
  const { enqueueSnackbar } = useSnackbar();

    const { id } = query;
    let { tags,episodes,type} = post;

    const handleChangeEpisode = async (episodeId,index) => {
        try {
            if (id&&episodeId) {
              setLoading(true)
                const response = await axios.get(`/api/episode/${id}`,{
                    params: {
                      id: id,
                        episode:episodeId
                    },
                });

                  setMovie((prevState) => ({
                    ...prevState,
                    sources: response.data.sources,
                    subtitles:response.data.subtitles
                  }));
                  setActive(index)
              setLoading(false)
            }
        } catch (error) {
          enqueueSnackbar('Oops! Something went wrong', { variant: 'error' });
          setLoading(false)
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
          {loading&&(<LinearProgress/>)}
        </Typography>
        {episodes &&
            episodes.filter((v,i,a)=>a.findIndex(v2=>['season'].every(k=>v2[k] ===v[k]))===i).map((e,index) =>(
              <>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Season {e.season}
              </Typography>
                {episodes.map((episode,index) =>
                  episode.season===e.season&&(
              <Chip key={episode.id} label={episode.title} sx={{ m: 0.5 }} color={active===index?'primary':'default'}
                    onClick={(e)=>handleChangeEpisode(episode.id,index)}/>
                    ))}
              </>
            ))}
    </Box>)}
    </>
  );
}
