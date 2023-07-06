import React, {useState} from 'react';
import '../styles/AccountForm.scss'
import { useDispatch } from 'react-redux'
import { register, login, setUserName, setInfo } from '../redux/chatSlice'

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

	const validateUser = (user) => {
		if(user.username.length < 4) {
			dispatch(setInfo("Username must be at least 4 characters long"))
			return false
		}
		if(user.password.length < 8) {
			dispatch(setInfo("Password must be at least 8 characters long"))
			return false
		}
		return true
	}

    const onSubmit = (event) => {
		event.preventDefault();
		const request = 
		{
			"method":"POST",
			"headers":{
				"Content-type":"application/json",
			},
			"body":JSON.stringify({"username":user.username, "password":user.password})
		}
		
		if(event.target.name === "register") {
			if(validateUser(user)) {
				dispatch(register(request));
			}
		}
        if(event.target.name === "login") {
			if(validateUser(user)){
				dispatch(setUserName(user))
				dispatch(login(request));		
			}
		}
	}

    return (
        <form className='account-form'>
			<h1>Welcome</h1>
			<label className='account-form-label' htmlFor="username">Username</label><br/>
			<input type="text" name="username" id="username" onChange={onChange} value={user.username}/><br/>
			
            <label className='account-form-label' htmlFor="password">Password</label><br/>
			<input type="password" name="password" id="password" onChange={onChange} value={user.password}/><br/>
			<div className='button-container'>
			<button className='login-button account-form-button' name="login" onClick={onSubmit}>Login</button>
            <button className='register-button account-form-button' name="register" onClick={onSubmit}>Register</button>	
			</div>
		</form>
    )
}

export default AccountForm;