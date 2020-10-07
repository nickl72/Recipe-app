const editButtons = document.querySelectorAll('.edit');

function edit(event) {
    // find review to edit
    const editClass = event.target.classList.value.split(' ').find(htmlClass => {
        return htmlClass.startsWith("review");
    });
    const reviewId = editClass.split('-')[1];
    const reviewList = document.querySelectorAll(`.${editClass}`)[0];

    // create edit form
    const editForm = document.createElement('form');
    editForm.action = `/review/${reviewId}?_method=PUT`;
    editForm.method = 'POST';

    // create and populate review input box
    const p = reviewList.querySelector('p');
    const review = document.createElement('input');
    review.type = "text";
    review.name = "review";
    review.value = p.innerText;
    editForm.innerText = ("Review: ");
    editForm.appendChild(review);

    const ratingP = document.createElement('p');
    ratingP.innerText = 'Rating: '
    editForm.appendChild(ratingP)

    // create and populate rating input box
    const rating = document.createElement('input');
    rating.type = "number";
    rating.name = "rating";
    rating.min = '0';
    rating.max = '5';
    rating.value = reviewList.querySelector('h4').innerText.split(' ').reverse()[1];
    editForm.appendChild(rating);

    // Create submit button
    const submit = document.createElement('input');
    submit.type = "submit";
    submit.value = "Edit Review";
    editForm.appendChild(submit);
    


    reviewList.innerHTML = '';
    reviewList.appendChild(editForm)

}

editButtons.forEach(button => {
    button.addEventListener('click', edit);
})

