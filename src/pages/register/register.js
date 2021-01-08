import { createAccount } from '../../services/index.js';

export const Registro = () => {
    const rootElement = document.createElement('div');
    rootElement.innerHTML = `
        <div id="register-form">
            <form id="register">
                <h1 class="title">PetLovers</h1>
                <h2>Crie uma conta</h2>
                <input id="name" type="name" placeholder="Nome do seu pet" required>
                <input id="e-mail" type="e-mail" placeholder="E-mail" required>
                <input id="password" type="password" placeholder="Crie uma senha (No mínimo 6 caracteres)" required>
                <button id="back-btn">Voltar</button>
                <button id="register-btn">Concluir cadastro</button>
            </form>
        </div>
    `;

    // VOLTAR PARA A PÁGINA DE LOGIN

    const backButton = rootElement.querySelector('#back-btn');
    backButton.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = '/login';
    });

    // CADASTRAR-SE

    const registerButton = rootElement.querySelector('#register-btn');
    registerButton.addEventListener('click', (event) => {
        event.preventDefault();
        const petName = rootElement.querySelector('#name').value
        const createEmail = rootElement.querySelector('#e-mail').value
        const createPassword = rootElement.querySelector('#password').value
        createAccount (createEmail, createPassword, petName);
    });

    return rootElement;
};

