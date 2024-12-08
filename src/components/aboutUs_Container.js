import React from 'react';
import '../Assest/css/AboutUsContainer.css';

function aboutUs_Container(props){
    return(
            <div className='aboutUs_Container'>
                <h3>
                    {props.heading}
                </h3>
                <p>
                {props.paragraph}
                </p>
            </div>
    );
}

export default aboutUs_Container;