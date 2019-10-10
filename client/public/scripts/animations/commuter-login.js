$(document).ready(() => {
    console.log("ready")

    $(".open-signup").click((e) => {

        $('#logIn').fadeToggle("fast", () => {
            $('#signUp').fadeToggle("fast")
        })

    })


    $(".open-login").click((e) => {

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