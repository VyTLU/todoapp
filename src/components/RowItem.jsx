import React, { Component } from 'react'
import { LEVEL_LIST } from '../common/Constants';
import Swal from 'sweetalert2'

export default class RowItem extends Component {
    getLevel = (level) => LEVEL_LIST.find(x => x.level === Number(level));

    deleteItemBtn = () => {
        const { item = {}, deleteItem = () => {} } = this.props;
        
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteItem(item.id);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
          })
    }

    editItemBtn = () => {
        const { editItem = () => {}, item: {id} = {} } = this.props;
        editItem(id);
    }

    render() {
        const { item = {}, index = 0 } = this.props;
        const level = this.getLevel(item?.level);

        return (
            <tr>
                <td className="text-center">{index + 1}</td>
                <td>{item?.title}</td>
                <td className="text-center"><span className={`label ${level?.className}`}>{level?.label}</span></td>
                <td>
                    <button type="button" className="btn btn-warning btn-sm mr-5" onClick={this.editItemBtn}>Edit</button>
                    <button type="button" className="btn btn-danger btn-sm" onClick={this.deleteItemBtn}>Delete</button>
                </td>
            </tr>
        )
    }
}
