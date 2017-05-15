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
        url:"/xiEzMyEY6LAhMzQhYS0=",
        success:function(resp){
            document.getElementById("YOURORDER").innerHTML = "YOUR ORDER: " + resp.orderNum;
        }
    });
    
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

    socket.emit("join room");
    
    createOrders(orders);
    //what to do if server sents teh message "create room" over
    socket.on("orderCompleted", function(obj){
        //the function(obj) obj argument holds information of what was sent over
        console.log(obj);

        //create a new div, put hte msg sent from other people/yourself inside
        var orderids = obj.orderid
        //append it
        document.getElementById("display").appendChild(orderids);

    });
}

function createOrders(obj){
    for(var i = 0; i<obj.length; i++){
        var ndiv = document.createElement("div");
        ndiv.innerHTML = obj[i].orderid;
        ndiv.className = "default";
        document.getElementById("orderReadyContainer").appendChild(ndiv);
        ndiv.ids = obj[i].orderid;
        
        ndiv.addEventListener("click", function(){
            $.ajax({
                url:"/checkorder",
                type:"post",
                data:{
                    order: this.ids
                },
                success:function(resp){
                    if(resp.status == "success"){
                        ndiv.style.display = "none";
                        alert("Enjoy Your Meal!");
                    } else if(resp.status == "fail"){
                        console.log("Order not correct");
                        alert("that order is not yours bitch");
                    }
                }
            });
        });
    };
}