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


// // References
var username = document.getElementById("new_username");
var password = document.getElementById("new_password");
var btn_insert = document.getElementById("btn_insert");
var btn_select = document.getElementById("btn_select");
var btn_update = document.getElementById("btn_update");
var btn_delete = document.getElementById("btn_delete");
var btn_all = document.getElementById("btn_all");



// INSERT DATA
function insertData(){

    set(ref(db,"User/"+username.value),{
        password: password.value
      
    })
    .then(()=>{
        location.reload(); 
        alert("data stored successfully");
       
    })
    .catch((error)=>{
        alert("unsccessful, error" + error);
    })
   
}


// SELECT DATA 
function selectData(){
    
    const dbref = ref(db);
    get(child(dbref,"User/"+username.value)).then((snapshot) =>{
        if(snapshot.exists()){
    
            let usernames = username.value
            let passwords = snapshot.val().password;
            
            alert(passwords);
            showIteminList(usernames, passwords)
        }
        else{
            alert("No data found!");
            
        }
    })
    .catch((error) =>{
        alert("unsuccessful, error"+error);
    });
}

function removeAll(){
    document.getElementById("lists").innerHTML = "";
}
function showIteminList(username, password){
    removeAll()
    addItemToList(username, password)
}
let userNo = 0;
function addItemToList(username, password){
   
    var ul = document.getElementById('lists');
    var header = document.createElement('h2');

    var _username = document.createElement('li');
    var _password = document.createElement('li');
    
    header.innerHTML = 'User-'+(++userNo);



    _username.innerHTML = 'Username: '+username;
    _password.innerHTML = 'Password: '+password;
   
    ul.appendChild(header);
    ul.appendChild(_username);
    ul.appendChild(_password);    
    ul.appendChild(_password);

}

// UPDATE DATA 
function updateData(){
    update(ref(db,"User/"+username.value),{
        password: password.value,

    })
    .then(()=>{
        alert("data update successfully");
        location.reload();
        
    })
    .catch((error)=>{
        alert("unsccessful, error" + error);
    })
}

//DELETE DATA
function deleteData(){
    remove(ref(db,"User/"+username.value))
    .then(()=>{
        alert("data delete successfully");
        location.reload();
    })
    .catch((error)=>{
        alert("unsccessful, error" + error);
    })
}

function selectAll(){
    
    const dbRef = ref(db, 'User/');
    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;       
            let user_password = childSnapshot.val().password;
           

            addItemToList(childKey, user_password);
            // window.addEventListener('load',FetchAllData)
        });
    }, {
    onlyOnce: true
    });
    
}
btn_insert.addEventListener('click',insertData);
btn_select.addEventListener('click',selectData);
btn_update.addEventListener('click',updateData);
btn_delete.addEventListener('click',deleteData);
btn_all.addEventListener('click',selectAll);