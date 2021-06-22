


async function logoutJS() {

    await fetch('/logout', {method:"POST"})
    await Swal.fire({
        icon:"success",
        title:"We are missing you~!!",
        text:"Logout Successfully"
    })

    
    window.location.href = '/'
    
    }