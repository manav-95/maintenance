import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
    id: string;
    name: string;
    phone: string;
    email: string;
    role: string;
    flat: string;
    societyId: string;
}

interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    login: (userData: User, token: string) => void;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(
        () => JSON.parse(localStorage.getItem("user") || "null")
    );
    const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem("accessToken"));

    const login = (userData: User, token: string) => {
        console.log("🚀 Logged in user:", userData);
        setUser(userData);
        setAccessToken(token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("accessToken", token);
    }

    const logout = async () => {
        try {
            const res = await axios.post(`${baseUrl}/auth/logout`, {}, {
                withCredentials: true
            });

            if (res.status === 200) {
                navigate('/login');
                alert(res.data.message || 'Logged out successfully');
            }

        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setUser(null);
            setAccessToken(null);
            localStorage.clear();
            navigate('/login');
        }
    };

    const refreshAccessToken = async () => {
        console.log("♻️ Trying to refresh token...");
        try {

            const res = await axios.get(`${baseUrl}/auth/refresh-token`, { withCredentials: true });

           // console.log("✅ Refresh response:", res.data);

            const data = res.data;
            if (data?.accessToken) {
                setAccessToken(data.accessToken);
                localStorage.setItem("accessToken", data.accessToken);
                console.log("🔄 Token refreshed successfully!");
            } else {
                console.warn("⚠️ No accessToken found in response — logging out...");
                logout();
            }
        } catch (error: any) {
            console.error("❌ Token refresh failed:", error.response?.data || error.message);
            logout();
        }
    };

    useEffect(() => {
         console.log("🚀 AuthProvider mounted — starting token refresh interval...");
        const interval = setInterval(refreshAccessToken, 14 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
