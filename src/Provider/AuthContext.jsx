import React, { createContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => onAuthStateChanged(auth, (u) => {
        setUser(u ? { uid: u.uid, email: u.email, displayName: u.displayName, photoURL: u.photoURL } : null);
        setLoading(false);
    }), []);

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .catch(err => { toast.error(err.message); throw err; })
            .finally(() => setLoading(false));
    };

    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .catch(err => { toast.error(err.message); throw err; })
            .finally(() => setLoading(false));
    };

    const register = async (name, email, password, photoURL) => {
        setLoading(true);
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name, photoURL });
        setLoading(false);
        return cred;
    };

    const logout = () => auth.signOut();

    const Data = {
        user,
        loading,
        login,
        loginWithGoogle,
        register,
        logout
    };

    return <AuthContext Data={Data}>{!loading && children}</AuthContext>;
}
// modify previous auth code to balance time and overcome himself....
//  i wasted already two days to fetch data on serveride to client side 