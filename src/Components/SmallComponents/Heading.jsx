import PropTypes from "prop-types";


const Heading = ({text}) => {
    return (
        <div>
             <h3 className="text-2xl md:py-20 py-5 prime_color text-center">--{text}--</h3>
        </div>
    );
};
Heading.propTypes = {
    text: PropTypes.string
}
export default Heading;