import Heading from "../SmallComponents/Heading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestCard from "./TestCard";
import woman from '../../assets/images/woman.jpg'
import man1 from '../../assets/images/man1.jpg'
import man2 from '../../assets/images/man2.jpg'


const Testimonial = () => {
    var settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="max-w-7xl mx-auto md:mb-20 mb-5">
            <Heading text={"What our clients say?"}></Heading>
            <Slider className="md:w-[900px] mx-auto" {...settings}>
               <TestCard image={woman} name={"Jannatul Maowa"} text={"The food here is surprisingly good for hostel standards! The meals are well-balanced with a mix of local and healthy options. I especially love the Friday biryani and the evening snacks. The kitchen is clean, and the menu changes often enough to avoid boredom. As a vegetarian, I also appreciate that there are always veg options available. Overall, a solid 4.5 out of 5!"}></TestCard>
                <TestCard image={man1} name={"Sajib Shahria"} text={"I was worried about hostel food before moving in, but this place proved me wrong. The hygiene is maintained well, and I can actually look forward to meals. Special weekend menus are a nice touch! I do wish there were a few more dessert options, though."}></TestCard>
                <TestCard image={man2} name={"Atik Al Aziz"} text={"The food is really satisfying! Breakfast is always fresh and served on time, which helps me start my day right. I love the variety in lunch and dinner menus. The dal and mixed vegetables are my favorites. Sometimes the food is a bit spicy, but overall, it’s healthy and filling"}></TestCard>
            </Slider>
        </div>
    );
};

export default Testimonial;