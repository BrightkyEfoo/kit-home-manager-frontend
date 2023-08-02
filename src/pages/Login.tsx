import { Button, TextField } from '@mui/material';
import './styles.css'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { apiURL } from '../backendRoutes';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
const Login = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email:'',
        password:''
    })

   const handleSubmit = (e:MouseEvent<HTMLElement>)=> {
    console.log('data', data)
    axios.post(apiURL+'/user/login',data).then(res => {
        console.log('res', res)
        localStorage.setItem('user',JSON.stringify(res.data.user))
        localStorage.setItem('token',res.data.token)
        toast.success('Welcome back!')
        setTimeout(()=>{
            navigate('/')
        },1000)
    }).catch(err => {
        console.log('err', err)
        toast.error(err.response.data.msg)
    })
   }

   const handleChangeByTagName = (e:ChangeEvent<HTMLInputElement>)=>{
    setData(prev => {
        let temp = {...prev}
        switch(e.target.name){
            case 'email':
            temp.email = e.target.value
            break
            case 'password':
            temp.password = e.target.value
            break
        }
        return temp
    })
   }

  return (
    <div className="login-container">
      <div className="login-form">
        <Toaster />
        <p>Welcome</p>
        <TextField id="email" onChange={handleChangeByTagName} name="email" label="email" variant="outlined" />
        <TextField id="password" onChange={handleChangeByTagName} name="password" label="password" variant="outlined" type='password' />
        <Button variant="contained" onClick={handleSubmit}>Login</Button>
      </div>
    </div>
  );
};

export default Login;
