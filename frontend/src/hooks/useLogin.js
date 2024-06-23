import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';

const useLogin = () => {

    const [loading,setLoading]=useState(false);
    const {setUser,url}=useAuthContext();

    const login = (username,password) => {
        setLoading(true);
        axios.post(url+'login',{username,password},{withCredentials:true})
        .then((r)=>{
            localStorage.setItem("user",JSON.stringify(r.data));
            setUser(r.data);
            console.log(r.data);
        })
        .catch((e)=>{
            console.log(e);
        })
        .finally(()=>{
            setLoading(false);
        })
    }

    return {login,loading}
}

export default useLogin;