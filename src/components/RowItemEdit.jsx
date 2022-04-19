import React, { useState } from 'react'
import { cancelEdit } from '../store/actions';
import { LEVEL_LIST } from '../common/Constants'
import { useDispatch } from 'react-redux';

const RowItemEdit = ({
    item: { id, title, level } = {},
    index = 0,
    // cancelEdit = () => {},
    save = () => {},
}) => {
    const dispatch = useDispatch();
    const [titleEdit, setTitle] = useState(title);
    const [levelEdit, setLevel] = useState(level);

    const handleTitle = (e) => {
        const { value } = e.target;
        setTitle(value);
    }

    const handleLevel = (e) => {
        const { value } = e.target;
        setLevel(value);
    }

    const saveBtn = () => {
        save(id, {titleEdit, levelEdit});
        cancelBtn();
    }

    const cancelBtn = () => dispatch(cancelEdit());

    return (
        <tr>
            <td className="text-center">{index + 1}</td>
            <td><input type="text" className="form-control" value={titleEdit} onChange={handleTitle} name='title' /></td>
            <td className="text-center">
                <select name='level' onChange={handleLevel} className="form-control" value={levelEdit}>
                    {LEVEL_LIST.map(({ level, label }) => <option key={level} value={level}>{label}</option>)}
                </select>
            </td>
            <td>
                <button type="button" className="btn btn-default btn-sm mr-5" onClick={cancelBtn}>Cancel</button>
                <button type="button" className="btn btn-success btn-sm" onClick={saveBtn}>Save</button>
            </td>
        </tr>
    )
}

export default RowItemEdit;