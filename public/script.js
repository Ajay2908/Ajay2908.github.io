
async function login() {
    const data = $("form").serializeArray();
    const user_name = data[0].value;
    const password = data[1].value;
    console.log(user_name)
    console.log(password)
    const tosend = {
        username: user_name,
        password: password
    }

    try {
        const login = await $.ajax({
            type: "post",
            url: '/users/login',
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(tosend),
            success: function (response) {
                const data = JSON.parse(JSON.stringify(response))
                
                return data;
            },
            error: function (result) {
                return result;
            }
        })
        if(login.error){
            alert(login.error)
        }
        else{
            alert(`Hello ${login.name}`)
        }
        // alert(`Hello ${login.name}`)
    }
    catch (e) {
        console.log("error!")
    }



}


async function signup() {
    const data = $("form").serializeArray();
    const name = data[0].value;
    const username = data[1].value;
    const password = data[3].value;
    const gmail = data[2].value;
    const tosend = {
        name: name,
        username: username,
        password: password,
        gmail: gmail
    }
    console.log(tosend)
    try {
        $.ajax({
            type: "post",
            url: '/users',
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(tosend),
            success: function (response) {
                // const data = JSON.parse(response);
                const data = JSON.parse(JSON.stringify(response))
                console.log(data)
            },
            error: function (result) {
                console.log(result);
            }
        })
    }
    catch (e) {
        console.log(e)
    }

}
