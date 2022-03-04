'use strict'

function Cart(itemName,itemNumber,itemPrice)
{
    this.itemNumber=itemNumber;
    this.itemName=itemName;
    this.itemPrice=itemPrice;
    this.qty=1;
    return this;
}

function MenuItem(itemNumber,itemName,itemPrice,imageFilePath,veg)
{
    this.menuItemName=itemName;
    this.menuItemNumber=itemNumber;
    this.menuItemPrice=itemPrice;
    this.imageFilePath=imageFilePath;
    this.veg=veg;
}

function Model()
{
    const fetchPromiseCallback =function(resolve)
    {
        setTimeout(function(){
            if(localStorage.getItem("myCart")!==null)
            {
                const fetchedData=JSON.parse(localStorage.getItem("myCart"));
                resolve(fetchedData);
                
            }
            else
            {
                resolve(null);
            }
            

        },2000);
    };

    const fetchFromLocalStorage =function()
    {
        return new Promise(fetchPromiseCallback);
        
    }
    const setFetchedDataToCart=function(fetchedData)
    {
        this.cart=fetchedData;
        controller.view.cartView.init();
    }
    this.init=function()
    {
        const bindedSetFetchedDataToCart=setFetchedDataToCart.bind(this);
        fetchFromLocalStorage().then(bindedSetFetchedDataToCart);
    }


    this.recommendedList=["Recommended"];
    this.menuItemList=[];
    this.cart={

        cartItemList:[],
        

        isCartEmpty:true,

        

    };

    

    
    this.appendToCartItems=function(cartItem)
    {
        this.cart.cartItemList.push(cartItem);
    };

    this.menuItemList=[],

    

    this.menuItemList.push(new MenuItem(1,"Punjabi Samosa",50,"images/samosa.jpg",true));
    this.menuItemList.push(new MenuItem(2,"Italian Samosa",80,"images/samosa.jpg",true));
    this.menuItemList.push(new MenuItem(3,"Mexican Samosa",100,"images/samosa.jpg",true));

    //methods

    this.getCartArray=function()
    {
        return this.cart.cartItemList;
    };

    this.removeElementFromCartArray=function(index)
    {
        this.cart.cartItemList.splice(index,1);
        localStorage.setItem("myCart",JSON.stringify(this.cart));
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
                return true;
            }
        }
        return false;
        /*
        if(this.cart.cartItemList.find( cartItem => {cartItem.itemNumber===itemNumber})===undefined)
        {
            return false;
        }
        else{
            return true;
        }
        */
        
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
        this.appendToCartItems(new Cart(this.menuItemList[itemNumber-1].menuItemName,this.menuItemList[itemNumber-1].menuItemNumber,this.menuItemList[itemNumber-1].menuItemPrice));
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

//const model=new Model();



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
//const recommendedListView=new RecommendedListView();

function MenuItemListView()
{
    
    this.init=function()
    {
        this.menuItemListDiv=document.getElementById("menuItemList");
        this.render();
    };
    const renderMenuHeading=function()
    {
        const menuHeadingDiv =document.createElement('div');
            menuHeadingDiv.classList.add("menuHeading");
            const menuHeadingText=document.createElement('h1');
            menuHeadingText.innerText="Recommended";
            menuHeadingDiv.append(menuHeadingText);
            return menuHeadingDiv;
    };
    const appendTotalNoOfItems =function(menuHeadingDiv)
    {
        const menuSize=document.createElement('p')
        menuSize.innerText=controller.getMenuSize()+" items";
        menuHeadingDiv.append(menuSize);
    };
    const getVegImage=function(menuItemObj)
    {
        const vegImage=document.createElement('img');
        vegImage.setAttribute("src",menuItemObj.veg ? 'images/veg.jpg' :'');
        vegImage.setAttribute("alt","category-icon")
        vegImage.classList.add("vegIcon");
        return vegImage;

    };
    const getMenuItemName= function(menuItemObj)
    {
        const menuItemName=document.createElement('h3');
        menuItemName.innerText=menuItemObj.menuItemName;
        return menuItemName;
    };
    const getMenuItemPrice= function(menuItemObj)
    {
        const menuItemPrice=document.createElement('h3');
        menuItemPrice.innerText=menuItemObj.menuItemPrice+" Rs" ;
        return menuItemPrice;
    };
    const getMenuItemLeftSection=function(menuItemObj)
    {
        const menuItemLeftSection=document.createElement('div');
        menuItemLeftSection.classList.add("menuItemLeftSection");
        menuItemLeftSection.append(getVegImage(menuItemObj));
        menuItemLeftSection.append(getMenuItemName(menuItemObj));
        menuItemLeftSection.append(getMenuItemPrice(menuItemObj));
        return menuItemLeftSection;
    };
    const renderItemImageDiv =function(menuItemObj)
    {
        const itemImageDiv=document.createElement('div');
        const itemImage=document.createElement('img');
        itemImage.setAttribute("src",menuItemObj.imageFilePath);
        itemImage.setAttribute("alt","item-img");
        itemImage.classList.add("itemIcon");
        itemImageDiv.append(itemImage);
        return itemImageDiv;
    };
    const renderAddButtonDiv =function(menuItemObj)
    {
        const itemButtonDiv=document.createElement('div');
        const addButton=document.createElement('button');
        addButton.setAttribute("type","button");
        addButton.classList.add("addButton");
        addButton.setAttribute("onclick",`controller.addToCart(${menuItemObj.menuItemNumber})`);
        addButton.innerText="ADD";
        itemButtonDiv.append(addButton);
        return itemButtonDiv;
    };
    const getMenuItemRightSection= function(menuItemObj)
    {
        const menuItemRightSection=document.createElement('div');
        menuItemRightSection.classList.add("menuItemRightSection");
        menuItemRightSection.append(renderItemImageDiv(menuItemObj));
        menuItemRightSection.append(renderAddButtonDiv(menuItemObj));
        return menuItemRightSection;

    };
    const appendMenuItem= function(menuItemObj)
    {
        const menuItem =document.createElement('div');
        menuItem.classList.add("menuItem");
        const menuItemLeftSection=getMenuItemLeftSection(menuItemObj);
        menuItem.append(menuItemLeftSection);
        const menuItemRightSection=getMenuItemRightSection(menuItemObj);
        menuItem.append(menuItemRightSection);
        this.menuItemListDiv.append(menuItem);
    };
    this.render=function()
    {
        
        this.menuItemListDiv.innerHTML="";
        const menuHeadingDiv=renderMenuHeading();
        appendTotalNoOfItems(menuHeadingDiv);
        this.menuItemListDiv.append(menuHeadingDiv);  

        
            const menuItemList=controller.getMenuItemList();
            menuItemList.forEach(appendMenuItem,this);
            

        
    };
    
            
            
           

        

    
    


};
//const menuItemListView=new MenuItemListView();

