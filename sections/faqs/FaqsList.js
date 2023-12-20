// @mui
import { Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material';
// components
import Iconify from '@/components/Iconify';

// ----------------------------------------------------------------------

export default function FaqsList() {
  const faqs=[
    {
      heading:'Is Youplex legal',
      'detail':'Yes! The app in itself is legal to use. However, since it is tough to establish whether you are streaming copyrighted or private content, we do recommend subscribing to a good VPN service before downloading or streaming.'
    },
    {
      heading: 'Is Youplex free',
      detail:'Yes! The app is free to use with no hidden costs or in-app purchases/charges.'
    },
    {
      heading: 'Is Youplex ad free',
      detail:'Yes'
    },
    {
      heading:'Does Youplex require a vpn',
      detail:'Yes, if you want to have an extra protection with your online activities. Youplex doesn’t really need VPN, but you can use one if you want to be in safest zone from your online activities.'
    }
  ]
  return (
    <>
      {faqs.map((accordion,index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<Iconify icon={'eva:arrow-ios-downward-fill'} width={20} height={20} />}
          >
            <Typography variant="subtitle1">{accordion.heading}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{accordion.detail}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
