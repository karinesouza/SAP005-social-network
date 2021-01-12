import { createPost } from '../../services/index.js';
import { onNavigate } from '../../utils/history.js';

export const publicar = () => {
      const rootElement = document.createElement('div');
      rootElement.innerHTML = `
        <header id="header">
          <h3>PetLovers</h3>
        </header> 
        <main>
          <section id="user-container">
            <h2 class="user-item" id="hello-user"> </h2>
          </section>
          <section class="page-section">
            <textarea id="publish-area" cols="50" rows="20" placeholder="O que deseja compartilhar hoje?"></textarea>
          </section>
          <section id="container-button">
            <button id="publish-btn">Publicar</button>
          </section>  
      `;
      
      const post = rootElement.querySelector('#publish-btn');
      const publication = rootElement.querySelector('#publish-area');
      const petName = rootElement.querySelector('#hello-user');

      firebase.auth().onAuthStateChanged((user) => {
        if (user != null) {
          petName.innerHTML = `Olá, ${user.displayName}!`;
        } else {
          alert("Usuário não logado!")
        }
      })
    
      post.addEventListener('click', () => {
        createPost(publication.value);
        onNavigate('/publicacoes');
      });
    
      return rootElement;

};
