import React from 'react'
import { Select } from 'antd'

import { eventHandler } from '../app/Utils';

const Option = Select.Option;
const renderAntdOption = (key, value)=>{
    return (<Option value={key} key={key}>
        {value}
    </Option>)
}

export const getOptions = (listOptions) => 
    listOptions.map((e)=>renderAntdOption(e.key, e.value))


const SelectComponent = (props) => {
    const options = getOptions(props.options);
    // to share the value with the same type, we create a hash to transform the value
    const hash = {} 
    props.options.forEach(element => {
        hash[element.key]= element.key
    });
    console.log(props.value);

    let newProps = {
        value: props.value,
        style: props.style,
        placeholder: props.placeholder ? props.placeholder.value : undefined
    };
    if (props.onChangeFn){
        newProps.onChange=(e)=> {
            eventHandler(props.onChangeFn(hash[e]))
        }
    }
    console.log(props);
    return (
        <Select {...newProps}>
            {options}
        </Select>
    )
}


export default SelectComponent;
