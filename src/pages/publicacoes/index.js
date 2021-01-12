import { deletePost, getPosts, likePost, editPost } from "../../services/index.js";
import { onNavigate } from "../../utils/history.js";



export const publicacoes = () => {

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

       
        document.querySelectorAll('.btn-like').forEach((event) =>
        event.addEventListener('click', (event) => {
            let btnLike = event.target.parentNode.querySelector('.btn-like')
            console.log(btnLike.dataset.id)
            likePost(btnLike.dataset.id)
            getPosts()
            onNavigate('/publicacoes');
        })

        );

        const showEdits = () => {
            const userPost = post.data().user_id
            const currentUser = firebase.auth().currentUser.uid
            document.querySelectorAll(".btn-delete-post").forEach((event) => {
                const btnDelete = event.parentNode.querySelector(".btn-delete-post")
                const btnEdit = event.parentNode.querySelector(".btn-edit-post")
                if (userPost === currentUser) {
                    btnDelete.style.display = 'block';
                    btnEdit.style.display = 'block';
                }
            })
        }

        showEdits()

        document.querySelectorAll('.btn-edit-post').forEach((event) =>
            event.addEventListener('click', (event) => {
                const btnEdit = event.target.parentNode.querySelector(".btn-edit-post")
                document.querySelectorAll(".text-post").forEach((e) => {
                    const textArea = e.parentNode.querySelector(".text-post")
                    editPost(textArea.value, btnEdit.dataset.id)
                    console.log(textArea.value, btnEdit.dataset.id)
                })
            })
        );

        document.querySelectorAll('.btn-delete-post').forEach((event) =>
            event.addEventListener('click', (event) => {
                const btnDelete = event.target.parentNode.querySelector('.btn-delete-post')
                if(confirm("Tem certeza que deseja deletar a publicação?")){
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







    // document.querySelectorAll('.edit-post').forEach((event) =>
    //     event.addEventListener('click', (event) => {
    //         const btnEdit = event.target.parentNode.querySelector(".edit-post")
    //         document.querySelectorAll(".text-post").forEach((event) => {
    //             const textArea = event.parentNode.querySelector(".text-post")
    //             editPost(textArea.value, btnEdit.dataset.id)
    //             console.log(textArea.value, btnEdit.dataset.id)
    //         })
    //     })
    // )





    // Coloque sua página


    const rootElement = document.createElement('div');
    rootElement.innerHTML = `
    <header id="header">
        <img id="logo" src="../../img/Logo/logo-temporario-red.png" alt="Logo do Site">
        <section id="option-container">
            <h3 ><a href="publicar" class="option-item" id="posts-view">Publicar</a></h3>
            <h3 ><a href="publicacoes" class="option-item" id="posts-view">Publicações</a></h3>
        </section>
        <input id="exit" type="image" src="../../img/Logout/logout-red.png" alt="Logout" />
    </header> 
    <main>
        <section id="user-container">
            <img src="../../img/user.png" alt="Logo do Site">
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

    return rootElement;
};