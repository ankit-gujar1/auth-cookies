import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const useLogin = () => {

    const [loading,setLoading]=useState(false);
    const {setUser,url}=useAuthContext();

    const navigate=useNavigate();

    const login = (username,password) => {
        const success=inputErrors(username,password);
        if(!success) return;

        setLoading(true);
        axios.post(url+'login',{username,password},{withCredentials:true})
        .then((r)=>{
            toast.success("Login successfull!!")
            localStorage.setItem("user",JSON.stringify(r.data));
            setUser(r.data);
            console.log(r.data);
            navigate('/');
        })
        .catch((e)=>{
            console.log(e);
            toast.error(e.response.data.msg)
        })
        .finally(()=>{
            setLoading(false);
        })
    }

    return {login,loading}
}

export default useLogin;

const inputErrors=(username,password)=>{
    if(!username || !password){
        toast.error("Enter all feilds");
        return;
    }

    return true;
}