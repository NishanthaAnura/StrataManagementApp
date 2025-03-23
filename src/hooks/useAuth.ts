import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { AuthContextType } from '../types/authTypes'; // Define this type if not already defined

export const useAuth = () => useContext(AuthContext) as AuthContextType;