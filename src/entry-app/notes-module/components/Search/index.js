import React, {Component, PropTypes} from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Toggle from 'material-ui/Toggle'
//CUSTOM
import {Underline} from '/common/material-utils-module'
import './Search.global.css'
import api from '/common/api-module'

export default class Search extends Component {
    static propTypes = {
        gotoEntity: PropTypes.func.isRequired,
        gotoNote  : PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            focus           : false,
            backspaceRemoves: true,
            multi           : false,
            value           : '',
            deepSearch      : true,
            options         : [],
        }
    }

    onChange = (value, sec) => {
        this.setState({
            value  : '',
            options: []
        });

        if (!this.state.deepSearch) {
            this.props.gotoNote(value)
        } else {
            this.props.gotoEntity(value)
        }
    }

    fetch = (input) => {
        if (!input) {
            return Promise.resolve({options: []})
        }

        const API_URL = this.state.deepSearch ? 'searchdeep' : 'search';
        return api.get(`${API_URL}?q=:q`, {q: input})
            .spread(data => ({options: data}))
    }

    toggleSearchMode = () => {
        this.setState({
            deepSearch: !this.state.deepSearch
        });
    }

    optionRenderer = (value) => {
        if (this.state.deepSearch) {
            return (
                <div>
                    {value.count} match{value.count > 1 ? 'es' : ''} in {value._id}
                </div>
            )
        }

        //for simple search
        return (
            <div>
                {value.title}
                {/*<a href="https://google.com">{value.title}</a>*/}
            </div>
        )
    }

    render() {
        const AsyncComponent = this.state.creatable
            ? Select.AsyncCreatable
            : Select.Async;

        return (
            <div className="section search">
                <div style={{padding: '0 12px'}}>
                    <AsyncComponent value={this.state.value}
                                    onChange={this.onChange}
                                    valueKey="_id"
                                    className="react-select"
                                    cache={false}
                                    style={{border: 'none', outline: 'none'}}
                                    labelKey={this.state.deepSearch ? 'description' : 'title'}
                                    optionRenderer={this.optionRenderer}
                                    loadOptions={this.fetch}/>
                    <Underline focus={this.state.focus}/>
                </div>

                <Toggle style={{
                    width    : 'auto',
                    transform: 'scale(0.75)',
                    flex     : 1,
                    alignSelf: 'flexStart',
                    minWidth : '130px'
                }}
                        label="Deep search"
                        toggled={this.state.deepSearch}
                        onToggle={this.toggleSearchMode}
                        labelPosition="right"/>
            </div>
        );
    }
}