/*
* Base scene component
* */

import React from 'react';
import Header from 'components/header';
import Footer from 'components/footer';

const BaseScene = props => {
	const {
		className = '',
		children
	} = props;

	const sceneClassName = `scene ${className}`;

	return (
		<div className={sceneClassName}>
			<Header/>

			<div className="scene-content">
				{children}
			</div>

			<Footer/>
		</div>
	);
}

export default BaseScene