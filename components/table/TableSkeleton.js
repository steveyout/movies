// @mui
import { TableRow, TableCell, Stack, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

export default function TableSkeleton({ ...other }) {
  return (
    <TableRow {...other}>
      <TableCell colSpan={9}>
        <Stack spacing={3} direction="row" alignItems="center">
          <Skeleton variant="rectangular" width={40} height={40} sx={{ borderRadius: 1 }} />
          <Skeleton variant="text" width={240} height={20} />
          <Skeleton variant="text" width={160} height={20} />
          <Skeleton variant="text" width={160} height={20} />
          <Skeleton variant="text" width={160} height={20} />
          <Skeleton variant="text" width={160} height={20} />
        </Stack>
      </TableCell>
    </TableRow>
  );
}
