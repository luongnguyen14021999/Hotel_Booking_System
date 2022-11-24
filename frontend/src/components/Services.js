import React, { Component } from "react";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";
import Title from "./Title";

// Main services of hotels
export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: "Free Cocktails",
      },
      {
        icon: <FaHiking />,
        title: "Endless Hiking",
      },
      {
        icon: <FaShuttleVan />,
        title: "Free Shuttle",
      },
      {
        icon: <FaBeer />,
        title: "Strongest Beer",
      }
    ]
  };
  render() {
    return (
      <section className="services">
        <Title title="Services" />
        <div className="services-center">
          {this.state.services.map(item => {
            return (
              <article key={`item-${item.title}`} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}