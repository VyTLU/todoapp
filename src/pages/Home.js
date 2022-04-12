import React, { Component } from 'react'
import { Form, ListItem, Search, Sort, Title } from '../components';
import { MockAPI } from '../services';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            showAdd: false,
            searchItem: '',
        }
    }

    componentDidMount() {
        MockAPI.getListTodo().then(res => this.setState({ items: res }));
    }

    showAddForm = () => this.setState({ showAdd: !this.state.showAdd });

    getAddItem = (value) => {
        const { item, level } = value;
        const { items = [] } = this.state;
        const i = {
            id: this.state.items.length,
            title: item,
            level: level,
        };
        this.setState({
            items: [...items, i],
        })
        this.showAddForm();
    }

    getSearchItem = (value) => {
        const { items = [], searchItem = '' } = this.state;
        const searchItems = items.filter(item => item.title.includes(searchItem));
        console.log(searchItems);

        this.setState({
            searchItem: value,
            items: searchItems,
        }, () => console.log(this.state.items))
    }

    render() {
        const { items = [], showAdd } = this.state;
        return (
            <div className="container">
                <Title />
                <div className="row">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <Search getSearchItem={this.getSearchItem} />
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <Sort />
                    </div>
                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        <button onClick={this.showAddForm} type="button" className="btn btn-info btn-block marginB10">Add Item</button>
                    </div>
                </div>
                <div className="row marginB10">
                    <div className="col-md-offset-7 col-md-5">
                        <Form show={showAdd} getAddItem={this.getAddItem} showAddForm={this.showAddForm} />
                    </div>
                </div>
                <ListItem data={items} />
            </div>
        )
    }
}
