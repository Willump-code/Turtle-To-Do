import {state} from '../data/state.js'
import {loadTabs, saveGroupTasks, saveTabs} from '../data/storage.js'



export function logicSaveTab(name) {
    const ob = {
        id: crypto.randomUUID(),
        name
    }
    state.tabs = loadTabs()
    state.tabs.push(ob);
    saveTabs(state.tabs);
    return ob
}

export function logicSaveGroupTasks(idGroup, name){
    const ob = {
        id: crypto.randomUUID(),
        name: name,
        isChecked: false,
        
    }
    for (const i of state.groupTasks) {
        if(i.idGroup == idGroup){
            i.arrayTasks.push(ob)
            saveGroupTasks(state.groupTasks)
            return ob
        }
    }
    const obGroup = {
        idGroup: idGroup,
        arrayTasks: []
    }
    obGroup.arrayTasks.push(ob)
    state.groupTasks.push(obGroup)
    saveGroupTasks(state.groupTasks)
    return ob
}

export function calculatioProgress(){
    
    let numberCheck = 0
    let numberAll = 0
    for (const i of state.groupTasks) {
        if (document.querySelector('.tabs_btn.active')) {
            if (i.idGroup == document.querySelector('.tabs_btn.active').dataset.id) {
                i.arrayTasks.forEach(x => {
                    if (x.isChecked) {
                        numberCheck+=1
                        numberAll+=1
                    }else{
                        numberAll+=1
                    }
                })   
            }
        }

    }
    let val = (numberCheck/numberAll)*100
    return val
}






























