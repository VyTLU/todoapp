import React, { Component } from 'react'
import { Form, ListItem, Search, Sort, Title } from '../components';
import { MockAPI } from '../services';
import { v4 as uuidv4 } from 'uuid';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            usedItems: [],
            showAdd: false,
            searchItem: '',
        }
    }

    componentDidMount() {
        MockAPI.getListTodo().then(res => this.setState({ 
            items: res,
            usedItems: res,
        }));
    }

    showAddForm = () => this.setState({ showAdd: !this.state.showAdd });

    onAddItem = (value) => {
        const { item, level } = value;
        const { items = [] } = this.state;
        
        const i = {
            id: uuidv4(),
            title: item,
            level: level,
        };
        
        this.setState({
            items: [...items, i],
            usedItems: [...items, i],
        })
        this.showAddForm();
    }

    onSearchItem = (value = '') => {
        const { items = [], searchItem = '' } = this.state;
        const searchItems = items.filter((item) => {
            if(value === '') return item;
            return item.title.toLowerCase().includes(searchItem.toLowerCase());

        });

        this.setState({
            searchItem: value,
            usedItems: searchItems,
        })
    }

    onDeleteItem = (value) => {
        const { usedItems = [] } = this.state;
        const deletedItems = usedItems.filter(item => item.id !== value);
        
        this.setState({
            items: deletedItems,
            usedItems: deletedItems,
        })
    }

    onEditItem = (value) => {
        const { itemEdit, level, item } = value;
        const { items = [], usedItems = [] } = this.state;
        let check = 0;
        let temp = item;

        if(itemEdit !== item.title){
            temp.title = itemEdit;
            check++;
        } else if(level !== item.level){
            temp.level = level;
            check++;
        }

        if(check > 0){
            const position = items.indexOf(item);
            console.log(position);
            this.setState({
                items: items.splice(position, 1, temp),
                usedItems: [...usedItems, usedItems.splice(position, 1, temp)],
            }, () => console.log(items))
        }
    }

    render() {
        const { usedItems = [], showAdd } = this.state;
        
        return (
            <div className="container">
                <Title />
                <div className="row">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <Search onSearchItem={this.onSearchItem} />
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
                        <Form show={showAdd} onAddItem={this.onAddItem} showAddForm={this.showAddForm} />
                    </div>
                </div>
                <ListItem data={usedItems} onDeleteItem={this.onDeleteItem} onEditItem={this.onEditItem} />
            </div>
        )
    }
}
