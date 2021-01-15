import {
  createPost,
  getPosts,
  deletePost,
  likePost,
  editPost,
  signOut,
  postPhoto
} from "../../services/index.js";

import {
  onNavigate
} from '../../utils/history.js';

export const Home = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
    <header id="header">
      <section id="topo">
        <div class="item-topo">
        <h2 class="title">PetLovers</h2>
        </div>
        <div class="item-topo">
          <img src="../../img/sair.png" id="sign-out-btn">
        </div>
      </section>
    </header> 
    <main class="home">
      <div class= "main-publications">
        <section id="user-container">
          <h3 class="user-item" id="hi-pet"></h3>
        </section>
        <section class="page-section">
          <textarea id="publish-area" cols="50" rows="10" placeholder="O que deseja compartilhar hoje?"></textarea>
        </section>
        <section class="page-section">
          <input class="carregar-img" type="file" accept="image/*">
          <input id= "enviar-img" type = "submit">
        </section>
        <section id="container-button">
          <button id="publish-btn">Publicar</button>
        </section>  
        <section id="publications-area">
          <h3>Publicações</h3>
        </section>
        <section>
          <div id="feed"></div>
        </section>    
      <div/>  
    </main>
  `;


  const divText = rootElement.querySelector('#feed');
  const publish = rootElement.querySelector('#publish-btn');
  const publication = rootElement.querySelector('#publish-area');
  const petName = rootElement.querySelector('#hi-pet');

  publish.addEventListener('click', () => {
    createPost(publication.value);
  });

  getPosts(divText, addPost)

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      petName.innerHTML = `Oi, ${user.displayName}!`;
    }
  })

  // SAIR

  const signOutBtn = rootElement.querySelector('#sign-out-btn');
  signOutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    signOut();
  });

  return rootElement;

};

const addPost = (post) => {

  const postTemplate = document.createElement('div');
  postTemplate.innerHTML = `
    <section class="post-container" data-id=${post.id}>
      <div class="post-item">
        <p>${post.data().name}</p>
        <img src="../../img/pontos.jpeg" class="points-btn">
      </div>
      <section id="container-date">
        <p id="text-date">${post.data().date} </p>
      </section> 
      <div id="text-container">
        <p class="text-post" ${post.id}>${post.data().text}</p> 
      </div>
      <section id="container-edit"> 
        <div class="item-like">
          <img src="../../img/patinha.jpg" alt="like" class="like-btn" data-id=${post.id}>
          <p id="number-of-likes" class="number-of-likes" data-id=${post.id}>${post.data().likes}</p>
        </div>
      </section>
      <div class="item-edit">
        <img src="../../img/editar.jpeg" class="edit-post-btn" data-id=${post.id}>
        <img src="../../img/lixeira.jpeg" class="delete-post-btn" data-id=${post.id}>
      </div> 
      <div class="editing-area">
        <textarea class="edit-area">${post.data().text}</textarea>
        <img src="../../img/salvar.jpeg" class="save-edit-btn">
        <img src="../../img/cancel.jpeg" class="cancel-btn">
      </div>   
    </section>
  `
  const photoTemplate = document.createElement('div');
  photoTemplate.innerHTML = `
    <section class="post-container" data-id=${post.id}>
      <div class="post-item">
        <img id="photo-storage" src="" alt="">
      </div>
    </section>
  `
  // CURTIR PUBLICAÇÃO

  const like = postTemplate.querySelector('.like-btn');
  like.addEventListener('click', () => {
    likePost(post.id, post.data())
  })

  //EDITAR PUBLICAÇÃO

  const editPoints = postTemplate.querySelectorAll('.points-btn');
  editPoints.forEach((event) =>
    event.addEventListener('click', () => {
      postTemplate.querySelector('.item-edit').classList.add('display');
    })
  );

  const editBtn = postTemplate.querySelectorAll('.edit-post-btn');
  editBtn.forEach((event) =>
    event.addEventListener('click', () => {
      postTemplate.querySelector('.editing-area').classList.add('display');
    })
  );

  const saveEditBtn = postTemplate.querySelector('.save-edit-btn');
  const editText = postTemplate.querySelector('.edit-area');
    saveEditBtn.addEventListener('click', () => {
      editPost(editText.value, post.id)
    });

  const cancelBtn = postTemplate.querySelector('.cancel-btn');
  cancelBtn.addEventListener('click', () => {
    postTemplate.querySelector('.editing-area').classList.remove('display');
  });


  // EXCLUIR PUBLICAÇÃO

  document.querySelectorAll('.delete-post-btn').forEach((event) =>
    event.addEventListener('click', (event) => {
      const deleteBtn = event.target.parentNode.querySelector('.delete-post-btn')
      if (confirm("Tem certeza que deseja excluir essa publicação?")) {
        deletePost(deleteBtn.dataset.id)
        getPosts()
        onNavigate('/');
      }
    })
  )

  // EDITAR PUBLICAÇÃO

  const btnPhoto = document.querySelector('#enviar-img');
  btnPhoto.addEventListener('click', (event) => {
    event.preventDefault();
    postPhoto();
  });

  return postTemplate;

};