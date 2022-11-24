import React from "react";
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import Room from "./Room";
import Banner from "../Banner";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import defaultImg from "../../images/room-1.jpeg";
import Feature from "../Feature";

export default function ListRoom() {

  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:9000/api/room/'+id+'/');
      const newData = await response.json();
      setData(newData);
    };

    fetchData();
  }, [setData]);

  const [appState, setAppState] = useState({
		customer: null,
	});

	useEffect(() => {
		axiosInstance.get('user/customer/').then((res) => {
			const customerDetail = res.data;
			setAppState({customer: customerDetail});
			console.log(res.data);
		});
	}, [setAppState]);

	let bookingButton = null;

  if(appState.customer != null) {
      localStorage.setItem("customerId", appState.customer[0].id);
      bookingButton = <Button
      href="#"
      color="primary"
      variant="outlined"
      component={NavLink}
      to= {'/booking/'+data.id}>
        Book Room
      </Button>
  }

  if (data) {
    localStorage.setItem("currentRoom", data.name);
    localStorage.setItem("roomPrice", data.price);
    localStorage.setItem("roomId", data.id);
    return(
     <>
      <Feature>
          <Banner title={`${data.name} room`}>
            <Link to="/" className="btn-primary">
              back to home
            </Link>
          </Banner>
      </Feature>
       <section className="single-room">
          <div className="single-room-info">
            <article className="desc">
              <h3>details</h3>
              <p>{data.description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>price : ${data.price}</h6>
              <h6>size : {data.size} SQFT</h6>
              <h6>
                max capacity :
                {data.capacity > 1 ? `${data.capacity} people` : `${data.capacity} person`}
              </h6>
              <h6>{data.pets ? "pets allowed" : "no pets allowed"}</h6>
              <h6>{data.breakfast && "free breakfast included"}</h6>
            </article>
          </div>
        </section>
        <section className="room-extras">
          {bookingButton}
        </section>
      </>
    );
  }
};