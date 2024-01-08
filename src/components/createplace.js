import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const CreatePlace = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [hourly, setHourly] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [slots, setSlots] = useState('');

    const nameHandler = (event) => {
        setName(event.target.value);
    };

    const locationHandler = (event) => {
        setLocation(event.target.value);
    };

    const hourlyHandler = (event) => {
        setHourly(event.target.value);
    };

    const cityHandler = (event) => {
        setCity(event.target.value);
    };

    const countryHandler = (event) => {
        setCountry(event.target.value);
    };

    const streetHandler = (event) => {
        setStreet(event.target.value);
    };

    const slotsHandler = (event) => {
        setSlots(event.target.value);
    };

    const formHandler = async (e) => {
        e.preventDefault();

        axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`;

        const data = {
            name,
            place_location: location,
            hourly_charge: hourly,
            city,
            country,
            street,
            parking_slot_num: slots,
        };

        try {
            const response = await axios.post('api/CreateParkingPlace/', data);

            if (response) {
                navigate('/provider-places');
            }
        } catch (error) {
            // Handle error here (e.g., display an error message)
            console.error('Error creating place:', error);
        }
    };

    return (
        <>
            <div className="form-container">
                <form action="" className="form">
                    <h1 className="title">Create a new place</h1>
                    <input type="text" onChange={nameHandler} placeholder="Place Name*" />
                    <input type="text" onChange={locationHandler} placeholder="Google Maps Location*" />
                    <input type="text" onChange={hourlyHandler} placeholder="Hourly Charge*" />
                    <input type="text" onChange={cityHandler} placeholder="City" />
                    <input type="text" onChange={countryHandler} placeholder="Country" />
                    <input type="text" onChange={streetHandler} placeholder="Street" />
                    <input type="text" onChange={slotsHandler} placeholder="How many parking slots for this place?" />
                    <button className="btn" onClick={formHandler}>
                        Create Place
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreatePlace;
