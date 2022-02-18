'use strict';

let recommendedObj={
     recommendedList:[],

    recommendedBuilder:function(foodItemName)
    {
        this.foodItemName=foodItemName;
        return this;
    },

    appendToRecommendedList:function(itemNameObj)
    {
        this.recommendedList.push(itemNameObj);
    }
};



recommendedObj.appendToRecommendedList(new recommendedObj.recommendedBuilder("Punjabi Smaosa"));
recommendedObj.appendToRecommendedList(new recommendedObj.recommendedBuilder("Chinese Smaosa"));
recommendedObj.appendToRecommendedList(new recommendedObj.recommendedBuilder("Italian Smaosa"));

//console.log(recommendedObj.recommendedList.length);


let cartObject= {
    cartItems:[],
    cartBuilder:function(itemName,itemNumber,itemPrice){
        this.itemNumber=itemNumber;
        this.itemName=itemName;
        this.itemPrice=itemPrice;
        this.qty=1;
        return this;

    },
    appendToCartItems:function(cartItem)
    {
        this.cartItems.push(cartItem);
    }
}

var menuItemList=[
    {
        menuItemNumber:1,
        menuItemName:"Punjabi Samosa",
        menuItemPrice:50,
        imageFilePath:"images/samosa.jpg",
        veg:true
    },
    {
        menuItemNumber:2,
        menuItemName:"Chinese Samosa",
        menuItemPrice:80,
        imageFilePath:"images/samosa.jpg",
        veg:true
    },
    {
        menuItemNumber:3,
        menuItemName:"Italian Samosa",
        menuItemPrice:100,
        imageFilePath:"images/samosa.jpg",
        veg:true
    }
];





    

function renderRecommendedList()
{
    const recommendedListDiv =document.getElementById("recommendedList");
    const unorderedRecommendedList=document.createElement('ul');
    const listTitle=document.createElement('li');
    listTitle.innerText="Recommended";
    unorderedRecommendedList.append(listTitle);

    let i=0;
    for(i=0;i<recommendedObj.recommendedList.length;i+=1)
    {
        const tempListItemName =document.createElement('li');
        tempListItemName.innerText=recommendedObj.recommendedList[i].foodItemName;
        console.log(recommendedObj.recommendedList[i].foodItemName);
        unorderedRecommendedList.append(tempListItemName);
    }

    recommendedListDiv.append(unorderedRecommendedList);



}
renderRecommendedList();

    
   function renderMenuItemList()
   {
        const menuItemListDiv =document.getElementById("menuItemList");

        const menuHeadingDiv =document.createElement('div');
        menuHeadingDiv.classList.add("menuHeading");

        const menuHeadingText=document.createElement('h1');
        menuHeadingText.innerText="Recommended";
        menuHeadingDiv.append(menuHeadingText);

        const itemTotalNumber=document.createElement('p')
        itemTotalNumber.innerText=menuItemList.length+" items";
        menuHeadingDiv.append(itemTotalNumber);

        menuItemListDiv.append(menuHeadingDiv);

        let i=0;
        for(i=0;i<menuItemList.length;i+=1)
        {
            const menuItem =document.createElement('div');
            menuItem.classList.add("menuItem");

           

            const menuItemLeftSection=document.createElement('div');
            menuItemLeftSection.classList.add("menuItemLeftSection");

            const vegImage=document.createElement('img');
            vegImage.setAttribute("src",menuItemList[i].veg ? 'images/veg.jpg' :'');
            vegImage.setAttribute("alt","category-icon")
            vegImage.classList.add("vegIcon");
            menuItemLeftSection.append(vegImage);

            const menuItemName=document.createElement('h3');
            menuItemName.innerText=menuItemList[i].menuItemName;
            menuItemLeftSection.append(menuItemName);

            const menuItemPrice=document.createElement('h3');
            menuItemPrice.innerText=menuItemList[i].menuItemPrice+" Rs" ;
            menuItemLeftSection.append(menuItemPrice);

            menuItem.append(menuItemLeftSection);

            const menuItemRightSection=document.createElement('div');
            menuItemRightSection.classList.add("menuItemRightSection");

            const itemImageDiv=document.createElement('div');

            const itemImage=document.createElement('img');
            itemImage.setAttribute("src",menuItemList[i].imageFilePath);
            itemImage.setAttribute("alt","item-img");
            itemImage.classList.add("itemIcon");

            itemImageDiv.append(itemImage);
            menuItemRightSection.append(itemImageDiv);

            const itemButtonDiv=document.createElement('div');

            const addButton=document.createElement('button');
            addButton.setAttribute("type","button");
            addButton.classList.add("addButton");
            addButton.setAttribute("onclick",`addToCart(${menuItemList[i].menuItemNumber})`)
            addButton.innerText="ADD";

            itemButtonDiv.append(addButton);
            menuItemRightSection.append(itemButtonDiv);

            menuItem.append(menuItemRightSection);
            menuItemListDiv.append(menuItem);

        }

    }
    renderMenuItemList();

