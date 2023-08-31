import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import UserNavbar from './UserNavbar'

function Restaurant() {
    const [items, setItems] = useState();
    const [cart, setCart] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [msg, setMsg] = useState();
    const [modal, setModal] = useState();
    const [newCartItem, setNewCartItem] = useState([]);

    const location = useLocation();
    const data = location.state;
    const restaurant = data.restaurant;
    const user_login = data.user_login;
    const old_cart = data.cart;

    useEffect(() => {
        fetch('/menuItems')
            .then(res => res.json())
            .then(menuItems => setItems(menuItems.filter(item => item.restaurant.id === restaurant.id)))

        if (old_cart.length !== 0){
            setCart(old_cart)
        }

        setReviews(restaurant.reviews.filter(review => review.review_type === 'restaurant'))
    }, [])
    
    return (
        <div>
            {msg &&
                <div className='notification' >
                    {msg}
                </div>
            }
            <UserNavbar user_login={user_login} cart={cart} restaurant={restaurant} />
            <div>
                <h1 className='restaurant-title' >{restaurant.name}</h1>
                {modal &&
                    <div className='modal-container' >
                        <div className='modal-content' >
                            <span className='close-modal' onClick={() => setModal(null)} >&times;</span>
                            <p className='notif-text' >
                                It seems you are trying to order food from a different restaurant than what's in your cart. 
                                Are you sure you want to empty your cart and start a new order?
                            </p>
                            <div className='new-cart-container'>
                                <button className='new-cart-btn' onClick={makeNewCart} >Yes</button>
                                <button className='old-cart-btn' onClick={() => setModal(null)} >No</button>
                            </div>
                        </div>
                    </div>
                }

                <div className='menu-container' >
                    {items?.map(item => (
                        <div key={item.id} className='menu-item-container' >
                            <img src={item.image} alt={`${item.item}_img`} className='menu-item-img' />
                            <h3>{item.item}</h3>
                            <p>Price: {item.price}</p>
                            <button className='add-to-cart-btn' onClick={() => handleClick(item)} >Add to cart</button>
                        </div>
                    ))}
                </div>

                <h3 className='reviews-title' >Reviews:</h3>
                <div className='reviews-container' >
                    {reviews?.map(review => (
                        <div key={review.id} className='review-card' >
                            <p>{review.user.name}:</p>
                            <p>{review.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    function makeNewCart(){
        setCart(newCartItem);
        setModal(null);
    }

    function makeNewCart(){
        setCart(newCartItem);
        setModal(null);
    }

    function handleClick(newItem){
        let flag = false;
        let oldItemPos = null;
        
        if (cart.length > 0 && restaurant.id !== cart[0].restaurant_id){
            setNewCartItem([newItem])
            setModal(1);
        } else {
            setMsg('Item added to cart');
        
            for (let i = 0; i < cart.length; i++){
                if (cart[i].id === newItem.id){
                    flag = true
                    oldItemPos = i;
                }
            }

            if (flag === true){
                let newCart = [...cart];
                newCart[oldItemPos].quantity++;
                setCart(newCart);
            } else {
                setCart([...cart, newItem]);
            }
            
            setTimeout(() => {
                setMsg(null);
            }, 2000);
        }
    }
}

export default Restaurant;
