let y = [];

// Creates a user using Firebase
function addUser() {
    let userName = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    if (password == confirmPassword) {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (resp) {
                const uId = firebase.auth().currentUser.uid;
                db.collection("users").doc(uId).set({
                    username: userName,
                    email: email,
                    password: password
                }).then((result) => {
                    alert('User Created');
                    window.location.href = "demo.html";

                }).catch((error) => {
                    console.log(error);

                })

            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
    } else {
        alert("the password needs to be the same");
    }
}

// Signs in a user using Firebase
function signIn() {
    email = document.getElementById("loginEmail").value;
    password = document.getElementById("loginPassword").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (resp) {
            const uId = firebase.auth().currentUser.uid;
            alert("you are now logged in");
            window.location.href = "demo.html";
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ...
        });
}

let x = [];

// Gets the current users username then displays it 
function getUsername() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userInfo = db.collection("users").doc(user.uid).get()
                .then(function (doc) {
                    content = document.getElementById('displayUsername');
                    content.innerText = "Hello " + doc.data().username
                })
                .catch((error) => {
                    console.log(error)
                    console.log('Error writing document');
                });

        } else {
            console.log("No user")
        }
    });

}

// Gets 6 random numbers and displays them
function genNumbers() {
    y.length = 0;

    while (y.length < 6) {
        randomNumber = getRandomNumber();
        if (!(y.includes(randomNumber))) {
            y.push(randomNumber);
        }
    }

    let number1 = document.getElementById('num1').value = y[0];
    let number2 = document.getElementById('num2').value = y[1];
    let number3 = document.getElementById('num3').value = y[2];
    let number4 = document.getElementById('num4').value = y[3];
    let number5 = document.getElementById('num5').value = y[4];
    let number6 = document.getElementById('num6').value = y[5];
}

// Generates random number
function getRandomNumber() {
    return Math.floor(Math.random() * 49) + 1;
}

// Saves numbers to firebase 
function saveNumbers() {
    let number1 = document.getElementById('num1').value;
    let number2 = document.getElementById('num2').value;
    let number3 = document.getElementById('num3').value;
    let number4 = document.getElementById('num4').value;
    let number5 = document.getElementById('num5').value;
    let number6 = document.getElementById('num6').value;
    var d = new Date();
    var t = d.getTime();
    let numbers = 'numbers' + t;
    var uId = firebase.auth().currentUser.uid;
    db.collection("users").doc(uId).collection('numbers').doc(numbers).set({
        number1: number1,
        number2: number2,
        number3: number3,
        number4: number4,
        number5: number5,
        number6: number6,
    }).then((result) => {
        alert('Numbers Saved');

    }).catch((error) => {
        console.log(error);

    })

}

// Gets numbers from firebase then displays them
function showNumbers() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            div = document.getElementById('displayNumbers');
            var display = db.collection("users").doc(user.uid).collection('numbers')
            var business = display.get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        let space = document.createElement('br');
                        space.style.padding = '1rem'
                        let put = document.getElementById('put');
                        put.appendChild(space);

                        let content = document.createElement("p");
                        content.style.maxWidth = 'fit-content'
                        content.style.margin = 'auto'
                        content.style.padding = '1rem'
                        content.style.fontSize = '2rem'
                        content.style.border = 'solid black 2px'
                        content.innerHTML = doc.data().number1 + ' ' + ' | ' + doc.data().number2 + ' ' + ' | ' + doc.data().number3 + ' ' + ' | ' + doc.data().number4 + ' ' + ' | ' + doc.data().number5 + ' ' + ' | ' + doc.data().number6 + "<br>"
                        put.appendChild(content);
                    })
                })
                .catch(error => {
                    console.log('Error: ' + error);
                });


        } else {
            console.log("No user")
        }
    });

}

// Signs out user
function signOutUser() {
    firebase.auth().signOut().then(function () {
        window.location.href = "login.html";
    }).catch(function (error) {
        console.log(error)
    });

}

// Hamburger menu hiding/showing links
function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

// GRANIM 
var granimInstance = new Granim({
    element: '#canvas-basic',
    direction: 'left-right',
    isPausedWhenNotInView: true,
    states : {
        "default-state": {
            gradients: [
                ['#006600', '#009900'],
                ['#00cc00', '#7fff7f'],
                ['#00b300', '#00ff00']
            ]
        }
    }
});