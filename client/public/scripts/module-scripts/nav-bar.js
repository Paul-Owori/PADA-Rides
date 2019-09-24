$(document).ready(() => {

    let toggleStatus = false

    $('.nav-ham').click(() => {
        console.log("You clicked and toggle status is ", toggleStatus)
        if (toggleStatus === false) {
            console.log("Toggle was false")

            $('div').removeClass('.nav-hidden').addClass('.nav-visible')
        } else if (toggleStatus === true) {
            console.log("Toggle was true")
            $('div').removeClass('.nav-visible').addClass('.nav-hidden')
        };
        toggleStatus = !toggleStatus
    })
})