document.addEventListener("DOMContentLoaded", function () {
    fetch("https://urnjoya.github.io/devboard/json/repo_list.json")  // JSON file fetch kar rahe hain
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("repo-container");
            console.log(container, "container data");  // Debugging line to check if container is selected

            if (!container) {
                console.error("Container element not found");
                return;
            }

            // Clear the container before adding new data
            container.innerHTML = "";  // Clear existing content

            // Generate HTML for all the repos at once
            let htmlContent = "";  // Empty string to accumulate HTML

            data.forEach(repo => {
                htmlContent += `
                    <div class="repo-card">
                        <h2>${repo.name}</h2>
                        <p>${repo.description}</p>
                        <p><strong>Tech Stack:</strong> ${repo.tech_stack.join(", ")}</p>
                        <a href="${repo.repo_link}" target="_blank">GitHub Repo</a> |
                        <a href="${repo.live_link}" target="_blank">Live Demo</a>
                    </div>
                `;
            });

            // Add all the generated HTML to the container
            container.innerHTML = htmlContent;
        })
        .catch(error => console.error("Error fetching repo data:", error));
});
