import Card from "../UI/Card";
import classes from "./AvailableMeal.module.css";
import MealItem from "./MealItem/MealItem";
import axios from "axios";
import { useEffect, useState } from "react";

function AvailableMeal(props) {
  const [meals,setMeals]=useState([]);
  const [isLoading,setisLoading]=useState(true);
  const [error,seterror]=useState();
  useEffect(()=>{
    axios.get('https://react-http-750d5-default-rtdb.firebaseio.com/meals.json')
    .then(function (response) {
      const responseData= response.data;
        const loadedmeals = [];
          for (const key in responseData){
            loadedmeals.push({ 
              id:key,
              name:responseData[key].name,
              description:responseData[key].description,
              price:responseData[key].price
            })
          }
          setMeals(loadedmeals);
    })
    .catch(function (error) {
      seterror(error.message);
    })
    .then(function () {
      // always executed
      setisLoading(false);
    });
  },[])

  if(error){
    return(
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    )
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card className={classes.background}>
      {isLoading ? <div className={classes.loader}></div>: <ul>{mealsList}</ul>}    
      </Card>
    </section>
  );
}

export default AvailableMeal;
