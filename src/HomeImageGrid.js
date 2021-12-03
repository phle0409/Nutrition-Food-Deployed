import { useState, useEffect } from 'react';
import use_spoon_home from './use_spoon_home';
import "./HomeImageArray.css";
import ImageHome from './Image_Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

//This file is used to get recipes and there associated images
//from the Spoonacular API

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function food_object(food_type, cuisine_name) {
    this.food_type = food_type;
    this.cuisine_name = cuisine_name;
}

function to_url(food_type, to_skip) {
    let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=79eef11486d54ee59840b008db673b2e&type=${food_type}&offset=${to_skip}&addRecipeInformation=true&addRecipeNutrition=true&number=1`;
    return url;
}


const HomeImageGrid = ({ stateChange = f => f, setLink = f => f, toCompare = f => f, columnCount, compare }) => {
    //otherwise, I want to hard code request to the API for 10 different cuisine types
    //Should occur once at the start of the program
    let [removed, setRemoved] = useState(false);

    if (sessionStorage.getItem('Home_Page_Array') === null) {
        //const cuisine_string = "African American British Cajun Caribbean Chinese Eastern%20European European French German Greek Indian Irish Italian Japanese Jewish Korean Latin%20American Mediterranean Mexican Middle%20Eastern Southern Spanish Thai Vietnamese";
        //const cuisine_array = cuisine_string.split(" ");

        const food_type_string = "main%20course side%20dish";
        const food_type_array = food_type_string.split(" ");

        //I want a loop to add 12 different random cuisines from cuisine
        //array to empty array and have a random type paired with them

        console.log("I be in dat conditional render do");

        //I will use a list of urls
        let url_array = [];
        let food_type_length = food_type_array.length;
        //let cuisine_array_length = cuisine_array.length;
        for (let i = 0; i < 18; i++) {
            //let rand_cuisine_index = randomInt(cuisine_array_length);
            let rand_type_index = randomInt(food_type_length);
            let num_to_skip = randomInt(900);
            //populate url_array with the proper queries
            url_array.push(to_url(food_type_array[rand_type_index], num_to_skip));

        }
        //console.log(`This is array of urls I searched: ${url_array}`);
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
    else {
        //break up images into three arrays, each 33% of the total flex
        //size

        let array = sessionStorage.getItem('Home_Page_Array');
        let decoded_array = JSON.parse(array);
        let decoded_length = decoded_array.length;
        let column_length = Math.ceil((decoded_array.length) / columnCount);
        console.log(column_length);

        function columns(index, column_per_page, data_array) {
            let array = [];
            let entry_limit = column_per_page * index + column_per_page;
            for (let i = index * column_per_page; i < entry_limit; ++i) {
                //console.log("yep");
                if (i < decoded_length) {
                    let item = data_array[i];
                    array.push(
                        <Col key={i}>
                            <ImageHome setRemoved={() => setRemoved(!removed)} index={i} compare={compare} setLink={setLink} toCompare={toCompare} info={item} src={item.data.results[0].image} key={item.data.results[0].id} alt={`${item.data.results[0].title}`} />
                        </Col>
                    );

                }
                else {
                    array.push(
                        <Col key={i}></Col>
                    );
                }
            }
            return array;
        }

        function rows(column_length, data_array, column_count) {
            let grid_array = [];
            for (let i = 0; i < column_length; ++i) {

                grid_array.push(
                    <Row key={i}>
                        {columns(i, column_count, data_array)}
                    </Row>);
            }
            return grid_array;
        }
        return (
            <Container>
                {
                    rows(column_length, decoded_array, columnCount)
                }
            </Container>
        );
    }
}

export default HomeImageGrid;