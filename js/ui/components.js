import {templateTab, listTabs, templateTask} from './elements.js'



export function createTab(idTab, resPrompt){
    const clone = templateTab.content.cloneNode(true)
    const cloneContent = clone.querySelector('.tabs_btn')
    cloneContent.textContent = `${resPrompt}`
    cloneContent.dataset.id = idTab
    const tabs = listTabs.querySelectorAll('.tabs_btn');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    cloneContent.classList.add('active');

    
    return clone
}

export function createTask(idTask, textTask, idGroup, isChecked){  
    const cloneTemplateTask = templateTask.content.cloneNode(true)
    const contentTemplateTask = cloneTemplateTask.querySelector('.list-body_task-text')
    const wrapTemplateTask = cloneTemplateTask.querySelector('.list-body_item')
    const chekTemplateTask = cloneTemplateTask.querySelector('.list-body_item-input')
    contentTemplateTask.textContent = `${textTask}`
    wrapTemplateTask.dataset.id = `${idTask}`
    wrapTemplateTask.dataset.idGroup = `${idGroup}`

    if (isChecked) {
        chekTemplateTask.checked = true
        contentTemplateTask.style.textDecoration = 'line-through'
    }else{
        chekTemplateTask.checked = false
        contentTemplateTask.style.textDecoration = 'none'
    }

    
    return cloneTemplateTask
}
























