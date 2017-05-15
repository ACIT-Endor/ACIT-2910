$(document).ready(function(){
    $(function(){
        $("#homeLogo").click(function() {
            location.href = "/";
        });
    });
    
    var sliderPos = 0;
    
    $(function(){
        $("#leftSlider").click(function() {
            if(sliderPos == 0){
                document.getElementById("contactMain").style.left = "0";
                document.getElementById("contactMain").style.opacity = "1";

                document.getElementById("faqMain").style.right = "-100%";
                document.getElementById("faqMain").style.opacity = "0";

                sliderPos = 1;
            }
            if(sliderPos == 2){
                document.getElementById("faqMain").style.left = "0";
                document.getElementById("faqMain").style.opacity = "1";

                document.getElementById("aboutMain").style.right = "-100%";
                document.getElementById("aboutMain").style.opacity = "0";
                
                sliderPos = 0;
            }
        });
    });
    
    $(function(){
        $("#rightSlider").click(function() {
           if(sliderPos == 0){
               
                document.getElementById("aboutMain").style.right = "0";
                document.getElementById("aboutMain").style.opacity = "1";

                document.getElementById("faqMain").style.left = "-100%";
                document.getElementById("faqMain").style.opacity = "0";

                sliderPos = 2;
            }
            if(sliderPos == 1){
                document.getElementById("faqMain").style.right = "0";
                document.getElementById("faqMain").style.opacity = "1";

                document.getElementById("contactMain").style.left = "-100%";
                document.getElementById("contactMain").style.opacity = "0";
                
                sliderPos = 0;
            }
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
