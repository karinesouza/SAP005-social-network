import { createPost, getPosts, likePost  } from "../../services/index.js";

export const Home = () => {
  // Coloque sua página
      const rootElement = document.createElement('div');
      rootElement.innerHTML = `
        <header id="header">
          <img id="logo" src="../../img/Logo/logo-temporario-red.png" alt="Logo do Site">
          <section id="option-container">
            <h3 ><a href="#" class="option-item">Publicar</a></h3>
            <h3 ><a href="#" class="option-item">Publicações</a></h3>
          </section>
          <input id="exit" type="image" src="../../img/Logout/logout-red.png" alt="Logout" />
        </header> 
        <main>
          <section id="user-container">
            <img src="../../img/user.png" alt="Logo do Site" class="user-item">
            <h2 class="user-item" id="hello-user"> </h2>
          </section>
          <section class="page-section">
            <h4 class="title" for="title">Publicar</h4>
            <textarea id="post-user" cols="50" rows="20" placeholder="Escreva aqui..."></textarea>
          </section>
          <section id="container-button">
            <button id="postar">Enviar</button>
          </section>  
      `;
      
      const post = rootElement.querySelector('#postar');
      const mensagem = rootElement.querySelector('#post-user');
      const userName = rootElement.querySelector('#hello-user');

      firebase.auth().onAuthStateChanged((user) => {
        if (user != null) {
          userName.innerHTML = `Olá, ${user.displayName}!`;
        } else {
          alert("Usuário não logado!")
        }
      })
    
      post.addEventListener('click', () => {
        createPost(mensagem.value);
      });

      const addPost = (post) => {

        const postTemplate =
            `
            <section class="post-container" data-id=${post.id}>
                <div class="post-item">
                    <img src="../../img/user.png">
                    <p>${post.data().name}</p>
                </div>
                <div id="text-container">
                    <textarea class="text-post" ${post.id}>${post.data().text}</textarea> 
                </div>
            </section>
            <section id="container-date">
                <p id="text-date">${post.data().date} </p>
            </section> 
            <section id="container-edit"> 
              <div class="item-edit">
                <img src="../../img/Like/like-red.png" alt="like" class="btn-like" data-id=${post.id}>
                <p id="number-of-likes" class= "number-of-likes" data-id=${post.id}>${post.data().likes}</p>
              </div>
              <div class="item-edit">
                  <img src="../../img/Edit/edit-red.png" class="btn-edit-post" data-id=${post.id}>
                  <img src="../../img/Trash/trash-red.png" class="btn-delete-post" data-id=${post.id}>
              </div>     
            </section>
        `

        document.getElementById("text").innerHTML += postTemplate;

        getPosts().then(snap => {
          snap.forEach(post => {
              addPost(post)
          });
      })
  

      return rootElement;

      }};