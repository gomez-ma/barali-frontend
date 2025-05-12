import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import HeroImage from "../../components/heroImage/HeroImage";
import { Outlet } from "react-router-dom";
import { UseAuth } from "../../hooks/UseAuth";

const MainLayout = () => {
    const { isUser, logOut } = UseAuth();
    return (
        <>
            <Navbar isUser={isUser} logOut={logOut} />
            <main className="container">
                <HeroImage />
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
export default MainLayout