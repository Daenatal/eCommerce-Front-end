import { createContext, useState, useEffect } from 'react';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user); //if user signed out we store null if user signed in we store the object
        });
        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

