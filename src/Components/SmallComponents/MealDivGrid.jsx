import PropTypes from "prop-types";
import MealsCard from "./MealsCard";


const MealDivGrid = ({meals}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            meals.map(meal=><MealsCard key={meal._id} meal={meal}></MealsCard>)
          }
            
        </div>
    );
};
MealDivGrid.propTypes={
    meals: PropTypes.array,
}
export default MealDivGrid;