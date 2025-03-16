import story from '../../assets/images/story.jpg';


const Story = () => {
    return (
        <div className="flex md:pt-20 pt-5 max-w-7xl mx-auto items-center">
            <div className='mx-auto'>
                <img src={story} alt="" className='h-[600px] w-[450px] object-cover rounded-[300px]'/>
            </div>
            <div className='w-[500px]'>
                <h3 className='logo-font text-7xl font-light py-7'>Our story</h3>
                <p className='text-justify'>
                Welcome to HostelMeal — where every meal is more than just food; it’s an experience crafted for your taste buds and lifestyle. Whether you’re a busy professional needing quick, healthy options, a foodie seeking diverse cuisines, or a family planning weekly dinners, Feastify brings convenience and flavor to your doorstep. With personalized meal plans, fresh ingredients, and chef-curated recipes, you’ll spend less time cooking and more time savoring. Say goodbye to grocery lists and meal stress — and hello to delicious, hassle-free dining tailored just for you. Feastify: Fuel your day, one bite at a time.
                </p>
                
            </div>
           
        </div>
    );
};

export default Story;