// CADASTRO DE NOVOS USUÁRIOS 

export const createAccount = (createEmail, createPassword, name) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(createEmail, createPassword)
    .then(cred => {
      cred.user.updateProfile({ displayName: name })
      window.location.href = '/login';
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

// FUNÇÃO DE EXCLUIR A PUBLICAÇÃO

export const deletePublication = () => {
  let deletePubli = firebase.firestore().collection("publications").doc();
  deletePubli.delete()
};

// FUNÇÃO DE LIKE

export const likePublication = () => {
  let likePubli = firebase.firestore().collection("publications").doc();
  likePubli.update({
    likes: firebase.firestore.FieldValue.increment(1)
  })

};

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

// export const createPost = (post) => {
//   const user = firebase.auth().currentUser;
//   const date = new Date();
//   firebase
//     .firestore()
//     .collection("publications")
//     .add({
//       name: user.displayName,
//       user_id: user.uid,
//       text: post,
//       date: date.toLocaleString(),
//       time: date.getTime(),
//       likes: 0,
//       user_like: [],
//       comentarios: [],
      
//     })
//     .then(function() {
//       console.log("Post enviado com sucesso!");
//     })
//     .catch(function() {
//       console.error("Ocorreu um erro");
//     });
// };


// EDITAR POST

export const editPost = (edit) => {
  console.log(edit);
  return editCollection.add({
    liked: true,
  })
  .then(() => {
    return true
  })
  .catch((error) => { 
    return error;
  })
}