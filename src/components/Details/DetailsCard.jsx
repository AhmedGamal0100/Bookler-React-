import './DetailsCard.css'
import { Carousel, Rate, Button } from 'antd';
import { useSelector } from "react-redux"
import { StarFilled } from '@ant-design/icons'
import { FaLocationDot } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const DetailsCard = ({ data }) => {
    if (!data) return null;
    const isVerticalNavClosed = useSelector((state) => state.verticalNav.closedNav);
    const navigate = useNavigate();

    return (
        <>
            <div className='details-card'>
                <h2>{data.name}</h2>
                <div className='details-card__content'>
                    <div className='details-card__img' style={{ width: isVerticalNavClosed ? '450px' : '638px' }}>
                        <Carousel autoplay>
                            {
                                data.images.gallery.map((img) => (
                                    <img src={img} alt="details image" />
                                ))
                            }
                        </Carousel>
                    </div>
                    <div className="details-card__data">
                        <div>
                            <div className="details-card__data-header">
                                <div className="details-card__data-header-review">
                                    <h6>Hotel Review</h6>
                                    <div className='details-card__data-header-review-rate'>
                                        <div className='details-card__data-header-review-rate-bg'>
                                            <span>{data.rating.score}</span>
                                            <StarFilled />
                                        </div>
                                        <div className='details-card__data-header-review-rate-reviews'>
                                            <p>{data.rating.status}</p>
                                            <div><p>{data.rating.reviewCount} Reviews</p> <Rate disabled allowHalf defaultValue={data.rating.score} style={{ color: "#3C6097", scale: "0.75" }} /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="details-card__data-header-offer">
                                    <p className='details-card__data-header-offer-red'>
                                        {data.pricing[0].discount}
                                    </p>
                                    <div className='details-card__data-header-offer-price'>
                                        <h3>{data.pricing[0].discountedPrice}</h3>
                                        <span>{data.pricing[0].currency}</span>
                                    </div>
                                    <p className='details-card__data-header-offer-per'>
                                        {data.pricing[0].priceUnit}
                                    </p>
                                </div>
                            </div>
                            <div className="details-card__data-about">
                                <h6>About</h6>
                                <p>{data.description}</p>
                            </div>
                        </div>
                        <div>
                            <div className='details-card__address'>
                                <FaLocationDot className='details-card__location' />
                                <span>
                                    {data.address.street}, {data.address.city}, {data.address.country}
                                </span>
                            </div>
                            <div className='details-card__service'>
                                <h6>Popular Service</h6>
                                <div className='details-card__service-cards'>
                                    {
                                        data.amenities.map((amen) => (
                                            <div className='details-card__service-cards-card' key={amen}>{amen}</div>
                                        ))
                                    }
                                </div>
                            </div>
                            <Button type='primary' style={{ width: "100%", height: "35px" }} onClick={() => navigate(`/booking/${data.id}`)}>PAY NOW</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailsCard;