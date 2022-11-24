import React, { Component } from "react";
import Room from "./Room";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import defaultImg from "../../images/room-1.jpeg";
import Button from '@material-ui/core/Button';

export default function ListRoom() {
    const { id } = useParams();

	const [data, setData] = useState({ rooms: [] });

    const [sortedRoom, setSortedRoom] = useState({ rooms: [] });

    const [hotel, setHotel] = useState(null);

    const [minPrice, setMinPrice] = useState(0);

    const [price, setPrice] = useState(0);

    const [maxPrice, setMaxPrice] = useState(0);

    const options = [
        {value: '', text: '--Choose a type of room--'},
        {value: 'single', text: 'single'},
        {value: 'double', text: 'double'},
        {value: 'family', text: 'family'},
        {value: 'president', text: 'president'},
    ];

    const [type, setType] = useState(options[0].value);

    useEffect(() => {
		axiosInstance.get('/hotel/'+id+'/').then((res) => {
			setData({ rooms: res.data });
            setSortedRoom({ rooms: res.data });
            setMaxPrice(Math.max(...res.data.map(item => item.price)));
            setPrice(Math.max(...res.data.map(item => item.price)));
			console.log(res.data);
		});
	}, [setData]);


    useEffect(() => {
		axiosInstance.get(id).then((res) => {
			setHotel(res.data);
			console.log(res.data);
		});
	}, [setHotel]);

    if(hotel != null) {
        localStorage.setItem("hotelId", hotel.id);
        localStorage.setItem("currentHotel", hotel.name);
    }
    
    if (data.rooms.length === 0) {
        return (
            <div className="empty-search">
                <h3>Your search does not have any matches</h3>
            </div>
        );
    }

    const handleSubmit = (e) => {
		e.preventDefault();
        
        let tempRooms = [...data.rooms];

        tempRooms = tempRooms.filter(room => room.price-1 <= price);

        tempRooms = tempRooms.filter(room => room.type === type);

        setSortedRoom({
            rooms: tempRooms
        })
	};

    
    return (
    <>
    <h1>FILTER ROOMS</h1>
    <section className="filter-container">
      <form className="filter-form">
        {/* select type */}
        <div className="form-group">
            <label htmlFor="type">room type</label>
            <select
            name="type"
            id="type"
            value={type} 
            onChange={(e) => {
                setType(e.target.value);
            }}
            className="form-control"
            >
                {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.text}
                </option>
            ))}
            </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">room price ${price}</label>
          <input
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            id="price"
            value={price}
            onChange={(e) => {
                setPrice(e.target.value);
            }}
            className="form-control"
          />
        </div>
        <div className="form-group">
            <Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				onClick={handleSubmit}
			>
			    Filtering
			</Button>
        </div>
      </form>
    </section>
    <section className="roomslist">
        <div className="roomslist-center">
            {sortedRoom.rooms.map(room => 
                <article className="room">
                <div className="img-container">
                    <img src={defaultImg} alt="single room" />
                    <div className="price-top">
                        <h6>${room.price}</h6>
                        <p>per night</p>
                    </div>
                    <Link to={'/room/'+room.id} className="btn-primary room-link">
                        features
                    </Link>
                </div>
                <p className="room-info">{room.name}</p>
              </article>
            )}
        </div>
    </section>
    </>
    );
};