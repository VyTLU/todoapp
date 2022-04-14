import React from 'react'

const SortFunction = ({
    onSortItem = () => { },
    changeLabel = () => { }
}) => {
    return (
        <div className="dropdown">
            <button className="btn btn-default dropdown-toggle mr-5" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Sort by <span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
                <li><a role="button" data-value="1" onClick={onSortItem}>Name ASC</a></li>
                <li><a role="button" data-value="2" onClick={onSortItem}>Name DESC</a></li>
                <li role="separator" className="divider"></li>
                <li><a role="button" data-value="3" onClick={onSortItem}>Level ASC</a></li>
                <li><a role="button" data-value="4" onClick={onSortItem}>Level DESC</a></li>
            </ul>
            <span className="label label-success label-medium">{changeLabel}</span>
        </div>
    )
}

export default SortFunction;