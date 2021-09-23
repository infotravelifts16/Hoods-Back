const express = require('express');
const passport = require('passport');
const app = express();
const cookieParser=require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;
const { serializeUser } = require('passport');

app.set('view engine','ejs');

app.get("/",(req,res)=>{
    
});
app.use(express.urlencoded({extended:true}));

app.use(cookieParser("secreto"))

app.use(session({
    secret: "mi secreto",
    resave: true,
    saveUninitialized:true
}))

app.use(passport.initialize())
app.use(passport.session())
//estrategia de inicio de sesion, por ejemplo redes sociales. PassportLocal es la estrategia estandar de username y pass


passport.use(new PassportLocal(function(username,password,done){
    if (username === "nombre de usuario" && password ==="12345678")
        return done(null,{ id: 1, name: "nombre"});//ejemplo
}))

passport.serializeUser(function(user,done)
{
    done(null,user.id) 
})

passport.deserializeUser(function(id,done){
    done(null,{ id: 1, name: "nombre"})
})

app.get("/login",(req,res)=>{
    res.render("login");
}); 

app.post("/login",passport.authenticate({
    successRedirect: "/",
    failureRedirect: "/login"
}));


app.listen(8080,()=> console.log("servidor iniciado"));