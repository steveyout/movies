// ----------------------------------------------------------------------
function container() {
  // Use the fullscreen element if in fullscreen mode, otherwise just the document's body
  return document.fullscreenElement ?? document.body;
}
export default function Popover(theme) {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.dropdown,
          borderRadius: Number(theme.shape.borderRadius) * 1.5,
        },
      },
      defaultProps: {
        container,
      },
    },
  };
}
