import React from 'react'
import { useHistory } from 'react-router'
import { GoogleLogin } from 'react-google-login'
 function Login({addUser}) {
     
    const history=useHistory()
    const googleSuccess = async(res) => {
        const result = res?.profileObj
        const token=res?.tokenId
        try {
         localStorage.setItem('profile',JSON.stringify({token}))
         addUser()
         const sendLoginReq= async()=>{
            const res=await fetch('http://localhost:5000/auth',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name:result.name,
                    email:result.email,
                    id:result.googleId
                })
                
            })
            const data=await res.json()
         }
         sendLoginReq()
            history.push('/')
        } catch (error) {
            console.log(error);
        }

    }
    const googleFailure = () => {
        console.log('login failed');
    }
    
    return (
        <div className='login-page'>
            <h2>Welcome Back !</h2>
            <p>Plan your work and optimize your time efficiently.</p>
<GoogleLogin
  clientId="1040065714146-j6ctbm4qs70ekj3bbcfnlkb8ho7v2egd.apps.googleusercontent.com"
  buttonText="Login with Google"
  onSuccess={googleSuccess}
  onFailure={googleFailure}
  cookiePolicy="single_host_origin"
/>
        </div>
    )
}

export default Login
