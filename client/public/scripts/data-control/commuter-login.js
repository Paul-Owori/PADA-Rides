$(document).ready(() => {
    console.log("Commmuter Login data gathering Ready")

    //Login section
    $('#commuterSignin').click((e) => {
        e.preventDefault();

        let loginEmail = $('#emailLogin').val();
        let loginPassword = $('#passwordLogin').val();
        console.log("Email", loginEmail);
        console.log("Password", loginPassword)

        // Function to attempt login

    })



    //Signup Section
    $('#createCommuter').click((e) => {
        e.preventDefault();

        let firstName = $('#').val();
        let lastName = $('#').val();
        let password = $('#').val();
        let email = $('#').val();
        let phoneNumber = $('#').val();
        let pwdStatus = $('#').val();
        let phsicalImpairment = $('#').val();
        let visualImpairment = $('#').val();
        let hearingImpairment = $('#').val();





        console.log("Creating...")
    })

})