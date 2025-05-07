import Navbar from "../common/Navbar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const MainLayout = () => {
    const { isUser, logOut } = useAuth();
    return (
        <>
            <Navbar isUser={isUser} logOut={logOut} />
            <main className="container">
                <Outlet />
            </main>
        </>
    )
}
export default MainLayout