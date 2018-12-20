import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Error from '../Error';
import { withCustomJss } from '../../../../test/utils';

describe('<Error />', () => {
  it('should set the message', () => {
    const { rerender, getByText } = render(<Error />);
    expect(getByText(/oops, something went wrong/i)).toBeInTheDocument();
    const message = 'Errrrrrror';
    rerender(<Error message={message} />);
    expect(getByText(message)).toBeInTheDocument();
  });

  it('should set the button message', () => {
    const { rerender, getByText } = render(<Error />);
    expect(getByText(/retry/i)).toBeInTheDocument();
    const buttonMessage = 'Button message';
    rerender(<Error buttonMessage={buttonMessage} />);
    expect(getByText(buttonMessage)).toBeInTheDocument();
  });

  it('should set the gutters', () => {
    const { container, rerender } = render(withCustomJss(<Error />));
    expect(container.firstChild).toMatchSnapshot();
    rerender(withCustomJss(<Error gutters />));
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call `onButtonClick`', () => {
    const handleButtonClick = jest.fn();
    const { getByText } = render(<Error onButtonClick={handleButtonClick} />);
    fireEvent.click(getByText(/retry/i));
    expect(handleButtonClick).toHaveBeenCalledTimes(1);
  });
});
