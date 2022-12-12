import React, { createContext, useContext, useState, ReactNode } from "react";
import PropTypes from "prop-types";

interface Props {
  children?: ReactNode;
}

interface DefaultContextInterface {
  darkmode: boolean;
  setDarkmode: (darkmode: boolean) => void;
/*   username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void; */
  basicAuth: string;
  setBasicAuth: (basicAuth: string) => void;
}

// Create context
export const DefaultContext = createContext<DefaultContextInterface | null>(
  null
);

// Export provider
export function DefaultProvider({ children }: Props) {
  const [darkmode, setDarkmode] = useState<boolean>(true);
/*   const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>(""); */
  const [basicAuth, setBasicAuth] = useState<string>("");

  return (
    <DefaultContext.Provider
      value={{
        darkmode,
        setDarkmode,
/*         username,
        setUsername,
        password,
        setPassword, */
        basicAuth, 
        setBasicAuth
      }}
    >
      {children}
    </DefaultContext.Provider>
  );
}

// useContext-hook
export function useDefaultProvider() {
  const context = useContext(DefaultContext);

  if (!context) {
    throw new Error("useDefaultProvider is outside of defaultProvider");
  }

  return context;
}

DefaultProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
