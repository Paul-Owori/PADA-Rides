$(document).ready(() => {
    console.log("Commmuter Login data gathering Ready")

    //Login section
    $('#commuterSignin').click((e) => {
        e.preventDefault();

        let email = $('#emailLogin').val();
        let password = $('#passwordLogin').val();

        let commuter = {
            email,
            password
        };


        fetch("/commuters/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(commuter)
            })
            .then(response => {
                //console.log("Response received", response.json())
                // let responseObject = {
                //     status: response.status,
                //     data: response.json(),
                // }
                // return responseObject;

                return response.json()
            })
            .then(response => {
                if (response.message) {
                    alert("Error signing in, please try again")
                } else {
                    console.log(response)
                    sessionStorage.setItem('commuter', JSON.stringify(response));
                    window.open('../../views/commuter-dashboard.html', '_self')
                }

            })

    })



    //Signup Section
    $('#createCommuter').click((e) => {
        e.preventDefault();

        let firstName = $('#firstName').val();
        let lastName = $('#lastName').val();
        let password = $('#password1').val();
        let email = $('#email').val();
        let phoneNumber = $('#phoneNumber').val();
        let pwdStatus = $("input[name='pwdCheck']:checked").val();
        let physicalImpairment = $('#physical').find(":selected").text();
        let visualImpairment = $('#visual').find(":selected").text();
        let hearingImpairment = $('#hearing').find(":selected").text();

        let impairments = {
            physical: {
                crutch: physicalImpairment === "Crutches" ? true : false,
                wheelChair: physicalImpairment === "Wheelchair" ? true : false,
            },
            visual: {
                partial: visualImpairment === "Partial" ? true : false,
                total: visualImpairment === "Total" ? true : false,
            },
            hearing: {
                partial: hearingImpairment === "Partial" ? true : false,
                total: hearingImpairment === "Total" ? true : false,
            },
        }


        let newCommuter = {
            firstName,
            lastName,
            password,
            email,
            phoneNumber,
            impairments,
            pwdStatus: pwdStatus === "true" ? true : false
        }

        fetch("/commuters/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCommuter)
            })
            .then(response => {
                return response.json();
            })


    })

})