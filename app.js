// const express=require("express");
// const app=express();
// const users=[
//  {id:1,nom:"lisangola",prenom:"Christian"},
//  {id:2,nom:"Kingombe",prenom:"Josephine"},
//  { id:3,nom:"Kongolo",prenom:"Camille" },
//  { id:4,nom:"Bitota",prenom:"Laurene" }
// ]


// app.get('/api/users',(req,res)=>{
//  return res.send(users);
// });
// app.get('/api/users/:id',(req,res)=>{
//   const { params:{ id } }=req;
//   const user=users.find(usr=>usr.id===id);
//   !user&&res.json("Not found").status(404);
//   res.send(user);
// })
// //Définition du port
// const PORT = (process.env.PORT || 5000);
// app.listen(PORT, () => {
//   console.log(`Le serveur écoute sur le port ${PORT}`);
// });


const express = require('express');
const crypto = require('crypto');
const cluster = require('cluster');
const app = express();
const os = require('os');

if(cluster.isMaster){//si c'est le premier processus crée les processus workers ou exclaves ou enfants 
    for(let i= 0; i < os.cpus().length; i++ ){
        cluster.fork();
    }
}else{

  app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.json({ message: 'Cryptage réussi' });
    });
  });
  app.get('/hello', (req, res) => {
    return res.send({ message: 'Salut à tous' });
  });
  app.listen(3009, () => console.log('Le serveur coute su le port 3008'));
}
