import { deletePost, getPosts, likePost, editPost, signOut } from "../../services/index.js";
import { onNavigate } from "../../utils/history.js";



export const publicacoes = () => {

    const addPost = (post) => {

        const postTemplate =
            `

            <section class="post-container" data-id=${post.id}>
                <div class="post-item">
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
                  <button class="btn-delete-post" data-id=${post.id}>Excluir</button>
              </div>     
            </section>
        `

        document.getElementById("text").innerHTML += postTemplate;


        document.querySelectorAll('.like-btn').forEach((event) =>
            event.addEventListener('click', (event) => {
                let LikeBtn = event.target.parentNode.querySelector('.like-btn')
                console.log(LikeBtn.dataset.id)
                likePost(LikeBtn.dataset.id)
                getPosts()
                onNavigate('/publicacoes');
            })

        );

        const showEdits = () => {
            const userPost = post.data().user_id
            const currentUser = firebase.auth().currentUser.uid
            document.querySelectorAll(".btn-delete-post").forEach((event) => {
                const btnDelete = event.parentNode.querySelector(".btn-delete-post")
                //const btnEdit = event.parentNode.querySelector(".btn-edit-post")
                if (userPost === currentUser) {
                    btnDelete.style.display = 'block';
                    //btnEdit.style.display = 'block';
                }
            })
        }

        showEdits()

        // document.querySelectorAll('.btn-edit-post').forEach((event) =>
        //     event.addEventListener('click', (event) => {
        //         const btnEdit = event.target.parentNode.querySelector(".btn-edit-post")
        //         document.querySelectorAll(".text-post").forEach((e) => {
        //             const textArea = e.parentNode.querySelector(".text-post")
        //             editPost(textArea.value, btnEdit.dataset.id)
        //             console.log(textArea.value, btnEdit.dataset.id)
        //         })
        //     })
        // );

        document.querySelectorAll('.btn-delete-post').forEach((event) =>
            event.addEventListener('click', (event) => {
                const btnDelete = event.target.parentNode.querySelector('.btn-delete-post')
                if (confirm("Tem certeza que deseja excluir a publicação?")) {
                    deletePost(btnDelete.dataset.id)
                    getPosts()
                    onNavigate('/publicacoes');
                }
            })
        )
    }


    getPosts().then(snap => {
        snap.forEach(post => {
            addPost(post)
        });
    })







    // document.querySelectorAll('.edit-post-btn').forEach((event) =>
    //     event.addEventListener('click', (event) => {
    //         const btnEdit = event.target.parentNode.querySelector(".edit-post-btn")
    //         document.querySelectorAll(".text-post").forEach((event) => {
    //             const textArea = event.parentNode.querySelector(".text-post")
    //             editPost(textArea.value, btnEdit.dataset.id)
    //             console.log(textArea.value, btnEdit.dataset.id)
    //         })
    //     })
    // )

    const editBtn = document.querySelectorAll('.edit-post-btn');
    editBtn.forEach((editButton) => {
      editButton.addEventListener('click', (event) => {
        showEditBox(event);
      });
    });
  
    const showEditBox = (event) => {
      const cardPost = event.target.parentNode;
      toggleEditBox(cardPost, true);
  
      const saveEdit = cardPost.querySelector('.save-edit-btn');
      saveEdit.addEventListener('click', () => {
        sendEdit(cardPost);
      });
    }
  
    const sendEdit = (cardPost) => {
      const editTextArea = cardPost.querySelector('.edit-area');
      const holderEditBlock = cardPost.querySelector('.edit');
    
      editPost(editTextArea.value)
        .then(() => {
          const editValue = document.createElement("p");
          editValue.textContent = editTextArea.value;
          cardPost.insertBefore(editValue, holderEditBlock);
          toggleEditBox(cardPost, false);
          editTextArea.value = "";
        })
        .catch(() => {
          alert('Deu ruim aí');
        })
    }
  
    const toggleEditBox = (cardPost, showEdit) => {
      const holderEditBlock = cardPost.querySelector('.edit');
  
      if(showEdit) {
        holderEditBlock.classList.add('display');
      } else {
        holderEditBlock.classList.remove('display');
      }
    }





    const rootElement = document.createElement('div');
    rootElement.innerHTML = `
    <header id="header">
        <section id="option-container">
            <h3 ><a href="publicar" class="option-item" id="posts-view">Publicar</a></h3>
        </section>
        <button id="sign-out-btn">Sair</button>
    </header> 
    <main>
        <section id="user-container">
            <h2 class="user-item" id="hello-user"> </h2>
        </section>
        <section id=recent-container>
            <h4>Publicações</h4>
        </section>
        <section>
            <div id=text></div>
        </section>
        
    </main>
      
    `;

    const userName = rootElement.querySelector('#hello-user')

    firebase.auth().onAuthStateChanged((user) => {
        if (user != null) {
            userName.innerHTML = `Olá, ${user.displayName}!`;
        } else {
            alert("Usuário não logado!")
        }
    })

    // LOGOUT

    const signOutBtn = rootElement.querySelector('#sign-out-btn');
    signOutBtn.addEventListener('click', (event) => {
        event.preventDefault();
        signOut();
    });

    return rootElement;
};



























