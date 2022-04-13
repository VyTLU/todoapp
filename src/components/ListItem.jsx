import React, { Component } from 'react'
import PropTypes from 'prop-types';
import RowItem from './RowItem';
import RowItemEdit from './RowItemEdit';

export default class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: null,
            itemEdit: '',
            level: 0,
        }
    }

    deleteItem = (e) => this.props.onDeleteItem(e);

    editItem = (id) => {
        this.setState({
            editing: id,
        })
    }

    cancelEdit = () => {
        this.setState({
            editing: null,
        })
    }

    render() {
        const { editing = [] } = this.state;
        const { data = [], onEditedItem = () => {} } = this.props;
        
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
                                editing !== item.id
                                ?
                                <RowItem item={item} index={index} key={item.id} deleteItem={this.deleteItem} editItem={this.editItem} />
                                :
                                <RowItemEdit item={item} index={index} key={item.id} cancelEdit={this.cancelEdit} save={onEditedItem} />)
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