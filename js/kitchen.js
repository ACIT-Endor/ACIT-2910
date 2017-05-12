console.log("Kitchen HTML");

var order1 = document.getElementById('order1');
var order2 = document.getElementById('order2');
var order3 = document.getElementById('order3');

var cookedItemsContainer = document.getElementById('cookedItemsContainer');

var orderDivs = [order1, order2, order3];

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
            
            var uniqueArr = arr.filter(onlyUnique);
            console.log(uniqueArr);
            
            
            for(i=0;i<uniqueArr.length;i++){
                for(j=0;j<resp.items.length;j++){
                if(resp.items[j].orderid == uniqueArr[i]){
                    var nDiv = document.createElement("div");
                    nDiv.itemName = resp.items[j].itemname;
                    nDiv.innerHTML += resp.items[j].itemname;
  
                    nDiv.addEventListener("click", function(){
                        var itemsDiv = document.createElement("div");
                        itemsDiv.innerHTML = this.itemName;
                        cookedItemsContainer.appendChild(itemsDiv);
                        
                        itemsDiv.addEventListener("click", createTimer(itemsDiv));
                        
                    });
                    orderDivs[i].appendChild(nDiv);
                    }
                }
                
            }
            
        } else {
            console.log("No items???");
        }
    }
});

//Stackoverflow, makes array unique.
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function startTimer(duration, display) {
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
}

function createTimer(itemsDiv){
    var display = document.createElement("div");
    display.style.position = 'right';
    var fiveMinutes = 5;
    startTimer(fiveMinutes, display);
    itemsDiv.appendChild(display);
    
    removeEventListener('click', createTimer);
}