import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { notification, Result } from 'antd';
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    const loggedStore = useSelector((state) => state.account.isLogged);
    const [api, contextHolder] = notification.useNotification();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!loggedStore) {
            api.open({
                message: 'Login Error',
                description: "You're not logged in!",
                type: 'error',
                duration: 3,
            });

            const timeout = setTimeout(() => {
                setRedirect(true);
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [loggedStore, api]);

    if (!loggedStore && redirect) {
        return <Navigate to="/" replace />;
    }

    if (!loggedStore) {
        return (
            <>
                {contextHolder}
                <Result
                    style={{ marginTop: "5rem" }}
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                />
            </>
        )
    }

    return (
        <>
            <Outlet />
        </>
    );
};

export default ProtectedRoute;
