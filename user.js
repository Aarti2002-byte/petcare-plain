let requests =
  JSON.parse(localStorage.getItem("adoptionRequests")) || [];
let selectedPet = null;

function submitAdoption(){
  let name = uname.value.trim();
  let email = uemail.value.trim();

  if(!name || !email){
    adoptMsg.innerText = "❌ Please fill all fields";
    adoptMsg.style.color = "red";
    return;
  }

  let exists = requests.find(
    r => r.petId === selectedPet && r.email === email
  );

  if(exists){
    adoptMsg.innerText = "❌ You already requested this pet";
    adoptMsg.style.color = "red";
    return;
  }

  requests.push({
    id: Date.now(),
    petId: selectedPet,
    user: name,
    email: email,
    status: "Pending"
  });

  localStorage.setItem(
    "adoptionRequests",
    JSON.stringify(requests)
  );

  adoptMsg.innerText =
    "✅ Your request has been submitted successfully, we’ll contact you soon";
  adoptMsg.style.color = "green";

  setTimeout(() => {
    document.getElementById("adoptModal").style.display = "none";
  }, 1500);
}
