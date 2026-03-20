import { configureStore} from "@reduxjs/toolkit";
import userreducer from "./UserRedux";
export const store=configureStore({
    reducer:{
        user:userreducer,
    }
})