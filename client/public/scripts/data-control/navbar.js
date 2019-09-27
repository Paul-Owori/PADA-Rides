$(document).ready(() => {

    $('#logoutBtn').click(() => {
        let loggedInSp = JSON.parse(sessionStorage.getItem('sp'));
        let loggedInCommuter = JSON.parse(sessionStorage.getItem('commuter'));

        if (loggedInSp !== null) {
            sessionStorage.removeItem('sp')
        }
        if (loggedInCommuter !== null) {
            sessionStorage.removeItem('commuter')
        }

        window.open('../../index.html', '_self')
    })
})