/*
* Root saga
* */


import {watchScenes} from 'src/client/scenes/saga';


const rootSaga = function* () {
	yield [
		watchScenes()
	];
};

export default rootSaga;