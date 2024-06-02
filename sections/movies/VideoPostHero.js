import PropTypes from 'prop-types';
// @mui
import { alpha, keyframes, styled, useTheme } from '@mui/material/styles';
import HoverMenu from 'material-ui-popup-state/HoverMenu';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { usePopupState, bindHover, bindMenu } from 'material-ui-popup-state/hooks';
import Select from '@mui/material/Select';
import {
  Box,
  SpeedDial,
  CircularProgress,
  Typography,
  SpeedDialAction,
  IconButton,
  Stack,
  Slider,
  Menu,
  MenuItem,
  ListItemIcon,
  MenuList,
  ListItemText,
} from '@mui/material';
// hooks
import useResponsive from '@/hooks/useResponsive';
// utils
import { fDate } from '@/utils/formatTime';
// components
import Image from '@/components/Image';
import Iconify from '@/components/Iconify';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { MediaProvider, MediaPlayer, Time, useMediaStore, useMediaRemote,Track,Captions } from '@vidstack/react';

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ClosedCaptionOutlinedIcon from '@mui/icons-material/ClosedCaptionOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import HighQualityOutlinedIcon from '@mui/icons-material/HighQualityOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import PictureInPictureAltOutlinedIcon from '@mui/icons-material/PictureInPictureAltOutlined';
import CastOutlinedIcon from '@mui/icons-material/CastOutlined';
import CastConnectedOutlinedIcon from '@mui/icons-material/CastConnectedOutlined';

import Tooltip from '@mui/material/Tooltip';
import { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import 'moment-duration-format';
import createAvatar from '@/utils/createAvatar';
import Avatar from '@/components/Avatar';

// ----------------------------------------------------------------------

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

//----------------------------------------------------------------------
//video controls
const Controls = styled('div')(({ theme }) => ({
  bottom: 0,
  zIndex: 10,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
  },
  [theme.breakpoints.up('lg')]: {},
}));

//-----------------------------------------------------------------------
/////////////subtitles
const Subtitles = styled('div')(({ theme }) => ({
  bottom: 0,
  zIndex: 10,
  width: '100%',
  position: 'absolute',
  textAlign:'center',
  padding: theme.spacing(1),
  paddingBottom: theme.spacing(10),
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
  },
  [theme.breakpoints.up('lg')]: {},
}));
// ----------------------------------------------------------------------
//overlay
const rotate = keyframes`
  0% {
    transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);
    opacity: 0;
  }
`;
const OverlayStyle = styled('div')(({ theme }) => ({
  'top': 0,
  'right': 0,
  'bottom': 0,
  'left': 0,
  'zIndex': 9,
  'position': 'absolute',
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'backgroundColor': alpha(theme.palette.grey[900], 0.72),
  '&::before': {
    content: '""',
    position: 'absolute',
    zIndex: 0,
    left: '50%',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    display: 'block',
    width: '80px',
    height: '80px',
    background: '#ba1f24',
    borderRadius: '50%',
    animation: `${rotate} 1500ms ease-out infinite`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    left: '50%',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    display: 'block',
    width: '80px',
    height: '80px',
    background: '#fa183d',
    borderRadius: '50%',
    transition: 'all 200ms',
  },
  '&::hover::after': {
    backgroundColor: 'darken(#fa183d, 10%)',
  },
}));

///---------------------------------------------------------------------
const LoaderStyle = styled('div')(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 9,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: alpha(theme.palette.grey[900], 0.72),
}));
// ----------------------------------------------------------------------

