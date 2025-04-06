import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dispatchAction, RootState } from "../../../../redux/store";
import { AuthUtil } from "../../../../util/AuthUtil";
import '../../../../index.css';
import { updateAddres } from "../../../../redux/users/counterSlice";
import Spinner from "../../../layouts/Components/Spinner/Spinner";

interface Istate
{
    isChecked:boolean;
}
interface address
{
   city:string;
   country:string;
   flat:string;
   landmark:string;
   mobile:string;
   pin:string;
   state:string;
   street:string; 
}
let UserProfile:React.FC=()=>
{
    let dispatch = useDispatch<dispatchAction>();
    let [getCheckState,setCheckState]=useState<Istate>(
        {
            isChecked:false
        }
    )
  let isated = useSelector((state: RootState) => {
    return state.slice;
  });

  let {isAuthenticated,user,loading}=isated;

  let changeCheck=(event:React.ChangeEvent<HTMLInputElement>)=>
  {
    setCheckState(
        {
        isChecked:event.target.checked
        }
    )
  }

  let [getAddress,setAddress]=useState<address>(
    {
        country:'',
        city:'',
        flat:'',
        landmark:'',
        mobile:'',
        pin:'',
        state:'',
        street:''
    }
  )

  let updateAddress=(event:React.ChangeEvent<HTMLInputElement>)=>
  {
    setAddress(
        {
            ...getAddress,
        [event.target.name]:event.target.value
         }
        )     
  }

  let submitAddress=()=>
  {
    dispatch(updateAddres(getAddress));
    setCheckState(
                {
                    isChecked:false
                }
            )
    
  }
  useEffect(() => {
    if (user && user.address) {
        setAddress(user.address); // Pre-fill address from user state
    }
}, [user]);
  
    return(
        <React.Fragment>
            {
                loading===true?
                <Spinner/>:
            
            <div className="container">
            { 
            AuthUtil.isLoggedIn() && isAuthenticated &&
            <div className="row">
                <div className="col-md-5">
                     <img src={user.avatar} width={200} height={200} className="rounded-circle"/>
                 </div>
                <div className="col-md-7">
                    <div className="card">
                        <div className="card-header back text-white text-center">
                            <h3>Basic Details</h3>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                <li className="list-group-item"><>Name: {user.name}</></li>
                                <li className="list-group-item"><>Email: {user.email}</></li>
                                <li className="list-group-item"><>Phone: {user.address.mobile}</></li>
                            </ul>
                        </div>
                    </div>
                    <div className="card mt-1">
                        <div className="card-header text-white text-center back ">
                            <h3>Address Details</h3>
                              <label>Edit Address</label><input className="ms-1" onChange={changeCheck} type="checkbox"/>
                           </div>
                        <div className="card-body">
                            {
                                getCheckState.isChecked ? (
                                    <div className="mt-2">
                                      <ul className="list-group">
                                        <li className="list-group-item"><input type="text" onChange={updateAddress} name="city" className="form-control" placeholder="Enter new city" defaultValue={user.address.city} /></li>
                                        <li className="list-group-item"><input type="text" onChange={updateAddress} name='country' className="form-control" placeholder="Enter new country" defaultValue={user.address.country} /></li>
                                        <li className="list-group-item"><input type="text" onChange={updateAddress} name='flat' className="form-control" placeholder="Enter new flat" defaultValue={user.address.flat} /></li>
                                        <li className="list-group-item"><input type="text" onChange={updateAddress} name='landmark' className="form-control" placeholder="Enter new landmark" defaultValue={user.address.landmark} /></li>
                                        <li className="list-group-item"><input type="text" onChange={updateAddress} name='mobile' className="form-control" placeholder="Enter new mobile" defaultValue={user.address.mobile} /></li>
                                        <li className="list-group-item"><input type="text" onChange={updateAddress} name='pin' className="form-control" placeholder="Enter new pin" defaultValue={user.address.pin} /></li>
                                        <li className="list-group-item"><input type="text" onChange={updateAddress} name="state" className="form-control" placeholder="Enter new state" defaultValue={user.address.state} /></li>
                                        <li className="list-group-item"><input type="text" onChange={updateAddress} name='street' className="form-control" placeholder="Enter new street" defaultValue={user.address.street} /></li>
                                        
                                        </ul>
                                        <button className="mt-2 btn btn-outline-danger btn-sm" onClick={submitAddress}>Submit</button>
                                      {/* More input fields can be added here */}
                                    </div>
                                  ):
                                  <ul className="list-group">
                                <li className="list-group-item"><>City: {user.address.city}</></li>
                                <li className="list-group-item"><>Country: {user.address.country}</></li>
                                <li className="list-group-item"><>Flat: {user.address.flat}</></li>
                                <li className="list-group-item"><>Landmark: {user.address.landmark}</></li>
                                <li className="list-group-item"><>Mobile: {user.address.mobile}</></li>
                                <li className="list-group-item"><>Pin: {user.address.pin}</></li>
                                <li className="list-group-item"><>State: {user.address.state}</></li>
                                <li className="list-group-item"><>Street: {user.address.street}</></li>
                            
                            </ul>
                            }
                        
                        </div>
                    </div>
                </div>
            </div>                    
            }
        
    </div>

            }
            
        </React.Fragment>
    )
}
export default UserProfile;