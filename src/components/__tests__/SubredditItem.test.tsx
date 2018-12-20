import React from 'react';
import { render } from 'react-testing-library';
import formatDistance from 'date-fns/formatDistance';
import SubredditItem from '../SubredditItem';
import { withCustomJss } from '../../../test/utils';

describe('<SubredditItem />', () => {
  let spy = jest.spyOn(Date, 'now').mockImplementation(() => 1544486400000);

  function createPost(overrides?: any) {
    return {
      created_utc: 1544572800,
      score: 15000,
      num_comments: 3400,
      thumbnail: '',
      title: 'Reddit post title',
      subreddit_name_prefixed: 'r/all',
      author: 'loryman',
      ...overrides,
    };
  }

  afterAll(() => {
    spy.mockRestore();
  });

  it('should render the post', () => {
    const post = createPost();
    const { getByTestId } = render(withCustomJss(<SubredditItem post={post} />));
    const created = formatDistance(post.created_utc * 1000, Date.now(), {
      addSuffix: true,
    });

    expect(getByTestId('score')).toHaveTextContent('15k');
    expect(getByTestId('thumbnail')).not.toHaveStyle(`background: url(${post.thumbnail})`);
    expect(getByTestId('thumbnail').firstChild).toMatchSnapshot();
    expect(getByTestId('title')).toHaveTextContent(post.title);
    expect(getByTestId('info')).toHaveTextContent(
      `${post.subreddit_name_prefixed} • Posted by u/${post.author} ${created} • 3.4k comments`,
    );
  });

  it('should render the thumbnail provided', () => {
    const post = createPost({ thumbnail: 'https://via.placeholder.com/150' });
    const { getByTestId } = render(withCustomJss(<SubredditItem post={post} />));

    expect(getByTestId('thumbnail')).toHaveStyle(`background: url(${post.thumbnail})`);
    expect(getByTestId('thumbnail')).toMatchSnapshot();
  });
});
