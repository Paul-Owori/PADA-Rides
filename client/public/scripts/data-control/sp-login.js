$(document).ready(() => {


    // Login
    $('#spSignin').click((e) => {
        e.preventDefault();

        let email = $('#email').val();
        let password = $('#password').val();

        let sp = {
            email,
            password
        };


        fetch("/sps/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sp)
            })
            .then(response => {
                //console.log("Response received", response.json())
                return response.json();
            })
            .then(response => {
                console.log(response)
            })



    })


    // Signup
    $('#create').click((e) => {
        e.preventDefault();

        let firstName = $('#firstName').val();
        let lastName = $('#lastName').val();
        let email = $('#emailAddress').val();
        let phoneNumber = $('#phoneNumber').val();
        let permitNumber = $('#permitNumber').val();
        let regNumber = $('#vehicleReg').val();
        let password1 = $('#password1').val();
        let password2 = $('#password2').val();
        let trainedCheck = $("input[name='trainedCheck']:checked").val();
        let vehicleType = $('#vehicleType').find(":selected").text();

        let vehicle = {
            vehicleType,
            regNumber,
            modified: (vehicleType === "Modified Car (Equipped with ramp)" || vehicleType === "Modified Motorcycle (3+ Wheels)" ? true : false)
        }


        if (password1 && password1 === password2) {
            let sp = {
                firstName,
                lastName,
                email,
                phoneNumber,
                permitNumber,
                pwdTrained: trainedCheck === "true" ? true : false,
                vehicle,
                password: password2
            }

            fetch("/sps/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(sp)
                })
                .then(response => {
                    return response.json();
                })
        }






    })
})