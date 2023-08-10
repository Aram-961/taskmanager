'use client'

import { GlobalProvider } from "./context/GlobalContext";
import AuthBox from "./components/AuthBox";
import Header from "./components/Header";

export default function Home() {
  
  return ( 
    <GlobalProvider>
      <Header />
      <AuthBox />
    </GlobalProvider>
  )
};
