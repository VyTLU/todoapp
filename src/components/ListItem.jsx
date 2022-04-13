import React, { Component } from 'react'
import PropTypes from 'prop-types';
import RowItem from './RowItem';
import RowItemEdit from './RowItemEdit';

export default class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: [],
            itemEdit: '',
            level: 0,
        }
    }

    deleteItem = (e) => this.props.onDeleteItem(e);

    editItem = (e) => {
        this.setState({
            editing: [...this.state.editing, e],
        })
    }

    cancelEdit = (e) => {
        this.setState({
            editing: [...this.state.editing.filter(item => item !== e)],
        })
    }

    save = (value) => this.props.onEditItem(value);

    render() {
        const { editing = [] } = this.state;
        const { data = [] } = this.props;
        
        return (
            <div className="panel panel-success">
                <div className="panel-heading">List Item</div>
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th width="10%" className="text-center">#</th>
                            <th>Name</th>
                            <th width="15%" className="text-center">Level</th>
                            <th width="15%">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => (
                                !editing.includes(index)
                                ?
                                <RowItem item={item} index={index} key={item.id} deleteItem={this.deleteItem} editItem={this.editItem} />
                                :
                                <RowItemEdit item={item} index={index} key={item.id} cancelEdit={this.cancelEdit} save={this.save} />)
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

ListItem.propTypes = {
    data: PropTypes.array.isRequired
}

ListItem.defaultProps = {
    data: []
}