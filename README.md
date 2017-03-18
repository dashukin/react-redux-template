# react-redux-template
Feature based approach of creating react-redux applications.
##Includes
- React
- Redux
- Babel for ES6/7 syntax support (including class properties, generators)
- Redux-saga for managing asynchronous events
- SCSS syntax support
- Webpack for handling file and module imports
- Gulp for managing build tasks (including webpack task too)
- Bluebird

##Proposed tructure
- src - application source directory
	- components - common components which are expected to be reusmked by other components.
	- constants - application constants. Consists of mirrored values and key-value pairs.
	- data - a place for any common reducers or sagas that doesn't below directly to any component.
	- scenes - 
	- scss - common directory for scss stylesheets. Should consist of common files with appropriate imports from scenes and common components.
	- services - common directory for any services used in application.
- build - application output directory
	- js - javascript files output directory
	- css - css files output directory
	- images - any images being imported by components.
