import {useState, useEffect} from 'react';
import use_spoon_home from './use_spoon_home';

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
    let url = ` https://api.spoonacular.com/recipes/complexSearch?apiKey=79eef11486d54ee59840b008db673b2e&type=${food_type}&cuisine=${cuisine_name}&number=2`;
    return url;
}

const HomeImageArray = ({stateChange = f=>f})  => {
    //otherwise, I want to hard code request to the API for 10 different cuisine types
    //Should occur once at the start of the program


    if(sessionStorage.getItem('Home_Page_Array') === null) {
        const cuisine_string = "African American British Cajun Caribbean Chinese Eastern European European French German Greek Indian Irish Italian Japanese Jewish Korean Latin American Mediterranean Mexican Middle Eastern Nordic Southern Spanish Thai Vietnamese";
        const cuisine_array = cuisine_string.split(" ");
        const food_type_string = "main course side dish dessert appetizer salad bread breakfast soup beverage sauce marinade fingerfood snack drink";
        const food_type_array = food_type_string.split(" ");

        //I want a loop to add 10 different random cuisines from cuisine
        //array to empty array and have a random type paired with them

        //I will use a list of urls
        let url_array = [];
        let food_type_length = food_type_array.length;
        let cuisine_array_length = cuisine_array.length;
        for(let i=0; i < 10; i++) {
            let rand_cuisine_index = randomInt(cuisine_array_length);
            let rand_type_index = randomInt(food_type_length);
            //populate url_array with the proper queries
            url_array.push(to_url(food_type_array[rand_type_index], cuisine_array[rand_cuisine_index]));
            
        }
        //url list is found, now we need to call our axios fetch thing
        //useSpoonacular
        //misleading name, so add home at end: use_spoon_home
        use_spoon_home(stateChange);
    }
    if(sessionStorage.getItem('Home_Page_Array') === null)
    {
        return <h1>Images are loading...</h1>
    }
    else
    {
        return(
            <div>
                <h1>Loaded</h1>
            </div>
        );
    }
}

export default HomeImageGrid;