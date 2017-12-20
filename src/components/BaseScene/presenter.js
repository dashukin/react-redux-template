/*
* Base scene component
* */

import React, {Component}	from 'react';
import Header				from 'components/Header';
import Footer				from 'components/Footer';

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