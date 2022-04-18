// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1lpkl7SuCePRnf9_82SnLfIEY1IVKC7o",
  authDomain: "week14-e9c3b.firebaseapp.com",
  databaseURL: "https://week14-e9c3b-default-rtdb.firebaseio.com",
  projectId: "week14-e9c3b",
  storageBucket: "week14-e9c3b.appspot.com",
  messagingSenderId: "611282838239",
  appId: "1:611282838239:web:bc0323ed987f5777c7bf6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


import{getDatabase, ref, get, set, child, update, remove, onValue, onChildAdded, onChildChanged, onChildRemoved}
from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";

;
const db = getDatabase();

var inputUsername = document.getElementById("user");
var inputPassword = document.getElementById("pass");


function loginData(){
    const dbref = ref(db);
    get(child(dbref,"User/"+inputUsername.value)
    )
    .then((snapshot) =>{
        if(snapshot.exists()){
            let passwords = snapshot.val().password;
            if(passwords==inputPassword.value){
                alert("Successfully Login completed");        
                localStorage.setItem("youruser",inputUsername.value);
                localStorage.setItem("yourpass",inputPassword.value);
                window.open("page2_signin.html","_blanks");
            }
            else{
                alert("No data found!");
            }

        }
        else{
            alert("No data found!"); 
        }
    })
    .catch((error) =>{
        alert("unsuccessful, error"+error);
    });
}
btn_login.addEventListener('click',loginData);