import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from ".";

interface IState {
    loading: boolean;
}

const initialState: IState = {
    loading: true,
};

const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const selectApp = (state: RootState) => state.app;
export const { setLoading } = appSlice.actions;
export default appSlice.reducer;
