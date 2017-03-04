import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import { normalize, schema } from 'normalizr';
//-------------------------------------------------------
// http://stackoverflow.com/a/41509150
// https://www.bountysource.com/issues/27912581-how-to-cut-the-boilerplate-when-updating-nested-entities
const section = new schema.Entity('sections')
const sections = new schema.Array(section);
section.define({ sections });
const menu = new schema.Entity('menu', { sections });
const data = {
    id: 123,
    sections: [{
        id: 1,
        sections:[{ id: 4, sections: [ { id: 5, sections: [] } ] }]
    }, {
        id: 2,
        sections:[]
    }, {
        id: 3,
        sections:[]
    }]
};

 console.log(normalize([{
     id: 1,
     sections:[{ id: 4, sections: [ { id: 5, sections: [] } ] }]
 }, {
     id: 2,
     sections:[]
 }, {
     id: 3,
     sections:[]
 }], sections)); //results: [1,2,3], entities: {sections: {1: {...}}}


//-------------------------------------------------------------------------------
import css from './Tree.mod.css';
import classnames from 'classnames';

@connect(()=>({}),
    (dispatch)=>{
        return {
            remove: (payload)=>{
                console.log('---- action remove ----', payload);
                dispatch({type: '__REMOVE__', payload})
            }
        }
    }
)
export default class Tree extends Component {
    render() {
        var {entities, results} = this.props.tree;
        var action = {};
        action['remove'] = this.props.remove

        return (<div>
            {results.map(node => {
                return <TreeNode key={node}
                                 node={entities[node]}
                                 action={action}
                                 id={node}
                                 entities={entities}/>
            })}
        </div>)
    }
}

class TreeNode extends React.Component {
    static propTypes = {
        action: PropTypes.object.isRequired
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

    render() {
        var childNodes;
        var classObj;
        var {entities} = this.props;

        if (this.props.node.childNodes != null) {
            childNodes = this.props.node.childNodes.map((node, index) => {
                return <li key={node}>
                    <TreeNode node={entities[node]}
                              id = {node}
                              action={this.props.action}
                              entities={entities} />
                </li>
            });

            classObj = {
                [css['togglable']]     : true,
                [css['togglable-down']]: this.state.visible,
                [css['togglable-up']]  : !this.state.visible
            };
        }

        var style;
        if (!this.state.visible) {
            style = {display: "none"};
        }

        return (
            <div>
                <h5 onClick={this.toggle}
                    className={classnames(classObj)}>
                    {this.props.node.title}
                    __
                    <span onClick = {()=>this.props.action.remove(this.props.id)}>x</span>
                </h5>
                <ul style={style}>
                    {childNodes}
                </ul>
            </div>
        );
    }
}


// ReactDOM.render(
//     <Tree tree = {tree} />,
//     document.getElementById("tree")
// );
