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

        let firstName = $('#firstName').val();
        let lastName = $('#lastName').val();
        let password = $('#password1').val();
        let email = $('#email').val();
        let phoneNumber = $('#phoneNumber').val();
        let pwdStatus = $("input[name='pwdCheck']:checked").val();
        let phsicalImpairment = $('#physical').find(":selected").text();
        let visualImpairment = $('#visual').find(":selected").text();
        let hearingImpairment = $('#hearing').find(":selected").text();


    })

})