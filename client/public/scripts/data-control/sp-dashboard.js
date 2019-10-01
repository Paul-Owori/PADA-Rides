//Before document is ready, insert the user data
let loggedInSp = JSON.parse(sessionStorage.getItem("sp"));
let clients = [];
let currentClient = JSON.parse(sessionStorage.getItem("currentClient"));
let clientChosen = false;

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

let testRun = (stringReceived) => {
    console.log(`This is the string => ${stringReceived}`);
};

let modifyClientsObject = (newObject) => {
    let editedArray = []
    newObject.forEach(objectToCheck => {

        let repeatedObject = clients.filter(clientObject => {
            return clientObject._id === objectToCheck._id
        });

        if (repeatedObject.length === 0) {
            editedArray.push(objectToCheck)
        }
    })

    //sessionStorage.setItem("clients", newObject);
    clients = [...clients, ...editedArray];
};

let acceptClient = (tripID) => {
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
            console.log(response)
            alert(response)
            if (response.status !== 200) {
                alert(`Error accepting client, ${response.message}`);
            } else {
                console.log('Success message?', response);

            }
        }).catch(err => {
            console.error("There was an error with accepting the client=>" + err)
        });
}

let clientSearch;

let showAvailableClients = () => {
    console.log("Showing clients")
    $('#fillerClient').remove()
    console.log("Entered the function")
    clients.forEach(potentialTrip => {

        if (!potentialTrip.included) {
            fetch(`/commuters/${potentialTrip.commuter_id}`)

                .then(response => {
                    console.log("Fetch started")
                    return response.json()
                })
                .then(potentialClient => {
                    console.log("Appending work", potentialClient)


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
                            class="detail">${potentialTrip.dateOfTrip}
                        </span></div>

                </div>

            </div>
            <span class="add-trip-btn" id="${potentialTrip._id}">
                Accept Request <i class="add-trip-plus fas fa-plus-circle"></i>
                <script>
                let tripID = "${potentialTrip._id}";
                console.log(tripID);
                $('#${potentialTrip._id}').on("click",()=>{alert("Starting accept attempt");
                acceptClient(tripID)});
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
                if (clientChosen === true) {
                    console.log("stopping client search")
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
                                modifyClientsObject(response.clients);
                                showAvailableClients();



                            }
                        })
                        .catch(err => console.error('Error with fetch request: ', err))
                }

            }, 5000)
        } else if (currentAvailability === false) {
            console.log("Stopping client search")
            clearInterval(clientSearch)
        }


        // 
    });

    //Accept request, get customer details
    $('#acceptTrip').click(() => {
        clientChosen = true;
        let tripId = "";
    })

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