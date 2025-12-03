export function loadTabs() {
    return JSON.parse(localStorage.getItem('tabs')) || [];
}
export function saveTabs(tabs) {
    if (tabs) {
        localStorage.setItem('tabs', JSON.stringify(tabs));
    }
    
}



export function loadGroupTasks() {
    return JSON.parse(localStorage.getItem('groupTasks')) || [];
}
export function saveGroupTasks(group) {
    if (group) {
        localStorage.setItem('groupTasks', JSON.stringify(group));
    }
    
}






























