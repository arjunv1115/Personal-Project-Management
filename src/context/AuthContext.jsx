import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "projectHub_users";
const CURRENT_USER_KEY = "projectHub_currentUser";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem(CURRENT_USER_KEY);

      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error loading user:", error);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [user]);

  const getUsers = () => {
    try {
      return JSON.parse(
        localStorage.getItem(USERS_KEY) || "[]"
      );
    } catch (error) {
      console.error("Error reading users:", error);
      return [];
    }
  };

  const saveUsers = (users) => {
    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(users)
    );
  };

  // REGISTER / SIGN UP
  const register = ({ name, email, password }) => {
    const users = getUsers();

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = users.find(
      (item) => item.email === normalizedEmail
    );

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: "Password must contain at least 6 characters.",
      };
    }

    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    saveUsers([...users, newUser]);

    const loggedInUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    setUser(loggedInUser);

    return {
      success: true,
      message: "Account created successfully.",
    };
  };

  // LOGIN / SIGN IN
  const login = ({ email, password }) => {
    const users = getUsers();

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = users.find(
      (item) =>
        item.email === normalizedEmail &&
        item.password === password
    );

    if (!existingUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const loggedInUser = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    };

    setUser(loggedInUser);

    return {
      success: true,
      message: "Login successful.",
    };
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}