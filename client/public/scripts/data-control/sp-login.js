$(document).ready(() => {


    // Login
    $('#spSignin').click((e) => {
        e.preventDefault();

        let emailAddress = $('#email').val();
        let password = $('#password').val();

    })


    // Signup
    $('#create').click((e) => {
        e.preventDefault();

        let firstName = $('#firstName').val();
        let lastName = $('#lastName').val();
        let emailAddress = $('#emailAddress').val();
        let phoneNumber = $('#phoneNumber').val();
        let permitNumber = $('#permitNumber').val();
        let vehicleReg = $('#vehicleReg').val();
        let password1 = $('#password1').val();
        let password2 = $('#password2').val();
        let trainedCheck = $("input[name='trainedCheck']:checked").val();
        let vehicleType = $('#vehicleType').find(":selected").text();





    })
})