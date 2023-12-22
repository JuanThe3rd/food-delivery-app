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
    const [updatedItem, setUpdatedItem] = useState({});
    const [modal, setModal] = useState();
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        fetchItems();
    }, [])

    return (
        <div>
            {errorMsg && <div className='notification' >{errorMsg}</div>}
            <RestaurantNavbar user_login={user_login} />
            <h1 className='page-title' >Menu</h1>

            <div className='update-menu-container' >
                {items.map(item => (
                    <div key={item.id} className='update-item-container' >
                        <img src={item.image} alt={`${item.item}`} className='update-menu-img' />
                        <h3>{item.item}</h3>
                        <p>Price: ${item.price}</p>
                        <button onClick={() => handleRemove(item)} className='remove-item-btn' >Remove</button>
                        <button onClick={() => handleUpdate(item)} className='update-item-btn' >Update</button>
                    </div>
                ))}

                <form className='update-item-container' onSubmit={addItem} >
                    <h3 className='add-item-title'>Add Item</h3>

                    <div className='add-item-input-group'>
                        <input className='add-item-input' required type='text' id='item' name='item' onChange={handleAddChange} value={newItem.name}/>
                        <label className='add-item-label' for='item'>Item Name</label>
                    </div>

                    <div className='add-item-input-group'>
                        <input className='add-item-input' required type='text' id='image' name='image' onChange={handleAddChange} value={newItem.image}/>
                        <label className='add-item-label' for='image'>Image URL</label>
                    </div>

                    <div className='add-item-input-group'>
                        <input className='add-item-input' required type='text' id='price' name='price' onChange={handleAddChange} value={newItem.price}/>
                        <label className='add-item-label' for='price'>Price</label>
                    </div>

                    <select className='select-input' onChange={handleAddChange} value={newItem.food_type} name='food_type' placeholder='Food Type'>
                        <option>--Select--</option>
                        <option value='entree'>Entree</option>
                        <option value='side'>Side</option>
                        <option value='beverage'>Beverage</option>
                        <option value='dessert'>Dessert</option>
                    </select>
                    <input className='add-item-btn' type='submit' value='Submit' />
                </form>

                {modal &&
                    <div className='modal-container' >
                        <div className='update-modal-content' >
                            <span onClick={() => setModal(null)} className='close-review-modal'>&times;</span>
                            <h2 className='update-modal-title'>Update {itemToUpdate.item}</h2>
                            <div>
                                <div className='add-item-input-group'>
                                    <input className='add-item-input' required type='text' id='item' name='item' onChange={handleUpdateChange} value={updatedItem.item}/>
                                    <label className='add-item-label' for='name'>Name</label>
                                </div>

                                <div className='add-item-input-group'>
                                    <input className='add-item-input' required type='text' id='image' name='image' onChange={handleUpdateChange} value={updatedItem.image}/>
                                    <label className='add-item-label' for='image'>Image URL</label>
                                </div>

                                <div className='add-item-input-group'>
                                    <input className='add-item-input' required type='text' id='price' name='price' onChange={handleUpdateChange} value={updatedItem.price}/>
                                    <label className='add-item-label' for='price'>Price</label>
                                </div>

                                <select className='select-input' onChange={handleUpdateChange} value={updatedItem.food_type} name='food_type' >
                                    <option>--Select--</option>
                                    <option value='entree' >Entree</option>
                                    <option value='side' >Side</option>
                                    <option value='beverage' >Beverage</option>
                                    <option value='dessert' >Dessert</option>
                                </select>
                                <input className='add-item-btn' onClick={updateItem} type='submit' value='Submit' />
                            </div>
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
            body: JSON.stringify(updatedItem)
        })
            .then(res => res.json())
            .then(patchedItem => {
                setModal(null)
                setUpdatedItem({})
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

    function isValidUrl(urlString) {
        const urlPattern = new RegExp('^(https?:\\/\\/)?'+
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        '(\\#[-a-z\\d_]*)?$','i');
        return !!urlPattern.test(urlString);
    }

    function addItem(e){
        e.preventDefault();
        if (isValidUrl(newItem.image)){
            if (!(isNaN(newItem.price))){
                if (newItem.food_type !== '--Select--'){
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
                            food_type: newItem.food_type,
                            quantity: 1
                        })
                    })
                        .then(res => res.json())
                        .then(newMenuItem => {
                            fetchItems();
                        })
                } else {
                    setErrorMsg('Choose a Food Type');

                    setTimeout(() => {
                        setErrorMsg(null);
                    }, 3000);
                }
            } else {
                setErrorMsg('Make Sure the Price is a Valid Number');

                setTimeout(() => {
                    setErrorMsg(null);
                }, 3000);
            }
        } else {
            setErrorMsg('Use a Valid Image URL');

            setTimeout(() => {
                setErrorMsg(null);
            }, 3000);
        }
    }

    function fetchItems(){
        fetch('/menuItems')
            .then(res => res.json())
            .then(menuItems => setItems(menuItems.filter(item => item.restaurant.id === user_login.restaurant.id)))
    }
}

export default MenuUpdate;