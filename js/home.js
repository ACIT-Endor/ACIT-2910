$(document).ready(function(){
    var login = document.getElementById("login")
    login.addEventListener("click", function(){
        location.href = "/loginPage";
    });
    
    var profile = document.getElementById("profile")
    profile.addEventListener("click", function(){
        location.href = "/profile";
    });
})