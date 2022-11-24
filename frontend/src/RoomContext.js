import React, { Component } from 'react';
import items from './data'

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],
        featuredRooms: [],
      };
    
      componentDidMount() {
        // this.getData();
        let rooms = this.formatData(items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        this.setState({
          rooms,
          featuredRooms,
        });
      }

    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);
            let room = {...item.fields, images, id}; 
            return room;
        });
        return tempItems;
    }

    render() {
        return (
            <RoomContext.Provider value={{
                ...this.state,
                getRoom: this.getRoom,
            }}>
                {this.props.children}
            </RoomContext.Provider>
        ); 
    }
}

const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomConsumer, RoomContext};

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
      return (
        <RoomConsumer>
          {value => <Component {...props} context={value} />}
        </RoomConsumer>
      );
    };
}
