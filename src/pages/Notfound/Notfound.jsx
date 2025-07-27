import NavHorizontal from '../../components/NavHorizontal/NavHorizontal';
import NavVertical from '../../components/NavVertical/NavVertical';
import { useSelector } from 'react-redux';
import notfound from '../../assets/imgs/RoutingNotFound.png'
import "./Notfound.css";

function Notfound() {
  const loggedStore = useSelector((state) => state.account.isLogged);
  const isVerticalNavClosed = useSelector((state) => state.verticalNav.closedNav);
  return (
    <>
      <main style={{ minHeight: loggedStore ? "100vh" : "115vh" }}>
        <nav>
          <NavHorizontal />
        </nav>
        <section>
          <NavVertical />
        </section>
        <section className='content-general' style={{ width: isVerticalNavClosed ? "1060px" : "1250px", top: loggedStore ? "240px" : "410px" }}>
          <div className="notfound">
            <div className="notfound__container">
              <div className="notfound__img">
                <img src={notfound} alt="Not Found Image" />
              </div>
              <h2>404</h2>
              <p>Page not Fount</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Notfound
