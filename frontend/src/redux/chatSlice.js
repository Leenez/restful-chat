import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const NO_INFO = ""

const showInfo = (state, action) => {
    if(action.payload.Message) {
        state.info = action.payload.Message
    }
}

export const register = createAsyncThunk("register", async (request) => {
    const response = await fetch("/register",request)
    const result = await response.json()
	return result
});

export const login = createAsyncThunk("login", async (request) => {
	const response = await fetch("/login",request)
    const token = await response.json()
    return token
});

export const logout = createAsyncThunk("logout", async (request) => {
    const response = await fetch("/logout",request)
    const resp = await response.json()
    console.log(resp)
    return resp
})

export const sendMsg = createAsyncThunk("sendmsg", async (request) => {
    const response = await fetch("/api/msg", request)
    const resp = await response.json()
    return resp
})

export const getMsgs = createAsyncThunk("getmsgs", async (request) => {
    const response = await fetch("/api/msgs", request)
    const messages = response.json()
	return messages;
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
    reducers: {
        setUserName: (state, action) => {
            state.user = action.payload.username
        },
        setInfo: (state, action) => {
            state.info = action.payload
        }
    },
    extraReducers: (builder) => {
        // REGISTER
        builder.addCase(register.fulfilled, (state, action) =>{
            showInfo(state, action)
        })

        // LOGIN
        builder.addCase(login.fulfilled, (state, action) =>{
            showInfo(state, action)
            if(action.payload.token) {
                state.token = action.payload.token
                state.info = ""
            }
        })

        // LOGOUT
        builder.addCase(logout.fulfilled, (state, action) => {
            showInfo(state, action)
            state.chatMessages = []
	        state.token = ""
	        state.user = ""
        })

        // SEND MESSAGE
        builder.addCase(sendMsg.fulfilled, state =>{
            state.info = NO_INFO
        })

        // GET MESSAGES
        builder.addCase(getMsgs.fulfilled, (state, action) =>{
            showInfo(state, action)
            if(Object.keys(action.payload).length !== 0) {
                state.chatMessages = state.chatMessages.concat(action.payload)
            }
        })
    }
})

export default chatSlice.reducer;
export const { setUserName, setInfo } = chatSlice.actions