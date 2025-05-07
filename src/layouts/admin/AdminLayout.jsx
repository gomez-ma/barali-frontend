import Navbar from "./Navbar";
import ProtectedRoute from "../../middleware/ProtectedRoute";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <ProtectedRoute roles={["ROLE_ADMIN", "ROLE_MODERATOR"]}>
            <Navbar />
            <main className="container">
                <Outlet />
            </main>
        </ProtectedRoute>
    )
}
export default AdminLayout