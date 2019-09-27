//Before document is ready, insert the user data
let loggedInCommuter = JSON.parse(sessionStorage.getItem('commuter'))

//console.log()

if (loggedInCommuter !== null) {
    $('#firstName').replaceWith(`<input type="text" placeholder="${loggedInCommuter.firstName}" id="firstName">`)
    $('#lastName').replaceWith(`<input type="text" placeholder="${loggedInCommuter.lastName}" id="firstName">`)
    $('#email').replaceWith(`<input type="text" placeholder="${loggedInCommuter.email}" id="firstName">`)
    $('#phoneNumber').replaceWith(`<input type="text" placeholder="${loggedInCommuter.phoneNumber}" id="firstName">`)

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