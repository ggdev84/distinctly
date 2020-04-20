var app = require("express")();
var helmet = require("helmet");
var compression = require("compression");
var http = require("http");
var mysql = require("mysql");
var bcrypt = require("bcrypt");
var Mailchimp = require("mailchimp-api-v3");

app.use(compression());
app.use(helmet());
app.disable("x-powered-by");

const httpServer = http.createServer(app);
httpServer.listen(8080);

// Fonction qui permet d'ajouter un contact. Je me suis servi de MailChimp, et on l'utilise avec son API comme ci-dessous.
var add_contact = (nom, prenom, email)=> {
    var mailchimp = new Mailchimp("44c75023298d0b3936bda4aa009daa9a-us20");

    mailchimp.post({
        path:"/lists/fb44b26d3d/members/",
        body:{
            "email_address": email,
            "status": "subscribed",
            "merge_fields": {
                "FNAME": prenom,
                "LNAME": nom
            }
        }
    },(err,result)=>{
        if(err){console.log(err);}
    });
}

// Fonction qui crée et renvoie une connection MySQL.
var mysql_conn=()=>{
    var conn = mysql.createConnection({
        host:"localhost",
        user:"root",
        password :"password",
        database:"site"
    });
    return conn;
}

// Toutes les fonctions ci-dessous permettent juste de renvoyer les pages et images utiles au site.

app.get("/",(req,res)=>{

    res.setHeader("Content-Type","text/html");
    res.sendFile(__dirname + "/index.html");
});

app.get("/index.html",(req,res)=>{

    res.setHeader("Content-Type","text/html");
    res.sendFile(__dirname + "/index.html");
});

app.get("/style.css",(req,res)=>{
    res.setHeader("Content-Type","text/css");
    res.sendFile(__dirname + "/style.css");
});

app.get("/stylemobile.css",(req,res)=>{
    res.setHeader("Content-Type","text/css");
    res.sendFile(__dirname + "/stylemobile.css");
});

app.get("/styletablette.css",(req,res)=>{
    res.setHeader("Content-Type","text/css");
    res.sendFile(__dirname + "/styletablette.css");
});

app.get("/main.js",(req,res)=>{
    res.setHeader("Content-Type","text/javascript");
    res.sendFile(__dirname + "/main.js");
});

app.get("/twitter.png",(req,res)=>{
    res.setHeader("Content-Type","text/plain");
    res.sendFile(__dirname + "/twitter.png");
});

app.get("/facebook.png",(req,res)=>{
    res.setHeader("Content-Type","text/plain");
    res.sendFile(__dirname + "/facebook.png");
});

app.get("/banniere.jpg",(req,res)=>{
    res.setHeader("Content-Type","text/plain");
    res.sendFile(__dirname + "/banniere.jpg");
});

app.get("/bannieretablette.jpg",(req,res)=>{
    res.setHeader("Content-Type","text/plain");
    res.sendFile(__dirname + "/bannieretablette.jpg");
});

app.get("/bannieremobile.jpg",(req,res)=>{
    res.setHeader("Content-Type","text/plain");
    res.sendFile(__dirname + "/bannieremobile.jpg");
});

/* On gère ci-dessous l'inscription. Une fois qu'on a obtenu les informations de l'utilisateur, 
on ajoute le tout à la base de données, sans oublier de l'ajouter également à MailChimp. Il recevra alors un message de bienvenue.*/

app.post("/inscription/:url",(req,res)=>{
    res.setHeader("Content-Type","text/plain");
    var conn = mysql_conn();
    var data = JSON.parse(req.params.url);
    let nom = data.nom;
    let prenom = data.prenom;
    let email = data.email;
    let password = data.password;
    let competences = data.competences.join(",");
    let ville = data.ville;
    if(nom && prenom && email && competences && ville){
        bcrypt.hash(password,10,(err,hash)=>{
            if(err){console.log(err)}
            else{
                let request = "insert into utilisateur(nom,prenom,email,competences,ville,password) values (\""+nom + "\",\"" 
                +prenom + "\",\"" + email + "\",\"" + competences + "\",\"" + ville + "\",\"" + hash + "\");"; 
    
                conn.query(request,(err,resultat)=>{
                    if(err){console.log(err)}
                    else{
                        res.status(200).send("Nous vous remercions de votre inscription. Nous vous recontacterons très bientôt.");
                        add_contact(nom,prenom,email);
                    }
                });
            }
        });
    }

});