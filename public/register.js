// async function register() {
//     let response = await fetch('/register', {
//         method: "POST",
//         body: body
//     })





//     console.log(await response.json())
    
// }

let form = document.querySelector('#register');
form.onsubmit = async (e)=>{
    e.preventDefault();

    let formObj = {

        "username":form.username.value,
        "password":form.password.value,
        "password2":form.password2.value,
        "email":form.email.value
    }
    console.log(formObj);

    const res = await fetch('/register',{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify(formObj),

    });
    console.log(res);

    if(res.status === 401){
        await Swal.fire({
            icon:"warning",
            text:"missing username"
        })
        return
    }else if(res.status === 402){
       await Swal.fire({
            icon:"warning",
            text:"missing password"
        })
        return
    }else if(res.status === 403){
      await  Swal.fire({
            icon:"warning",
            text:"Email is required"
        })
        return
    }else if(res.status === 405){
       await Swal.fire({
            icon:"warning",
            text:"Password not match!!"
        })
        return
    }else if(res.status === 406){
        await Swal.fire({
            icon:"warning",
            text:"Password should be at least 6 digitals"
        })
        return
    }else if (res.status === 500){
       await Swal.fire({
            icon:"warning",
            text:"Internal Server Error!!"
        })
        return
    }else if(res.status === 407){
        await Swal.fire({
            icon:"warning",
            text:"Your Email is already registered"
        })
        return
    
    }else {
        await Swal.fire({
            icon:"success",
            text:"Your Account is Ready!!!"
            
        })
        return window.location.href = "/login.html"
    }
    

}



    

    


