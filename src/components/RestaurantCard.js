import React from 'react'
import defaultRestaurant from '../assets/default-restaurant.jpeg';
import styles from '../styles/RestaurantCard.module.css'

function RestaurantCard({ restaurant }) {
    return (
        <div className={styles.container}>
            <img src={defaultRestaurant} alt="" width="100" height="100" />
            <h1 className={styles.title}>{restaurant.title}</h1>
            {/* <span className={styles.price}>&#8377; {restaurant.prices[0]}</span> */}
            <p className={styles.desc}>
                {restaurant.desc}
            </p>
        </div>
    )
}

export default RestaurantCard;