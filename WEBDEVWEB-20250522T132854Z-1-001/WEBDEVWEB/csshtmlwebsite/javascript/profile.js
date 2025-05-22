
// exit
document.querySelector(".profile-modal .close").addEventListener("click", () => {
  document.getElementById("edit-profile-modal").style.display = "none";
});

// click on profile image to change it
document.getElementById("editPic").addEventListener("change", function () {
  const file = this.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("previewProfilePic").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// duble click to make name editable
function makeNameEditable() {
  const display = document.getElementById("displayName");
  const input = document.getElementById("editName");

  input.value = display.textContent;
  display.style.display = "none";
  input.style.display = "block";
}

function showConfirmationMessage(message) {
  const msg = document.getElementById("updateMessage");
  msg.textContent = message;
  msg.style.display = "block";
  setTimeout(() => {
    msg.style.display = "none";
  }, 3000);
}

function saveProfileChanges() {
  let user = JSON.parse(localStorage.getItem('user'));
  if (!user) return;

  const newName = document.getElementById('editName').value.trim();
  const fileInput = document.getElementById('editPic');
  const file = fileInput.files[0];

  if (newName) {
    user.name = newName;
    document.getElementById("displayName").textContent = newName;

    // add these lines:
    document.getElementById("editName").style.display = "none";
    document.getElementById("displayName").style.display = "block";
  }

  const finishUpdate = () => {
    updateUser(user);
    showConfirmationMessage("Profile updated successfully!");
  };

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      user.profileImage = e.target.result;
      document.getElementById("previewProfilePic").src = e.target.result;
      finishUpdate();
    };
    reader.readAsDataURL(file);
  } else {
    finishUpdate();
  }
}

document.getElementById("editName").style.display = "none";
document.getElementById("editPic").value = "";

function showProfile(user) {
  // profile icon on header
  profilePic.src = user.profileImage || 'pictures/default-profile.png';
  profilePic.style.display = 'inline-block';

  // also update modal preview if it exists on the page
  const previewPic = document.getElementById('previewProfilePic');
  if (previewPic) {
    previewPic.src = user.profileImage || 'pictures/default-profile.png';
  }

  // also update display name if modal is present
  const displayName = document.getElementById('displayName');
  if (displayName) {
    displayName.textContent = user.name;
  }
}

