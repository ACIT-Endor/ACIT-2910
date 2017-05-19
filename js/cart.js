$(document).ready(function(){
    var totalprice = 0;

    
                            /* START OF HEADER JAVASCRIPT */
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
    
    $(function(){
        $("#support").click(function() {
            location.href = "/FAQ";
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
        location.href = "/cart";
    });
    
                            /* START OF CART.JS JAVASCRIPT */
    
    $.ajax({
        url:"/myCart",
        type:"post",

        success:function(resp){
            for(var i = 0; i<resp.length; i++){
                var ndiv = document.createElement("div");
                ndiv.innerHTML = resp[i].itemname + ": " + resp[i].itemqty + " = $"+ resp[i].price;
                document.getElementById("container").appendChild(ndiv);
                totalprice += resp[i].price;
            }
            
            document.getElementById("totalPrice").innerHTML = "Total Price: $" + totalprice;
        }
    });
    
    $(".toggle-icon").click(function() {
      $('#nav-container').toggleClass("pushed");
    });
    
    document.getElementById("muteBut").addEventListener("click", function(){
        document.getElementById("musicBox").innerHTML = "";
    });
    
    
});