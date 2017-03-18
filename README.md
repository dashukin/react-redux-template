# react-redux-template
Feature based approach of creating react-redux applications.
## Includes
- React
- Redux
- Babel for ES6/7 syntax support (including class properties, generators)
- Redux-saga for managing asynchronous events
- SCSS syntax support
- Webpack for handling file and module imports
- Gulp for managing build tasks (including webpack task too)
- Bluebird

## Proposed app structure
- /src - application source directory
	- /components - common components which are expected to be reused by other components.
	- /constants - application constants. Consists of mirrored values and key-value pairs.
	- /data - a place for any common reducers or sagas that doesn't below directly to any component.
	- /scenes - unique root components. Think about like pages or screens of your application.
	- /scss - common directory for scss stylesheets. Should consist of common files with appropriate imports from scenes and common components.
	- /services - common directory for any services used in application.
- /build - application output directory.
	- /js - javascript files output directory.
	- /css - css files output directory.
	- /images - any images being imported by components.
	
## Proposed component structure example
- /ExampleComponentName - component root directory
	- /components - child components that only belong to ExampleComponentName.
	 	- ChildComponent - child component which follows the same structure. Child components could only be used by any parent components, but not by sibling one.
	 	- ...
	- /images - any images required by ExampleComponentName and loaded via require/import.
	- _example-component-name.scss - component styles. Each parent component stylesheet should import all it's 
	- presenter.js / container.js - component file itself. Depending on component role and ability to manage application state it could be a presenter or a container.
	- index.js - default export file.
	- reducer.js - component reducer (for container component).
	- actions.js - component actions to interact with application state (for container component).
	- saga.js - component saga to manage asynchronous actions (for container component).

Every reducer is expected to be exported as object to easily combine all nested reducers on store creation:
```javascript
// /src/scenes/ExampleComponent/components/ExampleChildComponent

const exampleChildReducer = (state, action) => {
	switch (action.type) {
		default:
			return state;
	}	
};

const reducers = {
	exampleChildReducer
}

export default reducers;

```

```javascript
// /src/scenes/ExampleComponent
import exampleChildReducer from './components/ExampleChild/reducer';

const exampleReducer = (state, action) => {
	switch (action.type) {
		default:
			return state;
	}	
};

const reducers = {
	...exampleChildReducer,
	exampleReducer
}

export default reducers;

```

```javascript
// /src/reducer.js - root reducer

import exampleReducer from './scenes/ExampleComponent';

const reducers = {
	...exampleReducer
}

export default reducers;


```


```javascript
// /src/index.js

import {combineReducers, createStore} from 'redux';
import {default as reducers} from './reducer';


const store = createStore(combineReducers(reducers));
// ...

```


	
## Dev / Build tasks
- npm run dev - default task for developing. Includes:
	- clean build directory.
	- create javascript output files.
	- create css build files.
	- add javascript/scss watchers.
- npm run build - default task for creating production build. Includes:
	- clean build directory.
	- create javascript output files with "production" flag and uglify plugin.
	- create scss files.


