import React from 'react';
import '../Assest/css/Review.css';

function Review(props) {
    return (
        <div className='Reviews'>
            <p className='ReviewDiscription'>
                {props.ReviewDiscription}
            </p>
            <div className='star'>
                <i class="fa-solid fa-star-sharp"></i>
                <i class="fa-solid fa-star-sharp"></i>
                <i class="fa-solid fa-star-sharp"></i>
                <i class="fa-solid fa-star-sharp"></i>
                <i class="fa-solid fa-star-sharp"></i>
            </div>
            <p className='ReviewerName'>
                {props.ReviewerName}
            </p>
        </div>
    );
}

export default Review;

