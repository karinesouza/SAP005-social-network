// // exporte suas funções

// export const myFunction = () => {
//   // seu código aqui
//   console.log('Olá mundo!');
// };


// LOGIN DE NOVOS USUÁRIOS
const email = "teste@teste.com" //pegar do input email
const password = "banana"       //pegar do input senha

firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => console.log("deu certo")) 
  .catch((error) => {
    // Signed in
  
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log("deu ruim")
    // ..
  });

  // LOGIN DE USUÁRIOS EXISTENTES

firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    // Signed in
    // ...
  })
  .catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
  });

  // AUTENTICAÇÃO COM GOOGLE

let provider = new firebase.auth.GoogleAuthProvider();  
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
