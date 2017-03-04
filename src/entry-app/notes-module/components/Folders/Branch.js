import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import { normalize, schema } from 'normalizr';
import {Link} from 'react-router';
import IFolder from 'react-icons/lib/md/folder';
import IFolderOpened from 'react-icons/lib/md/folder-open';
import IconDel from 'react-icons/lib/md/delete-forever';
import IconSave from 'react-icons/lib/md/save';
import IconEdit from 'react-icons/lib/md/mode-edit';
import IconUndo from 'react-icons/lib/md/undo';
import IconClose from 'react-icons/lib/md/close';
import ICreateNewFolder from 'react-icons/lib/md/create-new-folder';
import IMore from 'react-icons/lib/md/expand-more'
import TextField from 'material-ui/TextField';
//-------------------------------------------------------
const activeLink = {color: 'inherit', fontWeight: 'bold', textDecoration: 'none', cursor: 'default'}

//-------------------------------------------------------------------------------
import css from './Tree.mod.css';
import classnames from 'classnames';

export default class TreeNode extends React.Component {
    static propTypes = {
        // action: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        };
    }

    toggle = () => {
        this.setState({visible: !this.state.visible});
    };

    handleChange = (e) => {
        // this.setState({inputValue: e.target.value.toUpperCase()});
        this.props.updateCreateField(e.target.value)
    }

    handleEditSubmit = (e) => {
        e.preventDefault();
        this.props.updateFolder({
            folderId: this.props.loadingFolderId,
            title   : this.props.editFolderTitle
        })
    }

    handleEditChange = (e) => {
        this.props.updateFolderField(e.currentTarget.value)
    }

    isEditMode = (id) => {
        const {
            loadingFolderId,
            editingFolder,
        }       = this.props

        return loadingFolderId === id && editingFolder
    }

    isDeleteMode = (id) => {
        const {
            loadingFolderId,
            loadingFolder,
        }       = this.props

        return loadingFolderId === id && loadingFolder
    }

    isErrorMode = (id) => {
        const {
            loadingFolderId,
            loadingFolderError,
        } = this.props

        return loadingFolderId === id && loadingFolderError
    }

    handleSubmit = (e) => {
        const {createFolder, createFolderTitle} = this.props
        e.preventDefault();
        createFolder(createFolderTitle)
    }

    handleChange = (e) => {
        // this.setState({inputValue: e.target.value.toUpperCase()});
        this.props.updateCreateField(e.target.value)
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

    isParent(childNodes){
        return childNodes && childNodes.length > 0
    }

    render() {
        var classObj;
        const folder = this.props.node;
        const {entities} = this.props;
        const {
            loadingFolder,
            loadingFolderId,
            loadingFolderError,
            editFolder,
            editingFolder,
        }       = this.props
        const toggleCss = classnames(css.togglable, {[css.opened]: folder.opened})
        var {childNodes} = this.props.node;

        if (childNodes && childNodes.length) {
            childNodes = this.props.node.childNodes.map((node, index) => {
                return <li key={node}>
                    <TreeNode
                        {...this.props}
                        node={entities[node]}
                        id = {node}
                        entities={entities} />
                </li>
            });

            classObj = {
                [css['toggleZone']]: true
            };
        }

        var style = {'list-style-type': 'none','margin': 0};
        if (!this.state.visible) {
            style = {...style, display: 'none'};
        }

        return (
            <div>
                <div className={classnames(classObj)}>
                    {this.isDeleteMode(folder._id) && !this.isEditMode(folder._id) && 'Deleting...'}
                    {this.isErrorMode(folder._id) && 'Try again'}
                    {this.isEditMode(folder._id) && loadingFolder && 'Updating...'}

                    {this.isEditMode(folder._id) && !loadingFolder &&
                    <form onSubmit={this.handleEditSubmit}
                          className="folder-item">
                        <i className="space-holder"></i>
                        <label>
                            <TextField
                                style={{width: '165px', height: '38px', fontSize: '15px'}}
                                value={this.props.editFolderTitle}
                                onChange={this.handleEditChange}
                                hintText="Title"/>

                            {/*<input type="text"*/}
                            {/*value={this.props.editFolderTitle}*/}
                            {/*onChange={this.handleEditChange}/>*/}
                        </label>
                        <div className="tooltip tooltip--bottom-left"
                             data-tooltip="Undo"
                             onClick={this.props.undoEdit}>
                            <button type="button">
                                <IconUndo size={30}/>
                            </button>
                        </div>
                        <div className="tooltip tooltip--bottom-left"
                             data-tooltip="Save">
                            <button>
                                <IconSave size={30}/>
                            </button>
                        </div>
                    </form>
                    }

                    {!this.isDeleteMode(folder._id) && !this.isEditMode(folder._id) &&
                        <div className="folder-item">
                        <div style = {{position: 'relative'}}>
                            {!this.isParent(childNodes) &&
                                <IFolder size={30} style = {{cursor: 'default'}}/>}
                            {this.isParent(childNodes) &&
                                <IMore className = {toggleCss}
                                       onClick={()=>this.props.toggleFolder(
                                           this.props.node._id)}/>}
                            {this.isParent(childNodes) &&
                                <IFolderOpened size={30} style = {{cursor: 'pointer'}}
                                               onClick={()=>this.props.toggleFolder(
                                                   this.props.node._id)}/>}
                        </div>
                        <div>
                            <Link to={`/notes/${this.props.node._id}`}
                                  activeStyle={activeLink}>
                                {this.props.node.title}
                            </Link>
                        </div>
                        <div className="tooltip tooltip--bottom-left trash"
                             data-tooltip="Rename folder"
                             onClick={() => editFolder(this.props.node)}>
                            <IconEdit size={30}/>
                        </div>
                        <div className="tooltip tooltip--bottom-left trash"
                             data-tooltip="Remove folder"
                             onClick={() => this.props.deleteFolder(this.props.node._id)}>
                            <IconDel size={30}/>
                        </div>
                        <div className="tooltip tooltip--bottom-left trash"
                             data-tooltip="Create folder"
                             onClick={() => this.props.createFolder({title: 'New',parentId: this.props.node._id})}>
                            <ICreateNewFolder size={30}/>
                        </div>
                    </div>
                    }

                    {this.props.node.opened &&
                        <ul style={style}>
                            {childNodes}
                        </ul>
                    }
                </div>
            </div>
        );
    }
}