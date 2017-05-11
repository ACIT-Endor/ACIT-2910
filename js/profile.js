$(document).ready(function(){
    document.getElementById("homeLogo").addEventListener("click", function(){
        location.href = "/"
    });
    
    $.ajax({
        url:"/xiEzMyEY6LAhMzQhYS0=",
        success:function(resp){
            document.getElementById("email").innerHTML = "E-mail: " + resp.email; 
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
    
    $(function(){
        $("#accView").click(function() {
            document.getElementById("accBox").style.display = "inline";
            document.getElementById("passBox").style.display = "none";
        });
    });
    
    $(function(){
        $("#passChange").click(function() {
            document.getElementById("passBox").style.display = "inline";
            document.getElementById("accBox").style.display = "none";
        });
    });
    
    $(function(){
        $("#confirmBut").click(function() {
            var newPass = document.getElementById("newPass").value;
            var confirmPass = document.getElementById("confirmPass").value;
            if (newPass == confirmPass){
                document.getElementById("newPass").value = "";
                document.getElementById("confirmPass").value = "";
                $.ajax({
                    url:"/changeMyPass",
                    data:{
                        confirmPass:confirmPass
                    },
                    type:"post", //"post" is behind the scenes (invisible) versus "get" (hijackable)
                    success:function(resp){
                        if(resp.status == "success"){
                            console.log("successful");
                            alert("Password successfully changed!");
                        } else if(resp.status == "fail"){
                            alert(resp.msg);
                        }
                    }
                });
            } else {
                alert("Please check that the passwords are the same");
            }
        });
    });
});