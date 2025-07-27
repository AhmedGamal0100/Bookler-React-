import './OfferCard.css';
import { useState, useEffect, useRef } from 'react';
import { axiosInstanceOffer } from '../../apis/offer';
import { useSelector } from 'react-redux';
const OfferCard = ({ offers }) => {
    const isVerticalNavClosed = useSelector((state) => state.verticalNav.closedNav);

    return (
        <>
            <div className="offers">
                <img src={offers.image} alt="offer image" />
                <div className='offers__content'>
                    <h4 style={{ fontSize: isVerticalNavClosed ? "18px" : "16px" }}>{offers.name}</h4>
                    <p style={{ fontSize: isVerticalNavClosed ? "16px" : "14px" }}>{offers.location}</p>
                </div>
            </div>
        </>
    )
}

export default OfferCard;