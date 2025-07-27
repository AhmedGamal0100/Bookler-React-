import NavHorizontal from '../components/NavHorizontal/NavHorizontal';
import NavVertical from '../components/NavVertical/NavVertical';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MainLayout() {
    const loggedStore = useSelector((state) => state.account.isLogged);
    return (
        <>
            <main style={{ minHeight: loggedStore ? "100vh" : "115vh" }}>
                <nav>
                    <NavHorizontal />
                </nav>
                <section>
                    <NavVertical />
                </section>
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout
