import { MediaPlayer, MediaProvider,Poster,Track } from '@vidstack/react';
import {styled, useTheme } from '@mui/material/styles';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import Avatar from "@/components/Avatar";
import createAvatar from "@/utils/createAvatar";
import { fDate } from "@/utils/formatTime";
import Iconify from "@/components/Iconify";
import Select from '@mui/material/Select';
import { useRouter } from 'next/router';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {
  Box,
  SpeedDial,
  Typography,
  SpeedDialAction,
  MenuItem
} from '@mui/material';
import useResponsive from "@/hooks/useResponsive";

export default function VidstackPlayer({ post,setStreamingServer,streamingServer }) {
  const {
    id,
    title,
    url,
    cover,
    image,
    description,
    releaseDate,
    genres,
    casts,
    tags,
    production,
    country,
    rating,
    recommendations,
    episodes,
    sources,
    subtitles
  } = post;
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'sm');
  const { pathname } = useRouter();
  const handleChangeStreamingServer = (event) => {
    setStreamingServer({
      isChanging:true,
      server:event.target.value,
    });
  };

  const SOCIALS = [
    {
      name: 'Facebook',
      icon: <Iconify icon="eva:facebook-fill" width={20} height={20} color="#1877F2" />,
    },
    {
      name: 'Instagram',
      icon: <Iconify icon="ant-design:instagram-filled" width={20} height={20} color="#D7336D" />,
    },
    {
      name: 'Linkedin',
      icon: <Iconify icon="eva:linkedin-fill" width={20} height={20} color="#006097" />,
    },
    {
      name: 'Twitter',
      icon: <Iconify icon="eva:twitter-fill" width={20} height={20} color="#1C9CEA" />,
    },
  ];
  const FooterStyle = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    position: 'relative',
    alignItems: 'flex-end',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      top: 50,
      height: 10,
      marginBottom: 50,
    },
    [theme.breakpoints.up('lg')]: {
      bottom: 0,
    },
  }));
  //const stream = sources.find((source) => source.quality&&source.quality.includes('auto'))||sources[0];
  console.log(sources)
  const streams=sources.map((source) => {
    source.src = source.url
    return source
  });
  return (
    <>
    <Box
      component="span"
      sx={{
        'width': 1,
        'display': 'block',
        'overflow': 'hidden',
        'position': 'relative',
        'borderRadius': 1,
        '& .wrapper': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          lineHeight: 0,
          position: 'absolute',
          backgroundSize: 'cover !important',
        },
      }}
    >
    <MediaPlayer
      title={title}
      src={streams}
      crossorigin={true}
      storage="youplex-player"
      load={'eager'}
    >
      <MediaProvider />
      <Poster
        className="vds-poster"
        src={cover}
        alt={description}
      />
      {subtitles&&subtitles.map((subtitle,index)=>(
        <Track id={index} src={subtitle.url} kind="subtitles" label={subtitle.lang} lang="en-US" default={subtitle.default} />
      ))}
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
    </Box>
  <FooterStyle>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar
        alt={title}
        src={image}
        color={image ? 'default' : createAvatar(title).color}
        sx={{ width: 48, height: 48 }}
      />
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="body2" sx={{ color: 'grey.500' }}>
          {releaseDate&&fDate(releaseDate)}
        </Typography>
      </Box>
    </Box>

    <SpeedDial
      direction={isDesktop ? 'left' : 'up'}
      ariaLabel="Share post"
      icon={<Iconify icon="eva:share-fill" sx={{ width: 20, height: 20 }} />}
      sx={{ '& .MuiSpeedDial-fab': { width: 48, height: 48 } }}
    >
      {SOCIALS.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipPlacement="top"
          FabProps={{ color: 'default' }}
        />
      ))}
    </SpeedDial>
  </FooterStyle>

  {!pathname.includes('anime')&&(
    <Box sx={{ display: 'flex', alignItems: 'center',mt:4,p:2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Server</InputLabel>
        <Select
          value={streamingServer.server}
          label="Server"
          onChange={handleChangeStreamingServer}
        >
          <MenuItem value={'UpCloud'}>upcloud</MenuItem>
          <MenuItem value={'VidCloud'}>vidcloud</MenuItem>
        </Select>
      </FormControl>
    </Box>)}
</>
  )
}
