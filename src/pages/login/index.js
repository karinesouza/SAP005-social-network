export const Login = () => {
  // Coloque sua página
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
    <div class="form-login" 
     <h1 class="title">PetLovers</h1>
      <form id="login">
        <h2>Acesse sua conta</h2>
        <label class="e-mail">E-mail</label> 
        <input class="e-mail" type="e-mail" placeholder="Digite o e-mail cadastrado" required>
        <label class="senha">Senha</label>
        <input class="senha" type="password" placeholder="Digite sua senha" required>
        <input type="button" id="buttonlogin" value="Entrar">
        <p>Não tem cadastro? <a href="">Registre-se</a></p>
      </form>
    </div> 
  `;
  return rootElement;
};
































