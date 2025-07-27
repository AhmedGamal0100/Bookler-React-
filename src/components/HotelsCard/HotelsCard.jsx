import { useSelector } from 'react-redux';
import './HotelsCard.css';
import { Tooltip, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const HotelsCard = ({ hotels }) => {
    const isVerticalNavClosed = useSelector((state) => state.verticalNav.closedNav);
    const navigate = useNavigate();
    return (
        <>
            <div className="hotels-card" style={{ width: isVerticalNavClosed ? "450px" : "564px" }}>
                <div className='hotels-img'>
                    <img src={hotels.images.main} alt="hotels thumbnail" />
                </div>
                {

                    <div className="hotels-content">
                        <div className='hotels-upper'>
                            <h2>{hotels.name}</h2>
                            <p>{hotels.description}</p>
                        </div>
                        <div className="hotels-lower">
                            <div className='hotels-amenities-container'>
                                {hotels.amenities.map((amen) => (
                                    <Tooltip title={amen} key={amen} >
                                        <div className='hotels-amenity' key={amen}> <p> {amen}</p></div>
                                    </Tooltip>
                                ))}
                            </div>
                            <div className="hotels-lower-container">
                                <p>{hotels.pricing[0].discount} <b>${hotels.pricing[0].discountedPrice}</b></p>
                                <div style={{ display: "flex", gap: "6px" }}>
                                    <Button onClick={() => navigate(`/details/${hotels.id}`)}>View Details</Button>
                                    <Button onClick={() => navigate(`/booking/${hotels.id}`)}>Book Now</Button>
                                </div>
                            </div>

                        </div>
                    </div>

                }
            </div>
        </>
    )
}

export default HotelsCard;