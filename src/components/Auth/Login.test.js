import { fireEvent, render, screen } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import { StateProvider } from '../../StateProvider';

import reducer, { initialState } from '../../reducer';

describe('Login Component', () => {
  test('Email Input Present', () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </StateProvider>
    );
    const emailElement = screen.getByLabelText('Email');
    expect(emailElement).toBeInTheDocument();
  });

  test('Password Input Present', () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </StateProvider>
    );
    const passElement = screen.getByLabelText('Password');
    expect(passElement).toBeInTheDocument();
  });

  test('Testing Email Input', () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </StateProvider>
    );

    const emailElement = screen.getByLabelText('Email');
    expect(emailElement.value).toBe('');
    fireEvent.change(emailElement, { target: { value: 'saka@afc.com' } });
    expect(emailElement.value).toBe('saka@afc.com');
  });

  test('Testing Password Input', () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </StateProvider>
    );

    const passElement = screen.getByLabelText('Password');
    expect(passElement.value).toBe('');
    fireEvent.change(passElement, { target: { value: 'Test@123' } });
    expect(passElement.value).toBe('Test@123');
  });
});
