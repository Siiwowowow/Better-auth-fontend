//src/providers/AuthProvider.tsx
"use client";

import { createContext, useContext, useState } from "react";
import { logoutUser } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { ICurrentUser } from "@/types/user.types";

// ✅ আলাদা CurrentUser বাদ দিয়ে ICurrentUser ব্যবহার করুন
interface AuthContextType {
    user: ICurrentUser | null;
    setUser: (user: ICurrentUser | null) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ 
    children, 
    initialUser 
}: { 
    children: React.ReactNode; 
    initialUser: ICurrentUser | null; // ✅ type fixed
}) {
    const [user, setUser] = useState<ICurrentUser | null>(initialUser);
    const router = useRouter();

    const logout = async () => {
        setUser(null);
        await logoutUser();
        window.location.href = "/login";
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