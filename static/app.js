(async function () {
    /* Declaring variables */
    const listCupcakes = $('#cupcakes-list');
    const formCupcakes = $('#cupcakes-form');
    const baseurl = '/api/cupcakes';


    /* Loops through cupcakes displaying each one */
    async function showCupcakes() {
        // Empty list
        listCupcakes.html('');

        // Fetch cupcakes and display each one
        const cupcakes = await fetchAllCupcakes();
        for (const cupcake of cupcakes) {
            const newli = $(`<li id='${cupcake.id}'>${cupcake.flavor}, ${cupcake.size}, ${cupcake.rating}</li>`)
            const newImage = $(`<img src='${cupcake.image}' alt='' class='img-thumbnail mx-4'>`)
            newImage.css('width', '100px')
            newli.prepend(newImage);
            listCupcakes.append(newli);
        }
    }

    /* Queries the API to get cupcakes and adds to page */
    async function fetchAllCupcakes() {
        const res = await axios.get(baseurl);
        return res.data.cupcakes;
    }

    /* Post method till API, adds cupcake */
    async function createCupcakes(flavor, size, rating, image) {
        const res = await axios.post(baseurl, {
            flavor: flavor,
            size: size,
            rating: rating,
            image: image
        });
        return res.data.cupcakes;
    }

    /* Handle submission of new cupcakes */
    formCupcakes.on('submit', async e => {
        e.preventDefault();

        const flavor = $('#flavor').val();
        const size = $('#size').val();
        const rating = $('#rating').val();
        let image = $('#image').val();

        if (image) {
            // Create cupcakes with custom img
            await createCupcakes(flavor, size, rating, image);
        } else {
            // Create cupcakes with default img
            image = 'https://tinyurl.com/demo-cupcake'
            await createCupcakes(flavor, size, rating, image);
        }

        await showCupcakes();

        // Reset form values
        $('input').val('');
    })

    await showCupcakes();

})();

