import { routeRender } from '../../router.js'
import { /*deletePublication,*/ signOut } from "../../services/index.js";

export const Home = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
     <h1>Feed</h1>
     <textarea id="publication"></textarea>
     <button class="publish-button" id="publish-btn">Postar</button>
     <div id="feed"></div>
     <button id='sign-out-btn' class='menu-hamburger-btn-style'>Sair</button>
  `;

  const publish = rootElement.querySelector("#publication");
  const publishButton = rootElement.querySelector("#publish-btn");
  const postsArea = rootElement.querySelector("#feed");

  publishButton.addEventListener('click', createPublication)

  function createPublication() {
    const posts = {
      post: publish.value,
      uid: firebase.auth().currentUser.uid,
      date: new Date(),
      likes: 0
    }
    firebase.firestore().collection("publications").add(posts).then(() => {
      postsArea.innerHTML = publish.value;
    })
    routeRender()
  }

  function showPublication(data) {
    const templatePosts = `
           <div>
           <p>${data.post}</p>
           <button id="edit-btn">Editar</button>
           <button class="delete-btn">Excluir</button>           
           </div>
          `

    postsArea.innerHTML += templatePosts
  }



  // DELETAR PUBLICAÇÃO

  // document.querySelector('.delete-btn').forEach((event) =>
  //   event.addEventListener('click', (event) => {
  //     let deletePost = event.target.parentNode.querySelector('.delete-btn')
  //     console.log(deletePost.dataset.id)
  //     deletePublication(deletePost.dataset.id)
  //     getPosts()
  //   })

  // );


  function publishedPosts() {

    firebase.firestore().collection("publications").orderBy("date", "desc").onSnapshot((snapshot) => { //onSnapshot = atualizar o documento
      snapshot.docChanges().forEach((posts) => { // forEach = repete as propriedades de um objeto (post)
        if (posts.type === "added") {
          showPublication(posts.doc.data(), posts.doc.id)
        }
      })
    })
  }

  publishedPosts()


  //  function mostrarPost (data) {
  //    let showPosts = ""
  //   data.forEach(doc => {
  //      const dados = doc.data()
  //      let templatePosts = ""
  //      if (data.uid === firebase.auth().currentUser.uid){
  //        templatePosts = `
  //        <div>
  //        <p>${dados.post}</p>
  //        <button>Editar</button>
  //        <button>Excluir</button>
  //        </div>
  //        `
  //      } else {
  //        templatePosts = `
  //        <div>
  //        <p>${dados.post}</p>
  //        </div>
  //        `
  //      }
  //     showPosts += templatePosts
  //    })
  //  }


  //  function postsPublicados () {
  //    firebase.firestore().collection("publicações").get().then((snapshot) => {
  //      const trazerPosts = mostrarPost(snapshot.doc);
  //      postsArea.innerHTML = trazerPosts
  //    })
  //  }

  //  postsPublicados()


  // LOGOUT

  const signOutBtn = rootElement.querySelector('#sign-out-btn');
  signOutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    signOut();
  });


  return rootElement;
};
