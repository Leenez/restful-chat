import React, {useState, useEffect} from 'react'
import '../styles/MessageForm.scss'
import { useDispatch, useSelector } from 'react-redux'
import { sendMsg, setInfo, toggleAiAssist } from '../redux/chatSlice'

const MessageForm = (props) => {

    const [msg, setMsg] = useState({message:""})

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const token = useSelector(state => state.token)
    const aiAssist = useSelector(state => state.aiAssist)
    const chatMessages = useSelector(state => state.chatMessages)
    const NO_EMPTY_MSGS = "Can't send empty message"
    const AI_ASSIST = "Waiting ChatGPT to respond ..."

    useEffect(() => {
        if ((aiAssist === true) && chatMessages[0] && chatMessages[chatMessages.length - 1].user !== user) {
            dispatch(setInfo(AI_ASSIST))
            const chatMessage = chatMessages[chatMessages.length - 1]
            const request = 
            {
                "method":"POST",
                "headers":{
                    "Content-type":"application/json",
                    "token":token
                },
                "body":JSON.stringify({
                    "user":user, 
                    "message":chatMessage.message,
                    "chatGpt":true
                    })
            }
            dispatch(sendMsg(request))
        }
    }, [chatMessages])

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
        if(event.target.name === "send-message") {
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
                setMsg({message:""})
            } else {
                dispatch(setInfo(NO_EMPTY_MSGS))
            }
        }
        if(event.target.name === "ai-assist") {
            dispatch(toggleAiAssist())
        }
    }

    const aiAssistOffButton = 
        <button className='ai-assist-off-button' name="ai-assist" onClick={onSubmit}>AI DISABLED</button>
    const aiAssistOnButton = 
        <button className='green-button' name="ai-assist" onClick={onSubmit}>AI ENABLED</button>
    
    
    return (
        <form className='message-form'>
            <div className='grid-container'>
                <div className='send-container'><button className='green-button' name="send-message" onClick={onSubmit}>Send</button></div>
                <div><input className='message-form-input' type="text" name="message" id="message" onChange={onChange} value={msg.message}/></div>
                <div className='ai-container'>{(aiAssist === true) ? aiAssistOnButton : aiAssistOffButton}</div>
            </div>
        </form>
    )
}

export default MessageForm