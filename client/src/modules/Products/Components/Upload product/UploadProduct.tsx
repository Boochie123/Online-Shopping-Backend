import React, { useState } from "react";
import '../../../../index.css';
import { IProduct } from "./Models/IProduct";
import { useDispatch } from "react-redux";
import { dispatchAction } from "../../../../redux/store";
import { uploadProduct } from "../../../../redux/Products/productSlice";

interface IState
{
    product:IProduct;
}
let UploadProduct:React.FC=()=>
{
    let dispatch=useDispatch<dispatchAction>();
    let [productState,setProductState]=useState<IState>(
        {
            product:{} as IProduct
        }
    )
    let  updateImage = async (event: React.ChangeEvent<HTMLInputElement | any>) => {
        let imageFile:Blob=event.target.files[0]
        let base64Image: string | ArrayBuffer = await convertBase64String(imageFile);
        
        setProductState({
            ...productState,
        product:{
            ...productState.product,
            image:base64Image.toString()
            } 
        });
    };
      
  let  convertBase64String = (imageFile: Blob): Promise<string | ArrayBuffer> => {
       return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.readAsDataURL (imageFile);
        fileReader.addEventListener('load', () => {
        if (fileReader.result) {
        resolve(fileReader.result);
        }
        else {
        reject('Error Occurred');
        } 
       })
    })
}
    let updateInput=(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>
    {
        setProductState(
            {
                product:{
                    ...productState.product,
                    [event.target.name]:event.target.value
                }
            }
        )
    }

    let submitProduct=(event:React.FormEvent<HTMLFormElement>)=>
    {
        event.preventDefault();
        dispatch(uploadProduct(productState.product));
        alert('Clicked');
    }
    return(
        <React.Fragment>
             <div className="container">
                    <div className="row">
                        <div className="col-5">
                         <div className="card mt-3">
                            <div className="card-header back">
                                <h3 className="text-white">Upload Product</h3>
                            </div>
                            <div className="card-body">
                            <form onSubmit={submitProduct}>
                            <input type="text" className="form-control mb-1" onChange={updateInput} name="name" value={productState.product.name} placeholder="Name"/>
                            <input type="text" className="form-control mb-1" onChange={updateInput} name="brand" value={productState.product.brand} placeholder="Brand"/>
                            <input type="file" className="form-control mb-1" name='image'  onChange={updateImage} />
                            {
                                productState.product.image?.length>0&&
                                <img src={productState.product.image} width={70} height={70}/>
                            }
                            <input type="text" className="form-control mb-1" onChange={updateInput} name="price" value={productState.product.price}  placeholder="Price"/>
                            <input type="text" className="form-control mb-1" onChange={updateInput} name="qty" value={productState.product.qty} placeholder="Qty"/>
                             <select className="form-select mb-1" onChange={updateInput} name='category' value={productState.product.category} aria-label="Default select example">
                                <option selected>Select the Category</option>
                                <option value="Mens">Mens Collection</option>
                                <option value="Womens">Womens Collection</option>
                                <option value="Kids">Kids Collection</option>
                             </select>
                            <textarea className="form-control mb-1" onChange={updateInput} name="description" value={productState.product.description}  placeholder="Description" rows={3}></textarea>
                            <textarea className="form-control mb-2" onChange={updateInput} name="usage" value={productState.product.usage}  placeholder="Usage" rows={3}></textarea>
                            <input type='submit' className="btn btn-outline-dark" value='Upload'/>                      
                            </form>
                            </div>
                         </div>
                          
                       </div>
                    </div>
                  </div>
        </React.Fragment>
    )
}
export default UploadProduct;