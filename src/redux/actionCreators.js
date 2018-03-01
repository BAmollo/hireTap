import ActionConstants from './actionConstants';
const {GET_DATA} = ActionConstants;

export function filterOrganizations() {
    return {type: GET_DATA};
}

export function getData() {
    return {type: GET_DATA};
}
