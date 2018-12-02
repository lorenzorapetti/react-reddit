import React from 'react';
import nock from 'nock';
import { renderWithTheme } from '../../../test/utils';
import NavigationDrawer from '../NavigationDrawer';

describe('<NavigationDrawer />', () => {
  const data = {
    data: {
      children: [{ name: '/r/all' }, { name: '/r/best' }, { name: '/r/top' }],
    },
  };

  beforeEach(() => {
    nock('https://api.reddit.com')
      .get('/subreddits/default')
      .reply(200, data);
  });

  it.each(['md', 'lg', 'xl'])('should be visible even when closed with %s width', width => {
    const { getByTestId } = renderWithTheme(
      <NavigationDrawer width={width} drawerOpen={false} />,
      'light',
    );
    expect(getByTestId('navigation-drawer')).toBeVisible();
  });

  it.each(['sm', 'xs'])('should not be visible when closed with %s width', width => {
    const { getByTestId } = renderWithTheme(
      <NavigationDrawer width={width} drawerOpen={false} />,
      'light',
    );
    expect(getByTestId('navigation-drawer')).not.toBeVisible();
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl'])('should be visible when opened with %s width', size => {
    const { getByTestId } = renderWithTheme(<NavigationDrawer width={size} drawerOpen />, 'light');
    expect(getByTestId('navigation-drawer')).toBeVisible();
  });

  it('should switch themes', () => {
    const { container, rerenderWithTheme } = renderWithTheme(
      <NavigationDrawer width="xl" drawerOpen />,
      'light',
    );
    expect(container.firstChild).toMatchSnapshot();
    rerenderWithTheme(<NavigationDrawer width="xl" drawerOpen />, 'dark');
    expect(container.firstChild).toMatchSnapshot();
  });
});
