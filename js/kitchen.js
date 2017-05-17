console.log("Kitchen HTML");
var main = [];
var side = [];
var dessert = [];
var beverage = [];
var uniqueArr = [];

var order1 = document.getElementById('order1');
var order2 = document.getElementById('order2');
var order3 = document.getElementById('order3');

var itemsContainer = document.getElementById('itemsContainer');
var cookedItems = document.getElementById('cookedItems');
var readyToServe = document.getElementById('readyToServe');
var orderDivs = [order1, order2, order3];
    

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
    
    $.ajax({
       url:"/kitchenOrders",
        type:"post",
        success:function(resp){
            if(resp.status=='success'){
                var arr = [];
                console.log("Got items for order1");
                for(i=0;i<resp.items.length;i++){
                    arr.push(resp.items[i].orderid);
                }

                uniqueArr = arr.filter(onlyUnique);
                console.log(uniqueArr);


                for(i=0;i<uniqueArr.length;i++){
                    
                    var orderDiv = document.createElement("div");
                    orderDiv.className = 'col-md-4';
                    orderDiv.orderid = uniqueArr[i];
                    orderDiv.innerHTML = "<h2>"+uniqueArr[i]+"</h2>";
                    
                    for(j=0;j<resp.items.length;j++){
                    if(resp.items[j].orderid == uniqueArr[i]){
                        var nDiv = document.createElement("div");
                        nDiv.itemName = resp.items[j].itemname;
                        nDiv.innerHTML = resp.items[j].itemname;

    //                    nDiv.addEventListener("click", function(){
    //                        var itemsDiv = document.createElement("div");
    //                        itemsDiv.innerHTML = this.itemName;
    //                        itemsContainer.appendChild(itemsDiv);
    //                        
    //                        itemsDiv.addEventListener("click", createTimer(itemsDiv));
    //                        
    //                    });
                        orderDiv.appendChild(nDiv);
                        }
                    }
                    document.getElementById("kitchenContainer").appendChild(orderDiv);
                }

            } else {
                console.log("No items???");
            }
        }
    });

    $.ajax({
       url:"/displayTotalItems",
        type:"post",
        success:function(resp){
            if(resp.status=='success'){
                for(var i=0; i<resp.rows.length; i++){
                    var nDiv = document.createElement("div");
                    nDiv.style.color = 'white';
                    nDiv.innerHTML = resp.rows[i].itemname + " ---***--- "+ resp.rows[i].qty;
                    cookedItems.appendChild(nDiv);
                }
            }
        }
    });

    document.getElementById("mainItems").addEventListener("click", function(){

        var menuDiv = document.createElement("div");
        var closeBut = document.createElement("div");
        menuMaker(main, menuDiv, closeBut);
        document.getElementById("mainbody").appendChild(menuDiv);
    });

    document.getElementById("sideItems").addEventListener("click", function(){
        var menuDiv = document.createElement("div");
        var closeBut = document.createElement("div");
        menuMaker(side, menuDiv, closeBut);
        document.getElementById("mainbody").appendChild(menuDiv);
    });

    document.getElementById("desertItems").addEventListener("click", function(){
        var menuDiv = document.createElement("div");
        var closeBut = document.createElement("div");
        menuMaker(dessert, menuDiv, closeBut);
        document.getElementById("mainbody").appendChild(menuDiv);
    });

    document.getElementById("bevItems").addEventListener("click", function(){
        var menuDiv = document.createElement("div");
        var closeBut = document.createElement("div");
        menuMaker(beverage, menuDiv, closeBut);
        document.getElementById("mainbody").appendChild(menuDiv);
    });
    console.log("INSIDE DOC READY" + uniqueArr.length);
    
initSockets();


//Stackoverflow, makes array unique.
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function startTimer(duration, display, itemName, quantity) {
    var start = Date.now(), diff, minutes, seconds;
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerHTML = minutes + ":" + seconds; 

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            clearInterval(timer);
            display.innerHTML = "READY";
        }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    setInterval(timer, 1000);
    $.ajax({
               url:"/cookedItems",
                type:"post",
                data:{
                    itemname: itemName,
                    qty: quantity
                },
                success:function(resp){
                    if(resp.status=="success"){
                        console.log("Items cooked");
                        
                    }
                }
            });
}

function createTimer(itemsDiv, itemName, quantity){
    var display = document.createElement("div");
    display.style.position = 'right';
    var fiveMinutes = 5;
    startTimer(fiveMinutes, display, itemName, quantity);
    itemsDiv.appendChild(display);
    
    removeEventListener('click', createTimer);
}

