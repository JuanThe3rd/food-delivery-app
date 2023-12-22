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

    const [modal, setModal] = useState(null);
    const [newReview, setNewReview] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [pastOrderClasses, setPastOrderClasses] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        if(user_login.user_type === 'restaurant'){
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
                                    const id = i + 1;
                                    let count = 0;
                                    const temp_items = [];
                                    let user = {};

                                    for(let j = 0; j < itemIDs.length; j++){
                                        for(let k = 0; k < menu.length; k++){
                                            if (parseInt(itemIDs[j]) === menu[k].id){
                                                temp_items.push(menu[k]);
                                            }
                                        }
                                    };

                                    fetch('/users')
                                        .then(res => res.json())
                                        .then(users => {
                                            for(let j = 0; j < users.length; j++){
                                                if (users[j].id === temp_past_orders[i].user_id){
                                                    user = users[j];
                                                }
                                            }

                                            for(let j = 0; j < quantities.length; j++){
                                                count += parseInt(quantities[j]);
                                            }

                                            const temp_order = {'id': id, 'items': temp_items, 'quantities': quantities, 'total_items': count, 'user': user, 'total': total};
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

                                fetch('/reviews')
                                    .then(res => res.json())
                                    .then(temp_reviews => {
                                        const restaurant_reviews = []

                                        for(let i = 0; i < temp_reviews.length; i++){
                                            if (temp_reviews[i].restaurant_id === user_login.restaurant.id && temp_reviews[i].review_type === 'restaurant'){
                                                restaurant_reviews.push(temp_reviews[i]);
                                            }
                                        }

                                        setReviews(restaurant_reviews);
                                    })
                            })
                    }
                })
        } else if (user_login.user_type === 'user'){
            setRestaurant(location.state[2]);

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

                                fetch('/reviews')
                                    .then(res => res.json())
                                    .then(temp_reviews => {
                                        const customer_reviews = [];

                                        for(let i = 0; i < temp_reviews.length; i++){
                                            if (temp_reviews[i].user_id === user_login.user.id && temp_reviews[i].review_type === 'customer'){
                                                customer_reviews.push(temp_reviews[i]);
                                            }
                                        }

                                        setReviews(customer_reviews);
                                    })
                            })
                    }
                })
        }
    }, []);

    return (
        <div>
            {errorMsg && <div className='notification'>{errorMsg}</div>}

            { user_login.user_type === 'user' &&
                <div>
                    <UserNavbar user_login={user_login} cart={cart} restaurant={restaurant} />
                    <h1 className='page-title' >Account</h1>

                    <div className='account-page-main-content'>
                        <div className='account-details-container'>
                            <img className='account-img' src={user_login.user.profile_pic} alt={`${user_login.user.name}_img`}/>
                            <h2 className='account-name-title'>{user_login.user.name}</h2>
                            <div className='cart-restaurant-review-sec'>
                                <h3>Reviews</h3>
                                <p>({reviews.length})</p>
                                {reviews.map(review => (
                                    <div className='single-review-container'>
                                        <h4>{review.restaurant.name}</h4>
                                        <p>{review.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='past-orders-container' >
                            <h2>Past Orders</h2>
                            <p>({pastOrders.length})</p>
                            {pastOrders.map(order => (
                                <div className={pastOrderClasses[`${order.id}`][2]} key={order.id} >
                                    <img className='dropdown-icon' src={pastOrderClasses[`${order.id}`][1]} onClick={() => handleDropdownClick(order.id)} alt='dropdown-icon'/>
                                    <h3>{order.restaurant.name}</h3>
                                    <p>Total: ${order.total} • {order.total_items} items</p>
                                    <div id='' className='past-order-btns-container'>
                                        <button className='past-order-btn' onClick={() => handleDropdownClick(order.id)}>View Receipt</button>
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
                </div>
            }

            { user_login.user_type === 'restaurant' &&
                <div>
                    {modal &&
                        <div className='add-customer-review-modal-container'>
                            <div className='review-modal-content'>
                                <span className='close-review-modal' onClick={() => setModal(null)}>&times;</span>
                                <h2>Leave a Review</h2>
                                <textarea onChange={handleChange} placeholder='Review' value={newReview}></textarea>
                                <button onClick={addCustomerReview}>Submit</button>
                            </div>
                        </div>
                    }

                    <RestaurantNavbar user_login={user_login} />
                    <h1 className='page-title' >Account</h1>
                    
                    <div className='account-page-main-content'>
                        <div className='account-details-container'>
                            <img src={user_login.restaurant.image} alt={`${user_login.restaurant.name}_img`} className='restaurant-account-img' />
                            <h2 className='account-name-title'>{user_login.restaurant.name}</h2>
                            <div className='cart-restaurant-review-sec'>
                                <h3>Reviews</h3>
                                <p>({reviews.length})</p>
                                {reviews.map(review => (
                                    <div className='single-review-container'>
                                        <h4>{review.user.name}</h4>
                                        <p>{review.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='past-orders-container' >
                            <h2>Past Orders</h2>
                            <p>({pastOrders.length})</p>

                            {pastOrders.map(order => (
                                <div className={pastOrderClasses[`${order.id}`][2]} key={order.id}>
                                    <img className='dropdown-icon' src={pastOrderClasses[`${order.id}`][1]} onClick={() => handleDropdownClick(order.id)} alt='dropdown-icon'/>
                                    <button className='account-review-modal-btn' onClick={() => {setModal(true); setCustomer(order.user)}}>Leave a Review</button>
                                    <h3>{order.user.name}</h3>
                                    <p>Total: ${order.total} • {order.total_items} items</p>
                                    <div id='' className='past-order-btns-container'>
                                        <button className='past-order-btn' onClick={() => handleDropdownClick(order.id)}>View Receipt</button>
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
                </div>
            }
        </div>
    );

    function handleChange(e){
        setNewReview(e.target.value);
    }

    function addCustomerReview(){
        if (newReview !== null && newReview !== ' ' && newReview !== ''){
            fetch('/reviews', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    content: newReview,
                    review_type: 'customer',
                    user_id: customer.id,
                    restaurant_id: user_login.restaurant.id
                })
            })
                .then(res => res.json())
                .then(res => {
                    setReviews([...reviews, res]);
                    setNewReview(null);
                    setModal(null);
                    setErrorMsg('Review Submitted!')

                    setTimeout(() => {
                        setErrorMsg(null);
                    }, 3000)
                })
        }
    }

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