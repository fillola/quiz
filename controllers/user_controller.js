var user = {admin:{id:1, username="admin", password:"1234"},
            pepe:{id:2,  username="pepe",   password:"5678"}
           };

// GET /login - Formulario de login
exports.autenticar = function(login, password, callback) {
  if(users[login]){
     if(password ===users[login].password){
        callback(null, user[login]);
     } else {
        callback(new Error('Password err�neo.'));
     }
  } else {
    callback(new Error('No existe el usuario.'));
  }

};
