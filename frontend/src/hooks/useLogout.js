import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setUser, url } = useAuthContext();

    const logout = () => {
        setLoading(true);
        axios.post(url + 'logout')
            .then(() => {
                localStorage.removeItem('user');
                setUser(null);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return { loading, logout }
}

export default useLogout