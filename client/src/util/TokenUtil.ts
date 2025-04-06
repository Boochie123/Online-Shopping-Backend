import axios from "axios";

export class TokenUtil 
{
  public static setTokenHeader = (token: string) => 
    {
    if (token) 
    {
      axios.defaults.headers.common["x-auth-token"] = token;
    } 
    else 
    {
      delete axios.defaults.headers.common["x-auth-token"];
    }
  };
}

// import axios from "axios";

// export class TokenUtil {
//     public static setTokenHeader = () => {
//         const token = localStorage.getItem("online-shopping-ts");
//         if (token) {
//             axios.defaults.headers.common["x-auth-token"] = token; // ✅ Use correct header
//         } else {
//             delete axios.defaults.headers.common["x-auth-token"];
//         }
//     };
// }