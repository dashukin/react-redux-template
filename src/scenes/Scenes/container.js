/*
* Scenes container.
* Handles all logic and routing for scenes rendering
* */

import React, {Component} 				from 'react';
import {connect}			from 'react-redux';
import {ConnectedRouter}	from 'react-router-redux';
import {Route, Switch}		from 'react-router-dom';
import i18n					from 'services/i18n';
import history				from 'src/history';
import Home					from './components/Home';

import get	from 'lodash/get';

import constants from './constants';
const {
	FETCH_DATA_STATUS_LOADING,
	FETCH_DATA_STATUS_LOADED,
	FETCH_DATA_STATUS_ERROR
} = constants;


class Scenes extends Component {

	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div className="app-scenes">
				<ConnectedRouter history={history}>
					<Switch>
						<Route exact path="/" component={Home} />
					</Switch>
				</ConnectedRouter>
			</div>
		);
	}

	getRenderingOutput () {
		const {
			readyState
		} = this.props;

		let output;

		switch (readyState) {
			case FETCH_DATA_STATUS_LOADED:
				output = this.getRoutesOutput();
				break;

			case FETCH_DATA_STATUS_ERROR:
				output = this.getErrorOutput();
				break;

			case FETCH_DATA_STATUS_LOADING:
			default:
				output = this.getLoadingOutput();
				break;
		}

		return output;
	}

	getLoadingOutput () {
		return (
			<div className="scene loading-scene">
				<div className="scene-content scene-content--full-height">
					{i18n.t('scenes.home.loading')}
				</div>
			</div>
		);
	}

	getRoutesOutput () {
		return (
			null
		);
	}

	getErrorOutput () {
		return (
			<div className="scene loading-scene">
				<div className="scene-content scene-content--full-height">
					<p>An error has occured upon loading data.</p>
					<p>Please refresh the page.</p>
				</div>
			</div>
		);
	}

}

const mapStateToProps = (state) => {
	return {
		readyState: get(state, 'scenesReducer.readyState')
	};
};

const mapDispatchToProps = (dispatch) => {
	return {

	};
};

const ConnectedScenes = connect(mapStateToProps, mapDispatchToProps)(Scenes);

export default ConnectedScenes;