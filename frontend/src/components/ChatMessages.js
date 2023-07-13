import React, {useEffect} from 'react'
import '../styles/ChatMessages.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getMsgs } from '../redux/chatSlice'

const ChatMessages = (props) => {

    const chatMessages = useSelector(state => state.chatMessages)
    const token = useSelector(state => state.token)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    
    useEffect(() => {

        const request = 
            {
                "method":"POST",
                "headers":{
                    "Content-type":"application/json",
                    "token":token
                },
                "body":JSON.stringify({
                    "user":user
                    })
            }

        const interval = setInterval(() => {
            dispatch(getMsgs(request))
        }, 3000)
        return () => clearInterval(interval);
    },[])

    const tableItems = chatMessages.map((item, index) => 
                        (<tbody key={index}><tr>
                            <td className='time'>{item.date}</td>
                            <td className='user'>{item.user}</td>
                            <td className='msg'>{item.message}</td>
                        </tr></tbody>))

    return (
        <div className='message-window'>
            <table className='message-table'>
                {tableItems}
            </table>
        </div>
    )
}

export default ChatMessages;