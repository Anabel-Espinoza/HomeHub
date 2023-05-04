const logout = async () => {
    console.log('clicked')
    const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
        document.location.replace('/')
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#logout').addEventListener('click', logout)

// const dashboard = document.querySelector('.dashboard')
// const landlord = window.location.toString().includes('landlord')

// if (landlord) {
//     dashboard.setAttribute('href', '/landlord')
// } else {
//     dashboard.setAttribute('href', '/tenant')
// }