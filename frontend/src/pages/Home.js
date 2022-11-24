import React from "react";
import { Link } from "react-router-dom";
import Feature from "../components/Feature";
import Banner from "../components/Banner";
import Services from "../components/Services";
import FeaturedRooms from "../components/rooms/FeaturedRooms";

const Home = () => {
  return (
    <>
      <Feature>
        <Banner
          title="luxurious hotels"
          subtitle="deluxe rooms starting at $200"
        >
          <Link to="/hotels" className="btn-primary">
            Our Hotels
          </Link>
        </Banner>
      </Feature>
      <Services />
      <FeaturedRooms />
    </>
  );
};

export default Home;