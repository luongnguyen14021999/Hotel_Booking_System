import React, { Component } from "react";
import Title from "../Title";
import { RoomContext } from "../../RoomContext";
import Room from "./Room";

export default class FeaturedRooms extends Component {
  static contextType = RoomContext;

  render() {
    let {featuredRooms: rooms } = this.context;

    rooms = rooms.map(room => {
      return <Room key={room.id} room={room} />;
    });
    
    return (
      <section className="featured-rooms">
        <Title title="Featured rooms" />
        <div className="featured-rooms-center">
          {rooms}
        </div>
      </section>
    );
  }
}