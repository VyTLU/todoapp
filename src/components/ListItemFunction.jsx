import React, {useState} from 'react'
import RowItem from './RowItem';
import RowItemEdit from './RowItemEdit';
import RowItemEditFunction from './RowItemEditFunction';
import RowItemFunction from './RowItemFunction';

const ListItemFunction = ({
    data = [],
    onEditedItem = () => {},
    onDeleteItem = () => {},
}) => {
    const [editing, setEditing] = useState(null);

    const deleteItem = (e) => onDeleteItem(e);
    const editItem = (id) => setEditing(id);
    const cancelEdit = () => setEditing(null);

    return(
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
                                <RowItemFunction item={item} index={index} key={item.id} deleteItem={deleteItem} editItem={editItem} />
                                :
                                <RowItemEditFunction item={item} index={index} key={item.id} cancelEdit={cancelEdit} save={onEditedItem} />)
                            )
                        }
                    </tbody>
                </table>
            </div>
    )
}

export default ListItemFunction;