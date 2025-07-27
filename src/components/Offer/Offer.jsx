import './Offer.css';
import { useState, useEffect, useRef } from 'react';
import { axiosInstanceOffer, setLoadingHandler } from '../../apis/offer';
import OfferCard from '../OfferCard/OfferCard';
import { useSelector } from 'react-redux';

const Offer = () => {
    const [dataList, setDataList] = useState(null);
    const isVerticalNavClosed = useSelector((state) => state.verticalNav.closedNav);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoadingHandler(setLoading);
    }, []);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const res = await axiosInstanceOffer.get();
                await setDataList(res.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchOffers();
    }, []);

    return (
        <>
            {!loading &&
                <div className="offer">
                    <div className="offer__container">
                        <h2>Best Offer</h2>
                        <div className='offer__cards'>
                            {dataList && dataList.map((item) => (
                                <div className='offer__card-container' key={item.id} style={{ width: isVerticalNavClosed ? "44%" : "27%" }}>
                                    <OfferCard key={item.id} offers={item} ></OfferCard>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default Offer;