"use client";

import { createContext, useContext, useState } from "react";
import { logoutUser } from "@/services/auth.services";
import { useRouter } from "next/navigation";

export interface CurrentUser {
    id?: string;
    name?: string;
    email?: string;
    [key: string]: unknown;
}

interface AuthContextType {
    user: CurrentUser | null;
    setUser: (user: CurrentUser | null) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ 
    children, 
    initialUser 
}: { 
    children: React.ReactNode; 
    initialUser: CurrentUser | null;
}) {
    const [user, setUser] = useState<CurrentUser | null>(initialUser);
    const router = useRouter();

    const logout = async () => {
        // Clear state
        setUser(null);
        
        // Remove cookies via server action
        await logoutUser();
        
        // Refresh router to update server components
        router.refresh();
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
