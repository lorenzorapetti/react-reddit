import React from 'react';
import { render } from 'react-testing-library';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { JssProvider } from 'react-jss';
import { themeLight, themeDark } from '../src/themes';

// TODO: Improve typing
const generateClassName = (rule: any, styleSheet: any) =>
  `${styleSheet.options.classNamePrefix}-${rule.key}`;

export function renderWithTheme<P>(ui: React.ReactElement<P>, theme: 'light' | 'dark') {
  const result = render(
    withCustomJss(
      <MuiThemeProvider theme={theme === 'light' ? themeLight : themeDark}>{ui}</MuiThemeProvider>,
    ),
  );
  return {
    ...result,
    rerenderWithTheme(ui: React.ReactElement<any>, themeOverride: 'light' | 'dark' = theme) {
      result.rerender(
        withCustomJss(
          <MuiThemeProvider theme={themeOverride === 'light' ? themeLight : themeDark}>
            {ui}
          </MuiThemeProvider>,
        ),
      );
    },
  };
}

export function withCustomJss<P>(ui: React.ReactElement<P>) {
  return <JssProvider generateClassName={generateClassName}>{ui}</JssProvider>;
}
