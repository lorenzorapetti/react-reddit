import React from 'react';
import { render } from 'react-testing-library';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';
import { themeLight, themeDark } from '../src/themes';

// TODO: Improve typing
const generateId = (rule: any, sheet: any) => `${sheet.options.classNamePrefix}-${rule.key}`;

export function renderWithTheme<P>(ui: React.ReactElement<P>, theme: 'light' | 'dark' = 'light') {
  const result = render(
    withCustomJss(
      <ThemeProvider theme={theme === 'light' ? themeLight : themeDark}>{ui}</ThemeProvider>,
    ),
  );
  return {
    ...result,
    rerenderWithTheme(ui: React.ReactElement<any>, themeOverride: 'light' | 'dark' = theme) {
      result.rerender(
        withCustomJss(
          <ThemeProvider theme={themeOverride === 'light' ? themeLight : themeDark}>
            {ui}
          </ThemeProvider>,
        ),
      );
    },
  };
}

/**
 * Renders the component provided with a custom JssProvider to generate predictable class names
 * so that we can trust jest's snapshots, though it works only with classes generated
 * with `@material-ui/styles`, so we have to wait until @material-ui v4 to be 100% working
 */
export function withCustomJss<P>(ui: React.ReactElement<P>) {
  return <StylesProvider generateClassName={generateId}>{ui}</StylesProvider>;
}
