import {useState, useEffect} from 'react';
import use_spoon_home from './use_spoon_home';
import "./HomeImageArray.css";
import ImageHome from './Image_Home';

//This file is used to get recipes and there associated images
//from the Spoonacular API

function randomInt(max) {
    return Math.floor(Math.random()*max);
}

function food_object(food_type, cuisine_name) {
    this.food_type = food_type;
    this.cuisine_name = cuisine_name;
}

function to_url(food_type, cuisine_name) {
    let url = ` https://api.spoonacular.com/recipes/complexSearch?apiKey=79eef11486d54ee59840b008db673b2e&type=${food_type}&addRecipeInformation=true&addRecipeNutrition=true&cuisine=${cuisine_name}&number=1`;
    return url;
}

const HomeImageGrid = ({stateChange = f=>f})  => {
    //otherwise, I want to hard code request to the API for 10 different cuisine types
    //Should occur once at the start of the program


    if(sessionStorage.getItem('Home_Page_Array') === null) {
        const cuisine_string = "African American British Cajun Caribbean Chinese Eastern%20European European French German Greek Indian Irish Italian Japanese Jewish Korean Latin%20American Mediterranean Mexican Middle%20Eastern Southern Spanish Thai Vietnamese";
        const cuisine_array = cuisine_string.split(" ");
        const food_type_string = "main%20course side%20dish dessert appetizer";
        const food_type_array = food_type_string.split(" ");

        //I want a loop to add 12 different random cuisines from cuisine
        //array to empty array and have a random type paired with them

        //I will use a list of urls
        let url_array = [];
        let food_type_length = food_type_array.length;
        let cuisine_array_length = cuisine_array.length;
        for(let i=0; i < 12; i++) {
            let rand_cuisine_index = randomInt(cuisine_array_length);
            let rand_type_index = randomInt(food_type_length);
            //populate url_array with the proper queries
            url_array.push(to_url(food_type_array[rand_type_index], cuisine_array[rand_cuisine_index]));
            
        }
        console.log(`This is array of urls I searched: ${url_array}`);
        //url list is found, now we need to call our axios fetch thing
        //useSpoonacular
        //misleading name, so add home at end: use_spoon_home
        use_spoon_home(url_array, stateChange);
        return (<h1>Images are loading...</h1>);
    }
    // if(sessionStorage.getItem('Home_Page_Array') === null)
    // {
    //     return <h1>Images are loading...</h1>
    // }
    else
    {
        //break up images into three arrays, each 33% of the total flex
        //size
        let array = sessionStorage.getItem('Home_Page_Array');
        let decoded_array = JSON.parse(array);
        let column_length = Math.floor((decoded_array.length)/3);
        console.log(decoded_array.length / 3);
        //now I want to get three parts of this array
        let column1 = decoded_array.slice(0,column_length); //first 1/3
        let column2 = decoded_array.slice(column_length,(2*column_length)); //second 1/3
        console.log(`This is column2: ${column2.length}`)
        let column3 = decoded_array.slice(2*column_length); //third 1/3
        console.log(`This is column 3: ${column3.length}`);
        return(
            <div id="flex">
                <div className="column">
                {
                column1.map((item)=>{
                    return(<ImageHome info={item} src={item.data.results[0].image} key={item.data.results[0].id} alt={`${item.data.results[0].title}`} />);
                })
                }
                </div>
                <div className="column">
                {
                    column2.map((item)=> {
                        return(<ImageHome info={item} src={item.data.results[0].image} key={item.data.results[0].id} alt={`${item.data.results[0].title}`} />);
                    })
                }
                </div>
                <div className="column">
                {
                    column3.map((item,index)=>{
                        console.log(`index: ${index}`);
                        return(<ImageHome info={item} src={item.data.results[0].image} key={item.data.results[0].id} alt={`${item.data.results[0].title}`} />);
                    })
                }
                </div>
            </div>
        );
    }
}

export default HomeImageGrid;