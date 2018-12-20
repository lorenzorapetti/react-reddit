import React from 'react';
import { render } from 'react-testing-library';
import NavigationDrawerItem from '../NavigationDrawerItem';
import { LinkProps as mockLinkProps } from '@reach/router';

jest.mock('@reach/router', () => {
  return {
    Link: ({ children, to }: mockLinkProps<{}>) => <a href={to}>{children}</a>,
  };
});

describe('<NavigationDrawerItem />', () => {
  function setup(image = false) {
    const subreddit = {
      display_name_prefixed: 'r/gadgets',
      icon_img: image
        ? 'https://b.thumbs.redditmedia.com/E6-lBIXAELKdtcb4HaXUEuSSIKrsF9tOUgjnb5UYFrU.png'
        : '',
    };
    const wrapper = render(<NavigationDrawerItem subreddit={subreddit} />);

    return {
      subreddit,
      ...wrapper,
    };
  }

  it('should render the subreddit name', () => {
    const { subreddit, getByText } = setup();
    expect(getByText(subreddit.display_name_prefixed)).toBeInTheDocument();
  });

  it('should render the reddit icon if the image is not provided', () => {
    const { getByTestId, queryByTestId } = setup();
    expect(getByTestId('icon')).toBeInTheDocument();
    expect(queryByTestId('avatar')).not.toBeInTheDocument();
  });

  it('should render the image avatar if the image is provided', () => {
    const { getByTestId, queryByTestId } = setup(true);
    expect(getByTestId('avatar')).toBeInTheDocument();
    expect(queryByTestId('icon')).not.toBeInTheDocument();
  });
});
