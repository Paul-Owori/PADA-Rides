//pageHeader

//Before document is done loading, insert the user data
let loggedInCommuter = JSON.parse(sessionStorage.getItem("commuter"));
let commuter_id;
let currentSp = {};
let currentTrip;

if (loggedInCommuter !== null) {
    commuter_id = loggedInCommuter._id;
    $("#pageHeader").replaceWith(
        `<h2 class="trip-red-color center-content" id="pageHeader">Welcome ${loggedInCommuter.firstName}! </h2>`
    );
}



//Create message object for dealing with text messages
let currentTextMessage = JSON.parse(sessionStorage.getItem("message"));
let message;
if (currentTextMessage !== null) {
    message = currentTextMessage;
} else {
    message = {
        commuter_id,
        messageThread: []
    };
}

// Function to show ongoing trip details

let showTripDetails = () => {
    fetch(`/sps/${currentSp._id}`)

        .then(response => {
            return response.json()
        })
        .then(response => {
            currentSp = response
            return currentSp
        })
        .then((currentSp) => {
            console.log("This is your sp", currentSp)
            //JQuery to replace the necessary fields
            //
            /**spNames
            spVehicleType
            spNumberplate
            tripPriceEst
            tripPickup
            spPhoneNumber
            tripDropOff */

            $('#spNames').replaceWith(`<span class="detail" id="spNames">${currentSp.firstName + " " + currentSp.lastName}</span>`)
            $('#spVehicleType').replaceWith(`<span class="detail" id="spVehicleType">${currentSp.vehicle.vehicleType}</span>`)
            $('#spNumberplate').replaceWith(`<span class="detail" id="spNumberplate">${currentSp.vehicle.regNumber}</span>`)
            $('#tripPriceEst').replaceWith(`<span class="detail" id="tripPriceEst">${10000}</span>`)
            $('#tripPickup').replaceWith(`<span class="detail" id="tripPickup">${currentTrip.pickUp}</span>`)
            $('#spPhoneNumber').replaceWith(`<span class="detail" id="spPhoneNumber">${currentSp.phoneNumber}</span>`)
            $('#tripDropOff').replaceWith(`<span class="detail" id="tripDropOff">${currentTrip.destination}</span>`)

            $('#showOngoingTrip').click()
        })
        .catch(err => console.error('Error with fetch request: ', err))

}



//let currentSp;
//function for searching for service providers
// let spFinder = () => {
//     fetch(`/trips/sp-find/${currentTrip._id}`)

//         .then(response => {
//             return response.json()
//         })
//         .then(response => {
//             if (response.status !== 200) {
//                 console.log(`Status:${response.status}, No sps available`)
//             } else {
//                 console.log("A service provider was found", response.trip);
//                 currentSp._id = response.trip.sp_id
//                 showTripDetails()


//             }
//         })
//         .catch(err => console.error('Error with fetch request: ', err))

// }

let count = 0
let findSp = (endTripParameter) => {
    console.log("Finding sp")

    let spSearcher = setInterval(() => {
        fetch(`/trips/sp-find/${currentTrip._id}`)

            .then(response => {
                return response.json()
            })
            .then(response => {
                count += 1
                if (count === 60) {
                    clearInterval(spSearcher);
                    alert("No service providers are available at the moment. Please try again later")
                    console.log("No service providers are available at the moment. Please try again later")
                    sessionStorage.removeItem('trip');
                    currentTrip = {};
                    return
                }
                if (response.status !== 200) {
                    console.log(`Status:${response.status}, No sps available`)
                } else {
                    console.log("A service provider was found", response.trip);
                    currentSp._id = response.trip.sp_id
                    showTripDetails()
                    clearInterval(spSearcher);

                }
            })
            .catch(err => console.error('Error with fetch request: ', err))

    }, 3000);



};



$(document).ready(() => {
    console.log("dashboard data gathering Ready");

    // Requesting for a trip now
    $("#tripNow").click(() => {
        let pickUp = $("#pickUp").val();
        let destination = $("#destination").val();
        let advanceBooking = false;

        let newTrip = {
            pickUp,
            destination,
            commuter_id,
            advanceBooking
        };

        //findSp();
        //Send new trip object to backend
        fetch("/trips/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTrip)
            })
            .then(response => {
                return response.json();
            })
            .then(response => {
                if (response.status !== 201) {
                    console.log("There was an error making the trip", response);
                } else {
                    currentTrip = response.trip
                    sessionStorage.setItem('trip', currentTrip)
                    return currentTrip

                }
            }).then(currentTrip => {
                    console.log("Trip", currentTrip)

                    findSp();
                }

            )

        // console.log("User", commuter_id);
        // console.log("Pickup", pickUp);
        // console.log("Destination", destination);
    });

    // Booking a trip in advance
    $("#tripBook").click(() => {
        let pickUp = $("#pickUpAdvance").val();
        let destination = $("#destinationAdvance").val();
        let dateDay = $("#dateDay").val();
        let dateMonth = $("#dateMonth").val();
        let timeHrs = $("#dateHrs").val();
        let timeMins = $("#dateMins").val();
    });

    // Sending a text
    $("#sendText").click(() => {
        let textMessage = {
            text: $("#inputMsg").val(),
            senderID: commuter_id
        };
        message.messageThread.push(textMessage);
        message.message;
    });


    // Show an ongoing trip

});