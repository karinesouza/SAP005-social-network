import { Home } from './pages/home/index.js';
import { Login } from './pages/login/index.js';
import { register } from './pages/register/register.js';
import { onNavigate } from './utils/history.js';
import { publicar } from './pages/publicar/index.js';
import { publicacoes } from './pages/publicacoes/index.js';

export const routeRender = () => {
  const rootDiv = document.getElementById('root');
  const routes = {
    '/': Home,
    '/login': Login,
    '/register': register,
    '/publicar': publicar,
    '/publicacoes': publicacoes
  };

  rootDiv.innerHTML = '';
  rootDiv.appendChild(routes[window.location.pathname]());
};

window.addEventListener('popstate', routeRender);
window.addEventListener('load', () => {
  document
    .getElementById('home')
    .addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('/');
    });

  document
    .getElementById('login')
    .addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('/login');
    });

    document
    .getElementById('register')
    .addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('/register');
    });

  document
    .getElementById('publicar')
    .addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('/publicar');
    });

  document
    .getElementById('publicacoes')
    .addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('/publicacoes');
    });
  document
    .getElementById('register')
    .addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('/registro')
    });
  routeRender();
});
