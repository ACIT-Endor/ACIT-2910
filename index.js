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
var dbURL = process.env.DATABASE_URL || "postgres://postgres:123456@localhost:5432/endor"|| "postgres://localhost:5432/endor"; // this is for mac
const port = process.env.PORT || 10000;

//REDIRECT /builder to the BUILD FOLDER
app.use("/builder", express.static("build"));

//REDIRECT /css to the BUILD FOLDER
app.use("/css", express.static("style"));

//REDIRECT /fp to the MENU ITEMS FOLDER
app.use("/fp", express.static("menuItems"));

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

// all GET request/response function below //

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
    if(req.session.type){
        resp.sendFile(pF+"/profile.html");
    } else {
        resp.sendFile(pF+"/login.html");
    }
    
    //This next block is just for future expansion when we have the admin/kitchen pages up :)
    /*
    if(req.session.type == "customer"){
        resp.sendFile(pF+"/profile.html");
    } else if(req.session.type == "kitchen") {
        resp.sendFile(pF+"/kitchen.html");
    } else if(req.session.type == "admin"){
        resp.sendFile(pF+"/admin.html");
    } else {
        resp.sendFile(pF+"/login.html");
    }
    */ 
});
app.get("/loginPage", function(req,resp){
   resp.sendFile(pF+"/login.html");
});
app.get("/menu", function(req, resp){
    resp.sendFile(pF+"/menu.html")
});

// end of GET section //

// start of all POST request/response functions //

app.post("/logout", function(req, resp){
    req.session.destroy();
    resp.end("success");
});
app.post("/register", function(req,resp){
    //var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var type = "customer";
    
    pg.connect(dbURL, function(err, client, done){
        if(err){
            console.log(err);
            var obj = {
                status: "fail",
                msg: "CONNECTION FAIL"
            }
            resp.send(obj);
        }
        
        client.query("INSERT INTO users (type, password, email) VALUES ($1, $2, $3)", [type, password, email], function(err, result){
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
        
        client.query("SELECT userID, email, type FROM users WHERE email = ($1) AND password = ($2)", [email, password], function(err, result){
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
                req.session.ids = result.rows[0].userid;
                req.session.email = result.rows[0].email;
                req.session.type = result.rows[0].type;
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

app.post("/menuDisplay", function(req, resp){
    pg.connect(dbURL, function(err, client, done){
        if(err){
            console.log(err);
            var obj = {
                status: "fail",
                msg: "CONNECTION FAIL"
            }
            resp.send(obj);
        }
        client.query("SELECT itemname, price, description, picture, type FROM inventory", [],function(err, result){
            done();
            if(err){
                console.log(err);
                var obj = {
                    status:"fail",
                    msg:"Something went wrong"
                }
                resp.send(obj);
            }
            if(result.rows.length > 0){
                resp.send(result.rows);
            } else {
                resp.send({status:"fail"})
            }
        });
    });
});

app.post("/ordering", function(req, resp){
    var orderName = req.body.itemName;
    var orderPrice = req.body.price;
    var orderDate;
    
    console.log(req.session.ids);
    pg.connect(dbURL, function(err, client, done){
        if(err){
            console.log(err);
            var obj = {
                status: "fail",
                msg: "CONNECTION FAIL"
            }
            resp.send(obj);
        }
        
        //checks if their is an existing order
        client.query("SELECT * FROM orders WHERE userID = ($1)", [req.session.ids], function(err, result){
            if(err){
                console.log(err);
                var obj = {
                    status:"fail",
                    msg:"Something went wrong"
                }
                resp.send(obj);
            }
            if(result.rows.length > 0){
                req.session.orderID = result.rows[0].orderid;
                orderDate = result.rows[0].datetime;
            } else {
                client.query("INSERT INTO orders (userid) VALUES ($1) RETURNING orderid, datetime", [req.session.ids], function(err, result){
                    if(err){
                        console.log(err);
                        var obj = {
                            status:"fail",
                            msg:"something went wrong"
                        }
                        resp.send(obj);
                    }
                    if(result.rows.length > 0){
                        req.session.orderID = result.rows[0].orderid;
                        orderDate = result.rows[0].datetime;
                    } else {
                        resp.send({status:"fail"});
                    }
                });
            }
        });
        
        client.query("INSERT INTO items (orderid, itemname, datetime, itemqty) VALUES ($1, $2, $3, $4)", [req.session.orderID, orderName, orderDate, 1],function(err, result){
            done();
            if(err){
                console.log(err);
                var obj = {
                    status:"fail",
                    msg:"Something went wrong"
                }
                resp.send(obj);
            }
            
            resp.send({status:"success"})
            
        });
    });
});

app.get("/xiEzMyEY6LAhMzQhYS0=", function(req, resp){
    //This is basically to send information to the profile page, its an encrypted word (probably doesnt need to be just trying to be sneaky)
    resp.send(req.session);
});

// end of POST functions //

//Listen to port
server.listen(port, function(err){
    if(err){
        console.log(err);
        return false;
    }
    
    console.log(port+" is running");
});
