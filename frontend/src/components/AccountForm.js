import React, {useState} from 'react';
import { useDispatch } from 'react-redux'
import { register, login } from '../redux/chatSlice'

const AccountForm = (props) => {

    const [user,setUser] = useState({
		username:"",
		password:""
	})

	const dispatch = useDispatch()

    const onChange = (event) => {
		setUser((user) => {
			return {
				...user,
				[event.target.name]:event.target.value
			}
		})
	}

    const onSubmit = (event) => {
		event.preventDefault();
		// CREATE CHECK FOR USER AND PASSWORD
		
		if(event.target.name === "register") {
			dispatch(register(user));
		}
        if(event.target.name === "login") {
			dispatch(login(user));
		}
	}

    return (
        <form>
			<label htmlFor="username">Username</label>
			<input type="text" name="username" id="username" onChange={onChange} value={user.username}/>
			
            <label htmlFor="password">Password</label>
			<input type="password" name="password" id="password" onChange={onChange} value={user.password}/>
				
            <button name="register" onClick={onSubmit}>Register</button>
			<button name="login" onClick={onSubmit}>Login</button>
		</form>
    )
}

export default AccountForm;