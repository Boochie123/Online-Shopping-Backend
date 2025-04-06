import React from "react";
import photo1 from '../../../../assets/Loading.gif'

let Spinner:React.FC=()=>
{
    return(
        <React.Fragment>
            <div className="text-center">
            <img src={photo1}/>
            </div>
            
        </React.Fragment>
    )
}
export default Spinner;