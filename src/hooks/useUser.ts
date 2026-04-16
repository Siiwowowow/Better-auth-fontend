import { useAuth } from "@/providers/AuthProvider";

export const useUser = () => {
    const { user, setUser, logout } = useAuth();
    
    return { 
        user, 
        setUser, 
        logout 
    };
};
