import React from 'react';

function HotelLoading(Component) {
	return function HotelLoadingComponent({isLoading, ...props }) {
		if (!isLoading) return <Component {...props} />;
		return (
			<p style={{ fontSize: '25px' }}>
				We are waiting for the hotel data to load!...
			</p>
		);
	};
}
export default HotelLoading;
