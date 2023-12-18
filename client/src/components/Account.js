import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import UserNavbar from './UserNavbar'
import RestaurantNavbar from './RestaurantNavbar'

function Account() {
    const history = useHistory();
    const location = useLocation();
    const user_login = location.state[0];
    const cart = location.state[1];

    const [restaurant, setRestaurant] = useState();
    const [pastOrders, setPastOrders] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [items, setItems] = useState([]);

    const [pastOrderClasses, setPastOrderClasses] = useState({});

    useEffect(() => {
        if(user_login.user_type === 'restaurant'){
            setReviews(user_login.restaurant.reviews.filter(review => review.review_type === 'restaurant'));

            fetch('/pastorders')
                .then(res => res.json())
                .then(allOrders => {
                    const temp_past_orders = allOrders.filter(order => order.restaurant_id === user_login.restaurant_id);
                    const temp_orders = [];

                    if (temp_past_orders.length > 0){
                        fetch('/menuItems')
                            .then(res => res.json())
                            .then(menu => {
                                for (let i = 0; i < temp_past_orders.length; i++){
                                    const itemIDs = temp_past_orders[i].menuItemIDs.split('-');
                                    const quantities = temp_past_orders[i].quantities.split('-');
                                    const total = Math.round(temp_past_orders[i].total * 100) / 100;
                                    const temp_items = [];
                                    let restaurant = {};

                                    for(let j = 0; j < itemIDs.length; j++){
                                        for(let k = 0; k < menu.length; k++){
                                            if (parseInt(itemIDs[j]) === menu[k].id){
                                                temp_items.push(menu[k]);
                                            }
                                        }
                                    }

                                    fetch('/restaurants')
                                        .then(res => res.json())
                                        .then(restaurants => {
                                            for(let i = 0; i < restaurants.length; i++){
                                                if (restaurants[i].id === temp_past_orders[i].restaurant_id){
                                                    restaurant = restaurants[i];
                                                }
                                            }

                                            const temp_order = {'items': temp_items, 'quantities': quantities, 'restaurant': restaurant, 'total': total};
                                            temp_orders.push(temp_order);

                                            if (temp_orders.length === temp_past_orders.length){
                                                setPastOrders(temp_orders);
                                            }
                                        })
                                }
                            })
                    }
                })
        } else if (user_login.user_type === 'user'){
            setRestaurant(location.state[2]);
            setReviews(user_login.user.reviews.filter(review => review.review_type === 'customer'));

            fetch('/pastorders')
                .then(res => res.json())
                .then(allOrders => {
                    const temp_past_orders = allOrders.filter(order => order.user_id === user_login.user_id);
                    const temp_orders = [];

                    if (temp_past_orders.length > 0){
                        fetch('/menuItems')
                            .then(res => res.json())
                            .then(menu => {
                                for (let i = 0; i < temp_past_orders.length; i++){
                                    const itemIDs = temp_past_orders[i].menuItemIDs.split('-');
                                    const quantities = temp_past_orders[i].quantities.split('-');
                                    const total = Math.round(temp_past_orders[i].total * 100) / 100;
                                    const id = i + 1;
                                    let count = 0;
                                    const temp_items = [];
                                    let restaurant = {};

                                    for(let j = 0; j < itemIDs.length; j++){
                                        for(let k = 0; k < menu.length; k++){
                                            if (parseInt(itemIDs[j]) === menu[k].id){
                                                temp_items.push(menu[k]);
                                            }
                                        }
                                    }

                                    fetch('/restaurants')
                                        .then(res => res.json())
                                        .then(restaurants => {
                                            for(let j = 0; j < restaurants.length; j++){
                                                if (restaurants[j].id === temp_past_orders[i].restaurant_id){
                                                    restaurant = restaurants[j];
                                                }
                                            }

                                            for(let j = 0; j < quantities.length; j++){
                                                count += parseInt(quantities[j]);
                                            }

                                            const temp_order = {'id': id, 'items': temp_items, 'quantities': quantities, 'total_items': count, 'restaurant': restaurant, 'total': total};
                                            temp_orders.push(temp_order);

                                            if (temp_orders.length === temp_past_orders.length){
                                                const temp_classes = {};

                                                for (let k = 0; k < temp_orders.length; k++){
                                                    temp_classes[temp_orders[k].id] = ['past-order-details hide', 'https://static.thenounproject.com/png/4984281-200.png', 'past-order-container'];
                                                }

                                                setPastOrderClasses(temp_classes);
                                                setPastOrders(temp_orders);
                                            }
                                        })
                                }
                            })
                    }
                })
        }
    }, []);

    return (
        <div>
            { user_login.user_type === 'user' &&
                <div>
                    <UserNavbar user_login={user_login} cart={cart} restaurant={restaurant} />
                    <h1 className='page-title' >Account</h1>

                    <div className='account-page-main-content'>
                        <img className='account-img' src={user_login.user.profile_pic} alt={`${user_login.user.name}_img`}/>
                        
                        <div className='past-orders-container' >
                            <h2>Past Orders</h2>
                            {pastOrders.map(order => (
                                <div className={pastOrderClasses[`${order.id}`][2]} key={order.id} >
                                    <img className='dropdown-icon' src={pastOrderClasses[`${order.id}`][1]} onClick={() => handleDropdownClick(order.id)} alt='dropdown-icon'/>
                                    <h3>{order.restaurant.name}</h3>
                                    <p>Total: ${order.total} • {order.total_items} items</p>
                                    <div id='' className='past-order-btns-container'>
                                        <button className='past-order-btn'>View Receipt</button>
                                        <button className='past-order-btn' onClick={() => handleReorder(order)}>Reorder</button>
                                    </div>
                                    <div className={pastOrderClasses[`${order.id}`][0]}>
                                        {order.items.map((item, index) => (
                                            <div className='past-order-item'>
                                                <img src={item.image} className='past-order-item-img' alt={`${item.item}_img`}/>
                                                <h3>{item.item}</h3>
                                                <p>${item.price} (x{order.quantities[index]})</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h2 className='reviews-title' >Reviews:</h2>
                    <div className='reviews-container' >
                        {reviews.map((review) => (
                            <div className='review-card' key={review.id} >
                                <h3>{review.restaurant.name}</h3>
                                <p>{review.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            }

            { user_login.user_type === 'restaurant' &&
                <div>
                    <RestaurantNavbar user_login={user_login} />
                    <h1 className='page-title' >Account</h1>
                    
                    <div className='account-page-main-content'>
                        <img src={user_login.restaurant.image} alt={`${user_login.restaurant.name}_img`} className='account-img' />

                        <div className='past-orders-container' >
                            <h2 className='reviews-title' >Past Orders:</h2>
                            <ol>
                                {pastOrders.map(order => (
                                    <li key={order.id} >
                                        <p>Total: {order.total}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    <h2 className='reviews-title' >Reviews:</h2>
                    <div className='reviews-container' >
                        {reviews.map((review) => (
                            <div className='review-card' key={review.id} >
                                <h3>{review.user.name}</h3>
                                <p>{review.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    );

    function handleReorder(order){
        const cart = [];

        console.log(order);
        for (let i = 0; i < order.items.length; i++){
            cart.push(order.items[i]);
            cart[i].quantity = parseInt(order.quantities[i]);
        }

        history.push({
            pathname: '/checkout',
            state: [user_login, cart, cart[0].restaurant]
        })
    }

    function handleDropdownClick(id){
        for (const key in pastOrderClasses){
            if (parseInt(key) === id){
                let temp_classes = {...pastOrderClasses};

                if (pastOrderClasses[key][0] === 'past-order-details hide'){
                    temp_classes[`${key}`] = ['past-order-details', 'https://cdn.icon-icons.com/icons2/2036/PNG/512/up_arrow_circle_icon_124244.png', 'past-order-container expanded'];
                } else {
                    temp_classes[`${key}`] = ['past-order-details hide', 'https://static.thenounproject.com/png/4984281-200.png', 'past-order-container'];
                }

                setPastOrderClasses(temp_classes);
            }
        }

        
    }
}

export default Account;