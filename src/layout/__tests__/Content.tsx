import React from 'react';
import { renderWithTheme } from '../../../test/utils';
import Content from '../Content';

describe('<Content />', () => {
  it.each(['xs', 'sm'])(
    'should not have a margin when the width is %s and the drawer is open or closed',
    width => {
      const { container, rerenderWithTheme } = renderWithTheme(
        <Content width={width} drawerOpen />,
        'light',
      );
      expect(container.firstChild).toHaveStyle('margin-left: 0;');
      rerenderWithTheme(<Content width={width} drawerOpen={false} />);
      expect(container.firstChild).toHaveStyle('margin-left: 0;');
    },
  );

  it.each(['md', 'lg', 'xl'])(
    'should toggle the margin when the width is %s and the drawer is toggled',
    width => {
      const { container, rerenderWithTheme } = renderWithTheme(
        <Content width={width} drawerOpen />,
        'light',
      );
      expect(container.firstChild).toHaveStyle('margin-left: 0;');
      rerenderWithTheme(<Content width={width} drawerOpen={false} />);
      expect(container.firstChild).not.toHaveStyle('margin-left: 0;');
    },
  );
});
