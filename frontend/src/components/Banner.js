import React from 'react'
import { useSelector } from 'react-redux'
import config from '../../../config'

const Banner = (props) => {

    const info = useSelector(state => state.info)

    return (
        <div>
            <div><p>{config.heading}</p></div>
            <div><p>{info}</p></div>
        </div>
    )
}

export default Banner