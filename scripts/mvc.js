/*const model={

    recommendedList:["Recommended"],

    addToRecommendedList : function(itemName)
    {
        this.recommendedList.push(
            {
                itemName:itemName,
               
            }
            );
    },
    
    menuItemList:[
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
    ],

    

    cart:{

        cartItemList:[],
        isCartEmpty:true,

        cartBuilder:function(itemName,itemNumber,itemPrice){
            this.itemNumber=itemNumber;
            this.itemName=itemName;
            this.itemPrice=itemPrice;
            this.qty=1;
            return this;
    
        },
        appendToCartItems:function(cartItem)
        {
            this.cartItemList.push(cartItem);
        }

    },

    menuItemList:[
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
    ]



};
*/

function createModel()
{
    this.recommendedList=["Recommended"],
    
    this.cart={

        cartItemList:[],

        isCartEmpty:true,

        cartBuilder:function(itemName,itemNumber,itemPrice){
            this.itemNumber=itemNumber;
            this.itemName=itemName;
            this.itemPrice=itemPrice;
            this.qty=1;
            return this;
    
        },
        appendToCartItems:function(cartItem)
        {
            this.cartItemList.push(cartItem);
        }

    };

    this.menuItemList=[
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
    ]

}

const model=new createModel();

const recommendedListView={

    init(){
        this.recommendedList = document.getElementById("recommendationList");
        
        this.render();

    },
    render()
    {
        const unorderedRecommendedList=document.createElement('ul');
        const recommendedListItems=controller.getRecommendedListItems(); //Array of recommendedlist items

        recommendedListItems.map(function(recommendedListItem){

            const recommendedListItemName =document.createElement('li'); //li elment of the list
            recommendedListItemName.innerText=recommendedListItem;
            unorderedRecommendedList.append(recommendedListItemName);

        });

        this.recommendedList.append(unorderedRecommendedList);

    }




};

const menuItemListView={
    
    init()
    {
        this.menuItemList=document.getElementById("menuItemList");
        this.render();
    },

    

    

    

    

    render()
    {
        this.renderMenuHeading=function()
        {
            const menuHeadingDiv =document.createElement('div');
            menuHeadingDiv.classList.add("menuHeading");
            const menuHeadingText=document.createElement('h1');
            menuHeadingText.innerText="Recommended";
            menuHeadingDiv.append(menuHeadingText);

            appendTotalNoOfItems=function()
            {
                const menuSize=document.createElement('p')
                menuSize.innerText=controller.getMenuSize()+" items";
                menuHeadingDiv.append(menuSize);
            }
            appendTotalNoOfItems();
            this.menuItemList.append(menuHeadingDiv);

        }
        this.renderMenuHeading();

        this.appendMenuItem=function (menuItemObj){

            const menuItem =document.createElement('div');
            menuItem.classList.add("menuItem");

            function menuLeftSection()
            {
                const menuItemLeftSection=document.createElement('div');
                menuItemLeftSection.classList.add("menuItemLeftSection");

                const vegImage=document.createElement('img');
                vegImage.setAttribute("src",menuItemObj.veg ? 'images/veg.jpg' :'');
                vegImage.setAttribute("alt","category-icon")
                vegImage.classList.add("vegIcon");
                menuItemLeftSection.append(vegImage);

                const menuItemName=document.createElement('h3');
                menuItemName.innerText=menuItemObj.menuItemName;
                menuItemLeftSection.append(menuItemName);

                const menuItemPrice=document.createElement('h3');
                menuItemPrice.innerText=menuItemObj.menuItemPrice+" Rs" ;
                menuItemLeftSection.append(menuItemPrice);

                menuItem.append(menuItemLeftSection);

            }
            menuLeftSection();

            function menuRightSection()
            {
                const menuItemRightSection=document.createElement('div');
                menuItemRightSection.classList.add("menuItemRightSection");
    
                const itemImageDiv=document.createElement('div');
    
                const itemImage=document.createElement('img');
                itemImage.setAttribute("src",menuItemObj.imageFilePath);
                itemImage.setAttribute("alt","item-img");
                itemImage.classList.add("itemIcon");
    
                itemImageDiv.append(itemImage);
                menuItemRightSection.append(itemImageDiv);
    
                const itemButtonDiv=document.createElement('div');
    
                const addButton=document.createElement('button');
                addButton.setAttribute("type","button");
                addButton.classList.add("addButton");
                addButton.setAttribute("onclick",`controller.addToCart(${menuItemObj.menuItemNumber})`)
                addButton.innerText="ADD";
    
                itemButtonDiv.append(addButton);
                menuItemRightSection.append(itemButtonDiv);
    
                menuItem.append(menuItemRightSection);
            }
            menuRightSection();
            this.menuItemList.append(menuItem);

            
        }

        this.renderMenuItems =function ()
        {
            const menuItemList=controller.getMenuItemList();
            menuItemList.map(this.appendMenuItem);

        }
        this.renderMenuItems();

    }
    


};

