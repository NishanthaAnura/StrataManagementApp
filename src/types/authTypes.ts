export interface AuthContextType {
    isAuthenticated: boolean;
    userRole: string | null;
    userEmail: string | null;
    userId: string | null;
    login: (token: string, role: string, userEmail: string, userId: string) => void;
    logout: () => void;
  }