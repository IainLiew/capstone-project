import { configureStore } from "@reduxjs/toolkit";
import bookingsReducer from "./feature/posts/bookingsSlice";

export default configureStore({
    reducer: {
        bookings: bookingsReducer,
    },
});