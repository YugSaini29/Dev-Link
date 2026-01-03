document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-link");
  const cardsContainer = document.getElementById("cards-container");
  const resultCount = document.getElementById("result-count");

  let currentSection = "projects";

  function loadProjects() {
    fetch("http://localhost:3000/api/projects")
      .then(res => res.json())
      .then(data => renderProjects(data));
  }

  function loadHackathons() {
    fetch("http://localhost:3000/api/hackathons")
      .then(res => res.json())
      .then(data => renderHackathons(data));
  }

  function loadStartups() {
    fetch("http://localhost:3000/api/startups")
      .then(res => res.json())
      .then(data => renderStartups(data));
  }

  // Initially load projects
  loadProjects();

  // Tab click listener
  tabs.forEach(tab => {
    tab.addEventListener("click", e => {
      e.preventDefault();
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      currentSection = tab.getAttribute("data-section");

      if (currentSection === "projects") loadProjects();
      else if (currentSection === "hackathons") loadHackathons();
      else if (currentSection === "startups") loadStartups();
    });
  });

  // RENDER PROJECTS
  // check why trim is not working
  function renderProjects(items) {
    cardsContainer.innerHTML = "";
    resultCount.textContent = `${items.length} projects found`;
    items.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card");
      console.log(item.status.toLowerCase().replace(/\s+/g, ''));
      card.innerHTML = `
        <div class="card-header">
          <h3>${item.title}</h3>
          <span class="status ${item.status.toLowerCase().replace(/\s+/g, '')}">${item.status}</span>
        </div>
        <p>${item.description}</p>
        <div class="author">
          <span class="avatar">${item.avatar}</span>
          <span>${item.author}</span>
        </div>
        <div class="meta">
          <span>👥 ${item.team}</span>
          <span>🌍 ${item.location}</span>
        </div>
        <div class="tags">
          ${item.tags.map(tag => `<span>${tag}</span>`).join("")}
        </div>
        <button class="view-btn" data-project-id="${item._id}" data-author="${item.author}" data-title="${item.title}">Join Project</button>

      `;
      cardsContainer.appendChild(card);
    });
    attachJoinTeamListeners()
  }

  // RENDER HACKATHONS
  function renderHackathons(items) {
    cardsContainer.innerHTML = "";
    resultCount.textContent = `${items.length} hackathons found`;

    items.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
      <div class="card-header">
        <h3>${item.title}</h3>
        <span class="status ${item.status.toLowerCase().replace(/\s+/g, '')}">${item.status}</span>
      </div>
      <p>${item.description}</p>
      <div class="author">
        <span class="avatar">${item.avatar}</span>
        <span>${item.author}</span>
      </div>
      <div class="meta">
        <span>📅 ${item.date}</span>
        <span>🌍 ${item.location}</span>
      </div>
      <div class="author">
        <span>👤 ${item.author}</span>
        <span>👥 Team: ${item.team}</span>
      </div>
      <div class="requirements">
        <strong>Requirements:</strong> ${item.Requirements}
      </div>
      <div class="tags">
        ${item.tags.map(tag => `<span>${tag}</span>`).join("")}
      </div>
      <button class="view-btn" data-project-id="${item._id}" data-author="${item.author}" data-title="${item.title}">Join Team</button>

    `;
      cardsContainer.appendChild(card);
    });
    attachJoinTeamListeners()
  }


  // RENDER STARTUPS
  function renderStartups(items) {
    cardsContainer.innerHTML = "";
    resultCount.textContent = `${items.length} startups found`;

    items.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
      <div class="card-header">
        <h3>${item.title}</h3>
        <span class="status ${item.status.toLowerCase()}">${item.status}</span>
      </div>
      <p>${item.description}</p>
      <div class="author">
        <span class="avatar">${item.avatar}</span>
        <span>${item.author}</span>
      </div>
      <div class="meta">
        <span>👥 Team Size: ${item.team}</span>
        <span>🌍 ${item.location}</span>
      </div>
      <div class="requirements">
        <strong>Requirements:</strong> ${item.Requirements}
      </div>
      <div class="tags">
        ${item.tags.map(tag => `<span>${tag}</span>`).join("")}
      </div>
    <button class="view-btn" data-project-id="${item._id}" data-author="${item.author}" data-title="${item.title}">Join Team</button>

    `;
      cardsContainer.appendChild(card);
    });
    attachJoinTeamListeners()

  }
  function attachJoinTeamListeners() {

    const joinButtons = document.querySelectorAll('.view-btn');

    joinButtons.forEach(btn => {
      btn.addEventListener('click', async () => {
        console.log("Join button clicked!");

        const projectId = btn.dataset.projectId;
        const author = btn.dataset.author;
        const title = btn.dataset.title;


        //  EXACT PAYLOAD YOUR BACKEND EXPECTS
        const teamPayload = {
          projectId,
          title,
          author
        };


        console.log("Sending payload:", teamPayload);

        try {
          const res = await fetch("http://localhost:3000/team/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(teamPayload)
          });

          const data = await res.json();
          console.log("Server response:", data);

          if (res.ok) {
            alert("Team joined successfully!");
            window.location.href = "team-dashboard.html";
          } else {
            alert("Error: " + data.message);
          }
        } catch (err) {
          console.error("Join team error:", err);
          alert("Server error.");
        }
      });
    });
  }



});
