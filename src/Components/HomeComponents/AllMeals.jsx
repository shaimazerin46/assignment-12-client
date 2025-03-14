import { useState } from "react";
import useMeals from "../../hooks/useMeals";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MealDivGrid from "../SmallComponents/MealDivGrid";
import Heading from "../SmallComponents/Heading";

const AllMeals = () => {
    const [meals] = useMeals();
    
    const [tabIndex, setTabIndex] = useState(0);

    const breakfastMeals = meals.filter(meal=>meal.category==='Breakfast');
    const lunchMeals = meals.filter(meal=>meal.category==='Lunch');
    const dinnerMeals = meals.filter(meal=>meal.category==='Dinner');

    return (
        <div className="max-w-7xl mx-auto">
            <Heading text={"All meals"}></Heading>
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
               <div className="flex justify-center mb-10">
               <TabList className='flex space-x-10 text-xl '>
                    <Tab className='bg-[#A5B68D] py-2 px-6 rounded-xl text-white'>All</Tab>
                    <Tab  className='bg-[#A5B68D] py-2 px-6 rounded-xl text-white'>Breakfast</Tab>
                    <Tab  className='bg-[#A5B68D] py-2 px-6 rounded-xl text-white'>Lunch</Tab>
                    <Tab  className='bg-[#A5B68D] py-2 px-6 rounded-xl text-white'>Dinner</Tab>
                </TabList>
               </div>
                <TabPanel>
                   <MealDivGrid meals={meals}></MealDivGrid>
                </TabPanel>
                <TabPanel>
                   <MealDivGrid meals={breakfastMeals}></MealDivGrid>
                </TabPanel>
                <TabPanel>
                   <MealDivGrid meals={lunchMeals}></MealDivGrid>
                </TabPanel>
                <TabPanel>
                   <MealDivGrid meals={dinnerMeals}></MealDivGrid>
                </TabPanel>

                
            </Tabs>
        </div>
    );
};

export default AllMeals;