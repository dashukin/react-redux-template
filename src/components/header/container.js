/*
* Header component
* */

import React, {Component}	from 'react';

class Header extends Component {

	constructor (props) {
		super(props);
	}

	render () {
		const {
			title = ''
		} = this.props;

		return (
			<div>
				header
			</div>
		);

	}
}

export default Header;