$(document).ready(function(){
    console.log("Ready!");
    
    var login = document.getElementById("login")
    login.addEventListener("click", function(){
        location.href = "/loginPage";
    });
    
    $.ajax({
       url:"/session",
       success:function(resp){
           console.log("Email: " + resp.email);
           document.getElementById("email").innerHTML = resp.email;
       }
    });
})