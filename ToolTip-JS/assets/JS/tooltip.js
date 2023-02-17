
// events
window.addEventListener('load', () => {   // We should write this function to run the code properly
    createToolTipEvent()

})


// functions

function createToolTipEvent() {
    let toolTips = document.querySelectorAll('[data-toggle="tooltip"]')

    toolTips.forEach(t => {
        t.addEventListener('mouseenter', toolTipMouseEnter)                                               // Element.getBoundingClientRect() metodu elementin rectTangle məlumatlarını verir (Width, height, position x, y, left, right, top, bottom)

        t.addEventListener('mouseleave', toolTipMouseLeave)
    })
}

function toolTipMouseEnter() {
    let toolTipDiv = document.createElement('div')

    toolTipDiv.classList.add('my-toolTip')

    let placement = this.dataset.placement
    if (placement != undefined || (placement != 'top' && placement != 'right' && placement != 'bottom' && placement != 'left')) {
        placement = 'top'
    }

    toolTipDiv.classList.add(this.dataset.placement)
    toolTipDiv.innerText = this.getAttribute('title')

    document.body.append(toolTipDiv)     // body'ə append etmək üçün 'document.body.append()' yazmalıyam

    let p = getPosition(this.dataset.placement, this.getBoundingClientRect(), toolTipDiv.getBoundingClientRect())  // Funksiyanı aşağıda qurdum və bu sətirdə çağırdım

    toolTipDiv.style.top = p.top
    toolTipDiv.style.left = p.left
}

function toolTipMouseLeave() {
    let tooltip = document.body.querySelector('.my-toolTip')

    if (tooltip != null) {
        tooltip.remove()
    }
}

function getPosition(placement, rect, toolTipRect) {    // Mənə iki ədəd məlumat qaytarır. Placement(topç leftç rigt yoxsa bottomdımı deyə). Digəridə rectTangle məlumatlarını verəcək
    
    let position = {         // rect buttonun size'ni verəcək, toolTipRect isə create etdiyimiz tooltip'in sizeni verəcək
        top: '0px',
        left: '0px',
    }

    toolTipRect.border = 5

    console.log(rect);

    // let toolTipRect = {
    //     // width: 105.14,
    //     height: 31,      // The height of toolTip which appear when we hover on button
    //     border: 5,       // The height of toolTip's triangle 
    // }

    switch(placement) {
        case 'top':
            position.top = (rect.top - toolTipRect.height - toolTipRect.border) + 'px';   // ToolTipin buttonun üzərinə tam gəlməsi üçün buttonun öz hündürlüyündən tooltipin hündürlüyünü və tooltipin triangle'nin borderinin hündürlüyünü çıxdım
            position.left = (rect.left + ((rect.width - toolTipRect.width) / 2)) + 'px';
            break;
        case 'left':
            position.top = (rect.top + ((rect.height - toolTipRect.height) / 2)) + 'px';   
            position.left = (rect.left - toolTipRect.width - toolTipRect.border) + 'px';
            break;
        case 'right':
            position.top = (rect.top + ((rect.height - toolTipRect.height) / 2)) + 'px';   
            position.left = (rect.right + toolTipRect.border) + 'px';
            break;
        case 'bottom':
            position.top = (rect.bottom + toolTipRect.border) + 'px';   
            position.left = (rect.left + ((rect.width - toolTipRect.width) / 2)) + 'px';
            break;
        default:
            break
    }

    return position;
}