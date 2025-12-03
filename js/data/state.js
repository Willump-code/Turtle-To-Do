import {loadGroupTasks, loadTabs} from './storage.js'



export const state = {
    tabs: loadTabs(),    
    groupTasks: loadGroupTasks()
}
