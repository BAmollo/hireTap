 import {sortBy} from 'lodash';
 import ActionConstants from './actionConstants';
const {GET_DATA} = ActionConstants;

let initialState = {
    data: {hello: 'hello'}
};

//REDUCER
function reducers (state, action) {
    switch (action.type) {
        case GET_DATA:
            return state;
        default:
            return state;
    }
}

export default reducers;