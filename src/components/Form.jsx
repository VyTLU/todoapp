import React, { Component } from 'react';
import { LEVEL_LIST } from '../common/Constants';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: '',
            level: 0
        }
    }

    handleInput = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    onSubmitForm = () => {
        const { item, level } = this.state;
        const { getAddItem = () => { } } = this.props;
        getAddItem({item, level})
        this.setState({
            item: '',
            level: 0,
        })
    }

    render() {
        const { item, level } = this.state;
        const {
            show = false,
            showAddForm = () => { }
        } = this.props;

        if (!show) return null;

        return (
            <form className="form-inline">
                <div className="form-group mr-5">
                    <input value={item} type="text" name='item' onChange={this.handleInput} className="form-control" placeholder="Item Name" />
                </div>
                <div className="form-group mr-5">
                    <select name='level' onChange={this.handleInput} className="form-control">
                        {LEVEL_LIST.map(({ level: id, label }) => <option selected={level === id} key={id} value={id}>{label}</option>)}
                    </select>
                </div>
                <button type="button" className="btn btn-primary mr-5" onClick={this.onSubmitForm}>Submit</button>
                <button type="button" className="btn btn-default" onClick={showAddForm}>Cancel</button>
            </form>
        )
    }
}
