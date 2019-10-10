$(document).ready(() => {
    console.log("ready")

    // $("#spSignin").click((e) => {
    //     e.preventDefault();

    //     //Collectinng login information;
    //     let email = $('').val();
    //     let password = $('').val();

    //     console.log("Signin Atempt")
    //     window.open('../../views/sp-dashboard.html', '_self')
    // })


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
})