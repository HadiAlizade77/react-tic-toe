import { CHECK_CELL } from './index';
export const checkCell = (payload) => {
    return {
        type: CHECK_CELL,
        payload
    };
};
