// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
import useIsMountedRef from '../hooks/useIsMountedRef';
// layouts
import Layout from '@/layouts';
// components
import Page from '@/components/Page';
import { SearchForm } from "@/sections/forms";
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

Videos.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Videos({ data }) {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  return (
    <Page title="Youplex search movies,series and anime">
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Search for your favourite movies
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Use the form below to search for movies
                </Typography>
              </Box>
            </Stack>
            <SearchForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
