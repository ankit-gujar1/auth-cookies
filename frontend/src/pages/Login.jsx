import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import { useAuthContext } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const { loading, login } = useLogin();

  const { user } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/')
  }, [user])

  const userLogin = (e) => {
    e.preventDefault();
    login(username, password);
  }


  return (
    <div class="max-screen h-screen relative flex flex-col items-center justify-center p-4 rounded-md text-black bg-white">
      <div class="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Welcome back to <span class="text-[#7747ff]">App</span></div>
      <div class="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Login to your account</div>
      <form class="flex flex-col gap-3" onSubmit={userLogin}>
        <div class="block relative">
          <label for="email" class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Username</label>
          <input type="text" id="email" class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" onChange={(e) => { setUsername(e.target.value) }} />

        </div>
        <div class="block relative">
          <label for="password" class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
          <input type="password" id="password" class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" onChange={(e) => { setPassword(e.target.value) }} />

        </div>
        <button type="submit" class="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal" disabled={loading}>
          {loading ? <span className='loading loading-spinner'></span> : "Login"}
        </button>

      </form>
      <div class="text-sm text-center mt-[1.6rem]">Don’t have an account yet? <Link to={'/signup'} class="text-sm text-[#7747ff]">Signup for free!</Link></div>

      <div><Toaster/></div>
    </div>
  )
}

export default Login