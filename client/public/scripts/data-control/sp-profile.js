//Before document is ready, insert the user data
let loggedInSp = JSON.parse(sessionStorage.getItem("sp"));

//console.log()

if (loggedInSp !== null) {
    console.log("Logged in sp", loggedInSp);

    $("#firstName").val(loggedInSp.firstName);
    $("#lastName").val(loggedInSp.lastName);
    $("#email").val(loggedInSp.email);
    $("#phoneNumber").val(loggedInSp.phoneNumber);
    $("#bio").val(loggedInSp.bio);
}

let modifySpObject = (key, value) => {
    loggedInSp[`${key}`] = value;
    sessionStorage.setItem("sp", JSON.stringify(loggedInSp));
};

$(document).ready(() => {
    // Handling image uploads

    //Handling submitting details
    $("#saveChanges").click(() => {
        let firstName = $("#firstName").val();
        let lastName = $("#lastName").val();
        let email = $("#email").val();
        let phoneNumber = $("#phoneNumber").val();
        let bio = $("#bio").val();

        let updatedSP = { firstName, lastName, email, phoneNumber, bio };
        console.log("SP to update", updatedSP);

        fetch(`/sps/${loggedInSp._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedSP)
        })
            .then(response => {
                return response.json();
            })
            .then(response => {
                if (response.status !== 200) {
                    alert(`Error updating sp, ${response.message}`);
                } else {
                    console.log(response);

                    const entries = Object.entries(updatedSP);
                    for (const [key, value] of entries) {
                        modifySpObject(key, value);
                    }
                }
            });
    });
});
