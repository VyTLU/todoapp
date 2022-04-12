import React, { Component } from 'react'
import PropTypes from 'prop-types';
import RowItem from './RowItem';
import RowItemEdit from './RowItemEdit';

export default class ListItem extends Component {
    render() {
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
                            data.map((item, index) => <RowItem item={item} index={index} key={item.id} />)
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