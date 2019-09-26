$(document).ready(() => {
    console.log("ready")

    $("#commuterSignin").click((e) => {
        e.preventDefault();

        console.log("Signin Atempt")
        window.open('../../views/commuter-dashboard.html', '_self')
    })
})