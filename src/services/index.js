// CADASTRO DE NOVOS USUÁRIOS - Larissa

export const createAccount = (createEmail, createPassword) => {
  // const createEmail = document.getElementById("e-mail").value;
  // const createPassword = document.getElementById("password").value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(createEmail, createPassword)
    .then(() => {
      alert("Cadastro criado com sucesso!");
    })
    .catch(() => {
      alert("E-mail já cadastrado");
    });
};

// LOGIN DE USUÁRIOS EXISTENTES - Karine

export const login = (email, password) => {
  // const email = document.querySelector("#e-mail").value;
  // const password = document.querySelector("#password").value;
  // const btnLogin = document.getElementsById("btn-login");

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = '/#';
    })
    .catch(() => {
      alert("E-mail ou senha incorreta");
    });
};

// AUTENTICAÇÃO COM GOOGLE - Karina

export const loginWithGoogle = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' }); 
  firebase.auth().signInWithPopup(provider);
};


