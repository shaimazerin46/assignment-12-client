import PropTypes from "prop-types";


const FAQcard = ({question,answer}) => {
    return (
       <div className="collapse collapse-arrow bg-white shadow-2xl mb-5 md:w-[600px] mx-auto px-3 md:px-0">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title font-semibold">{question}</div>
                <div className="collapse-content text-sm">{answer}</div>
            </div>
    );
};
FAQcard.propTypes={
    question: PropTypes.string,
    answer: PropTypes.string
}
export default FAQcard;