document.addEventListener("DOMContentLoaded", function () {
    fetch("https://urnjoya.github.io/devboard/json/repo_list.json")  // JSON file fetch kar rahe hain
        .then(response =>{
            if(!response.ok){
                throw new Error("Network response was not ok:"+response.status);
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById("repo-container");
            console.log(container, "container data");  // Debugging line to check if container is selected
            if (!container) {
                console.info("Container element not found");
                // agr container null huwa to aage nahi chalega return lagane pe
                return;
            }
            data.forEach(repo => {
                const card = document.createElement("div");
                card.classList.add("repo-card");

                card.innerHTML = `
                    <h2>${repo.name}</h2>
                    <p>${repo.description}</p>
                    <p><strong>Tech Stack:</strong> ${repo.tech_stack.join(", ")}</p>
                    <a href="${repo.repo_link}" target="_blank">GitHub Repo</a> |
                    <a href="${repo.live_link}" target="_blank">Live Demo</a>
                `;
                // debugging line
                console.log("Adding card to container: ",repo.name);
                container.appendChild(card);
            });
        })
        .catch(error => console.error("Error fetching repo data:", error));
});
