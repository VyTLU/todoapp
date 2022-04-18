import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Title, Search, Sort, Form, ListItem } from '../components'
import { getItems } from '../redux'
import { MockAPI } from '../services'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

const Home = () => {
    const [items, setItems] = useState([]);
    const [usedItems, setUsedItems] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [searchItem, setSearchItem] = useState('');
    const [label, setLabel] = useState('NAME - DESC');
    const check = useSelector(state => state.items);
    const dispatch = useDispatch();
    const data = useSelector((s)=> s.home.usedItems)

    useEffect(() => {
        MockAPI.getListTodo().then(res => {
            dispatch(getItems(res));
        })
    },[])

    const showAddForm = () => setShowAdd(!showAdd);

    const onAddItem = (value) => {
        const { item, level } = value;

        const i = {
            id: uuidv4(),
            title: item,
            level: level,
        };

        setItems([...items, i]);
        setUsedItems([...items, i]);
        showAddForm();
    } 

    const onSearchItem = ( value = '') => {
        const searchItems = items.filter((item) => {
            if(value === '') return item;
            return item.title.toLowerCase().includes(searchItem.toLowerCase());

        });

        setSearchItem(value);
        setUsedItems(searchItems);
    }

    const onDeleteItem = (value) => {
        const deletedItems = usedItems.filter(item => item.id !== value);

        setItems(deletedItems);
        setUsedItems(deletedItems);
    }

    const onEditedItem = (id, item) => {
        const { titleEdit, levelEdit } = item || {};
        const copyUsedItems = [...usedItems];
        const copyItems = [...items];
        const foundItem = usedItems.find(x=>x.id === id);
        const foundUsedItemIndex = usedItems.findIndex(x=>x.id === id);
        const foundItemIndex = items.findIndex(x=>x.id === id);

        if(!foundItem) return;
        if(foundItem?.title === titleEdit && foundItem?.level === parseInt(levelEdit)) return;

        copyUsedItems[foundUsedItemIndex] = {level: levelEdit, title: titleEdit, id};
        copyItems[foundItemIndex] = {level: levelEdit, title: titleEdit, id};

        setItems(copyItems);
        setUsedItems(copyUsedItems);
    }

    const changeLabel = (data) => {
        const label = (data === '1' || data === '2') ? 'name' : 'level';
        const type = (data === '1' || data === '3') ? 'ASC' : 'DESC';

        setLabel(`${label.toUpperCase()} - ${type}`);
    }

    const onSortItem = (e) => {
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

        setUsedItems(copyItems);

        changeLabel(data);
    }

    return (
        <div className="container">
            <Title />
            <div className="row">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <Search onSearchItem={onSearchItem} />
                </div>
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <Sort onSortItem={onSortItem} changeLabel={label} />
                </div>
                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                    <button onClick={showAddForm} type="button" className="btn btn-info btn-block marginB10">Add Item</button>
                </div>
            </div>
            <div className="row marginB10">
                <div className="col-md-offset-7 col-md-5">
                    <Form show={showAdd} onAddItem={onAddItem} showAddForm={showAddForm} />
                </div>
            </div>
            <ListItem data={data} onDeleteItem={onDeleteItem} onEditedItem={onEditedItem} />
        </div>
    )
}

export default Home;