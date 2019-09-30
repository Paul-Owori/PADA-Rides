//Before document is ready, insert the user data
let loggedInSp = JSON.parse(sessionStorage.getItem("sp"));
let clients = JSON.parse(sessionStorage.getItem("clients"));
let client = JSON.parse(sessionStorage.getItem("client"));

//console.log()

if (loggedInSp !== null) {
    $("#pageHeader").replaceWith(
        `<h2 class="trip-red-color center-content" id="pageHeader">Welcome ${loggedInSp.firstName}! </h2>`
    );

    if (loggedInSp.currentAvailability === true) {
        $("#availableToggle").prop("checked", true);
    }
}

let modifySpObject = (key, value) => {
    loggedInSp[`${key}`] = value;
    sessionStorage.setItem("sp", JSON.stringify(loggedInSp));
};

let modifyClientsObject = (newObject) => {

    sessionStorage.setItem("clients", JSON.stringify(newObject));
};

let clientSearch;

// After document is ready
$(document).ready(() => {
    // Handling service provider availability
    let currentAvailability;
    if (loggedInSp.currentAvailability !== false) {
        currentAvailability = true;
    } else {
        currentAvailability = false;
    }
    $("#availableToggle").click(() => {
        currentAvailability = !currentAvailability;

        fetch(`/sps/${loggedInSp._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    currentAvailability
                })
            })
            .then(response => {
                return response.json();
            })
            .then(response => {
                if (response.status !== 200) {
                    alert(`Error toggling availability, ${response.message}`);
                } else {
                    console.log(response);
                    modifySpObject("currentAvailability", currentAvailability);
                }
            });



        const searchForClients = () => {
            fetch('/commuters/available')

                .then(response => {
                    return response.json
                })
                .then(response => {
                    if (response.status !== 200) {
                        console.log("No clients available")
                    } else {
                        modifyClientsObject(response)

                    }
                })
                .catch(err => console.error('Error with fetch request: ', err))

        }

        //5d8db9b49c8f7e17c87ff95b



        if (currentAvailability === true) {
            clientSearch = setInterval(searchForClients, 5000)
        } else if (currentAvailability === false) {
            console.log("Stopping client search")
            clearInterval(clientSearch)
        }


        // 
    });

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
    $("#sendText").click(() => {
        let textMessage = $("#inputMsg").val();
    });
});