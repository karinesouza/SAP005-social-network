import {
  createAccount,
  login,
  loginWithGoogle,
  getPosts,
  createPost,
  likePost,
  deletePost,
  editPost,
  signOut
} from './index.js';

describe('Create Account With Email And Password', () => {
  it('should be a function', () => {
    expect(typeof createAccount).toBe('function');
  });
});

describe('Login With Email And Password', () => {
  it('should be a function', () => {
    expect(typeof login).toBe('function');
  });
});

describe('Login With Google', () => {
  it('should be a function', () => {
    expect(typeof loginWithGoogle).toBe('function');
  });
});

describe('Get Publication', () => {
  it('should be a function', () => {
    expect(typeof getPosts).toBe('function');
  });
});

describe('Create Publication', () => {
  it('should be a function', () => {
    expect(typeof createPost).toBe('function');
  });
});

describe('Like Publication', () => {
  it('should be a function', () => {
    expect(typeof likePost).toBe('function');
  });
});

describe('Delete Publication', () => {
  it('should be a function', () => {
    expect(typeof deletePost).toBe('function');
  });
});

describe('Edit the Publication', () => {
  it('should be a function', () => {
    expect(typeof editPost).toBe('function');
  });
});

describe('Close Login', () => {
  it('should be a function', () => {
    expect(typeof signOut).toBe('function');
  });
});

describe('Post Publication With Photo', () => {
  it('should be a function', () => {
    expect(typeof postPhoto).toBe('function');
  });
});
