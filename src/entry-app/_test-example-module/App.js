import React,{Component} from 'react';
import logo from './logo.svg';
/*eslint-disable */
import './logo.css';
import './postcss.css';
import './sass.scss'
import './less.less'
import './styl.styl'
import css from './css4.mod.css'
/*eslint-enable */

class App extends Component {
	render(){
		return (
			<div className="autoprefixer cssnext precss App">
				<div className="App-header">
					<img src={logo}
						 className="App-logo"
						 alt="logo"/>
					<h2 >Welcome to React Master</h2>
				</div>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
			</div>
		);
	}
}

export default App;