function CartView()
{
    this.init=function()
    {
        this.cartSection=document.getElementById("cartSection");
        this.renderCart();
    };

    //Helper Functions
    const getCartImage=function()
    {
        const cartImageDiv=document.createElement('div');
        cartImageDiv.className="cartStatusImage";
        const cartImage=document.createElement('img');
        cartImage.setAttribute("src","images/cart.png")
        cartImageDiv.append(cartImage);
        return cartImageDiv;

       

    };
    const createCartHeading=function()
    {
        const cartHeading=document.createElement('h1');
        cartHeading.innerText="Cart";
        return cartHeading;
    };
    const createCartSize=function ()
    {
        const cartSize=document.createElement('p');
        cartSize.innerText=controller.getTotalCartItems()+" items";
        return cartSize;
    };
    const createCartHeadingSection=function()
    {
        const cartHeadingSection=document.createElement('div');
        cartHeadingSection.classList.add("cartHeadingSection");
        cartHeadingSection.append(createCartHeading());
        cartHeadingSection.append(createCartSize());
        return cartHeadingSection;
    };
    const createCartItemName = function(cartItemObj)
    {
        const cartItemName=document.createElement('div');
        cartItemName.classList.add("cartItemName");
        cartItemName.innerText=cartItemObj.itemName;
        return cartItemName;
    };
    const renderMinusButton =function(cartItemObj)
    {
        const minusButtonDiv=document.createElement('div');
        const minusButton=document.createElement('button');
        minusButton.classList.add("cartQtyEditButtons");
        minusButton.setAttribute("onclick",`controller.removeFromCart(${cartItemObj.itemNumber})`);
        minusButton.innerText="-";
        minusButtonDiv.append(minusButton);
        return minusButtonDiv;
    };
    const renderPlusButton =function(cartItemObj)
    {
        const plusButtonDiv=document.createElement('div');
        const plusButton=document.createElement('button');
        plusButton.classList.add("cartQtyEditButtons");
        plusButton.setAttribute("onclick",`controller.addToCart(${cartItemObj.itemNumber})`);
        plusButton.innerText="+";
        plusButtonDiv.append(plusButton);
        return plusButtonDiv;

    };
    const renderIndividualItemQuantity =function(cartItemObj)
    {
        const itemQuantity=document.createElement('div');
        itemQuantity.innerText=cartItemObj.qty;
        itemQuantity.classList.add("itemQuantity");
        return itemQuantity;
    };
    const renderCartItemQuantity = function(cartItemObj)
    {
        const cartItemQuantity=document.createElement('div');
        cartItemQuantity.classList.add("cartItemQuantity");
        cartItemQuantity.append(renderMinusButton(cartItemObj));
        cartItemQuantity.append(renderIndividualItemQuantity(cartItemObj));
        cartItemQuantity.append(renderPlusButton(cartItemObj));
        return cartItemQuantity;
    };
    const renderCartItemTotal =function(cartItemObj)
    {
        const cartItemTotal=document.createElement('div');
        cartItemTotal.classList.add("cartItemTotal");
        cartItemTotal.innerText=`${cartItemObj.qty*cartItemObj.itemPrice}`;
        return cartItemTotal;
    };
    const renderHorizontalRuler =function()
    {
        const horizontalRuler=document.createElement('HR');
        horizontalRuler.className='cartRuler';
        return horizontalRuler;
    };
    const renderCartItem=function(cartItemObj)
    {
        const cartItem=document.createElement('div');
        cartItem.classList.add("cartItem");
        cartItem.append(createCartItemName(cartItemObj));
        cartItem.append(renderCartItemQuantity(cartItemObj));
        cartItem.append(renderCartItemTotal(cartItemObj));
        this.append(cartItem);
        this.append(renderHorizontalRuler());
    };
    const createSubtotal=function()
    {
        const subtotal=document.createElement('div');
        subtotal.className="cartSubtotal";
        const subTotalHeading=document.createElement('h3');
        subTotalHeading.className="subTotalHeading";
        subTotalHeading.innerText="Subtotal";
        subtotal.append(subTotalHeading);

        const subtotalAmount=document.createElement('div');
        subtotalAmount.innerText=controller.getCartSubtotal()+" Rs";
        subtotal.append(subtotalAmount);
        return subtotal;
    }
    const renderCartItemList=function()
    {
        const cartItemList=document.createElement('div');
        cartItemList.append(createCartHeadingSection());

        const cartItemObjects=controller.getCartArray();
        cartItemObjects.forEach(renderCartItem,cartItemList);
           
        cartItemList.append(createSubtotal());
        return cartItemList;

    };
    this.renderCart=function()
    {
        if(controller.isCartEmpty())
        {
            this.cartSection.innerHTML="";
            this.cartSection.append(getCartImage());
        }
        else
        {
            this.cartSection.innerHTML="";
            this.cartSection.append(renderCartItemList());
        }
    };

}
function View()
{
    this.recommendedListView=new RecommendedListView();
    this.menuItemListView=new MenuItemListView();
    this.cartView=new CartView();
}
//const cartView=new CartView();

