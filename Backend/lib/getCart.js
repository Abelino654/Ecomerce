const Cart = require("../Models/Cart");

const getCart = async(userId,guestId)=>{
    if(userId){
        return  await Cart.findOne({userId})
    }else if(guestId){
        return await Cart.findOne({guestId})
    }

    return null;
}


module.exports  =  {getCart}