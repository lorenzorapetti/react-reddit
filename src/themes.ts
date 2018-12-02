import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

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
    primary: blue,
  },
  typography: {
    useNextVariants: true,
  },
});
