export const Registro = () => {
    const rootElement = document.createElement('div');
    rootElement.innerHTML = `
        <div id="register-form">
            <form id="register">
                <h1 class="title">PetLovers</h1>
                <h2>Crie uma conta</h2>
                <input class="nome" type="name" placeholder="Nome do seu pet" required>
                <input id="e-mail" type="e-mail" placeholder="E-mail" required>
                <input id="password" type="password" placeholder="Crie uma senha" required>
                <button id="btn-back">Voltar</button>
                <button id="btn-submit">Enviar</button>
            </form>
        </div>
    `;
        
        //botão de voltar

        const backButton = rootElement.querySelector('#btn-back');
            backButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = '/#';
        });

    return rootElement;
};

