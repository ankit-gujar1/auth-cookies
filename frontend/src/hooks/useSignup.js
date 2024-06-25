import { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const useSignup = () => {
    const { setUser, user, url } = useAuthContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) navigate('/');
    }, [user])

    const signup = (username, password, confirmPassword) => {
        setLoading(true);
        axios.post(url + 'signup', { username, password, confirmPassword }, { withCredentials: true })
            .then((r) => {
                localStorage.setItem("user", JSON.stringify(r.data));
                setUser(r.data);
                console.log(r.data);
                navigate('/');
            })
            .catch((e) => {
                // console.log(e);
                toast.error(e.response.data.msg);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return { loading, signup };
}

export default useSignup