import React, { useState } from 'react'

const SearchFunction = ({
    onSearchItem = () => { }
}) => {
    const [searchItem, setSearchItem] = useState('');

    const handleInput = (e) => {
        const { value } = e.target;
        setSearchItem(value);
        onSearchItem(value);
    }

    const clearInput = () => {
        setSearchItem('');
        onSearchItem('');
    }

    return (
        <div className="input-group">
            <input value={searchItem} type="text" className="form-control" placeholder="Search item name" onChange={handleInput} />
            <span className="input-group-btn">
                <button className="btn btn-info" type="button" onClick={clearInput}>Clear</button>
            </span>
        </div>
    )
}

export default SearchFunction;