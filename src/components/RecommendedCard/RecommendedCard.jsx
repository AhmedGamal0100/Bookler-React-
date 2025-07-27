import './RecommendedCard.css';
import { Rate, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const RecommendedCard = ({ recommended }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className='recommended-card'>
                <div className='recommended-card__img'>
                    <img src={recommended.images.main} alt="card image" />
                </div>
                <div className='recommended-card__content'>
                    <div className='recommended-card__upper'>
                        <h6>Hotel</h6>
                        <h4>
                            {recommended.name}
                        </h4>
                        <p>{recommended.address.street}, {recommended.address.city}</p>
                    </div>
                    <div className='recommended-card__lower'>
                        <Rate style={{ scale: "0.9" }} disabled value={recommended.rating.score >= 4.5 ? Math.ceil(recommended.rating.score) : Math.floor(recommended.rating.score)} />
                        <Button className='recommended-card__button' type='danger' onClick={() => navigate(`/booking/${recommended.id}`)}>
                            Book Now
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecommendedCard