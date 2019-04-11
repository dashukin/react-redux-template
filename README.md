# react-redux-template
Ready to go react redux template with some predefined features you might need
## Includes
#### Rendering
- React (16.8+)
#### Styling
- SCSS, PostCSS, CSSO
#### Loaders
- images
	```javascript
	import imgSource from './images/img-source.png';
	```
- css, scss
	```javascript
	import './styles/styles.css';
	// or
	import './styles/styles.scss';
	```
#### Store
- Redux
- Reselect
#### Side effects
- Redux-saga
- Axios
#### Routing
- redux-first-router
#### Bundler
- Webpack (4.29+)
#### Transpiling 
- Babel 7
#### Server
- Express (4.16+)
#### Code style
- ESLint airbnb

	
## Dev / Build tasks
- ```npm run start``` or ```yarn start``` - default task for developing. Includes:
	- clean ```dist``` directory
	- build app
	- build styles
	- watch app changes
- ```npm run build``` or ```yarn build``` - default task for creating production build. Includes:
	- clean ```dist``` directory
	- build app
	- build styles
	- build favicons (production mode only)
- ```npm run build:app``` or ```yarn build:app``` - build app only
- ```npm run build:server``` or ```yarn build:server``` - build server only

## App structure

```bash
.
├── config
│   ├── application // app specific configuration
│   ├── environment // env specific configuration
│   ├── postcss // postcss config configuration
│   └── webpack // key webpack options are declared separately
│       ├── loaders
│       ├── plugins
│       ├── resolve
│       └── rules
├── dist
│   ├── client // dist client folder
│   │   ├── css
│   │   │   └── chunks
│   │   ├── icons-41b280f93ccf5e8b4e4f0a8dbb69eaa1 // generated for production build
│   │   └── js // main dist folder for js
│   │       └── chunks // dynamic chunks
│   └── server // dist server folder
└── src
    ├── client
    │   ├── components // common components
    │   ├── pages // application pages
    │   │   ├── home // example page
    │   │   └── not-found // example page
    │   ├── routes // routes configuration
    │   ├── selectors // reselect selectors
    │   │   ├── common // selectors without cross dependencies
    │   │   └── composed // cross dependent selectors
    │   ├── services // client specific services
    │   ├── store
    │   │   ├── __example // 
    │   │   ├── _history // TBD
    │   │   ├── _middleware // store middlewares
    │   │   └── pages // redux-first-router pages reducer
    │   ├── styles // common styles and helpers
    │   │   ├── _mixins
    │   │   ├── _variables
    │   │   └── partials
    │   └── utils
    ├── common // common services to be used both for client and server sides
    │   └── services
    │       ├── api // basic api service
    │       └── normalize // basic normalization service
    └── server
        └── favicon // favicon source

```

