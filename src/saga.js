/*
* Root saga
* */


import {watchScenes} from 'scenes/Scenes/saga';


const rootSaga = function* () {
	yield [
		watchScenes()
	];
};

export default rootSaga;