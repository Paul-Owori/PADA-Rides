$(document).ready(() => {

    $('#logoutBtn').click(() => {
        let loggedInSp = JSON.parse(sessionStorage.getItem('sp'));
        let loggedInCommuter = JSON.parse(sessionStorage.getItem('commuter'));

        if (loggedInSp !== null) {
            sessionStorage.removeItem('sp')
            window.open('../../views/sp-login.html', '_self')
        }
        if (loggedInCommuter !== null) {
            sessionStorage.removeItem('commuter')
            window.open('../../views/commuter-login.html', '_self')
        } else {
            window.open('../../index.html', '_self')
        }


    })

})