const cartView={
    init()
    {
        this.cartSection=document.getElementById("cartSection");
        this.renderCart();
    },

    renderCartImage:function()
    {
        this.cartSection.innerHTML=`
        <div class="cartStatusImage">
            <img src="images/cart.png" alt="cart-img"  >
        </div>
        `

    },
   
    renderCartItems:function()
    {
        this.renderCartHeading=function ()
        {
            const cartHeadingSection=document.createElement('div');
            cartHeadingSection.classList.add("cartHeadingSection");
            const cartHeading=document.createElement('h1');
            cartHeading.innerText="Cart";
            cartHeadingSection.append(cartHeading);
            const cartSize=document.createElement('p');
            cartSize.innerText=controller.getTotalCartItems()+" items";
            cartHeadingSection.append(cartSize);
            this.cartSection.append(cartHeadingSection);

        }
        this.renderCartHeading();

        this.appendCartItem= function (cartItemObj)
        {
            const cartItem=document.createElement('div');
            cartItem.classList.add("cartItem");

                const cartItemName=document.createElement('div');
                cartItemName.classList.add("cartItemName");
                cartItemName.innerText=cartItemObj.itemName;

                cartItem.append(cartItemName);

                const cartItemQuantity=document.createElement('div');
                cartItemQuantity.classList.add("cartItemQuantity");

                    const minusButtonDiv=document.createElement('div');
                        const minusButton=document.createElement('button');
                        minusButton.classList.add("cartQtyEditButtons");
                        minusButton.setAttribute("onclick",`controller.removeFromCart(${cartItemObj.itemNumber})`);
                        minusButton.innerText="-";
                        minusButtonDiv.append(minusButton);
                    cartItemQuantity.append(minusButtonDiv);


                    const itemQuantity=document.createElement('div');
                    itemQuantity.innerText=cartItemObj.qty;
                    cartItemQuantity.append(itemQuantity);

                    const plusButtonDiv=document.createElement('div');
                        const plusButton=document.createElement('button');
                        plusButton.classList.add("cartQtyEditButtons");
                        plusButton.setAttribute("onclick",`controller.addToCart(${cartItemObj.itemNumber})`);
                        plusButton.innerText="+";
                        plusButtonDiv.append(plusButton);
                    cartItemQuantity.append(plusButtonDiv);
                cartItem.append(cartItemQuantity);

                const cartItemTotal=document.createElement('div');
                cartItemTotal.classList.add("cartItemTotal");
                cartItemTotal.innerText=`${cartItemObj.qty*cartItemObj.itemPrice}`;
                cartItem.append(cartItemTotal);

                
                //cartItem.append(horizontalRuler);

                
                //cartItem.append(subtotal);
                this.cartSection.append(cartItem);

                const horizontalRuler=document.createElement('HR');
                horizontalRuler.setAttribute("height","1px");
                horizontalRuler.setAttribute("margin","5px");

                this.cartSection.append(horizontalRuler);
   
        }

        this.renderCartItemList= function()
        {
            const cartItemObjects=controller.getCartArray();

            cartItemObjects.map(this.appendCartItem);
        }
        this.renderCartItemList();
        const subtotal=document.createElement('div');
            subtotal.innerHTML=`
            <div class="subtotalHeading">
            <h3>Subtotal</h3>
            </div>
            <div class="subtotalAmount">
            ${controller.getCartSubtotal()} Rs
            </div>
            `;
            this.cartSection.append(subtotal);
        



        
        
        
        

    },
    renderCart:function()
    {
        if(controller.isCartEmpty())
        {
            this.cartSection.innerHTML="";
            this.renderCartImage();
        }
        else
        {
            this.cartSection.innerHTML="";
            this.renderCartItems()
        }
    }

}

const controller={

    init(){
        recommendedListView.init();
        menuItemListView.init();
        cartView.init();
    },
    



    //methods
    getRecommendedListItems()
    {
        return model.recommendedList;
    },

    getMenuSize()
    {
        return model.menuItemList.length;

    },

    getMenuItemList()
    {
        return model.menuItemList;
    },
    isCartEmpty()
    {
        return model.cart.isCartEmpty;
    },
    getCartSize()
    {
        return model.cart.cartItemList.length;
    },
    getCartArray()
    {
        return model.cart.cartItemList;
    },

    
    getTotalCartItems()
    {
        let total=0,i=0;
        for(i=0;i<model.cart.cartItemList.length;i+=1)
        {
            total+=(model.cart.cartItemList[i].qty);
        }
        return total;
    },

    getCartSubtotal()
    {
        let subtotal=0,i=0;
        for(i=0;i<model.cart.cartItemList.length;i+=1)
        {
            subtotal+=(model.cart.cartItemList[i].qty*model.cart.cartItemList[i].itemPrice);
        }
        return subtotal;

    },

    addToCart(itemNumber)
    {
        model.cart.isCartEmpty=false;
        var alreadyPresent=false;
        for(let i=0;i<model.cart.cartItemList.length;i+=1)
        {
            
            //console.log(item.itemNumber);
            //console.log(itemNumber);
            if(model.cart.cartItemList[i].itemNumber==itemNumber)
            {
                model.cart.cartItemList[i].qty+=1;
                alreadyPresent=true;
            }
        }
        if(!alreadyPresent)
        {
            model.cart.appendToCartItems(new model.cart.cartBuilder(model.menuItemList[itemNumber-1].menuItemName,model.menuItemList[itemNumber-1].menuItemNumber,model.menuItemList[itemNumber-1].menuItemPrice));
        }
        
            
        cartView.init();
    
    },
    removeFromCart(itemNumber){
        for(let i=0;i<model.cart.cartItemList.length;i+=1)
        {
            
            if(model.cart.cartItemList[i].itemNumber==itemNumber)
            {
                model.cart.cartItemList[i].qty-=1;
                if(model.cart.cartItemList[i].qty==0)
                {
                    this.removeFromCartArray(i);
                    if(model.cart.cartItemList.length==0)
                    {
                        model.cart.isCartEmpty=true;
                    }
                }
                
            }
            
        }
        //renderCart();
        cartView.init();
    
    },
    removeFromCartArray(index)
    {
        model.cart.cartItemList.splice(index,1);
    }


};

controller.init();