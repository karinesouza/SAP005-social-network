import { loginWithGoogle } from './pages/services/index.js';
//import { onNavigate } from './utils/history.js';


export const Login = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
    <div class="login-form" 
      <form id="login">
        <h1 class="title">PetLovers</h1>
        <h2>Acesse sua conta</h2>
        <label class="e-mail">E-mail</label> 
        <input id="e-mail" type="e-mail" placeholder="Digite o e-mail cadastrado" required>
        <label class="password">Senha</label>
        <input id="password" type="password" placeholder="Digite sua senha" required>
        <input type="button" id="btn-login" value="Entrar">
        <p class="login-google">Entre com sua conta google</p>
        <button class="google" id="btn-google"><img class="img-g"  src="../../img/google.jpeg" alt="logo-google"></button>
        <p>Não tem cadastro?<a href="/registro">Registre-se</a></p>
      </form>  
    </div>    
  `;

    //botão google

    const googleButton = rootElement.querySelector('#btn-google');
      googleButton.addEventListener('click', (event) => {
      event.preventDefault();  
      loginWithGoogle();
      console.log("funcionando")
     // onNavigate('/');
    });

  return rootElement;
};








































