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

// VALIDAR E-MAIL

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://rede-social-27bf8.firebaseapp.com/__/auth/action?mode=action&oobCode=code',
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios'
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12'
  },
  dynamicLinkDomain: 'example.page.link'
};

export const signInToEmail = (createEmail) => {
  firebase.auth().sendSignInLinkToEmail(createEmail, actionCodeSettings)
.then(function() {
  // The link was successfully sent. Inform the user.
  // Save the email locally so you don't need to ask the user for it again
  // if they open the link on the same device.
  window.localStorage.setItem('emailForSignIn', createEmail);
})
.catch(function(error) {
  // Some error occurred, you can inspect the code: error.code
});
}

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

  
