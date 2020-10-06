const editButtons = document.querySelectorAll('.edit');

function edit() {
    console.log('clicked')
}

editButtons.forEach(button => {
    button.addEventListener('click', edit);
})

