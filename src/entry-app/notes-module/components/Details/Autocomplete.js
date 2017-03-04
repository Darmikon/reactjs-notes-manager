// http://hackingbeauty.com/create-a-reactjs-component-part1/
import React, { Component } from 'react'
import AutoComplete         from 'material-ui/AutoComplete';
// import JSONP                from 'jsonp';
// import YoutubeFinder        from 'youtube-finder';
// import getMuiTheme          from 'material-ui/styles/getMuiTheme';
// import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';
// import injectTapEventPlugin from 'react-tap-event-plugin';
//
// injectTapEventPlugin();

//CUSTOM
import api from '/common/api-module'

export default class TagsAutocomplete extends Component {
    static propTypes = {

    }

    constructor(props) {
        super(props);
        this.state = {
            dataSource : [],
            dataSourceRaw : [],
            inputValue : ''
        }
    }

    performSearch =()=>{
        const {inputValue} = this.state;

        if(inputValue !== '') {
            api.get('tags?q=:search',{search: inputValue})
                .spread(data=>{
                    const suggestions = data.map(tag=>tag.title)

                    this.setState({
                        dataSource : suggestions
                        ,dataSourceRaw: data
                    });
                })
        }
    }

    onUpdateInput =(inputValue)=>{
        this.setState({
            inputValue
        },this.performSearch);
    }

    onNewRequest =(searchRes)=>{
        const existed = this.state.dataSourceRaw.filter(item => item.title === searchRes)[0]

         // console.log(searchRes,'existed',existed);
        //optimistic update - trigger action and erase field
        // if(existed){
        //     console.info('fire tag added');
        // }else{
        //     console.info('fire tag created');
        // }

        this.props.onSelect(existed || {_id: null, title: searchRes});

        this.setState({
            dataSource : [],
            dataSourceRaw : [],
            inputValue : ''
        });
    }

    render() {
        return (
            //    <MuiThemeProvider muiTheme={getMuiTheme()}>
            <AutoComplete
                searchText          ={this.state.inputValue}
                floatingLabelText   ={this.props.placeHolder}
                filter              ={AutoComplete.noFilter}
                openOnFocus         ={true}
                hintText            = "tag..."
                dataSource          ={this.state.dataSource}
                onUpdateInput       ={this.onUpdateInput}
                name                = "autocopmlete"
                onNewRequest        ={this.onNewRequest} />
            // </MuiThemeProvider>
        )
    }
}