    import { IProduct } from "../modules/Products/Components/Upload product/Models/IProduct";

    export class cartUtil
    {
        private static PRODUCT_TAX:number=5.0;
        public static calcTotal(cartItems:IProduct[]):number
            {
                let tempTotal:number=0;
                for(let cartItem of cartItems)
                {
                    tempTotal+=(Number(cartItem.price)*cartItem.qty)
                }
                return tempTotal;
            }
        
            public static calcTax(cartItems:IProduct[]):number{
                return cartUtil.calcTotal(cartItems)*cartUtil.PRODUCT_TAX/100;
            }

            public static grandTotal(cartItems:IProduct[]):number
            {
                return cartUtil.calcTotal(cartItems)+cartUtil.calcTax(cartItems);
            }
        
    }