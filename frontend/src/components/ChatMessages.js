import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMsgs } from '../redux/chatSlice'

const ChatMessages = (props) => {

    const chatMessages = useSelector(state => state.chatMessages)
    const token = useSelector(state => state.token)
    const dispatch = useDispatch()
    
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getMsgs(token))
        }, 2000)
        return () => clearInterval(interval);
    },[])

    //const mockList = [{time: "12.2.2222", sender: "sender", msg: "lorem lorem"}, {time: "13.3.3333", sender: "sender2", msg: "lorem2 lorem2"}] 
    const tableItems = chatMessages.map((item, index) => 
                        (<tr key={index}>
                            <td >{item.time}</td>
                            <td >{item.sender}</td>
                            <td >{item.msg}</td>
                        </tr>))

    return (
        <table>
            {tableItems}
        </table>
    )
}

export default ChatMessages;