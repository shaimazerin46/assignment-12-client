import PropTypes from "prop-types";


const WebButton = ({btn_text}) => {
    return (
        <div>
            <button className="btn border-0 prime_bg rounded-xl text-white">{btn_text}</button>
        </div>
    );
};

export default WebButton;
WebButton.propTypes = {
    btn_text: PropTypes.string,
}