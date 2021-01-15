import { register } from './index.js';
import * as services from '../../services/index.js';

services.createAccount = jest.fn(() => true);

describe('Register', () => {
  it('should be a function', () => {
    expect(typeof register).toBe('function');
  });

  it('when the user clicks the button, they must return to the login page', () => {
    register().querySelector('#back-btn').dispatchEvent(new Event('click'));
  });

  it('when the user clicks the button, he must create a new record', () => {
    register().querySelector('#register-btn').dispatchEvent(new Event('click'));
    expect(services.createAccount).toHaveBeenCalled();
    expect(services.createAccount).toBe(true);
  });
});
