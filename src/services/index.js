// CRIAR CADASTRO 

export const createAccount = (createEmail, createPassword, name) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(createEmail, createPassword)
    .then(cred => {
      cred.user.updateProfile({ displayName: name })
      window.location.pathname = '/login';
      alert("Cadastro criado com sucesso!");
    })
    .catch(() => {
      if ("auth/invalid-email") {
        alert("E-mail já cadastrado")
      }
    });
};

// LOGIN 

export const login = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.pathname = '/';
    })
    .catch(() => {
      alert("E-mail ou senha incorreta");
    });
};

// AUTENTICAÇÃO COM GOOGLE

export const loginWithGoogle = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  firebase.auth().signInWithPopup(provider);
};

// CRIAR PUBLICAÇÃO

export const getPosts = (divText, addPost) => {
  const post = firebase
    .firestore()
    .collection('publications')
    .orderBy("date", "desc")
   post.onSnapshot(snap => {
    snap.forEach(post => {
      divText.appendChild(addPost(post))
    }); 
  })
};

export const createPost = (post) => {
  const user = firebase.auth().currentUser;
  const date = new Date();
  firebase
    .firestore()
    .collection("publications")
    .add({
      name: user.displayName,
      user_id: user.uid,
      text: post,
      date: date.toLocaleString("pt-br"),
      likes: 0,
      user_like: [],
    })
    .then(() => {
      
    })
    .catch(() => {
      alert("Ops! Ocorreu um erro. Tente novamente mais tarde.");
    });
};

// CURTIR PUBLICAÇÃO

export const likePost = (id, post) => {
  console.log(post)
  const userFound = post.user_like.find(user => user === firebase.auth().currentUser.uid)
  const postLike = firebase.firestore().collection("publications").doc(id);

  if (!userFound) {
    postLike.update({
      likes: firebase.firestore.FieldValue.increment(1),
      user_like: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)
    })
  } else {
    postLike.update({
      likes: post.likes - 1,
      user_like: post.user_like.map(user => user !== firebase.auth().currentUser.uid)
    })
  }
}

// DELETAR PUBLICAÇÃO

export const deletePost = (id) => {
  let deletePubli = firebase.firestore().collection("publications").doc(id);
  deletePubli.delete()
}


// EDITAR PUBLICAÇÃO

export const editPost = (text, id) => {
  let editText = 
  firebase
    .firestore()
    .collection("publications")
    .doc(id)
    .update({
      text: text,
    });
}


// SAIR

export const signOut = () => {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut()
      .then(() => {
        window.location.href = '/login';
      }).catch(() => {
        growl({ text: 'Falha ao desconectar. Tente novamente', type: 'error', fadeAway: true, fadeAwayTimeout: 3000 });
      });
  }
};



export const postPhoto = () =>{
  const user = firebase.auth().currentUser;
  let fileUpload = document.querySelectorAll('.carregar-img')[0].files[0];
  let storageRef = firebase.storage().ref('/photos/' + user.uid + '/' + fileUpload.name);
  storageRef.put(fileUpload);
  
    // DATABASE
    storageRef.getDownloadURL()
      .then(function(url) {
        let img = document.querySelector('#photo-storage');
        img.src = url;
        location.reload();
  
        let newURL = url;
        let photoFromDB = addPhotoToDB(newURL);

        function addPhotoToDB(url) {
          const date = new Date();
          firebase
            .firestore()
            .collection("publications")
            .add({
              text: "imagem",
              name: user.displayName,
              user_id: user.uid,
              img: url,
              date: date.toLocaleString("pt-br"),
              likes: 0,
              user_like: [],
            })
            .then(() => {
              
            })
            .catch(() => {
              alert("Ops! Ocorreu um erro. Tente novamente mais tarde.");
            });
        };
      
      });
};


 
