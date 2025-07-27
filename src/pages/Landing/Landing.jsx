import './Landing.css'
import Recommended from '../../components/Recommended/Recommended'
import { useSelector } from "react-redux"
import Offer from '../../components/Offer/Offer';

function Landing() {
  const isVerticalNavClosed = useSelector((state) => state.verticalNav.closedNav);
  const loggedStore = useSelector((state) => state.account.isLogged);

  return (
    <>
      <section className='content-general' style={{ width: isVerticalNavClosed ? "1060px" : "1250px", top: loggedStore ? "240px" : "410px" }}>
        <Recommended></Recommended>
        <Offer></Offer>
      </section>
    </>
  )
}

export default Landing
