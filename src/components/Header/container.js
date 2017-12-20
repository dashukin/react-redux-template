/*
* Header component
* */

import React, {Component}	from 'react';
import {connect}			from 'react-redux';
import AppBar				from 'material-ui/AppBar';
import Toolbar				from 'material-ui/Toolbar';
import Typography			from 'material-ui/Typography';

import get					from 'lodash/get';

class Header extends Component {

	constructor (props) {
		super(props);
	}

	render () {
		const {
			title = ''
		} = this.props;

		return (
			<AppBar position="fixed" className="header" title={title}>
				<Toolbar className="header__toolbar">
					<Typography type="title" color="inherit" className="header__toolbar-title">
						{title}
					</Typography>
				</Toolbar>
			</AppBar>
		);

	}
}

const mapStateToProp = state => {
	return {
		categories: get(state, 'categoriesReducer.categories'),
		auth: get(state, 'authReduser.authorized'),
		orderLines: get(state, 'cartReducer.orderLines')
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => {
			dispatch(headerLogout());
		}
	}
}

const ConnectedHeader = connect(mapStateToProp, mapDispatchToProps)(Header);

export default ConnectedHeader;