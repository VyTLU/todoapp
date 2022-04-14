import React, { Component } from 'react'
import { LEVEL_LIST } from '../common/Constants';


export default class ListItemEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleEdit: this.props.item.title,
            levelEdit: this.props.item.level,
        }
    }

    handleInput = (e) => {
        const { name, value } = e.target;
        
        this.setState({
            [name]: value
        })
    }

    cancelEditBtn = () => this.props.cancelEdit();

    saveBtn = () => {
        const { titleEdit = '', levelEdit = 0 } = this.state;
        const { item: {id} = {} } = this.props;

        this.props.save(id, {titleEdit, levelEdit});
        this.cancelEditBtn();
    }

    render() {
        const { item = {}, index = 0 } = this.props;
        const { titleEdit } = this.state;

        return (
            <tr>
                <td className="text-center">{index + 1}</td>
                <td><input type="text" className="form-control" value={titleEdit} onChange={this.handleInput} name='title' /></td>
                <td className="text-center">
                    <select name='level' onChange={this.handleInput} className="form-control" value={item?.level}>
                        {LEVEL_LIST.map(({ level: id, label }) => <option key={id} value={id}>{label}</option>)}
                    </select>
                </td>
                <td>
                    <button type="button" className="btn btn-default btn-sm mr-5" onClick={this.cancelEditBtn}>Cancel</button>
                    <button type="button" className="btn btn-success btn-sm" onClick={this.saveBtn}>Save</button>
                </td>
            </tr>
        )
    }
}
