import React from "react";
import '../../../../index.css';

let Home:React.FC=()=>
{
    return(
        <React.Fragment>
            <div className="landing-page">
                <div className="wrapper">
                   <div className="d-flex align-items-center justify-content-center flex-column h-100">
                        <h1>Online shopping cart</h1>
                        <p className="text-amber">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut provident incidunt quidem earum, architecto eligendi!</p>
                        <button className="btn btn-outline-light btn-md">Shop now</button>
                   </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Home;