function Controller(model,view)
{
    this.model=model;
    this.view=view;
    
    
    this.init=function(){
        
        this.model.init();
        this.view.recommendedListView.init();
        this.view.menuItemListView.init();
        
       
    };
    



    //methods
    this.getRecommendedListItems=function()
    {
        //console.log(model.recommendedList);
        return this.model.getRecommendedListItems();
    },

    this.getMenuSize=function()
    {
        return this.model.getMenuLength();

    };

    this.getMenuItemList=function()
    {
        return this.model.getMenuItemList();
    };
    this.isCartEmpty=function()
    {
        return this.model.getIsCartEmpty();
    };

    this.getCartSize=function()
    {
        return this.model.getCartLength();
    },
    this.getCartArray=function()
    {
        return this.model.getCartArray();
    },

    
    this.getTotalCartItems=function()
    {
        let total=0,i=0;
        for(i=0;i<this.model.cart.cartItemList.length;i+=1)
        {
            total+=(this.model.cart.cartItemList[i].qty);
        }
        return total;
    },

    this.getCartSubtotal=function()
    {
        let subtotal=0,i=0;
        for(i=0;i<this.model.cart.cartItemList.length;i+=1)
        {
            subtotal+=(this.model.cart.cartItemList[i].qty*this.model.cart.cartItemList[i].itemPrice);
        }
        return subtotal;

    },

    this.addToCart=function(itemNumber)
    {
       
        this.model.setIsCartEmpty(); //set iscartEmpty to false

        if(!this.model.isItemAlreadyPresentInCart(itemNumber))
        {
            this.model.createNewCartItem(itemNumber);
        }
        else
        {
            this.model.increaseCartItemQty(itemNumber);
        }

        
            
        this.view.cartView.init();
        this.view.menuItemListView.init();
    
    },
    this.removeFromCart=function(itemNumber){
        
        this.model.removeItemFromCart(itemNumber);
        
        //renderCart();
        this.view.cartView.init();
        this.view.menuItemListView.init();
    
    },

    this.isPresentInCart=function(itemNumber){
       
        let isPresent=false;
        this.model.getCartArray().forEach((cartItem) =>{
            if(cartItem.itemNumber===itemNumber)
            {
                isPresent=true;
            }
        })
        return isPresent;

    },
    this.getItemQty=function(itemNumber)
    {
        let qty=0;
        this.model.getCartArray().forEach((cartItem) =>{
            if(cartItem.itemNumber===itemNumber)
            {
                qty= cartItem.qty;
            }
        })
        return qty;
    }


};
const controller=new Controller(new Model(),new View());

controller.init();