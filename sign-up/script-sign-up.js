const dataBaseLink = ("http://localhost:3000/users");
const form = document.getElementById("form-user-add")
const firstname = document.getElementById("firstname")
const lastname = document.getElementById("lastname")
const email = document.getElementById("email")
const biographie = document.getElementById("biographie")
const sex = document.getElementById("sex")
const birthday = document.getElementById("birthday")

var userId = null;

fetch(dataBaseLink)
    .then((dataResponse) => dataResponse.json())
    .then (data => {
        data.forEach(function (element, index, array){
            const userId = data[index].id; 
            document.getElementById('tableBody').innerHTML += `
                <tr>
                        <th style="text-align: left"><p>${data[index].lastname}</p></th>
                        <th style="text-align: left"><p>${data[index].firstname}</p></th>
                        <th style="text-align: left"><p>${data[index].email}</p></th>
                        <div class="blockBtn">
                            <div class="btnDiv">
                                <svg xmlns="http://www.w3.org/2000/svg" onclick="displayUser(${userId})" data-id="${userId}" class="changeBtn btnUserEdit icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                                    <path d="M16 5l3 3"></path>
                                </svg>
                            </div>  
                            <div class="btnDiv">
                                <svg xmlns="http://www.w3.org/2000/svg" onclick="deleteUser(${userId})" class="deleteBtn btnUserEdit icon icon-tabler icon-tabler-trash-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="red" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" ></path>
                                    <path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" stroke-width="0" ></path>
                                    <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" stroke-width="0" ></path>
                                </svg>
                            </div>
                        </div>
                    
                </tr>
            ` 
    });   
       
    
}) 

.catch(error => {
    console.error('Error fetching data:', error);
});

form.addEventListener('submit',(e) =>{
    e.preventDefault()

    if(firstname.value === "") {
        // alert('Le champ prénom est obligatoir?')
        notValidAnim('firstnameWraper', "firstname", "Le prénom est obligatoir")
        return;
    } 
     
    if(lastname.value ==="") {
        // alert("Le champ nom est obligatoir")
        notValidAnim('lastnameWraper',"lastname","Le nom est obligatoir")
        return;
    }

    if(email.value ==="") {
        // alert("L'email est obligatoir")
        notValidAnim("emailWraper","email","Votre addresse email est très important")
        return;
    }

    if(biographie.value ==="") {
        // alert("On a besoin de votre biographie")
        notValidAnim("bioWraper","biographie", "Le biographie est aussi obligatoir")
        return;
    }

    if(birthday.value ==="") {
        // alert("Veuillez entré votre date naissance")
        notValidAnim("birthWraper","birthday")
        return;
    }

    if(sex.value ==="none") {
        // alert("Veuillez entré votre date naissance")
        var inputSelect = document.getElementById("sex")
        inputSelect.style.border = "var(--color-red) 1px solid"
        notValidAnim("sexWraper","sex")
        return;
    }
    startRequest()
});

function displayUser(id) {
    form.classList.add("edit-user")
    form.classList.remove("create-user")
    userId = id

    fetch(`http://localhost:3000/users/${id}`)
    .then((dataResponse) => dataResponse.json())
    .then (function (data) {
        firstname.value = data.firstname;
        lastname.value = data.lastname;
        email.value = data.email;
        biographie.value = data.biographie;
        birthday.value = data.birthday;
        sex.value = data.sex;
    }) 
    .catch(error => {
        console.error('Error fetching data:', error);
    }); 
    
}

function startRequest() {
    console.log(form.className)
    if(form.className == 'edit-user'){
        editUser(userId)
    }else {
        createUser()
    }
}

function editUser(userId){
    console.log(userId)
    fetch(`http://localhost:3000/users/${userId}`,
    {
        method: 'PUT',
        body:JSON.stringify(
            {
                firstname: firstname.value,
                lastname: lastname.value,
                email: email.value,
                biographie: biographie.value,
                sex: sex.value,
                birthday: birthday.value,
                id : userId
            }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    },
    )
}


function createUser() {
    // POST METHOD
    
    fetch(dataBaseLink,{
        method: 'POST',
        body: JSON.stringify({
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            biographie: biographie.value,
            sex: sex.value,
            birthday: birthday.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    
}


function deleteUser(userId) {
    fetch(`http://localhost:3000/users/${userId}`,{
        method: 'DELETE'
    })
    .then((dataResponse) => dataResponse.json())
    .then (data => {
        firstname.value = data.firstname,
        lastname.value = data.lastname,
        email.value = data.email,
        biographie.value = data.biographie,
        birthday.value = data.birthday,
        sex.value = data.sex,
        id = data.userId
    }) 
    .catch(error => {
        console.error('Error fetching data:', error);
    }); 
}

function notValidAnim(className , inputId ,message) {
    let Inputparent = document.getElementsByClassName(className)[0]
    Inputparent.classList.toggle('animation')
       
    var input = document.getElementsByName(inputId)[0]
    input.setAttribute('placeholder', message)
    input.style.border = "var(--color-red) 1px solid"
    input.classList.add('invalid-input')
    Inputparent.style.transition="0.9s all"
    setTimeout(() => {
        Inputparent.classList.remove('animation');
        input.classList.remove('invalid-input')
        input.style.border = "rgb(211, 211, 211) 1px solid"
        var inputSelect = document.getElementById("sex")
        inputSelect.style.border = "rgb(211, 211, 211) 1px solid"
    }, "1500")
}

function validAnim(inputId) {
    var input = document.getElementsByName(inputId)[0]
    input.style.border = "var(--color-green) 1px solid"
}









