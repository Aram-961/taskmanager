import Link from "next/link";
import AuthBox from "./components/AuthBox";
import Header from "./components/Header";
import { GlobalProvider } from "./context/GlobalContext";

export default function Home() {
  return (
    <GlobalProvider>
      <Header />
      <AuthBox />
    </GlobalProvider>
  )
};
