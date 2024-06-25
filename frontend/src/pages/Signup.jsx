import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';
import useSignup from '../hooks/useSignup';
import { Toaster } from 'react-hot-toast';

const Signup = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const { user } = useAuthContext();

  const { loading, signup } = useSignup();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user])

  const userSignup = (e) => {
    e.preventDefault();
    signup(username, password, confirmPassword);
  }

  return (
    <div class="max-screen h-screen relative flex flex-col items-center justify-center p-4 rounded-md text-black bg-white">
      <div class="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Welcome to <span class="text-[#7747ff]">App</span></div>
      <div class="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Signup to your account</div>
      <form class="flex flex-col gap-3" onSubmit={userSignup}>
        <div class="block relative">
          <label for="email" class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Username</label>
          <input type="text" id="email" class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" onChange={(e) => { setUsername(e.target.value) }} />

        </div>
        <div class="block relative">
          <label for="password" class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
          <input type="password" id="password" class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" onChange={(e) => { setPassword(e.target.value) }} />

        </div>

        <div class="block relative">
          <label for="password" class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Confirm Password</label>
          <input type="password" class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" onChange={(e) => { setConfirmPassword(e.target.value) }} />

        </div>
        <button type="submit" class="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal" disabled={loading}>
          {loading ? <span className='loading loading-spinner'></span> : "Signup"}
        </button>

      </form>
      <div class="text-sm text-center mt-[1.6rem]">Already have an account? <Link to={'/login'} class="text-sm text-[#7747ff]">Login!</Link></div>
      <div><Toaster/></div>
    </div>
  )
}

export default Signup