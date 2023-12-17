import PropTypes from 'prop-types';
// components
import MainLayout from '@/layouts/main';
import LogoOnlyLayout from '@/layouts/LogoOnlyLayout';

// ----------------------------------------------------------------------

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['dashboard', 'main', 'logoOnly', 'admin']),
};

export default function Layout({ variant = 'dashboard', children }) {
  if (variant === 'logoOnly') {
    return <LogoOnlyLayout> {children} </LogoOnlyLayout>;
  }

  return (
    <MainLayout>{children}</MainLayout>
  );
}
