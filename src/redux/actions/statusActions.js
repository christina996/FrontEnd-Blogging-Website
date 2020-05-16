import * as TYPES from './actionTypes';

const onFailure = () => ({ type: TYPES.API_CALL_ERROR });
const startLoading = () => ({ type: TYPES.BEGIN_API_CALL });

export { onFailure, startLoading };
