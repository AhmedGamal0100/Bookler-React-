import { Outlet } from 'react-router-dom';
import bacground from '../assets/imgs/planeAuth.png';
import cloudA from '../assets/imgs/cloudAuth2.png';
import cloudB from '../assets/imgs/cloudAuth1.png';
import './AuthLayout.css';

function AuthLayout() {

    return (
        <>
            <main className='authlayout'>
                <Outlet />
                <div className='authlayout__container'>
                    <img src={cloudA} alt="cloud auth" className='authlayout__container-cloud-a' />
                    <img src={bacground} alt="background auth" />
                    <img src={cloudB} alt="cloud auth" className='authlayout__container-cloud-b' />
                </div>
            </main>
        </>
    )
}

export default AuthLayout
