//Before document is ready, insert the user data
let loggedInSp = JSON.parse(sessionStorage.getItem('sp'))

//console.log()

if (loggedInSp !== null) {
    $('#firstName').replaceWith(`<input type="text" placeholder="${loggedInSp.firstName}" id="firstName">`)
    $('#lastName').replaceWith(`<input type="text" placeholder="${loggedInSp.lastName}" id="firstName">`)
    $('#email').replaceWith(`<input type="text" placeholder="${loggedInSp.email}" id="firstName">`)
    $('#phoneNumber').replaceWith(`<input type="text" placeholder="${loggedInSp.phoneNumber}" id="firstName">`)

}

$(document).ready(() => {
    // Handling image uploads


    //Handling submitting details
    $('#saveChanges').click(() => {

        let firstName = $('#firstName').val();
        let lastName = $('#lastName').val();
        let email = $('#email').val();
        let phoneNumber = $('#phoneNumber').val();
        let bio = $('#bio').val();



    })
})