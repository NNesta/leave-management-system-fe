// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { useUserByEmail } from "@/hooks/useEmployee";

interface AuthContextType {
  userRole: string;
  isAuthReady: boolean;
}

const AuthContext = createContext<AuthContextType>({
  userRole: "Staff",
  isAuthReady: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { instance, accounts } = useMsal();
  const [isAuthReady, setIsAuthReady] = useState(false);
  const { data: user } = useUserByEmail(accounts[0]?.username || "");
  const userRole = user?.role;

  useEffect(() => {
    instance.initialize().then(() => {
      instance
        .handleRedirectPromise()
        .then((response) => {
          if (response) {
            instance.setActiveAccount(response.account);
          }
        })
        .catch((error) => {
          console.error("MSAL redirect error:", error);
        })
        .finally(() => {
          setIsAuthReady(true);
        });
    });
  }, [instance]);

  if (!isAuthReady || !userRole) {
    return <div>Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider value={{ userRole, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
