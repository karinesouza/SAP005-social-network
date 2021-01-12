// CADASTRO DE NOVOS USUÁRIOS 

export const createAccount = (createEmail, createPassword, petName) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(createEmail, createPassword)
    .then(cred => {
      cred.user.updateProfile({displayName: petName})
      window.location.href = '/login';
      alert("Cadastro criado com sucesso!");
    })
    .catch(() => {
      if ("auth/invalid-email"){
        alert("E-mail já cadastrado")
      }
    });
};

// LOGIN 

export const login = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log("funcionando", user)
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

// CRIAR POST

export const getPosts = () => {
  const post = firebase
    .firestore()
    .collection('publications')
    .orderBy("date", "desc")
    return post.get()
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
      date: date.toLocaleString(),
      time: date.getTime(),
      likes: 0,
      user_like: [],
      comentarios: [],
      
    })
    .then(function() {
      console.log("Post enviado com sucesso!");
    })
    .catch(function() {
      console.error("Ocorreu um erro");
    });
};


export const likePost = (id) => {
  const postLike = firebase.firestore().collection("publications").doc(id);
  postLike.update({
    likes: firebase.firestore.FieldValue.increment(1),
  })
 
}

export const editPost = (text, id) => firebase
  .firestore()
  .collection("publications")
  .doc(id)
  .update({
    text: text,
  });


export const deletePost = (id) => {
  let postDelete = firebase.firestore().collection("publications").doc(id);
  postDelete.delete()
}