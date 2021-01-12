// CADASTRO DE NOVOS USUÁRIOS 

export const createAccount = (createEmail, createPassword, name) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(createEmail, createPassword)
    .then(cred => {
      cred.user.updateProfile({ displayName: name })
      //window.location.pathname = '/login';
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
    .then(user => {
      alert(`Oi, ${user.displayName}!`)
      //window.location.pathname = '/home';
    })

    .catch(() => {
      alert("E-mail ou senha incorreta");
    });
};

// OUTRA MANEIRA DE LOGAR E SER DIRECIONADO PRA HOME

// export const login = (email, password) => {
//   if (firebase.auth()) {
//     firebase.auth().currentUser()
//       .then(() => {
//         firebase
//           .auth()
//           .signInWithEmailAndPassword(email, password)
//           .then(() => {
//             window.location.href = '/';
//           })

//           .catch(() => {
//             alert("E-mail ou senha incorreta");
//           });
//       })
//   }
// };

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
    .then(function () {
      console.log("Post enviado com sucesso!");
    })
    .catch(function () {
      console.error("Ocorreu um erro");
    });
};


export const likePost = (id) => {
  const postLike = firebase.firestore().collection("publications").doc(id);
  postLike.update({
    likes: firebase.firestore.FieldValue.increment(1),
  })

}

export const editPost = (text, id) => {
  firebase
    .firestore()
    .collection("publications")
    .doc(id)
    .update({
      text: text,
    });
}


export const deletePost = (id) => {
  let postDelete = firebase.firestore().collection("publications").doc(id);
  postDelete.delete()
}

// FUNÇÃO LOGOUT

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