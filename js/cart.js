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
        location.href = "/cart"
    });
    
                            /* START OF CART.JS JAVASCRIPT */
    
    $.ajax({
        url:"/myCart",
        type:"post",
        
        success:function(resp){
            var arr = [];
            for(var i = 0; i<resp.length; i++){
                
                var ndiv = document.createElement("div");
                ndiv.className = "itemsContainer";
                var closeBut = document.createElement("button");
                closeBut.className = "closeBut";
                closeBut.innerHTML = "X";
                closeBut.id = "cb" + i;
                ndiv.appendChild(closeBut);
                var infoDiv = document.createElement("div");
                infoDiv.className = "info";
                infoDiv.innerHTML = resp[i].itemname + ": Quantity " + resp[i].itemqty + " = $" + resp[i].price;
                ndiv.appendChild(infoDiv);
                var foodpic = document.createElement("img");
                foodpic.className = "foodPic";
                var string = resp[i].itemname.split(" ").join("");
                foodpic.src = "/fp/" + string + ".jpg";
                ndiv.appendChild(foodpic);
                
                totalprice += resp[i].price;
                
                ndiv.title = resp[i].itemname;
                var title = resp[i].itemname;
                arr.push(resp[i].itemname);
                ndiv.num = i;
                console.log(arr.length);
                
                closeBut.addEventListener("click", function(){
                    var j = ndiv.num;
                    removeItem(arr[j])
                })
                
                document.getElementById("orderContainer").appendChild(ndiv)

            }
            document.getElementById("totalPrice").innerHTML = "Total Price: $" + totalprice;
        }
            
        
    });
    
    document.getElementById("checkoutBut").addEventListener("click", function(){
        $.ajax({
            url:"/checkout",
            type:"post",

            success:function(resp){
                if(resp.status == "success"){
                    alert("THANK YOU FOR YOUR PURCHASE");
                    location.href = "/NowServing"
                }
            }
        });
    });


    
});

function removeItem(itemname){
    console.log(itemname);
    $.ajax({
        url:"/removeCartItem",
        type:"post",
        data:{
            
        },

        success:function(resp){
            if(resp.status == "success"){
                alert("yup");
            } else if(resp.status == "fail"){
                alert("Alex, that did not work as intended")
            }
        }
    })
}

