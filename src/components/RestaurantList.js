import React from 'react'
import { useNavigate } from 'react-router-dom';
import RestaurantCard from './RestaurantCard'
import styles from '../styles/RestaurantList.module.css'

const restaurantList = [
    {
      _id: 0, 
      title: "Gimbap Chonguk", 
      desc: ""
    }, 
    {
      _id: 1, 
      title: "BHC Chicken", 
      desc: ""
    }, 
    {
      _id: 2, 
      title: "Mom's Touch", 
      desc: ""
    },
    {
      _id: 3, 
      title: "Coffee Dutch & Bean", 
      desc: ""
    },
    {
      _id: 4, 
      title: "Chansol Book Cafe Library", 
      desc: ""
    }
  ];
  
function RestaurantList() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <p className={styles.desc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
                in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt eaque commodi fugit iste, quam amet necessitatibus ratione sit blanditiis quas dolorum minima nostrum deleniti laboriosam quod ut nisi voluptatibus ullam.
            </p>
            <div className={styles.wrapper}>
                {restaurantList.map(restaurant => (
                    <div style={{width: '100%'}} onClick={() => navigate(`/restaurant/${restaurant._id}`)} key={restaurant._id}>
                        <RestaurantCard restaurant={restaurant} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RestaurantList
