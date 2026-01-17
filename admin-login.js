/* ===== DUMMY ADMIN LOGIN ===== */

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

function adminLogin(){
  let user = document.getElementById("adminUser").value.trim();
  let pass = document.getElementById("adminPass").value.trim();
  let msg  = document.getElementById("loginMsg");

  if(user === ADMIN_USERNAME && pass === ADMIN_PASSWORD){
    localStorage.setItem("adminLoggedIn","true");
    window.location.href = "admin.html";
  } else {
    msg.innerText = "❌ Invalid Admin Credentials";
    msg.style.color = "red";
  }
}
