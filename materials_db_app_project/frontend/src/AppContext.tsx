import { createContext } from "react";

export const AppContext = createContext({});

interface Props {
  children: React.ReactNode;
}

export const AppProvider = (props: Props) => {
  return <AppContext.Provider value={{}}>{props.children}</AppContext.Provider>;
};
