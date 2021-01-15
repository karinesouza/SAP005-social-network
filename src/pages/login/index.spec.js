import { Login } from './index.js';
import * as services from '../../services/index.js';

services.login = jest.fn(() => true);
services.loginWithGoogle = jest.fn(() => true);

describe('Login', () => {
  it('should be a function', () => {
    expect(typeof Login).toBe('function');
  });

  it('when the user clicks the button, he must access with email and password', () => {
    Login().querySelector('#login-btn').dispatchEvent(new Event('click'));
    expect(services.login).toHaveBeenCalled();
    expect(services.login).toBe(true);
  });

  it('when the user clicks the button, he must access with Google', () => {
    Login().querySelector('#google-btn').dispatchEvent(new Event('click'));
    expect(services.loginWithGoogle).toHaveBeenCalled();
    expect(services.loginWithGoogle).toBe(true);
  });
});
