$(document).ready(function(){

    
    $(function(){
        $("#homeLogo").click(function() {
            location.href = "/";
        });
    });
    
     $(function(){
        $("#login").click(function(){
            location.href = "/loginPage";
        });
    });
    
    $.ajax({
        url:"/xiEzMyEY6LAhMzQhYS0=",
        success:function(resp){
            if(resp.type){
                document.getElementById("login").style.display = "none";
                document.getElementById("logout").style.visibility = "visible";
            }
        }
    });
    
    document.getElementById("logout").addEventListener("click", function(){
        $.ajax({
            url:"/logout",
            type:"post",
            success:function(resp){
                location.reload();
                }
            })
    });
    
    var profile = document.getElementById("profile")
    profile.addEventListener("click", function(){
        location.href = "/profile";

    });
    
    document.getElementById("cart").addEventListener("click", function(){
        location.href = "/cart"
    });
    
    //START OF THE NOW SERVING JS CODE//
    $.ajax({
        url:"/NowServing",
        type:"post",
        success:function(resp){
            if(resp.status == "success"){
                initSockets(resp.rows)
            } else {
                alert(resp.status);
            }

        }
    });
    
    
});

//transfer all socket stuff into this function
function initSockets(orders){
    //connect to the io opened tunnel in the server
    var socket = io();
        
    //send a message to join a room
    socket.emit("order recieved", orders);

    document.getElementById("send").addEventListener("click", function(){
        //when clicked, use your socket to send a message
        console.log("making a new room")
        //create an obj to send over
        var obj = {
            name: profileName,
            race: profileRace,
            class: profileClass,
            avatar: profileAvatar,
            msg: document.getElementById("msg").value
        };

        //use your socket to send a message over and pass long the object
        //emit function means send a message
        socket.emit("send message", obj);
    });

    //what to do if server sents teh message "create room" over
    socket.on("create message", function(obj){
        //the function(obj) obj argument holds information of what was sent over
        console.log(obj);

        //create a new div, put hte msg sent from other people/yourself inside
        var ndiv = document.createElement("div");
        ndiv.className = "chat";
        
        var nAva = document.createElement("img");
        nAva.className = "avatar";
        nAva.src = obj.avatar;
        
        var nName = document.createElement("div");
        nName.className = "name";
        nName.innerHTML = obj.name;
        
        var nRace = document.createElement("div");
        nRace.className = "race";
        nRace.innerHTML = "'"+obj.race + ": " + obj.class+"'";
        
        var nMsg = document.createElement("div");
        nMsg.className = "msg";
        nMsg.innerHTML = obj.msg;

        ndiv.appendChild(nAva);
        ndiv.appendChild(nName);
        ndiv.appendChild(nRace);
        ndiv.appendChild(nMsg);
        //append it
        document.getElementById("display").appendChild(ndiv);

    });
    