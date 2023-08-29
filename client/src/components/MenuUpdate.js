import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import RestaurantNavbar from './RestaurantNavbar';

function MenuUpdate(){
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({});
    const [update, setUpdate] = useState();

    const location = useLocation();
    const user_login = location.state[0];

    useEffect(() => {
        fetchItems();
    }, [])

    return (
        <div>
            <RestaurantNavbar user_login={user_login} />
            <h1 className='update-menu-header' >Update Menu Page</h1>

            <div className='update-menu-container' >
                {items.map(item => (
                    <div key={item.id} className='update-item-container' >
                        <img src={item.image} alt={`${item.item}`} className='update-menu-img' />
                        <h3>{item.item}</h3>
                        <button onClick={() => handleRemove(item)} className='remove-item-btn' >Remove Item</button>
                        <br />
                        <button onClick={() => handleUpdate(item)} className='update-item-btn' >Update Item</button>
                    </div>
                ))}
                <form className='add-menu-item-form' onSubmit={handleSubmit} >
                    <h3>Add Item</h3>
                    <input onChange={handleChange} value={newItem.name} name='name' placeholder='Item Name' />
                    <br />
                    <input onChange={handleChange} value={newItem.image} name='image' placeholder='Image URL' />
                    <br />
                    <input onChange={handleChange} value={newItem.price} name='price' placeholder='Price' />
                    <br />
                    <select onChange={handleChange} value={newItem.food_type} name='food_type' placeholder='Food Type'>
                        <option>--Select--</option>
                        <option value='entree'>Entree</option>
                        <option value='side'>Side</option>
                        <option value='beverage'>Beverage</option>
                        <option value='dessert'>Dessert</option>
                    </select>
                    <br />
                    <input type='submit' value='Submit' />
                </form>
            </div>
        </div>
    )

    function handleRemove(item){
        fetch(`/menuItems/${item.id}`, {method: 'DELETE',})
            .then(res => res.json())
            .then(deletedItem => {
                fetchItems();
            })
    }

    function handleUpdate(item){
        console.log(`${item.item} being updated...`)

        if (update === true){
            setUpdate(false)
        } else {
            setUpdate(true)
        }
    }

    function handleChange(e){
        setNewItem({...newItem, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault();

        fetch('/menuItems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item: newItem.name,
                image: newItem.image,
                price: newItem.price,
                restaurant_id: user_login.restaurant_id,
                food_type: newItem.food_type
            })
        })
            .then(res => res.json())
            .then(newMenuItem => {
                fetchItems();
            })
    }

    function fetchItems(){
        fetch('/menuItems')
            .then(res => res.json())
            .then(menuItems => setItems(menuItems.filter(item => item.restaurant.id === user_login.restaurant.id)))
    }
}

export default MenuUpdate;