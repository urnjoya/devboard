document.addEventListener("DOMContentLoaded", function () {
    fetch("/devboard/json/repo_list.json")  // JSON file fetch kar rahe hain
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("repo-container");

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

                container.appendChild(card);
            });
        })
        .catch(error => console.error("Error fetching repo data:", error));
});
