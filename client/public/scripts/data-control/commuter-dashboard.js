$(document).ready(() => {
    console.log("dashboard data gathering Ready")

    // Requesting for a trip now
    $('#tripNow').click(() => {
        let pickupLocation = $('#pickUp').val();
        let destination = $('#destination').val();


    })

    // Booking a trip in advance
    $('#tripBook').click(() => {
        let pickupLocation = $('#pickUpAdvance').val();
        let destination = $('#destinationAdvance').val();
        let dateDay = $('#dateDay').val();
        let dateMonth = $('#dateMonth').val();
        let timeHrs = $('#dateHrs').val();
        let timeMins = $('#dateMins').val();
    })

    // Sending a text
    $('#sendText').click(() => {
        let textMessage = $('#inputMsg').val();
    })
})