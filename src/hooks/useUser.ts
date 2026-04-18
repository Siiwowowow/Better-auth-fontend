import { useAuth } from "@/providers/AuthProvider";
import { ICurrentUser } from "@/lib/authUtils";

export const useUser = () => {
    const { user, setUser, logout } = useAuth();
    
    return { 
        user, 
        setUser: setUser as (user: ICurrentUser | null) => void,
        logout 
    };
};