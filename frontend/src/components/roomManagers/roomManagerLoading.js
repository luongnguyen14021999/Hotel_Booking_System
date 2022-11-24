import React from 'react';

function RoomManagerLoading(Component) {
	return function RoomManagerLoadingComponent({isLoading, ...props }) {
		if (!isLoading) return <Component {...props} />;
		return (
			<p style={{ fontSize: '25px' }}>
				We are waiting for the data to load!...
			</p>
		);
	};
}
export default RoomManagerLoading;