
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const MealsCard = ({meal}) => {
    const {title,image,rating,price,_id} = meal;
    return (
        <div>
            <div className="card card-compact bg-base-100 h-full flex flex-col shadow-xl w-96 mx-auto">
  <figure>
    <img
      src={image}
      className="h-[250px] object-cover w-full"
      alt={title} />
  </figure>
  <div className="card-body flex flex-grow">
    <h2 className="card-title">{title}</h2>
    <p>Rating: {rating}</p>
    <p>Price: {price}</p>
    <div className="card-actions justify-center">
     <Link to={`/meals/${_id}`}>
     <button className="btn button-bg text-xl text-white rounded-2xl">Details</button>
     </Link>
    </div>
  </div>
</div>
        </div>
    );
};


MealsCard.propTypes ={
    meal: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired
    }).isRequired

}
export default MealsCard;