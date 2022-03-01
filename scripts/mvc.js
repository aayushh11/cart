function Model()
{
    
    this.recommendedList=["Recommended"];
    this.menuItemList=[];
    this.cart={

        cartItemList:[],
        

        isCartEmpty:true,

        

    };

    

    this.CartBuilder=function(itemName,itemNumber,itemPrice){
        this.itemNumber=itemNumber;
        this.itemName=itemName;
        this.itemPrice=itemPrice;
        this.qty=1;
        return this;

    };
    this.appendToCartItems=function(cartItem)
    {
        this.cart.cartItemList.push(cartItem);
    };

    this.menuItemList=[],

    this.MenuItemBuilder=function(itemNumber,itemName,itemPrice,imageFilePath,veg)
    {
        this.menuItemName=itemName;
        this.menuItemNumber=itemNumber;
        this.menuItemPrice=itemPrice;
        this.imageFilePath=imageFilePath;
        this.veg=veg;
    };

    this.menuItemList.push(new this.MenuItemBuilder(1,"Punjabi Samosa",50,"images/samosa.jpg",true));
    this.menuItemList.push(new this.MenuItemBuilder(2,"Italian Samosa",80,"images/samosa.jpg",true));
    this.menuItemList.push(new this.MenuItemBuilder(3,"Mexican Samosa",100,"images/samosa.jpg",true));

    //methods

    this.getCartArray=function()
    {
        return this.cart.cartItemList;
    };

    this.removeElementFromCartArray=function(index)
    {
        this.cart.cartItemList.splice(index,1);
        localStorage.setItem("myCart",JSON.stringify(model.cart));
    };

    this.setIsCartEmpty=function()
    {
        this.cart.isCartEmpty=false;
    };
    
    this.isItemAlreadyPresentInCart=function(itemNumber)
    {
        
        let i=0;
        for(i=0;i<this.cart.cartItemList.length;i+=1)
        {
            if(this.cart.cartItemList[i].itemNumber===itemNumber)
            {
                return itemNumber;
            }
        }
        return -1;
    };

    this.increaseCartItemQty=function(itemNumber)
    {
        let i=0;
        for(i=0;i<this.cart.cartItemList.length;i+=1)
        {
            if(this.cart.cartItemList[i].itemNumber===itemNumber)
            {
                this.cart.cartItemList[i].qty+=1;
                localStorage.setItem("myCart",JSON.stringify(this.cart));
            }
        }
    }

    this.createNewCartItem=function(itemNumber)
    {
        this.appendToCartItems(new this.CartBuilder(this.menuItemList[itemNumber-1].menuItemName,this.menuItemList[itemNumber-1].menuItemNumber,this.menuItemList[itemNumber-1].menuItemPrice));
        localStorage.setItem("myCart",JSON.stringify(this.cart));
    }

    this.removeItemFromCart=function(itemNumber)
    {
        for(let i=0;i<this.cart.cartItemList.length;i+=1)
        {
            
            if(this.cart.cartItemList[i].itemNumber===itemNumber)
            {
                this.cart.cartItemList[i].qty-=1;
                localStorage.setItem("myCart",JSON.stringify(this.cart));
                if(this.cart.cartItemList[i].qty==0)
                {
                    this.removeElementFromCartArray(i);
                    if(this.cart.cartItemList.length==0)
                    {
                        this.cart.isCartEmpty=true;
                        localStorage.setItem("myCart",JSON.stringify(this.cart));
                    }
                }
                
            }
            
        }
    }
    this.getRecommendedListItems=function()
    {
        return this.recommendedList;
    }

    this.getIsCartEmpty=function()
    {
        return this.cart.isCartEmpty;
    }

    this.getCartLength=function()
    {
        return this.cart.cartItemList.length;
    }
    
    this.getMenuLength=function()
    {
        return this.menuItemList.length;

    }
    this.getMenuItemList=function()
    {
        return this.menuItemList;
    }
    
    

}

const model=new Model();



function RecommendedListView()
{

    this.init=function()
    {
        this.recommendedList = document.getElementById("recommendationList");
        
        this.render();

    };
    this.render =function()
    {
        const unorderedRecommendedList=document.createElement('ul');
        const recommendedListItems=controller.getRecommendedListItems(); //Array of recommendedlist items

        recommendedListItems.forEach(function(recommendedListItem){

            const recommendedListItemName =document.createElement('li'); //li elment of the list
            recommendedListItemName.innerText=recommendedListItem;
            unorderedRecommendedList.append(recommendedListItemName);

        });

        this.recommendedList.append(unorderedRecommendedList);

    }




};
const recommendedListView=new RecommendedListView();

