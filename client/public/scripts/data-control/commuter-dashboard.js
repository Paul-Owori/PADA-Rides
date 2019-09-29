//pageHeader

//Before document is done loading, insert the user data
let loggedInCommuter = JSON.parse(sessionStorage.getItem("commuter"));
let commuter_id;
let sp_id;

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

//function for searching for service providers
let findSp = () => {
    console.log("searching for sP's");
};

$(document).ready(() => {
    console.log("dashboard data gathering Ready");

    // Requesting for a trip now
    $("#tripNow").click(() => {
        let pickUp = $("#pickUp").val();
        let destination = $("#destination").val();
        let advanceBooking = false;

        let newTrip = { pickUp, destination, commuter_id, advanceBooking };

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
                    console.log("Response==>>", response);
                    findSp();
                }
            });

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
        let textMessage = { text: $("#inputMsg").val(), senderID: commuter_id };
        message.messageThread.push(textMessage);
        message.message;
    });
});
