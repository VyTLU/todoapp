import React from 'react'
import { LEVEL_LIST } from '../common/Constants'
import { useDispatch } from 'react-redux'
import { deleteItem, editItem } from '../store/actions'
import Swal from 'sweetalert2'

const RowItem = ({
    item = {},
    index = 0,
    // editItem = () => { },
    item: { id } = {},
}) => {
    const getLevel = (level) => LEVEL_LIST.find(x => x.level === Number(level));
    const dispatch = useDispatch();

    const editItemBtn = () => dispatch(editItem(id));

    const deleteItemBtn = () => {
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
                dispatch(deleteItem(id));
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    const level = getLevel(item?.level);

    return (
        <tr>
            <td className="text-center">{index + 1}</td>
            <td>{item?.title}</td>
            <td className="text-center"><span className={`label ${level?.className}`}>{level?.label}</span></td>
            <td>
                <button type="button" className="btn btn-warning btn-sm mr-5" onClick={editItemBtn}>Edit</button>
                <button type="button" className="btn btn-danger btn-sm" onClick={deleteItemBtn}>Delete</button>
            </td>
        </tr>
    )
}

export default RowItem;