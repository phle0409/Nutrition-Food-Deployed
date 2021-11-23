import { createClient } from 'pexels';
import React, { useState, useEffect } from 'react';
import useImageFetch from './useImageFetch';

//eventually function should take in props to take in user input

export default function IMAGE_REQUEST() {
    const client = createClient('563492ad6f91700001000001b6ecd90c805743ef9a59064d0fd6337f');
    console.log(client);
    const query = 'food';
    //returns data, isPending, and error in that order
    let dataObject = useImageFetch(query);

    console.log(dataObject);

    return(
        // <img src={photoList.photos[0].src.original} />
        <p>Hopefully the api returns the picture, even if I don't know how to access it</p>
    );

}


