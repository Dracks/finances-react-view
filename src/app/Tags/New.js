import React from 'react';
import { connect } from 'react-redux';

import Form from './Form';
import {updateTags} from './Actions';

const New = (props) => {
    return (
        <div>
            <h2> New tag </h2>
            <Form value={{filters: [], children:[]}} {...props} />
        </div>
    )
}

const mapStateToProps = ({hashTags, tags})=>{
    return {
        hashTags,
        tags: tags.data
    }
}

export default connect(mapStateToProps, {updateTags})(New)