import React from 'react';
import { render } from 'react-testing-library';
import Loading from '../Loading';
import { withCustomJss } from '../../../../test/utils';

describe('<Loading />', () => {
  it('should match the snapshot', () => {
    const { container } = render(withCustomJss(<Loading />));
    expect(container.firstChild).toMatchSnapshot();
  });
});
