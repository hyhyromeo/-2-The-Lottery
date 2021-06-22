//  $(function() {
//    $("form[name='login']").validate({
//      rules: {











//        username: {
//          required: true,
//          username: true
//        },
//        password: {
//          required: true,

//        }
//      },
//       messages: {
//        username: "Please enter a valid User Name",

//        password: {
//          required: "Please enter password",

//        }

//      },

//    });
//  });

// $(function()){
//     $("form[name='login']").bind('')
// }


async function yes() {

    let res = await fetch('/login/google')
    console.log(await res.json())
}






//  $(function() {
//    $("form[name='login']").validate({
//      rules: {







//        username: {
//          required: true,
//          username: true
//        },
//        password: {
//          required: true,

//        }
//      },
//       messages: {
//        username: "Please enter a valid User Name",

//        password: {
//          required: "Please enter password",

//        }

//      },

//    });
//  });

// $(function()){
//     $("form[name='login']").bind('')
// }



// if(response.body =="wrong username or password"){
//     Swal.fire('wrong username or password')
// }


// async function login() {
//     let form = document.querySelector("#loginForm")

//     // let formData = new formData()

//     let username = form.username.value
//     let password = form.password.value
//     console.log(username)
//     let res = await fetch('/login', {
//         method: "POST",
//         body: JSON.stringify({ username, password })
//     })

//     console.log(res)

// }















let form = document.querySelector('#loginForm');

form.onsubmit = async (e) => {
    e.preventDefault();



    let formData = new FormData(form);
    console.log('old formData =', formData)
    formData.set('username', form.username.value);
    formData.set('password', form.password.value);
    console.log('new formData =', formData)
    let formObj ={
        "username":form.username.value,
        "password":form.password.value
    }
    console.log('formObj =', formObj)
    const res = await fetch('/login', {
        method: "POST",
        headers : {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(formObj),

    });
    console.log('login result =', res)
    
     if (res.status === 403){
        await Swal.fire({
            text:'Wrong Username or Password',
            icon:'warning',
        })
        return
    }else {
        window.location.href = res.url
    }

}


//     let result = await res.text();
//     alert(result);
//     if (res.status === "403") {
//         Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Username or Password Incorrect!!",

//         });
//         console.log(result);
//     } else {

//         if (!result) {
//             form.password.value = null;
//             alert(result);
//         } else {
//             windows.location.href = "index.html";
//         }


//     }
// };




// fetch("/login",{method:"GET"})
// .then(response =>{
//     console.log(response);
//     if(response.body =="wrong username or password"){
//         Swal.fire('wrong username or password')
//     }
//     return response.json();
// })
// .catch(err => console.log(err));
