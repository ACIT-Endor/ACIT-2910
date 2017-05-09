$(document).ready(function(){
    document.getElementById("homeLogo").addEventListener("click", function(){
        location.href = "/"
    });
    
    $.ajax({
        url:"/xiEzMyEY6LAhMzQhYS0=",
        success:function(resp){
            document.getElementById("email").innerHTML = resp.email; 
        }
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
});
