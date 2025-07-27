import './SearchNotFound.css';
import notfound from '../../assets/imgs/SearchNotFound.png';

const SearchNotFound = () => {
    return (
        <>
            <div className="notfound">
                <div className="notfound__container">
                    <div className="notfound__img">
                        <img src={notfound} alt="Not Found Image" />
                    </div>
                    <p>No Result Found</p>
                </div>
            </div>
        </>
    )
}

export default SearchNotFound;