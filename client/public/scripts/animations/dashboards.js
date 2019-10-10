$(document).ready(() => {


    $('#textDropdown').click(() => {
        $('.text-box').slideToggle()
    });

    $('#ongoingDropdown').click(() => {
        $('.trip-details').slideToggle()
    })


    $('#showOngoingTrip').click(() => {
        $('.mid-content').fadeToggle("fast", () => {
            $('.right-content').fadeToggle("fast")
        })
    })

    //ongoingDropdown
    //trip-details

    $('#openAdvance').click(() => {
        $('#nowRide').fadeToggle("fast", () => {
            $('#advanceRide').fadeToggle("fast")
        })

    })

    $('#openNow').click(() => {
        $('#advanceRide').fadeToggle("fast", () => {
            $('#nowRide').fadeToggle("fast")
        })

    })

    $('#tripNow').click(() => {
        $('#nowRide').fadeToggle("fast", () => {
            $('#findingRider').fadeToggle("fast")
        })
    })

    $('#acceptTrip').click(() => {

        $('#clientsCard').fadeToggle("fast", () => {
            console.log("revealing")
            $('#directionsCard').fadeToggle("fast")
        })
    })

    $('#cancelTrip').click(() => {
        $('#directionsCard').fadeToggle("fast", () => {
            console.log("revealing")
            $('#clientsCard').fadeToggle("fast")
        })

    })

    $('#arrivedTrip').click(() => {
        // arrivedTrip startTrip endTrip
        $('#cancelTrip').fadeToggle("fast", () => {
            $('#arrivedTrip').fadeToggle("fast", () => {
                $('#startTrip').fadeToggle("fast")
            })
        })


        //$('#').fadeToggle("fast")
    })

    $('#startTrip').click(() => {
        $('#startTrip').fadeToggle("fast", () => {
            $('#endTrip').fadeToggle("fast")
        })

    })
})