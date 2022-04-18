import React, {useState} from 'react'
import { LEVEL_LIST } from '../common/Constants';


const Form = ({
    showAddForm = () => {},
    show = false,
    onAddItem = () => {},
}) => {
    const [item, setItem] = useState('');
    const [level, setLevel] = useState(0);
    
    const handleNameChange = (e) => setItem(e.target.value);
    const handleLevelChange = (e) => setLevel(e.target.value);
    const onSubmitForm = () => {
        if(item) onAddItem({item,level});
        setItem('');
        setLevel(0);
    };

    if (!show) return null;
    return(
        <form className="form-inline">
                <div className="form-group mr-5">
                    <input value={item} type="text" name='item' onChange={handleNameChange} className="form-control" placeholder="Item Name" />
                </div>
                <div className="form-group mr-5">
                    <select name='level' onChange={handleLevelChange} className="form-control" value={level}>
                        {LEVEL_LIST.map(({ level: id, label }) => <option key={id} value={id}>{label}</option>)}
                    </select>
                </div>
                <button type="button" className="btn btn-primary mr-5" onClick={onSubmitForm}>Submit</button>
                <button type="button" className="btn btn-default" onClick={showAddForm}>Cancel</button>
            </form>
    )
}

export default Form;