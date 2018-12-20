import React from 'react';
import { render, flushEffects, wait } from 'react-testing-library';
import nock from 'nock';
import { createMemorySource, createHistory, LocationProvider, Router } from '@reach/router';
import Subreddit from '../Subreddit';
import { baseUrl } from '../../hooks/useReddit';
import postsDefault from './posts-default.json';
import postsAskReddit from './posts-askreddit.json';
import { TitleContext } from '../../context';

jest.mock('nprogress', () => {
  let started = false;

  return {
    start: jest.fn().mockImplementation(() => {
      started = true;
    }),
    end: jest.fn().mockImplementation(() => {
      started = false;
    }),
    isStarted: jest.fn().mockReturnValue(started),
  };
});

const context = {
  title: 'React reddit',
  setTitle: jest.fn(),
};

function SubredditRoute({ path = '' }) {
  const source = createMemorySource(`/${path}`);
  const history = createHistory(source);

  return (
    <TitleContext.Provider value={context}>
      <LocationProvider history={history}>
        <Router>
          <Subreddit path={`/${path}`} />
        </Router>
      </LocationProvider>
    </TitleContext.Provider>
  );
}

describe('<Subreddit />', () => {
  beforeEach(() => {
    nock.cleanAll();
    nock(baseUrl)
      .get('/')
      .reply(200, postsDefault)
      .get('/r/AskReddit')
      .reply(200, postsAskReddit)
      .get('/not-found')
      .reply(404, { error: 'Not Found' });
  });

  it('should render the list of posts', async () => {
    const { getByText } = render(<SubredditRoute />);
    flushEffects();

    await wait(() => getByText(postsDefault.data.children[0].data.title));

    expect(context.setTitle).toHaveBeenCalledTimes(1);
    expect(context.setTitle).toHaveBeenCalledWith('Homepage');
    expect(getByText(postsDefault.data.children[1].data.title)).toBeInTheDocument();
  });

  it('should render an error if the call fails', async () => {
    const { getByTestId } = render(<SubredditRoute path="not-found" />);
    flushEffects();

    await wait();

    expect(getByTestId('error')).toBeInTheDocument();
  });

  it('should render the posts of a specific subreddit', async () => {
    const { getByText } = render(<SubredditRoute path="r/AskReddit" />);
    flushEffects();

    await wait(() => getByText(postsAskReddit.data.children[0].data.title));

    expect(getByText(postsAskReddit.data.children[1].data.title)).toBeInTheDocument();
    expect(context.setTitle).toHaveBeenCalledWith('/r/AskReddit');
  });
});
