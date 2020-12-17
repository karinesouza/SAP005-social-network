export const Login = () => {
  // Coloque sua página
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
    <div class="login-form" 
      <form id="login">
        <h1 class="title">PetLovers</h1>
        <h2>Acesse sua conta</h2>
        <label class="e-mail">E-mail</label> 
        <input class="e-mail" type="e-mail" placeholder="Digite o e-mail cadastrado" required>
        <label class="password">Senha</label>
        <input class="password" type="password" placeholder="Digite sua senha" required>
        <input type="button" id="btn-login" value="Entrar">
        <p>Não tem cadastro? <a class="items" href="#register-form" id="btn-log"> Cadastre-se</a>
      </form>
    </div> 
  `;
  return rootElement;
};




































