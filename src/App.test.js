import { render, screen } from '@testing-library/react';
import App from './App';

test('renders task manager title', () => {
  render(<App />);
  const titleElement = screen.getByText(/task manager/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders login form when not authenticated', () => {
  render(<App />);
  const loginElement = screen.getByText(/đăng nhập/i);
  expect(loginElement).toBeInTheDocument();
});

test('renders demo accounts info', () => {
  render(<App />);
  const demoText = screen.getByText(/tài khoản demo/i);
  expect(demoText).toBeInTheDocument();
});

test('renders username and password fields', () => {
  render(<App />);
  const usernameField = screen.getByLabelText(/tên đăng nhập/i);
  const passwordField = screen.getByLabelText(/mật khẩu/i);
  expect(usernameField).toBeInTheDocument();
  expect(passwordField).toBeInTheDocument();
});

test('renders loading spinner initially', () => {
  render(<App />);
  const loadingText = screen.getByText(/đang tải dữ liệu/i);
  expect(loadingText).toBeInTheDocument();
});
