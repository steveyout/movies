import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH, PATH_PAGE } from "@/routes/paths";
// components
import { FormProvider, RHFTextField, RHFCheckbox } from '@/components/hook-form';
import { useRouter } from 'next/router';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const {push} = useRouter();
  const LoginSchema = Yup.object().shape({
    query: Yup.string().required('Search query is required')
  });

  const defaultValues = {
    query:'',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = methods;
  const onSubmit = async (data) => {
    try {
      await push({
        pathname:PATH_PAGE.filter(data.query)
      });
    } catch (error) {
      console.error(error);
        setError('afterSubmit', { ...error, message: error.message });
      }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="query" label="Search" />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Search
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
