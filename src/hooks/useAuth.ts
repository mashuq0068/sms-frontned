/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useFrappeAuth } from 'frappe-react-sdk';

interface LoginResult {
  success: boolean;
  user?: any;
}

export const useAuth = () => {
  const { login, logout: frappeLogout, error, isLoading } = useFrappeAuth();
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleLogin = async (
    email: string,
    password: string,
    rememberMe?: boolean
  ): Promise<LoginResult> => {
    try {
      const res = await login({ username: email, password });
      if (res?.message === 'Logged In') {
        if (rememberMe) localStorage.setItem('frappe-user', email);

        // // fetch logged-in username
        // const userRes = await fetch(`http://192.168.172.129:8001/api/method/frappe.auth.get_logged_user`, {
        //   method: 'GET',
        //   credentials: 'include', 
        //   headers: { Accept: 'application/json' },
        // });
        // const data = await userRes.json(); 

        // // fetch full User document
        // const userDocRes = await fetch(`http://192.168.172.129:8001/api/resource/User/${data.message}`, {
        //   method: 'GET',
        //   credentials: 'include',
        //   headers: { Accept: 'application/json' },
        // });
        // const userDoc = await userDocRes.json();

        // setCurrentUser(userDoc.data);
        return { success: true, user: currentUser };
      }

      return { success: false };
    } catch (err) {
      console.error('Login failed:', err);
      return { success: false };
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    frappeLogout();
  };

  return {
    login: handleLogin,
    logout: handleLogout,
    currentUser,
    error,
    isLoading,
  };
};
