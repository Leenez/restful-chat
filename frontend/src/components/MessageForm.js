import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMsg } from '../redux/chatSlice'

const MessageForm = (props) => {

    const [msg, setMsg] = useState("")

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const token = useSelector(state => state.token)

    const onChange = (event) => {
        setMsg(() => {
            return {
                [event.target.value]:event.target.value
            }
        })
    }
    
    const onSubmit = (event) => {
        event.preventDefault()
        const body = {"user":user, "message":msg}
        dispatch(sendMsg(body, token))
    }

    return (
        <form>
		    <input type="text" name="message" id="message" onChange={onChange} value={msg}/>
            <button name="send-message" onClick={onSubmit}>Send</button>
        </form>
    )
}

export default MessageForm