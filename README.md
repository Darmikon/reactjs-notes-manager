#NOTES MANAGER

[notes.mana.pro](http://notes.mana.pro) - home page

## Description
Notes manager is a single page application written on
react.js and redux.js on frontend and koa.js on backend.
The application helps to manage notes. And allows to perform
different CRUD operations with folders, notes and tags.
More details in [Features](#features)

## Features
1. CRUD operations with folders
2. CRUD operations with notes
3. Drag'n'drop sorting for notes inside folders
4. Search components works in 2 modes:
search simple (to search in notes titles) and
serch deep (to search in titles, in texts or by tags)
 5. Tags creation and attaching them to notes.
 6. Navigation with react router.
 7. Redux-saga for advanced asynchronous workflow.
 8. Material UI.
 9. CSS4 modules and PostCSS.
 10. Own typography and animated layout based on flexbox.
 11. Webpack integration with all preprocessors
 (Sass, Less, Stylus)
 12. Babel with es7 features.
 13. All existing devtools for redux are integrated and work
  in development mode. Ctrl+H to open Ctrl+M to switch between panels
 14. Integration with Instanbul coverage.
 15. Own approach in architecture based on best practices and ducks.js


## Table of Contents

- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run build:open](#npm-run-build:open)
  - [npm run test-prod](#npm-run-test-prod)
  - [npm run coverage](#npm-run-coverage)

## Folder Structure

```
my-app/
  --------------------/ build files /-------------------
  README.md
  node_modules/
  package.json
  .babelrc
  config/
  scripts/
  -----------------/ application files /----------------
  public/
    index.html
    favicon.ico
  src/
      index.js
  	--------------------/ common module /----------------
      common/
  		
      entry-point/
       ------------------/ main module /------------------
    	  _index-module/
    
       ------------------/ sub modules /------------------
         <name1>-module/
         <name2>-module/
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/entry-point/index.js` is the JavaScript entry point.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run test-prod`

It build tests with Istanbul coverage

### `npm run coverage`

To run built coverage in default browser on 7000 port

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run build:open`

This command runs node server and open build directory with in
default web browser