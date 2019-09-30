$(document).ready(() => {
    $("#logoutBtn").click(() => {
        let loggedInSp = JSON.parse(sessionStorage.getItem("sp"));
        let loggedInCommuter = JSON.parse(sessionStorage.getItem("commuter"));
        let availableClients = JSON.parse(
            sessionStorage.getItem("availableClients")
        );

        if (loggedInSp !== null) {
<<<<<<< HEAD
            sessionStorage.removeItem('sp')
            window.open('../../views/sp-login.html', '_self')
        }
        if (loggedInCommuter !== null) {
            sessionStorage.removeItem('commuter')
            window.open('../../views/commuter-login.html', '_self')
        } else {
            window.open('../../index.html', '_self')
        }


    })

})
=======
            fetch(`/sps/${loggedInSp._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ currentAvailability: false })
            })
                .then(response => {
                    return response.json();
                })
                .then(response => {
                    if (response.status !== 200) {
                        alert(
                            `Error toggling availability, ${response.message}`
                        );
                    } else {
                        alert(`Logout successful `);
                        console.log(response);
                        sessionStorage.removeItem("sp");
                        sessionStorage.removeItem("availableClients");
                        window.open("../../views/sp-login.html", "_self");
                    }
                });
        } else if (loggedInCommuter !== null) {
            sessionStorage.removeItem("commuter");
            window.open("../../views/commuter-login.html", "_self");
        } else {
            window.open("../../index.html", "_self");
        }
    });
});
>>>>>>> 080aeb4165cd79d945d54729acd273949d1f691b
