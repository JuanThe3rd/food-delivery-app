import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import RestaurantNavbar from './RestaurantNavbar';

function MenuUpdate(){
    const location = useLocation();
    const user_login = location.state[0];
    const blankItem = {'name': null, 'image': null, 'price': null, 'food_type': null}

    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState(blankItem);
    const [itemToUpdate, setItemToUpdate] = useState();
    const [updatedItem, setUpdatedItem] = useState({'item': null, 'image': null, 'price': null, 'restaurant_id': null, food_type: null});
    const [modal, setModal] = useState();

    useEffect(() => {
        fetchItems();
    }, [])

    return (
        <div>
            <RestaurantNavbar user_login={user_login} />
            <h1 className='page-title' >Menu</h1>

            <div className='update-menu-container' >
                {items.map(item => (
                    <div key={item.id} className='update-item-container' >
                        <img src={item.image} alt={`${item.item}`} className='update-menu-img' />
                        <h3>{item.item}</h3>
                        <h4>Price: ${item.price}</h4>
                        <button onClick={() => handleRemove(item)} className='remove-item-btn' >Remove Item</button>
                        <br />
                        <button onClick={() => handleUpdate(item)} className='update-item-btn' >Update Item</button>
                    </div>
                ))}

                <form className='add-menu-item-form' onSubmit={addItem} >
                    <h3>Add Item</h3>
                    <input onChange={handleAddChange} value={newItem.name} name='name' placeholder='Item Name' />
                    <br />
                    <input onChange={handleAddChange} value={newItem.image} name='image' placeholder='Image URL' />
                    <br />
                    <input onChange={handleAddChange} value={newItem.price} name='price' placeholder='Price' />
                    <br />
                    <select onChange={handleAddChange} value={newItem.food_type} name='food_type' placeholder='Food Type'>
                        <option>--Select--</option>
                        <option value='entree'>Entree</option>
                        <option value='side'>Side</option>
                        <option value='beverage'>Beverage</option>
                        <option value='dessert'>Dessert</option>
                    </select>
                    <br />
                    <input type='submit' value='Submit' />
                </form>

                {modal &&
                    <div className='modal-container' >
                        <div className='modal-content' >
                            <span onClick={() => setModal(null)} className='close-modal'>&times;</span>
                            <h2>Update {itemToUpdate.item}</h2>
                            <p>Fill Out Updated Information</p>
                            <form onSubmit={updateItem} >
                                <input onChange={handleUpdateChange} value={updatedItem.item} name='item' placeholder='Name' />
                                <br />
                                <input onChange={handleUpdateChange} value={updatedItem.image} name='image' placeholder='Image URL' />
                                <br />
                                <input onChange={handleUpdateChange} value={updatedItem.price} name='price' placeholder='Price' />
                                <br />
                                <select onChange={handleUpdateChange} value={updatedItem.food_type} name='food_type' >
                                    <option>--Select--</option>
                                    <option value='entree' >Entree</option>
                                    <option value='side' >Side</option>
                                    <option value='beverage' >Beverage</option>
                                    <option value='dessert' >Dessert</option>
                                </select>
                                <bR />
                                <input type='submit' value='Submit' />
                            </form>
                        </div>
                    </div>
                }
            </div>
        </div>
    )

    function updateItem(e){
        e.preventDefault();

        fetch(`/menuItems/${itemToUpdate.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item: updatedItem.item,
                image: updatedItem.image,
                price: updatedItem.price,
                restaurant_id: user_login.restaurant_id,
                food_type: updatedItem.food_type
            })
        })
            .then(res => res.json())
            .then(patchedItem => {
                setModal(null)
                setUpdatedItem({'item': null, 'image': null, 'price': null, 'restaurant_id': null, food_type: null})
                fetchItems();
            })
    }

    function handleRemove(item){
        fetch(`/menuItems/${item.id}`, {method: 'DELETE',})
            .then(res => res.json())
            .then(deletedItem => {
                fetchItems();
            })
    }

    function handleUpdate(item){
        setItemToUpdate(item);
        setModal(1);
    }

    function handleAddChange(e){
        setNewItem({...newItem, [e.target.name]: e.target.value})
    }

    function handleUpdateChange(e){
        setUpdatedItem({...updatedItem, [e.target.name]: e.target.value})
    }

    function addItem(e){
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