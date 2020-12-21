let provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }); //abrir uma nova aba

firebase.auth().signInWithPopup(provider).then(function(result) { 
    // This gives you a Google Access Token. You can use it to access the Google API.
    // var token = result.credential.accessToken;
    // The signed-in user info.
    // var user = result.user;
    // ...
  })
  