const logout = async () => {
    console.log('clicked')
    const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })

    if(response.ok) {
        document.location.replace('/')
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#logout').addEventListener('click', logout)