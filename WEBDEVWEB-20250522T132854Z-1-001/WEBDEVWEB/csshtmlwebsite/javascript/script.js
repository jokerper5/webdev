const profilePic = document.getElementById('profile-pic');
const dropdown = document.getElementById('dropdown-menu');
const loginError = document.getElementById('login-error');
const authModal = document.getElementById('auth-modal');

// all users storage
function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

// savef all users to localStorage
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// show profile image
function showProfile(user) {
  profilePic.src = user.profileImage || 'pictures/default-profile.png';
  profilePic.style.display = 'inline-block';
}

// login
function login() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  const users = getUsers();

  if (users.length === 0) {
    loginError.textContent = 'Please create an account first!';
    loginError.style.display = 'block';
    return;
  }

  // find user with made account/email
  const foundUser = users.find(u => u.email === email);
  if (!foundUser) {
    loginError.textContent = 'Account not found!';
    loginError.style.display = 'block';
    return;
  }

  // check password
  if (foundUser.password !== password) {
    loginError.textContent = 'Incorrect password!';
    loginError.style.display = 'block';
    return;
  }

  // successful login store logged in user separately
  localStorage.setItem('user', JSON.stringify(foundUser));
  showProfile(foundUser);
  authModal.style.display = 'none';
  loginError.style.display = 'none';
}

// create accsount function
function createAccount() {
  const name = document.getElementById('createName').value.trim();
  const email = document.getElementById('createEmail').value.trim();
  const password = document.getElementById('createPassword').value.trim();

  if (!name || !email || !password) {
    alert('Please fill all fields');
    return;
  }

  const users = getUsers();

  // check if email already exists
  if (users.some(u => u.email === email)) {
    alert('Email already registered, please login');
    showLogin();
    return;
  }

  const newUser = {
    name,
    email,
    password,
    profileImage: 'pictures/default-profile.png'
  };

  users.push(newUser);
  saveUsers(users);

  alert('Account created! Please log in.');
  showLogin();
}

// edit  profile
function openEditProfile() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return;

  document.getElementById('editName').value = user.name;
  document.getElementById('edit-profile-modal').style.display = 'flex';
}

// save  profile changes
function saveProfileChanges() {
  let user = JSON.parse(localStorage.getItem('user'));
  if (!user) return;

  const newName = document.getElementById('editName').value.trim();
  const fileInput = document.getElementById('editPic');
  const file = fileInput.files[0];

  if (newName) user.name = newName;

  // if new pic uploaded
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      user.profileImage = e.target.result;
      updateUser(user);
    };
    reader.readAsDataURL(file);
  } else {
    updateUser(user);
  }

  document.getElementById('edit-profile-modal').style.display = 'none';
}

// update user info in localStorage (both 'user' and 'users' array)
function updateUser(user) {
  localStorage.setItem('user', JSON.stringify(user));

  // update user inside 'users' array
  let users = getUsers();
  users = users.map(u => (u.email === user.email ? user : u));
  saveUsers(users);

  showProfile(user);
}

// toggle dropdown
function toggleDropdown() {
  dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
}

// show login form
function showLogin() {
  document.querySelector('.login-container').style.display = 'flex';
  document.querySelector('.create-container').style.display = 'none';
  loginError.style.display = 'none';
}

// show create form
function showCreate() {
  document.querySelector('.login-container').style.display = 'none';
  document.querySelector('.create-container').style.display = 'flex';
  loginError.style.display = 'none';
}

// logout
function logout() {
  localStorage.removeItem('user');
  location.reload();
}

// load
window.onload = function () {
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  if (loggedInUser) {
    showProfile(loggedInUser);
    authModal.style.display = 'none';
  }
};

// hide dropdown if clicking outside
document.addEventListener('click', (e) => {
  if (!profilePic.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});

