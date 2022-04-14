import React, { Component } from 'react'
import { Form, ListItem, Search, Sort, Title } from '../components';
import { MockAPI } from '../services';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import FormFunction from '../components/FormFunction';
import ListItemFunction from '../components/ListItemFunction';
import SortFunction from '../components/SortFunction';
import SearchFunction from '../components/SearchFunction';
import TitleFunction from '../components/TitleFunction';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            usedItems: [],
            showAdd: false,
            searchItem: '',
            label: 'NAME - DESC',
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
        const { titleEdit, levelEdit } = item || {};
        const { items = [], usedItems = [] } = this.state;
        const copyUsedItems = [...usedItems];
        const copyItems = [...items];
        const foundItem = usedItems.find(x=>x.id === id);
        const foundUsedItemIndex = usedItems.findIndex(x=>x.id === id);
        const foundItemIndex = items.findIndex(x=>x.id === id);

        if(!foundItem) return;
        if(foundItem?.title === titleEdit && foundItem?.level === parseInt(levelEdit)) return;

        copyUsedItems[foundUsedItemIndex] = {level: levelEdit, title: titleEdit, id};
        copyItems[foundItemIndex] = {level: levelEdit, title: titleEdit, id};

        this.setState({
            items: copyItems,
            usedItems: copyUsedItems,
        })
    }

    changeLabel = (data) => {
        const label = (data === '1' || data === '2') ? 'name' : 'level';
        const type = (data === '1' || data === '3') ? 'ASC' : 'DESC';

        this.setState({
            label: `${label.toUpperCase()} - ${type}`
        })
    }

    onSortItem = (e) => {
        const { usedItems = [] } = this.state;
        const data = e.target.getAttribute('data-value');
        let copyItems = [...usedItems];
        
        if(data === '1'){
            copyItems = _.orderBy(copyItems, ['title', 'level'], ['asc', 'asc']);
        } else if(data === '2'){
            copyItems = _.orderBy(copyItems, ['title', 'level'], ['desc', 'asc']);
        } else if(data === '3'){
            copyItems = _.orderBy(copyItems, ['level', 'title'], ['asc', 'asc']);
        } else{
            copyItems = _.orderBy(copyItems, ['level', 'title'], ['desc', 'asc']);
        }

        this.setState({
            usedItems: copyItems,
        })

        this.changeLabel(data);
    }

    render() {
        const { usedItems = [], showAdd } = this.state;
        
        return (
            <div className="container">
                <TitleFunction />
                <div className="row">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <SearchFunction onSearchItem={this.onSearchItem} />
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <SortFunction onSortItem={this.onSortItem} changeLabel={this.state.label} />
                    </div>
                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        <button onClick={this.showAddForm} type="button" className="btn btn-info btn-block marginB10">Add Item</button>
                    </div>
                </div>
                <div className="row marginB10">
                    <div className="col-md-offset-7 col-md-5">
                        <FormFunction show={showAdd} onAddItem={this.onAddItem} showAddForm={this.showAddForm} />
                    </div>
                </div>
                <ListItemFunction data={usedItems} onDeleteItem={this.onDeleteItem} onEditedItem={this.onEditedItem} />
            </div>
        )
    }
}
