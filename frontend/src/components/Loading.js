import React from 'react';

function Loading(Component) {
	return function LoadingComponent({ isLoading, ...props }) {
		console.log('loading things  ', isLoading)
		console.log(props)
		if (!isLoading) return <Component {...props} />;
		return (
			<p style={{ fontSize: '25px' }}>
				We are waiting for the data to load!...
			</p>
		);
	};
}
export default Loading;
