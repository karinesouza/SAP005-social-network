export const Registro = () => {
    // Coloque sua página
    const rootElement = document.createElement('div');
    rootElement.innerHTML = `
        <div id="register-form">
            <form id="register">
                <h1 class="title">PetLovers</h1>
                <h2>Crie sua conta</h2>
                <input class="nome" type="name" placeholder="Digite o nome do seu pet" required>
                <input class="e-mail" type="e-mail" placeholder="Digite seu e-mail" required>
                <input class="password" type="password" placeholder="Digite uma senha" required>
                <div class= "btn-form">
                    <input type="button" id="btn-back" value="Voltar">
                    <input type="submit" id="btn-register">
                </div>
            </form>
        </div>
    `;
    return rootElement;
};