function menuMaker(menutype, menuDiv, closeBut){
    
    menuDiv.style.position = 'absolute';
    menuDiv.style.height = "500px";
    menuDiv.style.width = "500px";
    menuDiv.style.top = '10%';
    menuDiv.style.left = '20%';
    menuDiv.style.backgroundColor = 'black';
    menuDiv.style.zIndex = "999";
    menuDiv.style.transition = "2s";
    document.getElementById("container1").style.opacity = "0.5";
    document.getElementById("container2").style.opacity = "0.5";
    
    closeBut.style.height = '15px';
    closeBut.style.width = '15px';
    closeBut.style.position = 'absolute';
    closeBut.style.top = '2%';
    closeBut.style.right = '2%';
    closeBut.style.backgroundColor = 'blue';
    
    closeBut.addEventListener("click", function(){
        menuDiv.style.display = "none"; 
        document.getElementById("container1").style.opacity = "1";
        document.getElementById("container2").style.opacity = "1";
    });
    
    for(var i = 0; i<main.length; i++){
        var nBut = document.createElement("button");
        nBut.className = "btn btn-lg center-block btn-primary";
        nBut.style.marginTop = "50px";
        nBut.style.marginLeft = "50px";
        nBut.style.position = "relative";
        nBut.style.display = "inline-block";
        nBut.itemName = menutype[i].itemname;
        nBut.innerHTML = menutype[i].itemname;
        
        nBut.addEventListener("click", function(){
            var itemsDiv = document.createElement("div");
            itemsDiv.innerHTML = this.itemName;
            //cookedItems.appendChild(itemsDiv);
            itemsDiv.addEventListener("click", createTimer(itemsDiv, this.itemName, 1));

            //-----------------------------------------
        });
        
        menuDiv.appendChild(nBut);
    }
    
    menuDiv.appendChild(closeBut);
};

function removechilds(node){
    while (node.hasChildNodes()) {
  node.removeChild(node.lastChild);
    }
}

function initSockets(){
    
    var socket = io();    
    socket.on("push orders", function(obj){
    readyToServe.innerHTML = "";
    for(var i=0; i<uniqueArr.length; i++){
        var orderDiv = document.createElement("div");
        orderDiv.className = 'col-md-4';
        orderDiv.orderid = uniqueArr[i];
        orderDiv.innerHTML = "<h2>"+uniqueArr[i]+"</h2>";
        var removeItems = {};
        if(obj.items.length>0){
        for(var j=0;j<obj.items.length;j++){
            if(obj.items[j].orderid == uniqueArr[i]){

                var nDiv = document.createElement("div");
                var key = obj.items[j].itemname;
                nDiv.itemname = obj.items[j].itemname;
                nDiv.id = obj.items[j].itemname;
                nDiv.innerHTML = obj.items[j].itemname;
                nDiv.style.backgroundColor = "yellow";
                nDiv.style.color = "black";
                if(key in removeItems){
                    removeItems[key] += obj.items[j].itemqty;
                } else {
                    removeItems[key] = obj.items[j].itemqty;
                }
                orderDiv.appendChild(nDiv);
                }
            }
        }
                var nBut = document.createElement("button");
                nBut.innerHTML = "READY";
                nBut.className = "btn btn-md btn-primary center-block";
                nBut.itemList = removeItems;
                nBut.orderid = uniqueArr[i];
                nBut.addEventListener("click", function(){

                    var removeItems = this.itemList;
                   $.ajax({
                      url:"/removeItems",
                       type:"post",
                       data: {
                           removeItems: removeItems,
                           orderid: this.orderid
                       },
                       success:function(resp){
                           console.log(resp.status);
                       }
                   });
                });
            for(key in removeItems){
                if(removeItems[key] == 0){
                    console.log("HAS 0 ITEMS, BUTTON SHUDNT WORK")
                    nBut.addEventListener("click", function(){
                        console.log("order not complete~");
                    })
                }
            } 
        
            orderDiv.appendChild(nBut);
            readyToServe.appendChild(orderDiv);
        }
    });
    
    socket.on("update total orders", function(obj){
        cookedItems.innerHTML = "";
        for(var i=0; i<obj.items.length; i++){
            var nDiv = document.createElement("div");
            nDiv.style.color = 'white';
            nDiv.innerHTML = obj.items[i].itemname + " ---***--- "+ obj.items[i].qty;
            cookedItems.appendChild(nDiv);
        }
    });
};
