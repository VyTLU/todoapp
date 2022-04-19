import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import RowItemEdit from './RowItemEdit';
import RowItem from './RowItem';

const ListItem = ({
    data = [],
    onEditedItem = () => {},
}) => {
    const editing = useSelector((s) => s.listItemReducer.editing);
    // const [editing, setEditing] = useState(null);

    // const editItem = (id) => setEditing(id);
    // const cancelEdit = () => setEditing(null);

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
                                <RowItem item={item} index={index} key={item.id} />
                                :
                                <RowItemEdit item={item} index={index} key={item.id} save={onEditedItem} />)
                            )
                        }
                    </tbody>
                </table>
            </div>
    )
}

export default ListItem;