const $ = require('jquery');

//test function 1
function loginFunction(){
    return "/loginPage";
}

//test function 2
function numTest(){
    return 5;
}

$(document).ready(function(){
    $(function(){
        $("#homeLogo").click(function() {
            location.href = "/";
        });
    });
    
    $(function(){
        $("#support").click(function() {
            location.href = "/FAQ";
        });
    });
    
    $(function(){
        $("#menuScroller").click(function(){
            location.href = "/menu";
        });
    });
    
    $(function(){
        $(".spImage").click(function() {
            location.href = "/menu";
        });
    });
    
    var login = document.getElementById("login")
    login.addEventListener("click", function(){
        location.href = loginFunction();
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

});
module.exports.numTest = numTest;
module.exports.login = loginFunction;

