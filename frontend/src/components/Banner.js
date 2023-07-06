import React from 'react'
import '../styles/Banner.scss'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/chatSlice'

const Banner = (props) => {

    const info = useSelector(state => state.info)
    const user = useSelector(state => state.user)
    const token = useSelector(state => state.token)

    const dispatch = useDispatch()

    const onClick = (event) => {
        event.preventDefault()
        const request = 
            {
                "method":"POST",
                "headers":{
                    "Content-type":"application/json",
                    "token":token
                },
            }
        dispatch(logout(request))
        }
    

    if (user === "" || token === "") {
        return (
            <div className='banner-account'>
                <div><p>Restful Chat</p></div>
                <div><p>{info}</p></div>
            </div>
    )
    } else {
        return (
            <div className='banner-chat'>
                <div><p>Restful Chat</p></div>
                <div><p>Logged In As: {user}</p></div>
                <div><p>{info}</p></div>
                <div><button className='banner-logout-button' onClick={onClick}>Logout</button></div>
            </div>
        )
    }
}

export default Banner