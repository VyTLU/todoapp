import React, {useState} from 'react'
import { LEVEL_LIST } from '../common/Constants';


const FormFunction = ({
    showAddForm = () => {},
    show = false,
}) => {
    const [item, setName] = useState('');
    const [level, setLevel] = useState('');
    
    const handleNameChange = (e) => setName(e.target.value);
    const handleLevelChange = (e) => setLevel(e.target.value);

    if (!show) return null;
    return(
        <form className="form-inline">
                <div className="form-group mr-5">
                    <input value={item} type="text" name='item' onChange={handleNameChange} className="form-control" placeholder="Item Name" />
                </div>
                <div className="form-group mr-5">
                    <select name='level' onChange={handleLevelChange} className="form-control">
                        {LEVEL_LIST.map(({ level: id, label }) => <option selected={level === id} key={id} value={id}>{label}</option>)}
                    </select>
                </div>
                <button type="button" className="btn btn-primary mr-5" onClick={this.onSubmitForm}>Submit</button>
                <button type="button" className="btn btn-default" onClick={showAddForm}>Cancel</button>
            </form>
    )
}

export default FormFunction;