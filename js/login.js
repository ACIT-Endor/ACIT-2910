$(document).ready(function(){
    
    document.getElementById("homeLogo").addEventListener("click", function(){
        location.href = "/"
    });
    
    document.getElementById("loginBut").addEventListener("click", function(){
       $.ajax({
           url:"/login",
           type:"post",
           data:{
             email: document.getElementById("email").value,
             password: document.getElementById("pass").value
           },
           success:function(resp){
               if(resp.status == "success"){
                   console.log("logged in");
                   location.href = "/profile"
               } else {
                   console.log("cant log in");
                   alert("Sorry, that email/password combination doesn't exist")
               }
           }
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
            });
    });
});