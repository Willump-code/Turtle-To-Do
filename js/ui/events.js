import { state } from '../data/state.js';
import {logicSaveGroupTasks, logicSaveTab} from '../logic/logic.js'
import {addTabBtn, removeTabBtn, listTabs, formTask, checkboxTask, listTasks} from './elements.js'
import {renderTab, paintTab, removeTab, renderTask, throughTask, noThroughTask, removeTask, renderGroupTask, removeGroupTasks, removeContent, addContent} from './render.js'



export function setupEventsTab(){
    addTabBtn.addEventListener('click', ()=>{
        const res = prompt('Добавить список');
        if (res) {
            let tab = logicSaveTab(res);
            listTasks.innerHTML = ''
            renderTab(tab.id, tab.name)
        }                
        if(state.tabs.length != 0){
            addContent()
        }
    })
    listTabs.addEventListener('click', paintTab)
    listTabs.addEventListener('click', ()=>{renderGroupTask(document.querySelector('.tabs_btn.active').dataset.id)})


    removeTabBtn.addEventListener('click', removeGroupTasks)
    removeTabBtn.addEventListener('click', removeTab)
    removeTabBtn.addEventListener('click', ()=>{
        if (document.querySelector('.tabs_btn.active')) {
            renderGroupTask(document.querySelector('.tabs_btn.active').dataset.id)
        }    
        if(state.tabs.length == 0){
            removeContent()
        }
    })
}


export function setupEventsTask(){
    formTask.addEventListener('submit', (event) => {
        event.preventDefault()
        if (formTask.querySelector('.list-body_add-input').value) {
            const textForm = formTask.querySelector('.list-body_add-input').value
            const idGroup = document.querySelector('.tabs_btn.active').dataset.id
            if (idGroup) {
                let task = logicSaveGroupTasks(idGroup, textForm)
                renderTask(task.id, textForm, idGroup, task.isChecked)
                formTask.reset()
            }
            
        }
    })
    listTasks.addEventListener('change', (event)=>{
        const text = event.target.closest('.list-body_item').querySelector('.list-body_task-text')
        const idEl = event.target.closest('.list-body_item').dataset.id
        if (event.target.checked) {
            throughTask(text, idEl)
        }else{
            noThroughTask(text, idEl)
        }
        

    })
    listTasks.addEventListener('click', (event)=>{
        if (event.target.closest('.list-body_close')) {
            removeTask(event.target.closest('.list-body_item'))
        }
    })
}


export function setupLoadDocument(){
    window.addEventListener('load', ()=>{
        if(state.tabs.length == 0){
            removeContent()
        }
    })
}