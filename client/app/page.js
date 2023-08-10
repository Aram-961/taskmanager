import Link from "next/link";
import AuthBox from "./components/AuthBox";
import Header from "./components/Header";


export default function Home() {
  return (
    <main>
      <Header />
      <AuthBox />
    </main>
  )
};
