//Before document is ready, insert the user data
let loggedInSp = JSON.parse(sessionStorage.getItem("sp"));
let clients = [];
let currentClient = JSON.parse(sessionStorage.getItem("currentClient"));
let clientChosen = false;
let chosenTrip = {};
let potentialTrips = [];
let potentialClients = [];
let chosenClient = {}

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

let modifyPotentialTrips = (newObject) => {
    let editedArray = []
    newObject.forEach(objectToCheck => {

        let repeatedObject = potentialTrips.filter(tripObject => {
            return tripObject._id === objectToCheck._id
        });

        if (repeatedObject.length === 0) {
            editedArray.push(objectToCheck)
        }
    })

    //sessionStorage.setItem("potentialTrips", newObject); clients
    potentialTrips = [...potentialTrips, ...editedArray];
};

let setChosenTrip = (tripID) => {

    // Retrieve trip details 
    chosenTrip = potentialTrips.filter(tripObject => {
        return tripObject._id === tripID
    })[0];

    // Retrieve client details
    chosenClient = potentialClients.filter(clientObject => {
        return clientObject._id === chosenTrip.commuter_id
    })[0];


    //Replace relevant fields in ongoing trip-card
    $('#clientName').html(`${chosenClient.firstName + " " + chosenClient.lastName }`);
    $('#clientNumber').html(`${chosenClient.phoneNumber}`);
    $('#clientDropOff').html(`${chosenTrip.destination}`);
    $('#clientPickUp').html(`${chosenTrip.pickUp}`);
    $('#tripPriceEst').html(`${10000}`);
    $('#tripDate').html(`${new Date(chosenTrip.dateOfTrip).toDateString()}`);


    //Toggle visibility of ongoing trip
    $('#clientsCard').fadeToggle("fast", () => {
        $('#directionsCard').fadeToggle("fast")
    });
    $("#availableToggle").click();

}

let acceptClient = (tripID, callBack) => {
    //alert("Starting accept attempt");
    let idToAdd = {
        sp_id: loggedInSp._id
    }

    fetch(`/trips/${tripID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                idToAdd
            )
        })
        .then(response => {
            return response.json();
        })
        .then(response => {
            //console.log(response)
            //alert(response)
            if (response.status !== 200) {
                //alert(`Error accepting client, ${response.message}`);
            } else {
                callBack()
                //showChosenTrip();

            }
        }).then((response) => {
            //console.log("Starting fade");

            //Show ongoing trip details


            //Stop searching for clients

        })
        .catch(err => {
            console.error("There was an error with accepting the client=>" + err)
        });
}

let clientSearch;

let showAvailableClients = () => {
    console.log("Showing clients")
    $('#fillerClient').remove()
    console.log("Entered the function")
    potentialTrips.forEach(potentialTrip => {
        //clients
        if (!potentialTrip.included) {
            fetch(`/commuters/${potentialTrip.commuter_id}`)

                .then(response => {
                    console.log("Fetch started")
                    return response.json()
                })
                .then(potentialClient => {
                    //console.log("Appending work", potentialClient)

                    potentialClients.push(potentialClient)

                    $('#clientDisplay').append(`
                    <!-- Client req-sample -->
                    <div class="client-req-wrapper">
                        <div class="client-req">
                        
                            <div class="client-img">

                                <img class="commuter-profile"
                                    src="https://images.pexels.com/photos/2918519/pexels-photo-2918519.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                    alt="">
                            </div>

                            <div class="client-details trip-red-color">
                                <div class="detail-wrapper"><span class="detail-label">Name:</span><span
                                        class="detail">${potentialClient.firstName + " " + potentialClient.lastName }
                                    </span></div>
                                <div class="detail-wrapper"><span class="detail-label">Pickup:</span><span
                                        class="detail">${potentialTrip.pickUp}</span></div>
                                <div class="detail-wrapper"><span class="detail-label">Dropoff:</span><span
                                        class="detail">${potentialTrip.destination}
                                    </span></div>
                                <div class="detail-wrapper"><span class="detail-label">Price est:</span><span
                                        class="detail">${10000}
                                        UGX</span></div>
                                <div class="detail-wrapper"><span class="detail-label">Date:</span><span
                                        class="detail">${  new Date(potentialTrip.dateOfTrip).toDateString()}
                                    </span></div>

                            </div>

                        </div>
                        <span class="add-trip-btn accept-trip-now" id="${potentialTrip._id}">
                            Accept Request <i class="add-trip-plus fas fa-plus-circle"></i>
                            <script>
                            
                            $('#${potentialTrip._id}').on("click",()=>{
                                
                                acceptClient("${potentialTrip._id}", ()=>{
                                    setChosenTrip("${potentialTrip._id}");
                                    });
                                });
                                

                            </script>
                        </span>
                    </div>`)

                })
                .catch(err => console.error('Error with fetch request: ', err))



        } else {
            console.log("No extra clients")
        }
        potentialTrip.included = "true";
    })
}


let showChosenTrip = () => {

    fetch(`commuters/${chosenTrip.commuter_id}`)
        .then((response) => {

        }).then((response) => {

        })


}

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




        //5d8db9b49c8f7e17c87ff95b



        if (currentAvailability === true) {

            clientSearch = setInterval(() => {
                //count += 1
                if (currentAvailability === false) {
                    console.log("Stopping client search")
                    clearInterval(clientSearch)
                } else {
                    fetch('/trips/client-search')

                        .then(response => {
                            return response.json()
                        })
                        .then(response => {

                            if (response.status !== 200) {
                                console.log(`Status:${response.status}, No clients available`)
                            } else {
                                console.log("clients were found", response);
                                modifyPotentialTrips(response.clients);
                                showAvailableClients();



                            }
                        })
                        .catch(err => console.error('Error with fetch request: ', err))
                }

            }, 5000)
        }


        // 
    });

    //Accept request, get customer details


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