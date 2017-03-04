// GLOBAL IMPORTS
import React from 'react';
import { Route, IndexRoute } from 'react-router'; // eslint-disable-line no-unused-vars

// CUSTOM IMPORTS
import Layout  from '../components/Layout';
import Toolbox from '../containers/Toolbox'
import Folders from '../containers/Folders'
import Notes   from '../containers/Notes'
import Details from '../containers/Details'
import Search  from '../containers/Search'
import Titles  from '../containers/Titles'
import Tags    from '../containers/Tags'

// I have tricky layout - that's why I will mount components to root Layout component only in case route matches
export default (
	<Route path="notes" component={Layout}>
		<Route component={{Toolbox, Folders, Search}}>
			<IndexRoute />
		</Route>

		<Route component={{Toolbox, Folders, Search, Titles}}>
			<Route path="search">
				<IndexRoute />
			</Route>
		</Route>

		<Route component={{Toolbox, Folders, Search, Tags}}>
			<Route path="tags">
				<IndexRoute />
			</Route>
		</Route>

		<Route component={{Toolbox, Folders, Search, Notes}}>
			<Route path=":folderId">
				<IndexRoute />
			</Route>
		</Route>

		<Route component={{Toolbox, Folders, Search, Notes, Details}}>
			<Route path=":folderId">
				<Route path = ":noteId" />
			</Route>
		</Route>
	</Route>
)