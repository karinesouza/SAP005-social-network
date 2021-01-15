import { Home, addPost } from './index.js';
import * as services from '../../services/index.js';

services.createAccount = jest.fn(() => true);
services.getPosts = jest.fn(() => true);
services.createPost = jest.fn(() => true);
services.likePost = jest.fn(() => true);
services.deletePost = jest.fn(() => true);
services.editPost = jest.fn(() => true);
services.signOut = jest.fn(() => true);

describe('Home', () => {
  it('should be a function', () => {
    expect(typeof Home).toBe('function');
  });

  it('when the user clicks the button, he should be redirect to the login page', () => {
    Home().querySelector('#sign-out-btn').dispatchEvent(new Event('click'));
  });

  it('when the user clicks the button, the publication should be posted', () => {
    Home().querySelector('#publish-btn').dispatchEvent(new Event('click'));
  });
});

describe('addPost', () => {
  it('should be a function', () => {
    expect(typeof addPost).toBe('function');
  });

  it('when the user clicks the button, he must like and dislike the publication', () => {
    likePost().querySelector('.like-btn').dispatchEvent(new Event('click'));
    expect(services.likePost).toHaveBeenCalled();
    expect(services.likePost).toBe(true);
  });

  it('when the user clicks the button, he should open the option to edit and delete the publication', () => {
    editPost().querySelector('.points-btn').dispatchEvent(new Event('click'));
  });

  it('when the user clicks the button, he must open the field to edit the message', () => {
    editPost().querySelector('.edit-post-btn').dispatchEvent(new Event('click'));
  });

  it('when the user clicks the button, he must close the option to edit', () => {
    editPost().querySelector('.cancel-btn').dispatchEvent(new Event('click'));
  });

  it('when the user clicks the button, the publication should be saved', () => {
    editPost().querySelector('.save-edit-btn').dispatchEvent(new Event('click'));
    expect(services.editPost).toHaveBeenCalled();
    expect(services.editPost).toBe(true);
  });

  it('when the user clicks the button, the publication should be deleted', () => {
    deletePost().querySelector('.delete-post-btn').dispatchEvent(new Event('click'));
    expect(services.deletePost).toHaveBeenCalled();
    expect(services.deletePost).toBe(true);
  });
});
