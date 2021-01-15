import {
  createPost,
  getPosts,
  deletePost,
  likePost,
  editPost,
  signOut,
  postPhoto
} from "../../services/index.js";

import { onNavigate } from '../../utils/history.js';

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
  postTemplate.innerHTML =
    `

            <section class="post-container" data-id=${post.id}>
                <div class="post-item">
                    <p>${post.data().name}</p>
                </div>
                <section id="container-date">
                  <p id="text-date">${post.data().date} </p>
                </section> 
                <div id="text-container">
                  <p class="text-post" ${post.id}>${post.data().text}</p> 
                </div>
              <section id="container-edit"> 
              <div class="item-edit">
                <img src="../../img/patinha.jpg" alt="like" class="like-btn" data-id=${post.id}>
                <p id="number-of-likes" class="number-of-likes" data-id=${post.id}>${post.data().likes}</p>
              </div>
              </section>
              <div class="item-edit">
                <img src="../../img/editar.png" class="edit-post-btn" data-id=${post.id}>
              </div>    
              <div>
                <img src="../../img/lixeira.png" class="delete-post-btn" data-id=${post.id}>
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

  // não funciona

  // const showEdits = () => {
  //   const userPost = post.data().user_id
  //   const currentUser = firebase.auth().currentUser.uid
  //   document.querySelectorAll(".delete-post-btn").forEach((event) => {
  //     const deleteBtn = event.parentNode.querySelector(".delete-post-btn")
  //     //const editBtn = event.parentNode.querySelector(".edit-post-btn")
  //     if (userPost === currentUser) {
  //       deleteBtn.style.display = 'block';
  //       //editBtn.style.display = 'block';
  //     }
  //   })
  // }

  // showEdits()

  //EDITAR PUBLICAÇÃO

  document.querySelectorAll('.edit-post-btn').forEach((event) =>
    event.addEventListener('click', (event) => {
      const editBtn = event.target.parentNode.querySelector(".edit-post-btn")
      document.querySelectorAll(".text-post").forEach((e) => {
        const textArea = e.parentNode.querySelector(".text-post")
        editPost(textArea.value, editBtn.dataset.id)
        console.log(textArea.value, editBtn.dataset.id)
      })
    })
  );


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

  // const editBtn = document.querySelectorAll('.edit-post-btn');
  // editBtn.forEach((editButton) => {
  //   editButton.addEventListener('click', (event) => {
  //     showEditBox(event);
  //   });
  // });

  // const showEditBox = (event) => {
  //   const cardPost = event.target.parentNode;
  //   toggleEditBox(cardPost, true);

  //   const saveEdit = cardPost.querySelector('.save-edit-btn');
  //   saveEdit.addEventListener('click', () => {
  //     sendEdit(cardPost);
  //   });
  // }

  // const sendEdit = (cardPost) => {
  //   const editTextArea = cardPost.querySelector('.edit-area');
  //   const holderEditBlock = cardPost.querySelector('.edit');

  //   editPost(editTextArea.value)
  //     .then(() => {
  //       const editValue = document.createElement("p");
  //       editValue.textContent = editTextArea.value;
  //       cardPost.insertBefore(editValue, holderEditBlock);
  //       toggleEditBox(cardPost, false);
  //       editTextArea.value = "";
  //     })
  //     .catch(() => {
  //       alert('Deu ruim aí');
  //     })
  // }

  // const toggleEditBox = (cardPost, showEdit) => {
  //   const holderEditBlock = cardPost.querySelector('.edit');

  //   if (showEdit) {
  //     holderEditBlock.classList.add('display');
  //   } else {
  //     holderEditBlock.classList.remove('display');
  //   }
  // }

  const btnPhoto = document.querySelector('#enviar-img');
  btnPhoto.addEventListener('click', (event) => {
    event.preventDefault();
    postPhoto();
  });

  return postTemplate;

};