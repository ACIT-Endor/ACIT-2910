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

app.use('/bjs', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/bjs', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/bcss', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

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
    /*if(req.session.type){
        resp.sendFile(pF+"/profile.html");
    } else {
        resp.sendFile(pF+"/login.html");
    }*/

    if(req.session.type == "customer"){
        resp.sendFile(pF+"/profile.html");
    } else if(req.session.type == "kitchen") {
        resp.sendFile(pF+"/kitchen.html");
    } else if(req.session.type == "admin"){
        resp.sendFile(pF+"/admin.html");
    } else {
        resp.sendFile(pF+"/login.html");
    }

});
app.get("/loginPage", function(req,resp){
   resp.sendFile(pF+"/login.html");
});
app.get("/menu", function(req, resp){
    resp.sendFile(pF+"/menu.html");
});
app.get("/cart", function(req, resp){
    resp.sendFile(pF+"/cart.html");
})

// end of GET section //

// start of all POST request/response functions //

app.post("/logout", function(req, resp){
    req.session.destroy();
    resp.end("success");
});
app.post("/register", function(req,resp){
    var password = req.body.password;
    var email = req.body.email;
    var type = "customer";
    var loc = req.body.location;
    var gender = req.body.gender;
    
    pg.connect(dbURL, function(err, client, done){
        if(err){
            console.log(err);
            var obj = {
                status: "fail",
                msg: "CONNECTION FAIL"
            }
            resp.send(obj);
        }
        client.query("SELECT * FROM users WHERE email = ($1)", [email], function(err, result){
            done();
            if(err){
                    console.log(err);
                    var obj = {
                        status:"fail",
                        msg:"Something went wrong"
                    }
                    resp.send(obj);
            }
            
            if(result.rows.length == 0){
                client.query("INSERT INTO users (email, password, location, type, gender) VALUES ($1, $2, $3, $4, $5)", [email, password, loc, type, gender], function(err, result){
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
            } else {
                var obj = {
                    status:"fail"
                }
                resp.send(obj);
            }

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
        
        client.query("SELECT userid, email, location, type, gender FROM users WHERE email = ($1) AND password = ($2)", [email, password], function(err, result){
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
                req.session.location = result.rows[0].location;
                req.session.gender = result.rows[0].gender;
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
    var b00lean;

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
        client.query("SELECT * FROM orders WHERE userid = ($1)", [req.session.ids], function(err, result){
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
                req.session.orderNum = result.rows[0].ordernum;
                orderDate = result.rows[0].datetime;
                        
                b00lean = insertItems(client, done, req.session.orderNum);
                if(b00lean == 1){
                    resp.send({status:"success"});
                }
                
            } else {
                client.query("INSERT INTO orders (userid) VALUES ($1) RETURNING ordernum, datetime", [req.session.ids], function(err, result){
                    done();
                    if(err){
                        console.log(err);
                        var obj = {
                            status:"fail",
                            msg:"something went wrong"
                        }
                        resp.send(obj);
                    }
                    if(result.rows.length > 0){
                        req.session.orderNum = result.rows[0].ordernum;
                        orderDate = result.rows[0].datetime;
                        
                        b00lean = insertItems(client, done, req.session.orderNum);
                        if(b00lean == 1){
                            resp.send({status:"success"});
                        }
                    } else {
                        resp.send({status:"fail"});
                    }
                });
            }
        });
        


    });
    function insertItems(client, done, rr){
        client.query("INSERT INTO items (orderid, itemname, itemqty, price) VALUES ($1, $2, $3, $4)", [rr, orderName, 1, orderPrice],function(err, result){
            done();
            if(err){
                console.log(err);
                var obj = {
                    status:"fail",
                    msg:"Something went wrong"
                }
                resp.send(obj);
            }
        });
        return 1;
    };

});

    

app.post("/myCart", function(req, resp){
    
    pg.connect(dbURL, function(err, client, done){
        if(err){
            console.log(err);
            var obj = {
                status: "fail",
                msg: "CONNECTION FAIL"
            }
            resp.send(obj);
        }
        
        client.query("SELECT * FROM items WHERE orderid = $1", [req.session.orderNum], function(err, result){
            done();
            if(err){
                console.log(err);
                var obj = {
                    status:"fail",
                    msg:"SOMETHING WENT WRONG"
                }
                resp.send(obj);
            }
            
            if(result.rows.length > 0){
                resp.send(result.rows);
            } else {
                resp.send({status:"fail"});
            }
        });
    });
});


//Kitchen related POSTs
app.post("/kitchenOrders", function(req,resp){
    
    pg.connect(dbURL, function(err, client, done){
        if(err){
            console.log(err);
            var obj = {
                status: "fail",
                msg: "CONNECTION FAIL"
            }
            resp.send(obj);
        }
        
        client.query("SELECT * from items", [], function(err, result){
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
                var obj = {
                    status:"success",
                    items:result.rows
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


app.post("/changeMyPass", function(req, resp){
    var confirmPass = req.body.confirmPass;
    
    pg.connect(dbURL, function(err, client, done){
       if(err){
           console.log(err);
           var obj = {
               status:"fail",
               msg:"CONNECTION FAIL"
           }
           resp.send(obj);
        }
        
        client.query("UPDATE users SET password=($1) WHERE userid=($2)", [confirmPass, req.session.ids], function(err, result){
            done();
            if(err){
                console.log(err);
                var obj = {
                   status:"fail",
                   msg:"invalid"
                }
                resp.send(obj);
            }
                     
            var obj = {
                status:"success"
            }
            resp.send(obj);
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
