// @mui
import { useSnackbar } from 'notistack';
import { Stack, Button, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// routes
import { PATH_AUTH, PATH_DASHBOARD } from '../../../routes/paths';
// assets
import { DocIllustration } from '../../../assets';
import Iconify from '../../../components/Iconify';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

export default function NavbarDocs() {
  const router = useRouter();

  const { user, logout } = useAuth();

  const { enqueueSnackbar } = useSnackbar();
  const handleLogout = async () => {
    try {
      await logout();
      await router.replace(PATH_AUTH.login);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };
  return (
    <Stack
      spacing={3}
      sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}
    >
      <DocIllustration sx={{ width: 1 }} />

      <div>
        <Typography gutterBottom variant="subtitle1">
          Hi, {user?.displayName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Want to logout?
        </Typography>
      </div>

      <Button
        href={PATH_DASHBOARD.app}
        startIcon={<Iconify icon="mdi-light:logout" />}
        variant="outlined"
        color={'error'}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Stack>
  );
}
