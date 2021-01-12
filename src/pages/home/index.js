import {
  createPost,
  getPosts,
  deletePost,
  likePost,
  editPost,
  signOut
} from "../../services/index.js";

export const Home = () => {
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
        <textarea id="publish-area" cols="50" rows="10" placeholder="O que deseja compartilhar hoje?"></textarea>
      </section>
      <section id="container-button">
        <button id="publish-btn">Publicar</button>
      </section>  
    </main>

    <main>
        <section id="user-container">
          <h2 class="user-item" id="hello-user"> </h2>
        </section>
        <section id=recent-container>
          <button id="sign-out-btn">Sair</button>
          <h4>Publicações</h4>
        </section>
        <section>
          <div id=text></div>
        </section>
    </main>

  `;

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      petName.innerHTML = `Olá, ${user.displayName}!`;
    } else {
      alert("Usuário não logado!")
    }
  })

  const divText = rootElement.querySelector('#text');
  const publish = rootElement.querySelector('#publish-btn');
  const publication = rootElement.querySelector('#publish-area');
  const petName = rootElement.querySelector('#hello-user');

  publish.addEventListener('click', () => {
    createPost(publication.value);
  });

  getPosts().then(snap => {
    snap.forEach(post => {
      console.log(post);
      divText.appendChild(addPost(post))
    });
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
                    <img src="../../img/user.png">
                    <p>${post.data().name}</p>
                </div>
                <section id="container-date">
                  <p id="text-date">${post.data().date} </p>
                </section> 
                <div id="text-container">
                    <textarea class="text-post" ${post.id}>${post.data().text}</textarea> 
                </div>
            </section>
            <section id="container-edit"> 
              <div class="item-edit">
                <img src="../../img/patinha.jpg" alt="like" class="like-btn" data-id=${post.id}>
                <p id="number-of-likes" class= "number-of-likes" data-id=${post.id}>${post.data().likes}</p>
              </div>
              <div class="item-edit">
                  <button class="edit-post-btn" data-id=${post.id}>Editar</button>
                  <div class="edit">
          <hr>
          <textarea class="edit-area"></textarea>
          <button class="save-edit-btn">Salvar</button>
        </div>
                  <button class="delete-post-btn" data-id=${post.id}>Excluir</button>
              </div>     
            </section>
        `




  // CURTIR PUBLICAÇÃO

  document.querySelectorAll('.like-btn').forEach((event) =>
    event.addEventListener('click', (event) => {
      let likeBtn = event.target.parentNode.querySelector('.like-btn')
      likePost(likeBtn.dataset.id)
    })

  );

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
      }
    })
  )


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

  return postTemplate;

};




