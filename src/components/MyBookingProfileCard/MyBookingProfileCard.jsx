import './MyBookingProfileCard.css'

const MyBookingProfileCard = ({ profile }) => {
    if (!profile) return null;

    return (
        <>
            <div className='profile'>
                <h3>Profile</h3>
                <div className='profile__img'><h5>{(profile.username || '').slice(0, 2)}</h5></div>
                <h6>{profile.username}</h6>
                <p>Personal Account</p>
            </div>
        </>
    )
}

export default MyBookingProfileCard;