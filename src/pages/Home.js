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

    onEditedItem = (id, item) => {
        const { title, level } = item || {};
        const { items = [], usedItems = [] } = this.state;
        const copyUsedItems = [...usedItems];
        const copyItems = [...items];
        const foundItem = usedItems.find(x=>x.id === id);
        const foundUsedItemIndex = usedItems.findIndex(x=>x.id === id);
        const foundItemIndex = items.findIndex(x=>x.id === id);

        if(!foundItem) return;
        if(foundItem?.title === title && foundItem?.level === parseInt(level)) return;

        copyUsedItems[foundUsedItemIndex] = {level, title, id};
        copyItems[foundItemIndex] = {level, title, id};

        this.setState({
            items: copyItems,
            usedItems: copyUsedItems,
        }, () => {
            console.log(items)
            console.log(usedItems)
        })
    }

    render() {
        const { usedItems = [], showAdd } = this.state;
        console.log('UsedItems: ', usedItems)
        
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
                <ListItem data={usedItems} onDeleteItem={this.onDeleteItem} onEditedItem={this.onEditedItem} />
            </div>
        )
    }
}
