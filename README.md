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
#### Hooks
- Husky

	
## Tasks
- `npm run start` or `yarn start` - default task for developing. Includes:
	- clean `dist` directory
	- build app
	- build styles
	- watch app changes
- `npm run build` or `yarn build` - default task for creating production build. Includes:
	- clean `dist` directory
	- build app
	- build styles
	- build favicons (production mode only)
- `npm run build:app` or `yarn build:app` - build app only
- `npm run build:server` or `yarn build:server` - build server only
- `npm run lint` - run eslint
- `npm run lint:fix` - run eslint with `--fix`

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

## Directory structure conventions

#### Application source
- `src` - common application source directory
- `src/client` - client source directory
- `src/server` - server source directory
- `src/common` - shareable source directory consumed by noth client and server sides

## Files naming conventions

#### Components
- Every component directory contains `index.js` export file
- Every dumb component has its name as `XXX.component.js`
- Every smart component has its name as `XXX.container.js`

####  Store
- Store part directory has its name the same as name of its reducer (e.g. `xxx`)
- Store part contains several files based on its purpose:
	- `xxx.reducer` - store reducer
	- `xxx.constants` - store constants
	- `xxx.actions` - store actions
	- `xxx.saga` - store saga

#### Selectors
- Selectors directory contains several subdirectories based on their purpose:
	- `common` - common selectors either grouped by store reducers or stored as a flat list
	- `composed` - cross dependent selectors to be used for calculated/composed values
