import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { dispatchAction } from "../../../../redux/store";
import { createUser } from "../../../../redux/users/counterSlice";

interface IUser
{
    name:string;
    email:string;
    password:string;
}
interface IUserError
{
    nameError:string;
    emailError:string;
    passwordError:string;
}

let UserRegister:React.FC=()=>
{
    let dispatch=useDispatch<dispatchAction>();
    let[userState,setUserState]=useState<IUser>(
        {
            name:'',
            email:'',
            password:''
        }
    )
    let [errorUserState,setErrorUserState]=useState<IUserError>(
        {
            nameError:'',
            emailError:'',
            passwordError:''
        }
    )
    let updateName=(event:React.ChangeEvent<HTMLInputElement>)=>
    {
        setUserState({
            ...userState,
            name:event.target.value
        })
        let regex=/^[a-zA-Z0-9_]{5,10}$/
        if(!regex.test(event.target.value))
        {
            setErrorUserState({
                ...errorUserState,
                nameError:'Enter a valid name'
            })
        }
        else{
            setErrorUserState({
                ...errorUserState,
                nameError:''
            })
        }

    }
    
    let updatePassword=(event:React.ChangeEvent<HTMLInputElement>)=>
    {
        setUserState({
            ...userState,
            password:event.target.value
        })
        let regexp=/^[a-zA-Z]\w{7,14}$/
        if(!regexp.test(event.target.value))
            {
                setErrorUserState({
                    ...errorUserState,
                    passwordError:'Enter a valid password'
                })
            }
            else{
                setErrorUserState({
                    ...errorUserState,
                    passwordError:''
                })
            }
    }
    
    let updateEmail=(event:React.ChangeEvent<HTMLInputElement>)=>
    {
        setUserState({
            ...userState,
            email:event.target.value
        })
        let regexp=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!regexp.test(event.target.value))
            {
                setErrorUserState({
                    ...errorUserState,
                    emailError:'Enter a valid email'
                })
            }
            else{
                setErrorUserState({
                    ...errorUserState,
                    emailError:''
                })
            }
    }
    let cUser=()=>
    {
        dispatch(createUser(userState))
    }
    return(
        <React.Fragment>
            <div className="container">
            <div className="row ">
                <div className="col-md-4 m-auto mt-5">
                 <div className="back card">
                    <div className="card-header text-center text-white">
                            <h3>Registration form</h3>
                        </div>
                        <div className="card-body">
                            <form className="form-group">
                             <input type="text" placeholder="Enter name" onChange={updateName} name="name" className={`form-control mb-2 ${errorUserState.nameError.length>0?'is-invalid':''}`} />
                             {errorUserState.nameError.length>0?<small className="text-danger">{errorUserState.nameError}</small>:''} 
                                <input type="email" placeholder="Enter email" name="email" onChange={updateEmail} className={`form-control mb-2 ${errorUserState.emailError.length>0?'is-invalid':''}`} />
                                {errorUserState.emailError.length>0?<small className="text-danger">{errorUserState.emailError}</small>:''} 
                                <input type="password" placeholder="Enter Password" onChange={updatePassword} name="password" className={`form-control mb-2 ${errorUserState.passwordError.length>0?'is-invalid':''}`} />
                                {errorUserState.passwordError.length>0?<small className="text-danger">{errorUserState.passwordError}</small>:''} 
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <input type="submit" value="Register" onClick={cUser} className="btn btn-outline-light"/><br/>
                            <span className="mt-4">Already have an account? <Link to='/users/login' className='link-light link-underline-opacity-0 link-underline-opacity-75-hover'>Login</Link></span>
                        </div>
                    </div>
                </div>
            </div>
                
           </div>
        </React.Fragment>
    )
}
export default UserRegister