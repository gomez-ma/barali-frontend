import Navbar from "../common/Navbar";
import { Outlet } from "react-router-dom";
import { UseAuth } from "../../hooks/UseAuth";

const MainLayout = () => {
    const { isUser, logOut } = UseAuth();
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