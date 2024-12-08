import React from 'react';
import '../Assest/css/OverviewCard.css';
// import '../components/ProduceSalesOverview_card.css';

function ProduceSalesOverView_card(props) {
    return (
        <div className={`ProduceSalesOverView_card ${props.borderRadius ? 'borderRadius' : ''}`}>
            <img
                src={props.organicPlantMagicImg}
                alt={props.cardHeading}
                className={`produceSalesImage ${props.borderRadius ? 'borderRadius' : ''}`}
            />
            <h2 style={{ color: props.cardHeadingColor, fontWeight: 'bolder'}}>
                {props.cardHeading}
            </h2>
            <p style={{ color: props.cardHeadingColor }}>
                {props.cardDiscription}
            </p>
        </div>
    );
}

export default ProduceSalesOverView_card;

