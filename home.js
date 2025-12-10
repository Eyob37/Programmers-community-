
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://jurgrpqwyilfdpzbzfrd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1cmdycHF3eWlsZmRwemJ6ZnJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5NDM3NTYsImV4cCI6MjA3MTUxOTc1Nn0.1E-1XaNMTuHGUpgVknyWxiiYXArdDCR9yXa8QzOms5E";

const supabase = createClient(supabaseUrl, supabaseKey);

// DOM references
const filterSelect = document.getElementById("filter-select");
const searchInput = document.getElementById("search-input");
const usersContainer = document.getElementById("users-container");

document.addEventListener("DOMContentLoaded", loadAllUsers);

// ----------------------------
//   Load ALL users on start
// ----------------------------
async function loadAllUsers() {
  const { data: users, error } = await supabase
    .from("Users basic information")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  renderUsers(users);
}

// ----------------------------
//       Render Cards
// ----------------------------
function renderUsers(users) {
  usersContainer.innerHTML = ""; // clear old cards

	users.forEach((user) => {
	  const userCard = document.createElement("div");
	  userCard.className = "user-card";
	  userCard.dataset.thisId = user.user_id;   // <-- ADD THIS
	
	  userCard.innerHTML = `
	    <div class="user-avatar">
	      <img src="${user.profile_image || "..."}" alt="User">
	    </div>
	    <div class="user-info">
	      <h3>${user.Name}</h3>
	      <p>${user.Short_Description || "Developer"}</p>
	      <div class="user-status online"></div>
	    </div>
	  `;
	
	  usersContainer.appendChild(userCard);
	
	  userCard.addEventListener("click", (e) => {
	    const id = e.currentTarget.dataset.thisId;	    
	    sessionStorage.setItem("thisId", id);
	    window.location.href = `user detail.html`;
	  });
	});
}

// ----------------------------
//     Search Supabase Live
// ----------------------------
searchInput.addEventListener("input", async function () {
  const searchValue = this.value.trim();
  const filterType = filterSelect.value;

  // If input empty → load all users again
  if (searchValue === "") {
    loadAllUsers();
    return;
  }

  searchSupabase(filterType, searchValue);
});

// ----------------------------
//   Supabase Search Query
// ----------------------------
async function searchSupabase(filterType, value) {
  let query = supabase.from("Users basic information").select("*");

  if (filterType === "user-id") {
    query = query.ilike("user_id", `${value}%`);
  } else if (filterType === "name") {
    query = query.ilike("Name", `${value}%`);
  } else if (filterType === "field") {
    query = query.ilike("Short_Description", `${value}%`);
  }

  const { data: users, error } = await query;

  if (error) {
    console.error("Search error:", error);
    return;
  }

  renderUsers(users);
}

// ----------------------------
//  Update Placeholder on Filter
// ----------------------------
filterSelect.addEventListener("change", function () {
  const placeholderTexts = {
    "user-id": "Search by user ID...",
    name: "Search by name...",
    field: "Search by field...",
  };

  searchInput.placeholder = placeholderTexts[this.value];
});