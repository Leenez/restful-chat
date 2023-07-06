import React, {useState} from 'react'
import '../styles/MessageForm.scss'
import { useDispatch, useSelector } from 'react-redux'
import { sendMsg, setInfo } from '../redux/chatSlice'

const MessageForm = (props) => {

    const [msg, setMsg] = useState({message:""})

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const token = useSelector(state => state.token)
    const NO_EMPTY_MSGS = "Can't send empty message"

    const onChange = (event) => {
        setMsg(() => {
            return {
                ...msg,
                [event.target.name]:event.target.value
            }
        })
    }
    
    const onSubmit = (event) => {
        event.preventDefault()
        const request = 
            {
                "method":"POST",
                "headers":{
                    "Content-type":"application/json",
                    "token":token
                },
                "body":JSON.stringify({
                    "user":user, 
                    "message":msg.message
                    })
            }
        if (msg.message.length > 0) {
            dispatch(sendMsg(request))
        } else {
            dispatch(setInfo(NO_EMPTY_MSGS))
        }
    }

    return (
        <form className='message-form'>
            <button className='message-form-button' name="send-message" onClick={onSubmit}>Send</button>
		    <input className='message-form-input' type="text" name="message" id="message" onChange={onChange} value={msg.message}/>   
        </form>
    )
}

export default MessageForm