$(document).ready(function(){
    var profile = document.getElementById("profile")
    profile.addEventListener("click", function(){
        location.href = "/profile";
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
               } else {
                   console.log("cant log in");
               }
           }
       }); 
    });
});