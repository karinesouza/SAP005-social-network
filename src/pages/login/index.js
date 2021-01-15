import { loginWithGoogle, login } from '../../services/index.js';

export const Login = () => {
  const rootElement = document.createElement('div');
  rootElement.className = "container-log";
  rootElement.innerHTML = `
    <section class='logo'> 
      <img class='img-logo' src="../../img/logo.png">
    </section>
    <section class='container-form'>
      <div class="form">
        <form class="login">
          <h2>Acesse sua conta</h2>
          <input id="registered-email" type="e-mail" placeholder="Digite o e-mail cadastrado" required>
          <input id="registered-password" type="password" placeholder="Digite sua senha" required>
          <input type="button" id="login-btn" value="Entrar">
          <img id="google-btn" class="img-google"  src="../../img/google.jpeg" alt="logo-google">
          <p>Não tem conta? <a href="/register">Cadastre-se</a></p>
        </form>  
      <div/>
    <section/>
  `;

  //LOGIN COM E-MAIL E SENHA

  const loginButton = rootElement.querySelector('#login-btn');
  loginButton.addEventListener('click', (event) => {
    event.preventDefault();  
    const email = rootElement.querySelector('#registered-email').value
    const password = rootElement.querySelector('#registered-password').value
    login(email, password);
  });

    //AUTENTICAÇÃO COM GOOGLE

  const googleButton = rootElement.querySelector('#google-btn');
  googleButton.addEventListener('click', (event) => {
    event.preventDefault();  
    loginWithGoogle();
  });

  return rootElement;
};