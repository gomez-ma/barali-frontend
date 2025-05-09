import Navbar from "../common/Navbar";
import ProtectedRoute from "../../middleware/ProtectedRoute";
import { useAuth } from "../../hooks/Auth";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    const { isUser, logOut } = useAuth();

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