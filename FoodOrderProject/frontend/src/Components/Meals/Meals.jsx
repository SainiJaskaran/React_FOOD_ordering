import MealItem from "./MealItem.jsx";
import useHttp from "../../hooks/useHttp.js";
import Error from "../UI/Error.jsx";

const requestConfig = {};

export default function Meals(){

    const {data: meals, isLoading, error } = useHttp("http://localhost:3000/meals", requestConfig, []);

    // const [meals, setMeals] = useState([]);

    // useEffect(()=>{
    //     async function fetchingMeals(){
    //         try {
    //             const fetchedMeals = await fetchMeals();
    //             setMeals(fetchedMeals);
    //         } catch (error) {
    //             throw error;
    //         }
    //     }
    //     fetchingMeals();
    // },[]);
    
    if(isLoading){
        return <p className="center">Fetching meals.....</p>
    }

    if(error){
        return <Error title="Failed to fetch meals" message="error"/>
    }

    return(
        (<ul id="meals">
            {meals.map((meal)=>(
                <MealItem key={meal.id} meal={meal}/>
            ))}
        </ul>)
    );
}