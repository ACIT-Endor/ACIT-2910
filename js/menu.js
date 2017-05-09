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
        $("#testDiv").click(function() {
            document.getElementById("testInfo").style.opacity = "1";
            console.log("working!");
        });
    });

    
     $(function(){
        $("#login").click(function(){
            location.href = "/loginPage";
        });
    });
    
    var profile = document.getElementById("profile")
    profile.addEventListener("click", function(){
        location.href = "/profile";

    });
    
    $.ajax({
        url:"/menuDisplay",
        type:"post",

        success:function(resp){
            
            for(var i = 0; i<resp.length; i++){
                var ndiv = document.createElement("div");
                ndiv.className = "menuDiv";
                ndiv.innerHTML = resp[i].itemname;
                var nImg = document.createElement("img");
                nImg.className = "menuImg";
                nImg.src = "/fp/"+resp[i].picture;
                ndiv.appendChild(nImg);
                document.getElementById("leftContainer").appendChild(ndiv);
                
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
                
                ndiv.title = resp[i].itemname;
                ndiv.price = resp[i].price;
                ndiv.desc = resp[i].description;
                ndiv.pic = resp[i].picture;
                
                ndiv.addEventListener("click", function(){
                    var orderButton = document.createElement("button");
                    orderButton.innerHTML = "ORDER NOW";
                    var ndiv = document.createElement("div");
                    document.getElementById("testInfo").style.opacity = "1";
                    var nnImg = document.createElement("img");
                    nnImg.className = "menuImg";
                    nnImg.src = "/fp/"+this.pic;
                    document.getElementById("testInfo").innerHTML = this.title + "<br>$"+this.price+ ",  "+ this.desc;
                    document.getElementById("testInfo").appendChild(nnImg);
                    document.getElementById("testInfo").appendChild(orderButton);
                    console.log("working!");
                    
                    ndiv.title = this.title;
                    ndiv.price = this.price;
                    
                    orderButton.addEventListener("click", function(){
                        $.ajax({
                            url:"/ordering",
                            type:"post",
                            data:{
                                itemName: ndiv.title,
                                price: ndiv.price,
                            },
                            success:function(resp){
                                if(resp.status == "success"){
                                    alert(ndiv.title + " has been added to your order!")
                                } else if(resp.status == "fail"){
                                    alert("Okay alex that didnt work")
                                }
                                
                            }
                            
                        })
                    });
                });
            }
        }
    });
    
    document.getElementById("mainFood").addEventListener("click", function(){
        document.getElementById("leftContainer").innerHTML = "";
        
        for(var i = 0; i<main.length; i++){
                var ndiv = document.createElement("div");
                ndiv.className = "menuDiv";
                ndiv.innerHTML = main[i].itemname;
                var nImg = document.createElement("img");
                nImg.className = "menuImg";
                nImg.src = "/fp/"+main[i].picture;
                ndiv.appendChild(nImg);
                document.getElementById("leftContainer").appendChild(ndiv);
                
                ndiv.title = main[i].itemname;
                ndiv.price = main[i].price;
                ndiv.desc = main[i].description;
                ndiv.pic = main[i].picture;
                
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
                });
        }
    });
    
     document.getElementById("sideFood").addEventListener("click", function(){
        document.getElementById("leftContainer").innerHTML = "";
        
        for(var i = 0; i<side.length; i++){
                var ndiv = document.createElement("div");
                ndiv.className = "menuDiv";
                ndiv.innerHTML = side[i].itemname;
                var nImg = document.createElement("img");
                nImg.className = "menuImg";
                nImg.src = "/fp/"+side[i].picture;
                ndiv.appendChild(nImg);
                document.getElementById("leftContainer").appendChild(ndiv);
                
                ndiv.title = side[i].itemname;
                ndiv.price = side[i].price;
                ndiv.desc = side[i].description;
                ndiv.pic = side[i].picture;
                
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
                });
        }
    });
    
    document.getElementById("dessFood").addEventListener("click", function(){
        document.getElementById("leftContainer").innerHTML = "";
        
        for(var i = 0; i<dessert.length; i++){
                var ndiv = document.createElement("div");
                ndiv.className = "menuDiv";
                ndiv.innerHTML = dessert[i].itemname;
                var nImg = document.createElement("img");
                nImg.className = "menuImg";
                nImg.src = "/fp/"+dessert[i].picture;
                ndiv.appendChild(nImg);
                document.getElementById("leftContainer").appendChild(ndiv);
                
                ndiv.title = dessert[i].itemname;
                ndiv.price = dessert[i].price;
                ndiv.desc = dessert[i].description;
                ndiv.pic = dessert[i].picture;
                
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
                });
        }
    });
    
    document.getElementById("brevFood").addEventListener("click", function(){
        document.getElementById("leftContainer").innerHTML = "";
        
        for(var i = 0; i<beverage.length; i++){
                var ndiv = document.createElement("div");
                ndiv.className = "menuDiv";
                ndiv.innerHTML = beverage[i].itemname;
                var nImg = document.createElement("img");
                nImg.className = "menuImg";
                nImg.src = "/fp/"+beverage[i].picture;
                ndiv.appendChild(nImg);
                document.getElementById("leftContainer").appendChild(ndiv);
                
                ndiv.title = beverage[i].itemname;
                ndiv.price = beverage[i].price;
                ndiv.desc = beverage[i].description;
                ndiv.pic = beverage[i].picture;
                
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
                });
        }
    });
    


});

