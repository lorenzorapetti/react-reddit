import React from 'react';
import { render, wait, flushEffects } from 'react-testing-library';
import nock from 'nock';
import useReddit, { baseUrl } from '../useReddit';

function ComponentMock() {
  const { data } = useReddit('');

  return data ? (
    <div data-testid="data">
      {data.map((s: any) => (
        <div key={s.name}>{s.name}</div>
      ))}
    </div>
  ) : null;
}

describe('useReddit', () => {
  beforeEach(() => {
    nock.cleanAll();
    nock(baseUrl)
      .get('/')
      .reply(200, {
        data: { children: [{ data: { name: 'post1' } }, { data: { name: 'post2' } }] },
      });
  });

  it('should transform the data correctly', async () => {
    const { queryByTestId, getByTestId } = render(<ComponentMock />);
    flushEffects();

    expect(queryByTestId('data')).not.toBeInTheDocument();

    await wait(() => expect(getByTestId('data')).toBeInTheDocument());

    expect(getByTestId('data').childNodes).toHaveLength(2);
  });
});
