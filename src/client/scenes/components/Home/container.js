/**
 * Home page scene
 */

import React, {Component}	from 'react';
import {connect}			from 'react-redux';
import {withRouter}			from 'react-router-dom';

import BaseScene			from 'components/base-scene';

class Home extends Component {

	constructor (props) {
		super(props);
	}

	render () {
		return (
			<BaseScene className="scene-home">
				Home page
			</BaseScene>
		);
	}
}

const mapStateToProps = (state) => {
	return {

	};
};

const mapDispatchToProps = dispatch => {
	return {

	};
};

const connectedHome = withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

export default connectedHome;