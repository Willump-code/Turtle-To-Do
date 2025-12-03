import {setupEventsTab, setupEventsTask, setupLoadDocument} from './ui/events.js'
import {state} from './data/state.js'
import {renderGroupTask, renderTab} from './ui/render.js';


// генерация табов при загрузке страницы
state.tabs.forEach(i => {
    renderTab(i.id, i.name)
});

// генерация контента при загрузке страницы
if (document.querySelector('.tabs_btn.active')) {
    renderGroupTask(document.querySelector('.tabs_btn.active').dataset.id)
}


// события
setupLoadDocument()
setupEventsTab()
setupEventsTask()


