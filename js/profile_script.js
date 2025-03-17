document.addEventListener("DOMContentLoaded", function () {
    fetch("https://urnjoya.github.io/devboard/json/profile.json")  // JSON file fetch kar rahe hain
        .then(response =>{
            if(!response.ok){
                throw new Error("Network response was not ok:"+response.status);
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById("profile-card");
            console.log(container, "container data");  // Debugging line to check if container is selected
            if (!container) {
                console.info("Container element not found");
                // agr container null huwa to aage nahi chalega return lagane pe
                return;
            }
            data.forEach(repo => {
                // const card = document.createElement("div");
                // card.classList.add("profile-picture");

                card.innerHTML = `
                <div class="profile-picture">
                  <img alt="${repo.alt}" src="${repo.profile_url}" height="100" width="100"/>
                </div>
                <div class="profil-name">
                  ${repo.name}
                </div>
                <div class="profile-username">
                  @${repo.username}
                </div>
                <div class="profile-description">
                  ${repo.description}
                </div>
                `;
                // debugging line
                console.log("Adding card to container: ",repo.name);
                // container.appendChild(card);

            });
        })
        .catch(error => console.error("Error fetching repo data:", error));
});