function addToCart(itemNumber)
{
    
    var alreadyPresent=false;
    for(let i=0;i<cartObject.cartItems.length;i+=1)
    {
        
        //console.log(item.itemNumber);
        //console.log(itemNumber);
        if(cartObject.cartItems[i].itemNumber==itemNumber)
        {
            cartObject.cartItems[i].qty+=1;
            alreadyPresent=true;
        }
    }
    if(!alreadyPresent)
    {
        cartObject.appendToCartItems(new cartObject.cartBuilder(menuItemList[itemNumber-1].menuItemName,menuItemList[itemNumber-1].menuItemNumber,menuItemList[itemNumber-1].menuItemPrice));
    }
    
        //console.log(cartItems[cartItems.length-1]);
    renderCart();
    
}

function removeFromCart(itemNumber){
    for(let i=0;i<cartObject.cartItems.length;i+=1)
    {
        
        if(cartObject.cartItems[i].itemNumber==itemNumber)
        {
            cartObject.cartItems[i].qty-=1;
            if(cartObject.cartItems[i].qty==0)
            {
                removeFromCartArray(i);
            }
            
        }
        
    }
    renderCart();

}

function removeFromCartArray(index)
{
    cartObject.cartItems.splice(index,1);
}
function getCartSubtotal()
{
    let subtotal=0,i=0;
    for(i=0;i<cartObject.cartItems.length;i+=1)
    {
        subtotal+=(cartObject.cartItems[i].qty*cartObject.cartItems[i].itemPrice);
    }
    return subtotal;

}
function getTotalCartItems()
{
    let total=0,i=0;
    for(i=0;i<cartObject.cartItems.length;i+=1)
    {
        total+=(cartObject.cartItems[i].qty);
    }
    return total;
}

function renderCart()
{
    document.getElementById("cartItemsList").innerHTML=`
        ${cartObject.cartItems.map(function(cartItem){
            return `
            <div class="cartItem">
                        <div class="cartItemName">
                            ${cartItem.itemName}
                        </div>
                        <div class="cartItemQuantity">
                            <div>
                                <button type="button" class="cartQtyEditButtons" onclick="removeFromCart(${cartItem.itemNumber})" >-</button>
                            </div>
                            <div>
                            ${cartItem.qty}
                            </div>
                            <div>
                                <button type="button" class="cartQtyEditButtons" onclick="addToCart(${cartItem.itemNumber})">+</button>
                            </div>
                        </div>
                        <div class="cartItemTotal">
                            ${cartItem.qty*cartItem.itemPrice}
                        </div>
                            
            </div>
            <hr height="1px" margin="5px" color="#EFEFEF">
            `
        }).join('')}
        <div class="cartSubtotal">
            <div class="subtotalHeading">
            <h3>Subtotal</h3>
            </div>
            <div class="subtotalAmount">
            ${getCartSubtotal()} Rs
            </div>
        <div>
    `
    const totalCartItems=document.getElementById("totalCartItems")
    totalCartItems.innerText=getTotalCartItems() + " item(s)";
}
