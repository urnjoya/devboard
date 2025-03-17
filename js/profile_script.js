document.addEventListener("DOMContentLoaded", function () {
    fetch("https://urnjoya.github.io/devboard/json/profile.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok: " + response.status);
            }
            return response.json();
        })
        .then(repo => { // 'data' ki jagah 'repo' (ek single object)
            const container = document.getElementById("profile-card");

            if (!container) {
                console.info("Container element not found");
                return;
            }

            container.innerHTML = `
                <div class="profile-picture">
                  <img alt="${repo.alt || 'Profile Picture'}" src="${repo.profile_url}" height="100" width="100"/>
                </div>
                <div class="profile-name">
                  ${repo.name}
                </div>
                <div class="profile-username">
                  @${repo.username}
                </div>
                <div class="profile-description">
                  ${repo.description}
                </div>
            `;

            console.log("Profile data added:", repo.name);
        })
        .catch(error => console.error("Error fetching repo data:", error));
});
