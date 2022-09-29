import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sample from './Sample';

describe('Sample Component', () => {
  test('renders hello world in text', () => {
    render(<Sample />);
    const headerElement = screen.getByText('Hello World');
    expect(headerElement).toBeInTheDocument();
  });

  test('Button Not Clicked', () => {
    render(<Sample />);
    const paraElement = screen.getByText('good to see you', { exact: false });
    expect(paraElement).toBeInTheDocument();
  });

  test('renders Changed if button clicked', () => {
    //Arrange
    render(<Sample />);

    //Act
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    //Assert
    const outputElement = screen.getByText('Changed', { exact: false });
    expect(outputElement).toBeInTheDocument();
  });

  test('do not render good to see you', () => {
    render(<Sample />);

    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    const outputElement = screen.queryByText('good to see you', {
      exact: false,
    });
    expect(outputElement).toBeNull();
  });
});
