$(document).ready(() => {
    console.log("ready")

    $(".open-signup").click((e) => {
        e.preventDefault();

        //console.log("Signin Atempt")
        // window.open('../../views/commuter-dashboard.html', '_self')

        // $('#signUp').css("display", "initial")

        $('#logIn').fadeToggle("fast", () => {
            $('#signUp').fadeToggle("fast")
        })

    })


    $(".open-login").click((e) => {
        e.preventDefault();

        //console.log("Signin Atempt")
        // window.open('../../views/commuter-dashboard.html', '_self')

        // $('#signUp').css("display", "initial")

        $('#signUp').fadeToggle("fast", () => {
            $('#logIn').fadeToggle("fast")
        })

    })

    $('#pwdTrue').click(() => {

        $('.pwd-status-wrapper').slideDown()
    })

    $('#pwdFalse').click(() => {

        $('.pwd-status-wrapper').slideUp()
    })



})