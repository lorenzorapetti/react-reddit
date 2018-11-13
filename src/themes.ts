import { createMuiTheme } from '@material-ui/core/styles';

export const drawerWidth = 240;

export const themeLight = createMuiTheme({
  palette: {
    type: 'light',
  },
  typography: {
    useNextVariants: true,
  },
});

export const themeDark = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    useNextVariants: true,
  },
});
