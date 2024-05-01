// next
import { useRouter } from 'next/router';
import NextLink from 'next/link';

// routes
import { PATH_AUTH } from '@/routes/paths';
// @mui
import { styled, useTheme,keyframes,alpha } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container,Stack } from '@mui/material';
// hooks
import useOffSetTop from '@/hooks/useOffSetTop';
import useResponsive from '@/hooks/useResponsive';
// utils
import cssStyles from '@/utils/cssStyles';
// config
import { HEADER } from '@/config';
// components
import Logo from '@/components/Logo';
import Label from '@/components/Label';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';
import Iconify from '@/components/Iconify';
import baselinePersonAddAlt from '@iconify/icons-ic/baseline-person-add-alt';
import IconButtonAnimate from "@/components/animate/IconButtonAnimate";

// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

//overlay
function Pulse({ duration = 1500, children }) {

  const pulse = keyframes `
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  `

  return (
    <Box
      sx={{
        animation: `${pulse} ${duration}ms ease-out infinite`
      }}
    >
      {children}
    </Box>
  )
}
// ----------------------------------------------------------------------

export default function MainHeader() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const theme = useTheme();

  const { pathname } = useRouter();

  const isDesktop = useResponsive('up', 'md');

  const isHome = pathname === '/';

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Logo />

          <Label color={'info'} sx={{ ml: 1 }} variant={isOffset ? 'ghost' : 'filled'}>
            {process.env.TITLE}
          </Label>
          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}

          {isDesktop?(
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <NextLink href={'https://t.me/youplexannouncments'} passHref>
                <Button variant="contained" startIcon={<Iconify icon={'la:telegram'} />} sx={{mr:2}}>
                  Telegram
                </Button>
              </NextLink>

              <NextLink href={'https://discord.gg/5eWu9Vz6tQ'} passHref>
                <Button variant="contained" color={'secondary'} startIcon={<Iconify icon={'iconoir:discord'} />}>
                  Discord
                </Button>
              </NextLink>
            </Stack>
          ):(
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <NextLink href={'https://t.me/youplexannouncments'} passHref>
                <IconButtonAnimate  color={'primary'} sx={{mr:2}}>
                  <Iconify icon={'la:telegram'} />
                </IconButtonAnimate>
              </NextLink>

              <NextLink href={'https://discord.gg/5eWu9Vz6tQ'} passHref>
                <IconButtonAnimate color={'secondary'}>
                  <Iconify icon={'iconoir:discord'} />
                </IconButtonAnimate>
              </NextLink>
            </Stack>
          )}

          {!isDesktop && <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