function MenuItemListView()
{
    
    this.init=function()
    {
        this.menuItemListDiv=document.getElementById("menuItemList");
        this.render();
    };
    this.renderMenuHeading=function()
    {
        const menuHeadingDiv =document.createElement('div');
            menuHeadingDiv.classList.add("menuHeading");
            const menuHeadingText=document.createElement('h1');
            menuHeadingText.innerText="Recommended";
            menuHeadingDiv.append(menuHeadingText);
            return menuHeadingDiv;
    },
    this.appendTotalNoOfItems=function(menuHeadingDiv)
    {
        const menuSize=document.createElement('p')
        menuSize.innerText=controller.getMenuSize()+" items";
        menuHeadingDiv.append(menuSize);
    },
    this.getVegImage=function(menuItemObj)
    {
        const vegImage=document.createElement('img');
        vegImage.setAttribute("src",menuItemObj.veg ? 'images/veg.jpg' :'');
        vegImage.setAttribute("alt","category-icon")
        vegImage.classList.add("vegIcon");
        return vegImage;

    },
    this.getMenuItemName= function(menuItemObj)
    {
        const menuItemName=document.createElement('h3');
        menuItemName.innerText=menuItemObj.menuItemName;
        return menuItemName;
    },
    this.getMenuItemPrice= function(menuItemObj)
    {
        const menuItemPrice=document.createElement('h3');
        menuItemPrice.innerText=menuItemObj.menuItemPrice+" Rs" ;
        return menuItemPrice;
    },
    this.getMenuItemLeftSection=function(menuItemObj)
    {
        const menuItemLeftSection=document.createElement('div');
        menuItemLeftSection.classList.add("menuItemLeftSection");
        menuItemLeftSection.append(this.getVegImage(menuItemObj));
        menuItemLeftSection.append(this.getMenuItemName(menuItemObj));
        menuItemLeftSection.append(this.getMenuItemPrice(menuItemObj));
        return menuItemLeftSection;
    },
    this.renderItemImageDiv =function(menuItemObj)
    {
        const itemImageDiv=document.createElement('div');
        const itemImage=document.createElement('img');
        itemImage.setAttribute("src",menuItemObj.imageFilePath);
        itemImage.setAttribute("alt","item-img");
        itemImage.classList.add("itemIcon");
        itemImageDiv.append(itemImage);
        return itemImageDiv;
    },
    this.renderAddButtonDiv =function(menuItemObj)
    {
        const itemButtonDiv=document.createElement('div');
        const addButton=document.createElement('button');
        addButton.setAttribute("type","button");
        addButton.classList.add("addButton");
        addButton.setAttribute("onclick",`controller.addToCart(${menuItemObj.menuItemNumber})`);
        addButton.innerText="ADD";
        itemButtonDiv.append(addButton);
        return itemButtonDiv;
    },
    this.getMenuItemRightSection= function(menuItemObj)
    {
        const menuItemRightSection=document.createElement('div');
        menuItemRightSection.classList.add("menuItemRightSection");
        menuItemRightSection.append(this.renderItemImageDiv(menuItemObj));
        menuItemRightSection.append(this.renderAddButtonDiv(menuItemObj));
        return menuItemRightSection;

    },
    this.appendMenuItem= function(menuItemObj)
    {
        const menuItem =document.createElement('div');
        menuItem.classList.add("menuItem");
        const menuItemLeftSection=this.getMenuItemLeftSection(menuItemObj);
        menuItem.append(menuItemLeftSection);
        const menuItemRightSection=this.getMenuItemRightSection(menuItemObj);
        menuItem.append(menuItemRightSection);
        this.menuItemListDiv.append(menuItem);
    },
    this.render=function()
    {
        
        this.menuItemListDiv.innerHTML="";
        const menuHeadingDiv=this.renderMenuHeading();
        this.appendTotalNoOfItems(menuHeadingDiv);
        this.menuItemListDiv.append(menuHeadingDiv);  

        this.renderMenuItems =function ()
        {
            const menuItemList=controller.getMenuItemList();
            let i=0;
            for(i=0;i<controller.getMenuSize();i+=1)
            {
                this.appendMenuItem(menuItemList[i]);
            }

        }
        this.renderMenuItems();
    }
    
            
            
           

        

    
    


};
const menuItemListView=new MenuItemListView();

