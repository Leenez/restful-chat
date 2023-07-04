import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const LOADING = "Loading ..."
const REGISTER_SUCCESS = "User Registered"
const LOGOUT_SUCCESS = "User Logged Out"
const SEND_MSG = "Sending message ..."
const NO_INFO = ""

const requestCreator = (method, bodyContent, token) => {
    return {
        "method":method,
        "headers":{
            "Content-type":"application/json",
            "token":token
        },
        "body":JSON.stringify(bodyContent)
    }
}

export const register = createAsyncThunk("register", async (user) => {
	const request = requestCreator("POST", user, "none")
	const response = (await fetch("/api/register",request)).json();
    console.log(response) // TMP ROW
	return response
});

export const login = createAsyncThunk("login", async (user) => {
	const request = requestCreator("POST", user, "none")
	const response = (await fetch("/api/login",request)).json();
	console.log(response) // TMP ROW
    return response
});

export const logout = createAsyncThunk("logout", async (token) => {
    const request = requestCreator("POST", "none", token)
    const response = await (await fetch("/api/logout",request)).json()
    console.log(response) // TMP ROW
    return response
})

export const sendMsg = createAsyncThunk("sendmsg", async (body, token) => {
    const request = requestCreator("POST", body, token)
    const response = await (await fetch("/api/msg", request)).json()
    console.log(response) // TMP ROW
    return response
})

export const getMsgs = createAsyncThunk("getmsgs", async (token) => {
    const request = requestCreator("GET", "none", token)
    const response = await (await fetch("/api/msgs", request)).json()
    console.log(response.data) // TMP ROW
	return response;
})

const initialState = {
    info:"",
    chatMessages:[],
	token:"",
	user:""
}

const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // REGISTER
        builder.addCase(register.pending, state => {
            state.info = LOADING
        })
        builder.addCase(register.fulfilled, state =>{
            state.info = REGISTER_SUCCESS
        })
        builder.addCase(register.rejected, (state, action) => {
            state.info = action.error.message
        })

        // LOGIN
        builder.addCase(login.pending, state => {
            state.info = LOADING
        })
        builder.addCase(login.fulfilled, (state, action) =>{
            state.token = action.payload.token
        })
        builder.addCase(login.rejected, (state, action) =>{
            state.info = action.error.message
        })

        // LOGOUT
        builder.addCase(logout.pending, state => {
            state.info = LOADING
        })
        builder.addCase(logout.fulfilled, state => {
            state = initialState
            state.info = LOGOUT_SUCCESS
        })
        builder.addCase(logout.rejected, (state, action) => {
            state.info = action.error.message
        })

        // SEND MESSAGE
        builder.addCase(sendMsg.pending, state => {
            state.info = SEND_MSG
        })
        builder.addCase(sendMsg.fulfilled, state =>{
            state.info = NO_INFO
        })
        builder.addCase(sendMsg.rejected, state =>{
            state.info = action.error.message
        })

        // GET MESSAGES
        builder.addCase(getMsgs.pending, state => {
            state.info = LOADING
        })
        builder.addCase(getMsgs.fulfilled, (state, action) =>{
            state.chatMessages = state.chatMessages.concat(action.payload)
            state.info = NO_INFO
        })
        builder.addCase(getMsgs.rejected, (state, action) =>{
            state.info = action.error.message
        })
    }
})

export default chatSlice.reducer;