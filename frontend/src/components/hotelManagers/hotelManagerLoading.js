import React from 'react';

function HotelManagerLoading(Component) {
	return function HotelManagerLoadingComponent({isLoading, ...props }) {
		if (!isLoading) return <Component {...props} />;
		return (
			<p style={{ fontSize: '25px' }}>
				We are waiting for the data to load!...
			</p>
		);
	};
}
export default HotelManagerLoading;