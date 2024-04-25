import { forwardRef } from 'react';
import PropTypes from 'prop-types';
// next
import Head from 'next/head';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', meta,structuredData, ...other }, ref) => (
  <>
    <Head>
      <title>{`${title} | Youplex`}</title>
      {meta}
      {structuredData&&(<script
        key="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />)}
    </Head>

    <Box ref={ref} {...other}>
      <div id="zc_1209924"></div>
      {children}
    </Box>
  </>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
};

export default Page;
