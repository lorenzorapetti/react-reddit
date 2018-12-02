import React from 'react';
import { fireEvent } from 'react-testing-library';
import { renderWithTheme } from '../../../test/utils';
import Header from '../Header';
import { TitleContext } from '../../context';

describe('<Header />', () => {
  it('should render correctly with light theme', async () => {
    const { getByTestId } = renderWithTheme(<Header />, 'light');
    expect(getByTestId('theme-button')).toHaveAttribute('title', 'Set dark theme');
  });

  it('should render correctly with dark theme', () => {
    const { getByTestId } = renderWithTheme(<Header />, 'dark');
    expect(getByTestId('theme-button')).toHaveAttribute('title', 'Set light theme');
  });

  it('should switch themes', () => {
    const toggleTheme = jest.fn();
    const { getByTestId } = renderWithTheme(<Header onThemeToggleClick={toggleTheme} />, 'light');
    const themeButton = getByTestId('theme-button');
    fireEvent.click(themeButton);
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });

  it('should toggle the drawer', () => {
    const toggleDrawer = jest.fn();
    const { getByTestId } = renderWithTheme(<Header onDrawerToggleClick={toggleDrawer} />, 'light');
    const drawerButton = getByTestId('drawer-button');
    fireEvent.click(drawerButton);
    expect(toggleDrawer).toHaveBeenCalledTimes(1);
  });

  it('should render the title correctly', () => {
    const { queryByText, rerenderWithTheme } = renderWithTheme(
      <TitleContext.Provider value={{ title: 'React reddit' }}>
        <Header />
      </TitleContext.Provider>,
      'light',
    );
    expect(queryByText(/react reddit/i)).toBeInTheDocument();
    rerenderWithTheme(
      <TitleContext.Provider value={{ title: 'bla bla' }}>
        <Header />
      </TitleContext.Provider>,
    );
    expect(queryByText(/bla bla/i)).toBeInTheDocument();
  });
});
