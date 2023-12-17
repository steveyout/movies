// ----------------------------------------------------------------------
function container() {
  // Use the fullscreen element if in fullscreen mode, otherwise just the document's body
  return document.fullscreenElement ?? document.body;
}
export default function Tooltip(theme) {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.grey[isLight ? 800 : 700],
        },
        arrow: {
          color: theme.palette.grey[isLight ? 800 : 700],
        },
      },
      defaultProps: {
        PopperProps: {
          container,
        },
      },
    },
  };
}
