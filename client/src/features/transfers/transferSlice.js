import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import transferService from './transferService'

const initialState = {
    transfers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create new transfer
export const newTransfer = createAsyncThunk('transfers/create', async (transferData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await transferService.newTransfer(transferData, token)
    } catch (error) {
        const message = (error.response && error.respose.data && error.respnse.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get user transfers
export const getTransfers = createAsyncThunk('transfers/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await transferService.getTransfers(token)
    } catch (error) {
        const message = (error.response && error.respose.data && error.respnse.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const transferSlice = createSlice({
    name: 'transfers',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(newTransfer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(newTransfer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.transfers.push(action.payload)
            })
            .addCase(newTransfer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getTransfers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTransfers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.transfers = action.payload
            })
            .addCase(getTransfers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = transferSlice.actions
export default transferSlice.reducer