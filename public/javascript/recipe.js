const listItems = document.querySelectorAll('.name');

window.onload = function(listAdjust) {
    let maxWidth = 0;
    listItems.forEach(element => {
        if(element.offsetWidth>maxWidth) {
            maxWidth=element.offsetWidth
        }
    })
    maxWidth+=10;
    listItems.forEach(item => {
        item.style.width = `${maxWidth}px`
    })
}