VideoPostHero.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function VideoPostHero({ post,setStreamingServer,streamingServer }) {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'sm');
  const player = useRef(null);
  const {
    started,
    playing,
    duration,
    fullscreen,
    muted,
    currentTime,
    waiting,
    volume,
    pictureInPicture,
    canGoogleCast,
    isGoogleCastConnected,
  } = useMediaStore(player);
  const remote = useMediaRemote(player);
  ///change slider
  const handleChange = (event, newValue) => {
    remote.seek(newValue);
  };
  ///change volume
  const handleVolumeChange = (event, newValue) => {
    remote.changeVolume(newValue / 100);
  };

  const handlePlayerControls = (type) => {
    switch (type) {
      case 'play':
        playing ? remote.pause() : remote.play();
        break;
      case 'mute':
        muted ? remote.unmute() : remote.mute();
        break;
      case 'pip':
        pictureInPicture ? remote.exitPictureInPicture() : remote.enterPictureInPicture();
        break;
      case 'fullscreen':
        fullscreen ? remote.exitFullscreen() : remote.enterFullscreen();
        break;
      case 'cast':
        !isGoogleCastConnected&&remote.requestGoogleCast();
        break
    }
  };
  //settings menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const handleChangeStreamingServer = (event) => {
    setStreamingServer({
      isChanging:true,
      server:event.target.value,
    });
  };

  const open = Boolean(anchorEl);
  const openCc = Boolean(anchorEl1);
  const { pathname } = useRouter();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickCc = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleCloseCc = () => {
    setAnchorEl1(null);
  };
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'volume',
  });


  //////////////change subtitles
  const handleChangeCc = (index) => {
    if (index===-1){
      remote.disableCaptions();
      setAnchorEl1(null);
      return
    }
    remote.changeTextTrackMode(index, 'showing');
    setAnchorEl1(null);
  };
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
  const stream = sources.find((source) => source.quality&&source.quality.includes('auto'))||sources[0];
  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
  }

  return (
    <>
      <Box
        component="span"
        sx={{
          'width': 1,
          'lineHeight': 0,
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
          ref={player}
          src={`${stream.url}`}
          poster={`${cover}`}
          aspectRatio={'16/9'}
          crossorigin={true}
          className={'media'}
          storage="youplex-player"
          load={'eager'}
          autoplay={true}
          googleCast={{
            autoJoinPolicy: 'origin_scoped',
            language: 'en-US',
          }}
        >
          <MediaProvider>
            {subtitles&&subtitles.map((subtitle,index)=>(
              <Track id={index} src={subtitle.url} kind="subtitles" label={subtitle.lang} lang="en-US" default={!!subtitle.lang.includes('English')} />
            ))}
          </MediaProvider>
          <Subtitles>
            <Captions className="vds-captions" />
          </Subtitles>
          {started && (
            <Controls className="media-controls">
              <Stack spacing={2} direction="row" sx={{ mb: -1 }} alignItems="center">
                <Slider
                  aria-label="Time indicator"
                  min={0}
                  value={Math.round(currentTime)}
                  max={duration}
                  valueLabelFormat={moment
                    .duration(currentTime, 'seconds')
                    .format('hh:mm:ss', { trim: false })}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  sx={{
                    //'color': theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                    'height': 4,
                    'marginTop': 1,
                    '& .MuiSlider-thumb': {
                      'width': 8,
                      'height': 8,
                      'transition': '0.3s cubic-bezier(.47,1.64,.41,.8)',
                      '&:before': {
                        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                      },
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: `0px 0px 0px 8px ${
                          theme.palette.mode === 'dark'
                            ? 'rgb(255 255 255 / 16%)'
                            : 'rgb(0 0 0 / 16%)'
                        }`,
                      },
                      '&.Mui-active': {
                        width: 20,
                        height: 20,
                      },
                    },
                    '& .MuiSlider-rail': {
                      opacity: 0.28,
                    },
                  }}
                />
              </Stack>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
                justifyContent={'space-between'}
              >
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                  <Tooltip title={!playing ? 'Play' : 'Pause'}>
                    <IconButton
                      aria-label="play"
                      sx={{ color: '#F9FAFB' }}
                      onClick={() => {
                        handlePlayerControls('play');
                      }}
                    >
                      {!playing ? <PlayArrowRoundedIcon /> : <PauseOutlinedIcon />}
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={!muted ? 'Mute' : 'Unmute'}>
                    <IconButton
                      {...bindHover(popupState)}
                      sx={{ color: '#F9FAFB' }}
                      onClick={() => {
                        handlePlayerControls('mute');
                      }}
                    >
                      {muted ? <VolumeOffOutlinedIcon /> : <VolumeUpOutlinedIcon />}
                    </IconButton>
                  </Tooltip>

                  <HoverMenu
                    {...bindMenu(popupState)}
                    MenuListProps={{
                      'aria-labelledby': 'volume',
                    }}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                  >
                    <MenuList>
                      <Slider
                        sx={{
                          '& input[type="range"]': {
                            WebkitAppearance: 'slider-vertical',
                          },
                          'height': 150,
                        }}
                        orientation="vertical"
                        aria-label="volume"
                        onKeyDown={preventHorizontalKeyboardNavigation}
                        min={0}
                        max={100}
                        value={volume * 100}
                        onChange={handleVolumeChange}
                      />
                    </MenuList>
                  </HoverMenu>
                  <Time type="current" remainder style={{ color: '#F9FAFB' }} />
                </Stack>

                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="flex-end">
                  <Tooltip title="Toggle Picture in picture">
                    <IconButton
                      aria-label="Toggle Picture in picture"
                      sx={{ color: '#F9FAFB' }}
                      onClick={() => {
                        handlePlayerControls('pip');
                      }}
                    >
                      <PictureInPictureAltOutlinedIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Toggle Fullscreen">
                    <IconButton
                      aria-label="Toggle Fullscreen"
                      sx={{ color: '#F9FAFB' }}
                      onClick={() => {
                        handlePlayerControls('fullscreen');
                      }}
                    >
                      {!fullscreen ? <FullscreenOutlinedIcon /> : <FullscreenExitOutlinedIcon />}
                    </IconButton>
                  </Tooltip>

                  {/*cast starts here*/}
                  <Tooltip title="Cast to device">
                    <IconButton
                      aria-label="Toggle Fullscreen"
                      sx={{ color: '#F9FAFB' }}
                      onClick={() => {
                        handlePlayerControls('cast');
                      }}
                    >
                      {isGoogleCastConnected ? <CastConnectedOutlinedIcon /> : <CastOutlinedIcon />}
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Settings">
                    <IconButton
                      aria-label="settings"
                      aria-controls={open ? 'settings' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      sx={{ color: '#F9FAFB' }}
                    >
                      <SettingsOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'settings',
                    }}
                    PaperProps={{
                      style: {
                        maxHeight: 48 * 4.5,
                      },
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <SpeedOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Speed</ListItemText>
                      <ListItemIcon>
                        <KeyboardArrowRightOutlinedIcon />
                      </ListItemIcon>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <HighQualityOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Quality</ListItemText>
                    </MenuItem>
                  </Menu>

                  <Tooltip title="Captions">
                    <IconButton
                      aria-label="captions"
                      aria-controls={openCc ? 'captions' : undefined}
                      aria-haspopup="true"
                      aria-expanded={openCc ? 'true' : undefined}
                      onClick={handleClickCc}
                      sx={{ color: '#F9FAFB' }}
                    >
                      <ClosedCaptionOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl1}
                    open={openCc}
                    onClose={handleCloseCc}
                    MenuListProps={{
                      'aria-labelledby': 'captions',
                    }}
                    PaperProps={{
                      style: {
                        maxHeight: 48 * 4.5,
                      },
                    }}
                  >
                    <MenuItem  key={'off'} onClick={(e) => handleChangeCc(-1)}>Off</MenuItem>
                    {subtitles&&subtitles.map((subtitle,index)=>(
                    <MenuItem  key={index} onClick={(e) => handleChangeCc(index)}>{subtitle.lang.split('/').pop().replace('.vtt','').replace(/[^a-zA-Z]/g,'')}</MenuItem>
                  ))}
                  </Menu>
                </Stack>
              </Stack>
            </Controls>
          )}

          {!started && (
            <OverlayStyle
              onClick={() => {
                handlePlayerControls('play');
              }}
            >
              <Image
                src={'/images/play.png'}
                sx={{
                  width: 50,
                  height: 50,
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 3,
                  maxWidth: '100%',
                }}
                onClick={() => {
                  handlePlayerControls('play');
                }}
              />
            </OverlayStyle>
          )}

          {waiting && (
            <LoaderStyle>
              <CircularProgress />
            </LoaderStyle>
          )}
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
  );
}
