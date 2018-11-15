import React from 'react';
import { render } from 'react-testing-library';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { themeLight, themeDark } from '../src/themes';

export function renderWithTheme<P>(ui: React.ReactElement<P>, theme: 'light' | 'dark') {
  const result = render(
    <MuiThemeProvider theme={theme === 'light' ? themeLight : themeDark}>{ui}</MuiThemeProvider>,
  );
  return {
    ...result,
    rerenderWithTheme(ui: React.ReactElement<any>) {
      result.rerender(
        <MuiThemeProvider theme={theme === 'light' ? themeLight : themeDark}>
          {ui}
        </MuiThemeProvider>,
      );
    },
  };
}
