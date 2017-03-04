// †GLOBAL IMPORTS
import React, {Component, PropTypes} from 'react';
// import CSSModules from 'react-css-modules';
import {Link} from 'react-router';
import ICreateNewFolder from 'react-icons/lib/md/create-new-folder';
import IconSave from 'react-icons/lib/md/save';
import IconClose from 'react-icons/lib/md/close';
import TextField from 'material-ui/TextField';

// †CUSTOM IMPORTS
import './Folders.global.css'
import View from '../View'
import Branch from './Branch';

const activeLink = {color: 'inherit', fontWeight: 'bold', textDecoration: 'none', cursor: 'default'}

// @CSSModules(css)
export default class Folders extends Component {
    static propTypes = {
        loading           : PropTypes.bool.isRequired,
        error             : PropTypes.object,
        // items             : PropTypes.array.isRequired,
        getFolders        : PropTypes.func.isRequired,
        createFolder      : PropTypes.func.isRequired,
        addNew            : PropTypes.func.isRequired,
        loadingCreate     : PropTypes.bool.isRequired,
        errorCreate       : PropTypes.object,
        deleteFolder      : PropTypes.func.isRequired,
        loadingFolder     : PropTypes.bool.isRequired,
        editingFolder     : PropTypes.bool.isRequired,
        editFolder        : PropTypes.func.isRequired,
        updateFolder      : PropTypes.func.isRequired,
        loadingFolderId   : PropTypes.string,
        loadingFolderError: PropTypes.object,
        updateFolderField : PropTypes.func.isRequired,
        editFolderTitle   : PropTypes.string,
        createFolderTitle : PropTypes.string,
        updateCreateField : PropTypes.func.isRequired,
        undoEdit          : PropTypes.func.isRequired,
        undoCreate        : PropTypes.func.isRequired,
        payloadResults    : PropTypes.array,
        payloadEntities   : PropTypes.object,
        showFolder        : PropTypes.func.isRequired,
        toggleFolder      : PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        // this.state = {
        //     inputValue: '',
        //     // inputEditValue: '',
        // }
    }

    componentDidUpdate(nextProps){
        if(!this.props.payloadResults.length){
            return;
        }

        this.props.showFolder(
            nextProps.params.folderId
        );

    }

    componentDidMount() {
        this.props.getFolders()
    }

    handleSubmit = (e) => {
        const {createFolder, createFolderTitle} = this.props
        e.preventDefault();
        createFolder({title: createFolderTitle, parentId: null})
    }

    handleChange = (e) => {
        // this.setState({inputValue: e.target.value.toUpperCase()});
        this.props.updateCreateField(e.target.value)
    }

    renderFoldersNested = () => {
        // var {entities, result} = this.props.payload;
        const {payloadResults, payloadFolders} = this.props;
        // let action = {};
        // action['remove'] = function(){
        //      console.log('remove');
        // }

        if (!payloadResults) {
            return <div>Create folder</div>
        }

        return (<div>
            {payloadResults.map(node => {
                return <Branch
                    {...this.props}
                    key={node}
                    node={payloadFolders[node]}
                    id={node}
                    entities={payloadFolders}
                />
            })}
        </div>)
    }

    renderAddForm = () => {
        const {loadingCreate, errorCreate} = this.props

        return (
            <div className="folder-item">
                {loadingCreate && 'Creating...'}
                {errorCreate && 'Server error'}

                {!loadingCreate &&
                <form onSubmit={this.handleSubmit}
                      className="folder-item">
                    <i className="space-holder"></i>
                    <label>
                        <TextField
                            style={{width: '165px', height: '38px', fontSize: '15px'}}
                            value={this.props.createFolderTitle}
                            onChange={this.handleChange}
                            hintText="Title"/>
                        {/*<input type="text"*/}
                        {/*placeholder="folder name"*/}
                        {/*value={this.props.createFolderTitle}*/}
                        {/*onChange={this.handleChange}/>*/}
                    </label>
                    <div className="tooltip tooltip--bottom-left"
                         data-tooltip="Save">
                        <button>
                            <IconSave size={30}/>
                        </button>
                    </div>
                    <div className="tooltip tooltip--bottom-left"
                         data-tooltip="Cancel"
                         onClick={this.props.undoCreate}>
                        <button type="button">
                            <IconClose size={30}/>
                        </button>
                    </div>
                </form>
                }
            </div>
        )
    }

    render() {
        const {props}          = this
        const {loading, error} = props
        const {isAddNew}       = props

        return (
            <div className="content-space">
                {/*<div styleName="folder">*/}
                <div className="content-title">
                    <h5 className="folder-title">Folders
                        <div className="tooltip tooltip--bottom-left folder-add"
                             onClick={() => props.addNew()}
                             data-tooltip="Create folder">
                            <ICreateNewFolder size={30}/>
                        </div>
                    </h5>
                </div>

                {isAddNew && this.renderAddForm()}

                <View loading={loading}
                      error={error}
                      renderer={this.renderFoldersNested}/>
            </div>
        );
    }
}