function CartView()
{
    this.init=function()
    {
        this.cartSection=document.getElementById("cartSection");
        this.renderCart();
    };

    this.renderCartImage=function()
    {
        const cartImageDiv=document.createElement('div');
        cartImageDiv.className="cartStatusImage";
        const cartImage=document.createElement('img');
        cartImage.setAttribute("src","images/cart.png")
        cartImageDiv.append(cartImage);
        this.cartSection.append(cartImageDiv);

       

    };
    this.renderCartHeading=function()
    {
        const cartHeading=document.createElement('h1');
        cartHeading.innerText="Cart";
        return cartHeading;
    };
    this.renderCartSize=function ()
    {
        const cartSize=document.createElement('p');
        cartSize.innerText=controller.getTotalCartItems()+" items";
        return cartSize;
    };
    this.renderCartHeadingSection=function()
    {
        const cartHeadingSection=document.createElement('div');
        cartHeadingSection.classList.add("cartHeadingSection");
        cartHeadingSection.append(this.renderCartHeading());
        cartHeadingSection.append(this.renderCartSize());
        return cartHeadingSection;
    };
    this.renderCartItemName = function(cartItemObj)
    {
        const cartItemName=document.createElement('div');
        cartItemName.classList.add("cartItemName");
        cartItemName.innerText=cartItemObj.itemName;
        return cartItemName;
    };
    this.renderMinusButton =function(cartItemObj)
    {
        const minusButtonDiv=document.createElement('div');
        const minusButton=document.createElement('button');
        minusButton.classList.add("cartQtyEditButtons");
        minusButton.setAttribute("onclick",`controller.removeFromCart(${cartItemObj.itemNumber})`);
        minusButton.innerText="-";
        minusButtonDiv.append(minusButton);
        return minusButtonDiv;
    };
    this.renderPlusButton =function(cartItemObj)
    {
        const plusButtonDiv=document.createElement('div');
        const plusButton=document.createElement('button');
        plusButton.classList.add("cartQtyEditButtons");
        plusButton.setAttribute("onclick",`controller.addToCart(${cartItemObj.itemNumber})`);
        plusButton.innerText="+";
        plusButtonDiv.append(plusButton);
        return plusButtonDiv;

    };
    this.renderIndividualItemQuantity =function(cartItemObj)
    {
        const itemQuantity=document.createElement('div');
        itemQuantity.innerText=cartItemObj.qty;
        itemQuantity.classList.add("itemQuantity");
        return itemQuantity;
    };
    this.renderCartItemQuantity = function(cartItemObj)
    {
        const cartItemQuantity=document.createElement('div');
        cartItemQuantity.classList.add("cartItemQuantity");
        cartItemQuantity.append(this.renderMinusButton(cartItemObj));
        cartItemQuantity.append(this.renderIndividualItemQuantity(cartItemObj));
        cartItemQuantity.append(this.renderPlusButton(cartItemObj));
        return cartItemQuantity;
    };
    this.renderCartItemTotal =function(cartItemObj)
    {
        const cartItemTotal=document.createElement('div');
        cartItemTotal.classList.add("cartItemTotal");
        cartItemTotal.innerText=`${cartItemObj.qty*cartItemObj.itemPrice}`;
        return cartItemTotal;
    };
    this.renderHorizontalRuler =function()
    {
        const horizontalRuler=document.createElement('HR');
        horizontalRuler.className='cartRuler';
        return horizontalRuler;
    };
    this.renderCartItem=function(cartItemObj)
    {
        const cartItem=document.createElement('div');
        cartItem.classList.add("cartItem");
        cartItem.append(this.renderCartItemName(cartItemObj));
        cartItem.append(this.renderCartItemQuantity(cartItemObj));
        cartItem.append(this.renderCartItemTotal(cartItemObj));
        this.cartSection.append(cartItem);
        this.cartSection.append(this.renderHorizontalRuler());
    };
    this.renderCartItemList=function()
    {
        this.cartSection.append(this.renderCartHeading());

        this.renderCartItems= function()
        {
            const cartItemObjects=controller.getCartArray();
            for(i=0;i<controller.getCartSize();i+=1)
            {
                this.renderCartItem(cartItemObjects[i]);
            }
        }
        this.renderCartItems();

        
        
        
        
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
        



        
        
        
        

    };
    this.renderCart=function()
    {
        if(controller.isCartEmpty())
        {
            this.cartSection.innerHTML="";
            this.renderCartImage();
        }
        else
        {
            this.cartSection.innerHTML="";
            this.renderCartItemList()
        }
    };

}
const cartView=new CartView();

const controller={

    init(){
        if(localStorage.length!==0)
        {
             model.cart=JSON.parse(localStorage.getItem("myCart"));
        }
        recommendedListView.init();
        menuItemListView.init();
        cartView.init();
       
    },
    



    //methods
    getRecommendedListItems()
    {
        //console.log(model.recommendedList);
        return model.getRecommendedListItems();
    },

    getMenuSize()
    {
        return model.getMenuLength();

    },

    getMenuItemList()
    {
        return model.getMenuItemList();
    },
    isCartEmpty()
    {
        return model.getIsCartEmpty();
    },
    getCartSize()
    {
        return model.getCartLength();
    },
    getCartArray()
    {
        return model.getCartArray();
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
       
        model.setIsCartEmpty(); //set iscartEmpty to false
        var alreadyPresent=false;

        if(model.isItemAlreadyPresentInCart(itemNumber)===-1)
        {
            model.createNewCartItem(itemNumber);
        }
        else
        {
            model.increaseCartItemQty(itemNumber);
        }

        
            
        cartView.init();
        menuItemListView.init();
    
    },
    removeFromCart(itemNumber){
        
        model.removeItemFromCart(itemNumber);
        
        //renderCart();
        cartView.init();
        menuItemListView.init();
    
    },

    isPresentInCart(itemNumber){
       
        let isPresent=false;
        model.getCartArray().forEach((cartItem) =>{
            if(cartItem.itemNumber===itemNumber)
            {
                isPresent=true;
            }
        })
        return false;

    },
    getItemQty(itemNumber)
    {
        let qty=0;
        model.getCartArray().forEach((cartItem) =>{
            if(cartItem.itemNumber===itemNumber)
            {
                qty= cartItem.qty;
            }
        })
        return qty;
    }


};

controller.init();