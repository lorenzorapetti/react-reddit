import React from 'react';
import { render, wait, fireEvent, flushEffects } from 'react-testing-library';
import nock from 'nock';
import useFetch from '../useFetch';

interface IComponentMockProps {
  json?: boolean;
  shouldError?: boolean;
  dataTransformer?(res: any): any;
}

const endpoint = 'https://www.example.com';
function ComponentMock({ json = true, shouldError = false, dataTransformer }: IComponentMockProps) {
  const { data, loading, error, retries, retry, abort, aborted } = useFetch(
    `${endpoint}${shouldError ? '/error' : ''}`,
    { json, dataTransformer },
  );

  return (
    <div>
      <div data-testid="retries">{retries}</div>
      {loading && <div data-testid="loading">Loading...</div>}
      {data ? (
        <div data-testid="data">
          {json ? data.map((s: any) => <div key={s.name}>{s.name}</div>) : data}
        </div>
      ) : null}
      {error ? <div data-testid="error">Error</div> : null}
      {aborted && <div>Aborted</div>}
      <button onClick={retry}>Retry</button>
      <button onClick={abort}>Abort</button>
    </div>
  );
}

describe('useFetch', () => {
  const data = [{ name: '/r/all' }, { name: '/r/best' }];

  function resetNock() {
    nock.cleanAll();
    nock(endpoint)
      .get('/')
      .reply(200, JSON.stringify(data))
      .get('/error')
      .reply(500, 'Error');
  }

  beforeEach(() => {
    resetNock();
  });

  it('should succeed', async () => {
    const { getByTestId, queryByTestId } = render(<ComponentMock />);
    flushEffects();

    expect(getByTestId('loading')).toBeInTheDocument();
    expect(getByTestId('retries')).toHaveTextContent('0');
    expect(queryByTestId('data')).not.toBeInTheDocument();

    await wait(() => {
      expect(getByTestId('data')).toBeInTheDocument();
    });

    expect(getByTestId('data').childNodes).toHaveLength(2);
    expect(getByTestId('retries')).toHaveTextContent('0');
    expect(queryByTestId('loading')).not.toBeInTheDocument();
  });

  it('should fail', async () => {
    const { getByTestId } = render(<ComponentMock shouldError />);
    flushEffects();

    await wait(() => {
      expect(getByTestId('error')).toBeInTheDocument();
    });

    expect(getByTestId('error')).toHaveTextContent(/error/i);
  });

  it('should retry', async () => {
    const { getByTestId, queryByTestId, getByText } = render(<ComponentMock />);
    flushEffects();

    await wait(() => {
      expect(getByTestId('data')).toBeInTheDocument();
    });

    expect(getByTestId('retries')).toHaveTextContent('0');

    resetNock();
    fireEvent.click(getByText(/retry/i));
    flushEffects();

    expect(getByTestId('loading')).toBeInTheDocument();
    expect(queryByTestId('data')).not.toBeInTheDocument();
    expect(queryByTestId('error')).not.toBeInTheDocument();

    await wait(() => {
      expect(queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(getByTestId('retries')).toHaveTextContent('1');
  });

  // In theory i would have liked to test the full abort funcionality but, at least for my
  // understanding, right now the `useEffect` hook is not triggered by the `render` method.
  // The only way is to call `flushEffects` but it runs the effect synchronously.
  // We don't want that because we want to click the abort button in the middle of the call, which is
  // asynchronous.
  // it('should abort', async () => {
  //   const { queryByTestId, getByText } = render(<ComponentMock />);
  //   flushEffects();
  //   fireEvent.click(getByText(/abort/i));

  //   await wait(() => expect(getByText(/aborted/i)).toBeInTheDocument());

  //   expect(queryByTestId('loading')).not.toBeInTheDocument();
  //   expect(queryByTestId('data')).not.toBeInTheDocument();
  //   expect(queryByTestId('error')).not.toBeInTheDocument();
  // });

  it('should not parse to json when the `json` option is false', async () => {
    const { getByTestId } = render(
      <ComponentMock json={false} dataTransformer={res => res.text()} />,
    );
    flushEffects();

    await wait(() => {
      expect(getByTestId('data')).toHaveTextContent(JSON.stringify(data));
    });
  });

  it('should transform the data when the `dataTransformer` option exists', async () => {
    const transformedData = [{ name: '/r/top' }];
    const { getByTestId } = render(<ComponentMock dataTransformer={() => transformedData} />);
    flushEffects();

    await wait(() => {
      expect(getByTestId('data').childNodes).toHaveLength(1);
    });
  });
});
