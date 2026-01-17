let pets = JSON.parse(localStorage.getItem("pets")) || [];
let requests = JSON.parse(localStorage.getItem("adoptionRequests")) || [];

function showSection(id){
  document.querySelectorAll(".section").forEach(sec=>{
    sec.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

/* DASHBOARD COUNTS */
function updateDashboard(){
  let pets = JSON.parse(localStorage.getItem("pets")) || [];
let requests = JSON.parse(localStorage.getItem("adoptionRequests")) || [];

function showSection(id){
  document.querySelectorAll("main section").forEach(s=>{
    s.classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
}

/* ADD PET */
function addPet(){
  let name = petName.value;
  let age = petAge.value;
  let file = petImage.files[0];

  if(!name || !age || !file) return alert("Fill all fields");

  let reader = new FileReader();
  reader.onload = () => {
    pets.push({
      id: Date.now(),
      name,
      age,
      image: reader.result,
      status: "Available"
    });
    localStorage.setItem("pets", JSON.stringify(pets));
    loadAdminPets();
    updateStats();
  };
  reader.readAsDataURL(file);
}

/* LOAD PETS */
function loadAdminPets(){
  adminPetList.innerHTML = "";
  pets.forEach(p=>{
    adminPetList.innerHTML += `
      <p>${p.name} - ${p.status}</p>
    `;
  });
}

/* LOAD REQUESTS */
function loadRequests(){
  requestList.innerHTML = "";
  requests.forEach(r=>{
    let pet = pets.find(p=>p.id===r.petId);
    requestList.innerHTML += `
      <div>
        <b>${pet?.name}</b> - ${r.user}
        <button onclick="approve(${r.id})">Approve</button>
        <button onclick="reject(${r.id})">Reject</button>
      </div>
    `;
  });
}

function approve(id){
  let req = requests.find(r=>r.id===id);
  let pet = pets.find(p=>p.id===req.petId);
  req.status = "Approved";
  pet.status = "Adopted";
  localStorage.setItem("pets",JSON.stringify(pets));
  localStorage.setItem("adoptionRequests",JSON.stringify(requests));
  loadRequests();
  loadAdminPets();
}

function reject(id){
  let req = requests.find(r=>r.id===id);
  req.status = "Rejected";
  localStorage.setItem("adoptionRequests",JSON.stringify(requests));
  loadRequests();
}

function updateStats(){
  totalPets.innerText = pets.length;
  totalReq.innerText = requests.length;
}

updateStats();
loadAdminPets();
loadRequests();

/* LOGOUT */
function logout(){
  alert("Admin logged out!");
  window.location.href="../index.html";
}


/* INIT */
displayPets();
loadRequests();
updateDashboard();
let pets = JSON.parse(localStorage.getItem("pets")) || [];
let requests = JSON.parse(localStorage.getItem("adoptionRequests")) || [];

/* ADD PET */
function addPet(){
  let name = petName.value.trim();
  let age = petAge.value.trim();
  let img = petImage.files[0];

  if(!name || !age || !img){
    alert("Fill all fields");
    return;
  }

  let reader = new FileReader();
  reader.onload = function(){
    pets.push({
      id: Date.now(),
      name,
      age,
      image: reader.result,
      status: "Available"
    });

    localStorage.setItem("pets", JSON.stringify(pets));
    loadAdminPets();
  };
  reader.readAsDataURL(img);
}

/* SHOW PETS */
function loadAdminPets(){
  let box = document.getElementById("adminPetList");
  box.innerHTML = "";

  pets.forEach(pet=>{
    box.innerHTML += `
      <div>
        <b>${pet.name}</b> (${pet.age}) - ${pet.status}
      </div>
    `;
  });
}

loadAdminPets();
function loadRequests(){
  let box = document.getElementById("requestList");
  box.innerHTML = "";

  requests.forEach(req=>{
    let pet = pets.find(p => p.id === req.petId);

    box.innerHTML += `
      <div style="margin:10px 0">
        <b>${pet?.name}</b> |
        ${req.user} |
        Status: ${req.status}

        <button onclick="approveReq(${req.id})">Approve</button>
        <button onclick="rejectReq(${req.id})">Reject</button>
      </div>
    `;
  });
}

/* APPROVE */
function approveReq(id){
  let req = requests.find(r => r.id === id);
  let pet = pets.find(p => p.id === req.petId);

  req.status = "Approved";
  pet.status = "Adopted";

  localStorage.setItem("pets", JSON.stringify(pets));
  localStorage.setItem("adoptionRequests", JSON.stringify(requests));
  loadRequests();
  loadAdminPets();
}

/* REJECT */
function rejectReq(id){
  let req = requests.find(r => r.id === id);
  req.status = "Rejected";

  localStorage.setItem("adoptionRequests", JSON.stringify(requests));
  loadRequests();
}

loadRequests();
let pets =
  JSON.parse(localStorage.getItem("pets")) || [];
let requests =
  JSON.parse(localStorage.getItem("adoptionRequests")) || [];

function loadRequests(){
  let box = document.getElementById("requestList");
  box.innerHTML = "";

  if(requests.length === 0){
    box.innerHTML = "<p>No adoption requests</p>";
    return;
  }

  requests.forEach(req => {
    let pet = pets.find(p => p.id === req.petId);

    box.innerHTML += `
      <div class="request-card">
        <p><b>Pet:</b> ${pet?.name || "Removed"}</p>
        <p><b>User:</b> ${req.user}</p>
        <p><b>Email:</b> ${req.email}</p>
        <p><b>Status:</b> ${req.status}</p>

        <button onclick="approveReq(${req.id})">Approve</button>
        <button onclick="rejectReq(${req.id})">Reject</button>
        <button onclick="deleteReq(${req.id})">Delete</button>
      </div>
    `;
  });
}

/* APPROVE */
function approveReq(id){
  let req = requests.find(r => r.id === id);
  let pet = pets.find(p => p.id === req.petId);

  req.status = "Approved";
  if(pet) pet.status = "Adopted";

  localStorage.setItem("pets", JSON.stringify(pets));
  localStorage.setItem("adoptionRequests", JSON.stringify(requests));

  loadRequests();
}

/* REJECT */
function rejectReq(id){
  let req = requests.find(r => r.id === id);
  req.status = "Rejected";

  localStorage.setItem("adoptionRequests", JSON.stringify(requests));
  loadRequests();
}

/* DELETE */
function deleteReq(id){
  requests = requests.filter(r => r.id !== id);

  localStorage.setItem("adoptionRequests", JSON.stringify(requests));
  loadRequests();
}

loadRequests();
let pets = JSON.parse(localStorage.getItem("pets")) || [];
let editPetId = null;

/* SAVE (ADD / UPDATE) PET */
function savePet(){
  let name = petName.value.trim();
  let age = petAge.value.trim();
  let status = petStatus.value;
  let file = petImage.files[0];

  if(!name || !age){
    alert("Please fill all required fields");
    return;
  }

  if(editPetId === null){
    // ADD PET
    if(!file){
      alert("Please choose an image");
      return;
    }

    let reader = new FileReader();
    reader.onload = () => {
      pets.push({
        id: Date.now(),
        name,
        age,
        status,
        image: reader.result
      });

      localStorage.setItem("pets", JSON.stringify(pets));
      loadAdminPets();
      resetForm();
    };
    reader.readAsDataURL(file);

  } else {
    // UPDATE PET
    let pet = pets.find(p => p.id === editPetId);
    pet.name = name;
    pet.age = age;
    pet.status = status;

    if(file){
      let reader = new FileReader();
      reader.onload = () => {
        pet.image = reader.result;
        localStorage.setItem("pets", JSON.stringify(pets));
        loadAdminPets();
        resetForm();
      };
      reader.readAsDataURL(file);
    } else {
      localStorage.setItem("pets", JSON.stringify(pets));
      loadAdminPets();
      resetForm();
    }
  }
}

/* LOAD PET LIST */
function loadAdminPets(){
  adminPetList.innerHTML = "";

  if(pets.length === 0){
    adminPetList.innerHTML = "<p>No pets available</p>";
    return;
  }

  pets.forEach(pet => {
    adminPetList.innerHTML += `
      <div class="admin-pet-card">
        <img src="${pet.image}">
        <div>
          <h4>${pet.name}</h4>
          <p>Age: ${pet.age}</p>
          <p>Status: ${pet.status}</p>
        </div>
        <div class="actions">
          <button onclick="editPet(${pet.id})">Edit</button>
          <button onclick="deletePet(${pet.id})">Delete</button>
        </div>
      </div>
    `;
  });
}

/* EDIT PET */
function editPet(id){
  let pet = pets.find(p => p.id === id);

  petName.value = pet.name;
  petAge.value = pet.age;
  petStatus.value = pet.status;
  editPetId = id;
}

/* DELETE PET */
function deletePet(id){
  if(!confirm("Are you sure you want to delete this pet?")) return;

  pets = pets.filter(p => p.id !== id);
  localStorage.setItem("pets", JSON.stringify(pets));
  loadAdminPets();
}

/* RESET FORM */
function resetForm(){
  petName.value = "";
  petAge.value = "";
  petStatus.value = "Available";
  petImage.value = "";
  editPetId = null;
}

loadAdminPets();

