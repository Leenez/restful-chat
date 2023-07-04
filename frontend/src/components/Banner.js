import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/chatSlice'
import config from '../../../config'

const Banner = (props) => {

    const info = useSelector(state => state.info)
    const user = useSelector(state => state.user)
    const token = useSelector(state => state.token)

    const dispatch = useDispatch()

    if (!user) {
        return (
            <div>
                <div><p>{config.heading}</p></div>
                <div><p>{info}</p></div>
            </div>
    )
    } else {
        return (
            <div>
                <div><p>{config.heading}</p></div>
                <div><p>{info}</p></div>
                <div><button onClick={dispatch(logout(token))}>Logout</button></div>
            </div>
        )
    }
}

export default Banner