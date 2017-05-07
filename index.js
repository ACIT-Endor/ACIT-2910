//REQUIRE ALL MODULES

const express = require("express");
const session = require("express-session");
const pg = require("pg");
const path = require("path");
const bodyParser = require("body-parser");

//START SERVER
var app = express();
const server = require("http").createServer(app);

//SETUP SETTINGS FOR DB, SERVER, and FOLDERS
var io = require("socket.io")(server);
var pF = path.resolve(__dirname, "pages");
var dbURL = process.env.DATABASE_URL 
|| "postgres://postgres:123456@localhost:5432/endor" 
|| "postgres://localhost:5432/endor"; // this is for mac
const port = process.env.PORT || 10000;

//REDIRECT /builder to the BUILD FOLDER
app.use("/builder", express.static("build"));

//REDIRECT /css to the BUILD FOLDER
app.use("/css", express.static("style"));

//SESSION SETTING
app.use(session({
    secret:"endor", //cookie handling
    resave: true,
    saveUninitialized: true
}));

//BODY PARSER SETTING
app.use(bodyParser.urlencoded({
    extended:true
}));

//Root folder
app.get("/", function(req, resp){
    if(req.session.name){
        console.log("User is already logged in");
        resp.sendFile(pF+"/home.html");
    } else{
    resp.sendFile(pF+"/home.html");
    }
});
app.get("/profile", function(req,resp){
    resp.sendFile(pF+"/profile.html");
});
app.get("/loginPage", function(req,resp){
   resp.sendFile(pF+"/login.html");
});
app.post("/logout", function(req, resp){
    req.session.destroy();
    resp.end("success");
});

app.get("/session", function(req, resp){
    resp.send(req.session);
});

app.post("/register", function(req,resp){
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    
    pg.connect(dbURL, function(err, client, done){
        if(err){
            console.log(err);
            var obj = {
                status: "fail",
                msg: "CONNECTION FAIL"
            }
            resp.send(obj);
        }
        
        client.query("INSERT INTO users (username, password, email) VALUES ($1, $2, $3)", [username, password, email], function(err, result){
            done();
            if(err){
                console.log(err);
                var obj = {
                    status:"fail",
                    msg:"SOMETHING WENT WRONG"
                }
                resp.send(obj);
            }
            var obj = {
                status: "success"
            }
            resp.send(obj);
        });
    });
});
app.post("/login", function(req,resp){
    var email = req.body.email;
    var password = req.body.password;
 
    pg.connect(dbURL, function(err, client, done){
        if(err){
            console.log(err);
            var obj = {
                status: "fail",
                msg: "CONNECTION FAIL"
            }
            resp.send(obj);
        }
        
        client.query("SELECT userID, email FROM users WHERE email = $1 AND password = $2", [email, password], function(err, result){
            done();
            if(err){
                    console.log(err);
                    var obj = {
                        status:"fail",
                        msg:"Something went wrong"
                    }
                    resp.send(obj);
            }
            
            if(result.rows.length > 0) {
                req.session.ids = result.rows[0].userID;
                req.session.email = result.rows[0].email;
                var obj = {
                    status:"success",
                }
                resp.send(obj);
            } else {
               var obj = {
                    status:"fail",
                    msg:"Something went wrong"
                }
                resp.send(obj); 
            }
        });
    });
});

//Listen to port
server.listen(port, function(err){
    if(err){
        console.log(err);
        return false;
    }
    
    console.log(port+" is running");
});
