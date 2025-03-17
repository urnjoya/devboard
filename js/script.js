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
                card.classList.add("repo-card", "bg-white", "rounded-lg", "shadow-lg", "p-6");

                card.innerHTML = `
                    <h2>${repo.name}</h2>
                    <p>${repo.description}</p>
                    <span><strong>Tech Stack:</strong> ${repo.tech_stack.join(", ")}</span>
                    <a href="${repo.repo_link}" target="_blank"><i></i>GitHub Repo</a> |
                    <a href="${repo.live_link}" target="_blank"><i></>Live Demo</a>
                `;
                // debugging line
                console.log("Adding card to container: ",repo.name);
                container.appendChild(card);
                h2.classList.add("text-2xl", "font-bold", "text-blue-600", "mb-2");
                p.classList.add("text-gray-700", "mb-4");
                span.classList.add("inline-block", "bg-blue-100", "text-blue-800", "text-xs", "px-2", "py-1", "rounded-full", "uppercase", "font-semibold", "tracking-wide");
                a.classList.add("btn");
                i.classList.add("icn");
                let btns = document.querySelectorAll(".btn");
                let icns = document.querySelectorAll(".icn");
                btns[0].classList.add("bg-blue-500", "text-white", "px-4", "py-2", "rounded-lg", "shadow", "hover:bg-blue-600", "transition", "duration-300", "inline-block", "mr-2");
                icns[0].classList.add("fab", "fa-github");
                btns[1].classList.add("bg-green-500", "text-white", "px-4", "py-2", "rounded-lg", "shadow", "hover:bg-green-600", "transition", "duration-300", "inline-block");
                icns[1].classList.add("fas", "fa-external-link-alt");
            });
        })
        .catch(error => console.error("Error fetching repo data:", error));
});
