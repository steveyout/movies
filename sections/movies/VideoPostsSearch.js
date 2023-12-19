import { useState,useEffect } from 'react';
import { paramCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// next
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Typography, Autocomplete, InputAdornment, Popper } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useDebouncedCallback } from 'use-debounce';
// hooks
import useIsMountedRef from '@/hooks/useIsMountedRef';
// utils
import axios from '@/utils/axios';
// routes
import { PATH_PAGE} from '@/routes/paths';
// components
import Image from '@/components/Image';
import Iconify from '@/components/Iconify';
import InputStyle from '@/components/InputStyle';
import SearchNotFound from '@/components/SearchNotFound';

// ----------------------------------------------------------------------

const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '280px !important',
});

// ----------------------------------------------------------------------

export default function VideoPostsSearch() {
  const { push,pathname } = useRouter();

  const [searchQuery, setSearchQuery] = useState('');

  const [searchResults, setSearchResults] = useState([]);
  const [loading,setLoading]=useState(false)

  const handleChangeSearch = useDebouncedCallback(
    // function
    async (value) => {
      try {
        if (value) {
          setSearchResults([]);
          setSearchQuery(value);
          setLoading(true)
          const response = await axios.get(`/api/search/`, {
            params: {query: value},
          });
            setSearchResults(response.data.results);
            setLoading(false)
        }
      } catch (error) {
        console.error(error);
        setSearchQuery(value);
        setSearchResults([]);
        setLoading(false)
      }
    },1000)

  const handleClick = (slug) => {
    push(slug.includes('movie')?PATH_PAGE.movie(slug.split('movie/')[1]):PATH_PAGE.tv(slug.split('tv/')[1]));
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleClick(searchQuery);
    }
  };

  return (
    <Autocomplete
      size="small"
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      loading={loading}
      options={searchResults}
      filterOptions={(x) => x}
      onInputChange={(event, value) => handleChangeSearch(value)}
      getOptionLabel={(post) => post.title}
      noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <InputStyle
          {...params}
          stretchStart={200}
          placeholder={pathname.includes('tv')?'Search series...':'Search movies...'}
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon={'eva:search-fill'}
                  sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, post, { inputValue }) => {
        const { title, image,id } = post;
        const matches = match(title, inputValue);
        const parts = parse(title, matches);

        return (
          <li {...props}>
            <Image
              alt={title}
              src={image}
              sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }}
            />
            <Link underline="none" onClick={() => handleClick(id)}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  variant="subtitle2"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                >
                  {part.text}
                </Typography>
              ))}
            </Link>
          </li>
        );
      }}
    />
  );
}
