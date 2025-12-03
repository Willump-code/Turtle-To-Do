import {listTabs, listTasks, progressWrap, wrapTasks, container, progressBar} from './elements.js'
import {createTab, createTask} from './components.js'
import {loadTabs,loadGroupTasks , saveGroupTasks, saveTabs} from "../data/storage.js";
import {state} from "../data/state.js";
import { calculatioProgress } from '../logic/logic.js';



export function renderTab(idTab, resPrompt){
    const res = createTab(idTab, resPrompt)
    listTabs.append(res)   


    // обновление прогресс бара
    changeProgress(calculatioProgress())
}
export function paintTab(event){
    if(!event.target.closest('.tabs_btn')){
        return
    }
    const tabs = listTabs.querySelectorAll('.tabs_btn');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
}
export function removeTab(){
    const activeTab = listTabs.querySelector('.active')
    if (activeTab) {
        state.tabs = state.tabs.filter((x)=>{
            return x.id != activeTab.dataset.id
        })
        saveTabs(state.tabs)
        state.tabs = loadTabs()
        activeTab.remove()
        if ((listTabs.querySelectorAll('.tabs_btn'))[0]){
            Array.from(listTabs.querySelectorAll('.tabs_btn'))[0].classList.add('active')
        }
    }
}




export function throughTask(text, idEl){
    state.groupTasks.forEach(z => {
        if (z.idGroup == document.querySelector('.tabs_btn.active').dataset.id) {
            z.arrayTasks.forEach(x => {
                if (x.id == idEl) {
                    x.isChecked = true
                    
                }
            })   
        }
    })
    saveGroupTasks(state.groupTasks)
    text.style.textDecoration = 'line-through'


    // обновление прогресс бара
    changeProgress(calculatioProgress())
}
export function noThroughTask(text, idEl){
    state.groupTasks.forEach(z => {
        if (z.idGroup == document.querySelector('.tabs_btn.active').dataset.id) {
            z.arrayTasks.forEach(x => {
                if (x.id == idEl) {
                    x.isChecked = false
                }
            })   
        }
    })
    saveGroupTasks(state.groupTasks)
    text.style.textDecoration = 'none'


    // обновление прогресс бара
    changeProgress(calculatioProgress())
}
export function renderTask(idTask, textTask, idGroup, isChecked){    
    listTasks.append(createTask(idTask, textTask, idGroup, isChecked))


    // обновление прогресс бара
    changeProgress(calculatioProgress())
}
export function removeTask(task){
    
    const idGroup = document.querySelector('.tabs_btn.active').dataset.id
    task.remove()

    for (const i of state.groupTasks) {
        if (i.idGroup == idGroup) {
            i.arrayTasks = i.arrayTasks.filter(x =>{
                return x.id != task.dataset.id
            })
            
            saveGroupTasks(state.groupTasks)
            state.groupTasks = loadGroupTasks()
        }
    }    
    

    // обновление прогресс бара
    changeProgress(calculatioProgress())
}
export function renderGroupTask(idTab){
    if (idTab) {
        listTasks.innerHTML = ''
        state.groupTasks.forEach(x=>{
            if (x.idGroup == idTab) {            
                x.arrayTasks.forEach(z=>{
                    listTasks.append(createTask(z.id, z.name, idTab, z.isChecked))
                })
                
            }
        })   
    }
    

    // обновление прогресс бара
    changeProgress(calculatioProgress())
}
export function removeGroupTasks(){
    if (document.querySelector('.tabs_btn.active')) {
        const idGroup = document.querySelector('.tabs_btn.active').dataset.id
        state.groupTasks = state.groupTasks.filter(x => x.idGroup != idGroup);
        saveGroupTasks(state.groupTasks)
        state.groupTasks = loadGroupTasks()
    }

    // обновление прогресс бара
    changeProgress(calculatioProgress())
}




export function removeContent(){
    progressWrap.remove()
    wrapTasks.remove()
}   
export function addContent(){
    container.append(wrapTasks)
    container.append(progressWrap)
    
}   




export function changeProgress(val){
    if (val){
        progressBar.value = val
    }else{
        progressBar.value = 0
    }
}