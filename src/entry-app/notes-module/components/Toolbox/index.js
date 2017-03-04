// †GLOBAL IMPORTS
import React,{Component,PropTypes} from 'react'
// import className from 'classnames'
import CSSModules from 'react-css-modules';
// import IconButton from 'material-ui/IconButton';
// import FlatButton from 'material-ui/FlatButton';
import reactLogo from '/common/svg-icons-module/react.svg'
// import FaPencil from 'react-icons/lib/fa/pencil';
// import IconEdit from 'react-icons/lib/md/edit';
// // import IconAdd from 'react-icons/lib/md/add';
// import IconDel from 'react-icons/lib/md/delete-forever';
// import IconAdd from 'react-icons/lib/md/add-circle-outline';
import IconBack from 'react-icons/lib/md/arrow-back';

// †CUSTOM IMPORTS
import cssLogo from './Logo.mod.css'
import css from './Toolbox.mod.css'

@CSSModules(css)
export default class Toolbox extends Component {
	static propTypes = {
		goBack: PropTypes.func.isRequired,
	}

	// constructor(props){
	// 	super(props);
	// }

	goBack = ()=>{
		const {props} = this
		props.goBack(props.params.folderId);
	}

	render(){
		return (
			<div className="content-space content-space--toolbox">
				<div>
					{/*<img className = {className(cssLogo.logo)}*/}
					<img className = {cssLogo.logo}
						 src = {reactLogo}
						 alt = ""/>
				</div>

				<div styleName = "instruments">
					<div className = "tooltip tooltip--bottom back-btn"
						 onClick = {this.goBack}
						 data-tooltip = "Back">
						<IconBack size = {30}/>
					</div>
				</div>
				{/*<div>*/}
					{/*<IconButton*/}
						{/*tooltip = "Edit"*/}
						{/*tooltipPosition = "bottom-right">*/}
						{/*<IconEdit size = {30}/>*/}
					{/*</IconButton>*/}
				{/*</div>*/}
				{/*<div>
					<IconButton
						tooltip = "Remove"
						tooltipPosition = "bottom-right">
						<IconDel size = {30}/>
					</IconButton>
				</div>*/}
			</div>
		)
	}
}