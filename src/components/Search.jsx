import React, { Component } from 'react'

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchItem: '',
        }
    }

    handleInput = (e) => {
        const { value } = e.target;
        const { onSearchItem = () => { } } = this.props;

        this.setState({
            searchItem: value,
        }, onSearchItem(value))
    }

    clearInput = () => {
        this.setState({
            searchItem: '',
        })
    }

    render() {
        const { searchItem } = this.state;

        return (
            <div className="input-group">
                <input value={searchItem} type="text" className="form-control" placeholder="Search item name" onChange={this.handleInput} />
                <span className="input-group-btn">
                    <button className="btn btn-info" type="button" onClick={this.clearInput}>Clear</button>
                </span>
            </div>
        )
    }
}
