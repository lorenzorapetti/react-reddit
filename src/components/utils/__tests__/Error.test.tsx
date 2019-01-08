import React from 'react';
import { fireEvent } from 'react-testing-library';
import Error from '../Error';
import { renderWithTheme } from '../../../../test/utils';

describe('<Error />', () => {
  it('should set the message', () => {
    const { rerenderWithTheme, getByText } = renderWithTheme(<Error />);
    expect(getByText(/oops, something went wrong/i)).toBeInTheDocument();
    const message = 'Errrrrrror';
    rerenderWithTheme(<Error message={message} />);
    expect(getByText(message)).toBeInTheDocument();
  });

  it('should set the button message', () => {
    const { rerenderWithTheme, getByText } = renderWithTheme(<Error />);
    expect(getByText(/retry/i)).toBeInTheDocument();
    const buttonMessage = 'Button message';
    rerenderWithTheme(<Error buttonMessage={buttonMessage} />);
    expect(getByText(buttonMessage)).toBeInTheDocument();
  });

  it('should set the gutters', () => {
    const { container, rerenderWithTheme } = renderWithTheme(<Error />);
    expect(container.firstChild).toMatchSnapshot();
    rerenderWithTheme(<Error gutters />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call `onButtonClick`', () => {
    const handleButtonClick = jest.fn();
    const { getByText } = renderWithTheme(<Error onButtonClick={handleButtonClick} />);
    fireEvent.click(getByText(/retry/i));
    expect(handleButtonClick).toHaveBeenCalledTimes(1);
  });
});
