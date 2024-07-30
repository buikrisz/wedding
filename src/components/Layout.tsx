import { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import initials from "../assets/initials.png";
import "./Layout.css";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const now = new Date();
  const target = new Date("2024-10-11");

  const difference = target.getTime() - now.getTime();
  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

  return (
    <>
      <div id="layout">
        <img src={initials} alt="DK" className="initials" />
        <h1 className="title">Dominika & Krisztián</h1>
        <h3 className="details1">2024 Október 11 • Levendulás, Inárcs</h3>
        <h3 className="details2">Már csak {days} nap van hátra!</h3>
      </div>
      <Nav />
      {children}
      <Footer />
    </>
  );
};
