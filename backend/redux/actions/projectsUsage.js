import { ADD_USAGE } from '../../../shared/redux/types/projectsUsage';


export const createProject = (usage) => ({
    type: ADD_USAGE,
    payload: usage
});
