$(document).ready(function(){
    
    var main = [];
    var side = [];
    var dessert = [];
    var beverage = [];
    
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
    
    //Start of Menu Code
    
    $.ajax({
        url:"/menuDisplay",
        type:"post",

        success:function(resp){
            
            for(var i = 0; i<resp.length; i++){
               
                if(resp[i].type == "main"){
                    main.push(resp[i]);
                }else if(resp[i].type == "sides") {
                    side.push(resp[i]);
                }else if(resp[i].type == "dessert"){
                    dessert.push(resp[i]);
                }else if(resp[i].type == "beverage"){
                    beverage.push(resp[i]);
                } else {
                    console.log("Okay something went very very wrong");
                }
            }
        }

    });
    
    document.getElementById("mainFood").addEventListener("click", function(){
        document.getElementById("leftContainer").innerHTML = "";
        menuMaker(main);

    });
    
     document.getElementById("sideFood").addEventListener("click", function(){
        document.getElementById("leftContainer").innerHTML = "";        
        menuMaker(side);
         
    });
    
    document.getElementById("dessFood").addEventListener("click", function(){
        document.getElementById("leftContainer").innerHTML = "";
        menuMaker(dessert);

    });
    
    document.getElementById("brevFood").addEventListener("click", function(){
        document.getElementById("leftContainer").innerHTML = "";
        menuMaker(beverage);
        
    });
    
    //function to make the menu's appear when you click on a tab at the top, just have to change styling
    //on one of these to change them all!
    
    function menuMaker(menutype){
                for(var i = 0; i<menutype.length; i++){
                var ndiv = document.createElement("div");
                ndiv.className = "menuDiv";
                ndiv.innerHTML = menutype[i].itemname;
                var nImg = document.createElement("img");
                nImg.className = "menuImg";
                nImg.src = "/fp/"+menutype[i].picture;
                ndiv.appendChild(nImg);
                document.getElementById("leftContainer").appendChild(ndiv);
                
                ndiv.title = menutype[i].itemname;
                ndiv.price = menutype[i].price;
                ndiv.desc = menutype[i].description;
                ndiv.pic = menutype[i].picture;
                
                ndiv.addEventListener("click", function(){
                    var orderButton = document.createElement("button");
                    orderButton.innerHTML = "ORDER NOW";
                    document.getElementById("testInfo").style.opacity = "1";
                    var nnImg = document.createElement("img");
                    nnImg.className = "menuImg";
                    nnImg.src = "/fp/"+this.pic;
                    document.getElementById("testInfo").innerHTML = this.title + "<br>$"+this.price+ ",  "+ this.desc;
                    document.getElementById("testInfo").appendChild(nnImg);
                    document.getElementById("testInfo").appendChild(orderButton);
                    console.log("working!");
                                        
                    var title = this.title;
                    var price = this.price;
                    
                    orderButton.addEventListener("click", function(){
                        $.ajax({
                            url:"/ordering",
                            type:"post",
                            data:{
                                itemName: title,
                                price: price,
                            },
                            success:function(resp){
                                if(resp.status == "success"){
                                    alert(title + " has been added to your order!")
                                } else if(resp.status == "fail"){
                                    alert("Okay alex that didnt work")
                                }
                                
                            }
                            
                        })
                    });
                });
        };
        
    };

});

