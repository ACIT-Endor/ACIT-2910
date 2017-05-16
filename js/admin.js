$(document).ready(function(){
    $.ajax({
        url:"/xiEzMyEY6LAhMzQhYS0=",
        success:function(resp){
            console.log(resp.email);
            document.getElementById("email").innerHTML = "Hope you're having a great day, " + emailUsername(resp.email) + "!"; 
        }
    });
    
    var result = document.getElementById("result");
    var addMenu = document.getElementById("addMenu");
    var editSearch = document.getElementById("editSearch"); 
    var searchDB = document.getElementById("find");
    var tableInfo = document.getElementById("tableInfo");
    var tr = tableInfo.insertRow();
    
    $(function(){
        $("#add").click(function() {
            result.innerHTML = "";
            tableInfo.style.display = "none";
            menuText.innerHTML = "ADD MENU";
            addMenu.style.display = "inline";
            result.appendChild(addMenu);
        });
    });    
    
    $(function(){
        $("#addItem").click(function() {
            var itemName = document.getElementById("itemName").value;
            var itemPrice = document.getElementById("itemPrice").value;
            var itemDesc = document.getElementById("itemDesc").value;
            var itemQty = document.getElementById("itemQty").value;
            var itemType = document.getElementById("itemType").value;
            var itemPic = document.getElementById("itemPic").value;
            
            addMenu.reset();
            
            if(itemName && itemPrice && itemDesc && itemQty && itemType && itemPic != ""){
                $.ajax({
                    url:"/addMyItem",
                    type:"post",
                    data:{
                       itemName: itemName,
                       itemPrice: itemPrice,
                       itemDesc: itemDesc,
                       itemQty: itemQty,
                       itemType: itemType,
                       itemPic: itemPic
                    },
                    success:function(resp){
                       if(resp.status == "success"){
                            alert("Successfully added!")
                       } else if(resp.status == "fail"){
                            alert(resp.msg);
                       }
                    }
                });
            } else {
                alert("Ensure item doesn't already exist");
            }
        });
    });
    
    $(function(){
        $("#edit").click(function() {
            result.innerHTML = "";
            tr.innerHTML = "";
            menuText.innerHTML = "EDIT MENU";
            editSearch.style.display = "inline";
            result.appendChild(editSearch);
            searchDB.style.backgroundColor = "red";
        });
    });    
    
    $(function(){
        $("#searchBut").click(function() {
            result.innerHTML = "";
            tr.innerHTML = "";
            menuText.innerHTML = "SEARCH MENU";
            editSearch.style.display = "inline";
            result.appendChild(editSearch);
            searchDB.style.backgroundColor = "yellow";
        });
    });
    
    $(function(){
        $("#find").click(function() {
            var searchName = document.getElementById("searchName").value;
            tableInfo.style.display = "block";
            
            if (searchName != ""){
                document.getElementById("searchName").value = "";
                $.ajax({
                    url:"/getItem",
                    data:{
                        searchName:searchName
                    },
                    type:"post", //"post" is behind the scenes (invisible) versus "get" (hijackable)
                    success:function(resp){
                        //loop through the select
                        for(var i = 0; i<resp.length; i++){
                            var name = document.createElement("td");
                            var price = document.createElement("td");
                            var desc = document.createElement("td");
                            var qty = document.createElement("td");
                            var type = document.createElement("td");
                            var pic = document.createElement("td");
                            
                            name.textContent = resp[i].itemname;
                            price.textContent = resp[i].price;
                            desc.textContent = resp[i].description;
                            qty.textContent = resp[i].qty;
                            type.textContent = resp[i].type;
                            pic.textContent = resp[i].picture;
                            
                            tr.appendChild(name);
                            tr.appendChild(price);
                            tr.appendChild(desc);
                            tr.appendChild(qty);
                            tr.appendChild(type);
                            tr.appendChild(pic);
                        }
                    }
                });
            } else {
                alert("Enter item name please");
            }
        });
    });
    
    /* parses the whole e-mail address to get the username, before the "@"
    only works after login, otherwise throws error because no e-mail */
    function emailUsername(email) {
        return email.match(/^(.+)@/)[1];
    };
});