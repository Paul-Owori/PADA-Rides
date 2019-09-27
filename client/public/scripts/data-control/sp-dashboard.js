$(document).ready(() => {

    // Handling service provider availability
    let currentAvailability = false;
    $('#availableToggle').click(() => {

        currentAvailability = !currentAvailability;

        // Use currentAvailability as the value to send.
    })



    //Accept request, get customer details
    // $('#').click(() => {
    //     let tripId = "";
    // })


    //Handling starting trip
    // $('#startTrip').click(() => {
    //     let tripId = "";
    // })

    //Handling Ending trip
    // $('#endTrip').click(() => {
    //     let tripId = "";
    // })


    //Handling cancelling advance bookings
    // $('#').click(() => {
    //     let tripId = "";
    // })


    // Handling sending text messages
    // Sending a text
    $('#sendText').click(() => {
        let textMessage = $('#inputMsg').val();
    })

})