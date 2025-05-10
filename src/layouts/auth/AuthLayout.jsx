import Navbar from "../common/Navbar";
import ProtectedRoute from "../../middleware/ProtectedRoute";
import { UseAuth } from "../../hooks/UseAuth";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    const { isUser, logOut } = UseAuth();

    return (
        <ProtectedRoute roles={["ROLE_MEMBER", "ROLE_ADMIN", "ROLE_MODERATOR"]}>
            <Navbar isUser={isUser} logOut={logOut} />
            <main className="container">
                <Outlet />
            </main>
        </ProtectedRoute>
    )
}
export default AuthLayout