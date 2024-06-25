import React, { useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useLogout from '../hooks/useLogout';

const Home = () => {
  const { user } = useAuthContext();
  const {loading,logout}=useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user])

  return (
    <div>
      <div className='h-screen flex flex-col justify-center items-center'>
        <div className='justify-center'>
          {user && <p className='text-3xl font-bold'>{user.username}</p>}
          <button type="submit" disabled={loading} onClick={logout} class="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal" >
          {loading ? <span className='loading loading-spinner'></span> : "Logout"}
          </button>

        </div>
      </div>
      <div>
        <Toaster />
      </div>
    </div>
  )
}

export default Home