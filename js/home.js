$(document).ready(function(){
    $(function(){
        $("#homeLogo").click(function() {
            location.href = "/";
        });
    });
    
    $(function(){
        $("#menuScroller").click(function(){
            location.href = "/menu";
        });
    });
    
    var login = document.getElementById("login")
    login.addEventListener("click", function(){
        location.href = "/loginPage";
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

});
