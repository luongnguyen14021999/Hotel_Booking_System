import React from 'react';

function BookingLoadingManager(Component) {
	return function BookingManagerLoadingComponent({isLoading, ...props }) {
		if (!isLoading) return <Component {...props} />;
		return (
			<p style={{ fontSize: '25px' }}>
				We are waiting for the data to load!...
			</p>
		);
	};
}
export default BookingLoadingManager;