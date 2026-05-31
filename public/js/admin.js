const form = document.getElementById('cakeForm');

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const formData = new FormData(form);

    const response = await fetch('/add-cake', {

        method: 'POST',
        body: formData

    });

    const result = await response.text();

    alert(result);

    form.reset();

});