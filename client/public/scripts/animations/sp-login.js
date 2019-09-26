$(document).ready(() => {
    console.log("ready")

    $("#spSignin").click((e) => {
        e.preventDefault();

        console.log("Signin Atempt")
        window.open('../../views/sp-dashboard.html', '_self')
    })
})