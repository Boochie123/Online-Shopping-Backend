import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddress, IUser } from "../../modules/Users/Models/IUser";
import axios from "axios";
import { TokenUtil } from "../../util/TokenUtil";
import { AuthUtil } from "../../util/AuthUtil";

export interface UserState {
  loading: boolean;
  user: IUser;
  isAuthenticated: boolean;
  errorMessage: string;
  token: string;
  alertMessage: string;
}

let data: UserState = {
  loading: false,
  user: {} as IUser,
  isAuthenticated: false,
  errorMessage: "",
  token: "",
  alertMessage: "",
};

interface UUser {
  name?: string;
  email: string;
  password: string;
}

export const createUser = createAsyncThunk("create/user",async (user: UUser) => {
    const response = await axios.post("http://127.0.0.1:5000/api/users/register",user);
    console.log(response.data);
    return response.data;
  }
);

export const loginUser = createAsyncThunk("login/user", async ( user: UUser) => {
  const response = await axios.post("http://127.0.0.1:5000/api/users/login",user);
  console.log(response.data);
  return response.data;
  
});

export const getUser = createAsyncThunk("get/user",async () => {
    if(AuthUtil.getToken())
    {
        let token=AuthUtil.getToken();
        TokenUtil.setTokenHeader(token);
        const response = await axios.get("http://127.0.0.1:5000/api/users");
        console.log(response.data);
        return response.data;
    }
   return null;
  }
);

export const updateAddres = createAsyncThunk("update/address",async (address:IAddress) => {
  if(AuthUtil.getToken())
  {
      let token=AuthUtil.getToken();
      TokenUtil.setTokenHeader(token);
      const response = await axios.post("http://127.0.0.1:5000/api/users/address",address);
      console.log(response.data);
      return response.data;
  }
 return null;
}
);
// export const getUser = createAsyncThunk(
//   "user/getUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       TokenUtil.setTokenHeader();
//       const response = await axios.get("http://127.0.0.1:5000/api/users");
//       return response.data;
//     } catch (error: any) {
//       console.error("getUser API failed:", error);

//       return rejectWithValue({
//         status: error.response?.status || 500,
//         message: error.response?.data?.msg || "Something went wrong",
//       });
//     }
//   }
// );

const counterSlice = createSlice({
  name: "slice",
  initialState: data,
  reducers: {
    userLogout: (state) => {
      localStorage.removeItem("online-shopping-ts");
      state.loading = false;
      state.token = "";
      state.isAuthenticated = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message as string;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        localStorage.setItem("online-shopping-ts", action.payload.token);
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        localStorage.removeItem("online-shopping-ts");
        state.loading = false;
        state.isAuthenticated = false;
        state.token = "";
        state.errorMessage = action.payload.error.message as string;
      });
      builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.errorMessage = ''; 
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<any>) => {
        console.log("User data saved to Redux:", action.payload);
        state.loading = false;
        state.user=action.payload;
        state.isAuthenticated=true;
      })
      // .addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
      //   console.error("getUser failed:", action.payload);
      //   if (action.payload?.status === 401) {
      //     console.log("Session expired. Logging out...");
      //     localStorage.removeItem("online-shopping-ts");
      //     state.isAuthenticated = false;
      //     state.token = "";
      //   }
      // });
      .addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
        console.error("getUser failed:", action.payload);
        state.loading = false;
        state.isAuthenticated = false;
        state.errorMessage = action.payload || 'Failed to fetch user';
      }),
      builder
      .addCase(updateAddres.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAddres.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user.address = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(updateAddres.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.errorMessage = action.payload.error.message as string;
      });
  },
});
export default counterSlice.reducer;
export const { userLogout } = counterSlice.actions;

