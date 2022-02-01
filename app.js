const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const bcrypt =require('bcrypt'); 
const mongoose =require('mongoose')
const user = require('./public/user');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

const mongo_uri = 'mongodb://dev:dev@localhost/todos';

mongoose.connect(mongo_uri,function(err){
    if(err)
    {throw err;
    }else{
        console.log(`conectado con ${mongo_uri}`);
    }
})

app.post('/register',(req,res)=>{
    const {username, password,nombre,email} = req.body;

    const user=new user({username, password,nombre,email})

    user.save(err =>{
        if (err) {
            res.status(500).send('error al registrar al usuario');
        }else{
            res.status(200).send('usuario registrado con exito');
        }
    })
});

app.post('/authenticate', (req,res)=>{  
    const{username,password}=req.body;
    user.findOne({username},(err,user)=>{
        if(err){
            res.status(500).send('error al validar el usuario');
        }else if(!user){
            res.status(500).send('el usuario no existe');
        }else{
            user.isCorrectPassword(password,(err,result)=>{
                if(err){
                    res.status(500).send('error al validar el password');
                }else if(result){
                    res.status(200).send('usuario autenticado');
                }else{
                    res.status(500).send('usuario o contraseña invalidos');

                }
            })
        }
    })

})


app.listen(8080,()=> console.log("servidor iniciado"));
module.exports=app;