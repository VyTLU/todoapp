import React from 'react'

const Sort = ({
    onSortItem = () => { },
    changeLabel = () => { }
}) => {
    return (
        <div className="dropdown">
            <button className="btn btn-default dropdown-toggle mr-5" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Sort by <span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
                <li><a role="button" data-value="1" onClick={onSortItem} href='/#'>Name ASC</a></li>
                <li><a role="button" data-value="2" onClick={onSortItem} href='/#'>Name DESC</a></li>
                <li role="separator" className="divider"></li>
                <li><a role="button" data-value="3" onClick={onSortItem} href='/#'>Level ASC</a></li>
                <li><a role="button" data-value="4" onClick={onSortItem} href='/#'>Level DESC</a></li>
            </ul>
            <span className="label label-success label-medium">{changeLabel}</span>
        </div>
    )
}

export default Sort;