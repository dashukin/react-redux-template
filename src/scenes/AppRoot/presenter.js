/*
* Application root
* */

import React from 'react';
import imgSrc from './images/redux.png';

const AppRoot = props => {
	return (
		<div className="application">
			Example component
			<div className="application__logo">
				<img src={imgSrc} alt=""/>
			</div>
		</div>
	);
};

export default AppRoot;