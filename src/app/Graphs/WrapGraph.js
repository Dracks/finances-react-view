import React, {Component} from 'react';

import Form from '../../utils/Form';
import ConstantsCss from '../Constants-CSS';
import { eventHandler } from '../Utils';

import Graph from './Graph';

const pack = ({tag, kind, group, horizontal, horizontal_value}) => {
    return {
        kind,
        tag,
        group: {name: group},
        horizontal: {name: horizontal, value: horizontal_value}
    }
}

const unpack = ({tag, kind, group, horizontal}) => {
    return {
        kind, 
        tag,
        group: group.name,
        horizontal: horizontal.name,
        horizontal_value: horizontal.value.map((e)=>e.id)
    }
}

class WrapGraph extends Component {
    constructor(props){
        super(props)
        this.changeOptions = this.changeOptions.bind(this);
        this.state={
            isEdit: false,
            options: props.options,
        }
    }
    changeOptions(options){
        this.setState({options: pack(options)})
    }
    render(){
        let g = <Graph data={this.props.data} options={this.state.options} />
        if (this.state.isEdit){
            return (
                <div className={this.props.className}>
                    <Form config={this.props.graphConfig} onChange={this.changeOptions} options={unpack(this.state.options)} />
                    <a className={ConstantsCss.Button.Floating} onClick={eventHandler(()=>{this.setState({isEdit: false})})}><i className="material-icons">save</i></a>
                    {g}
                </div>
                )
        } else {
            return (
                <div className={this.props.className}>
                    {g}
                    <a className={ConstantsCss.Button.Floating} onClick={eventHandler(()=>{this.setState({isEdit: true})})}><i className="material-icons">edit</i></a>
                </div>
                )
        }
    }
}

export default WrapGraph;