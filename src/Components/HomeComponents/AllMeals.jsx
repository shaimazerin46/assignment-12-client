import { useState } from "react";
import useMeals from "../../hooks/useMeals";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MealDivGrid from "../SmallComponents/MealDivGrid";

const AllMeals = () => {
    const [meals] = useMeals();
    
    const [tabIndex, setTabIndex] = useState(0);

    const breakfastMeals = meals.filter(meal=>meal.category==='Breakfast');
    const lunchMeals = meals.filter(meal=>meal.category==='Lunch');
    const dinnerMeals = meals.filter(meal=>meal.category==='Dinner');

    return (
        <div className="md:mb-20 mb-5">
            <h3 className="text-2xl md:py-20 py-5 text-orange-400 text-center">All meals</h3>
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
               <div className="flex justify-center mb-10">
               <TabList>
                    <Tab>All</Tab>
                    <Tab>Breakfast</Tab>
                    <Tab>Lunch</Tab>
                    <Tab>Dinner</Tab>
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