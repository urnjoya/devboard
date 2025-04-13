// PROFILE
document.addEventListener("DOMContentLoaded", function () {
    fetch("json/profile.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok: " + response.status);
            }
            return response.json();
        })
        .then(repo => {
            const container = document.getElementById("profile-card");

            if (!container) {
                console.info("Container element not found");
                return;
            }

            container.innerHTML = `
                <div class="profile-picture">
                    <img alt="${repo.alt || 'Profile Picture'}" src="${repo.profile_url}" height="100" width="100"/>
                </div>
                <div class="profile-name">${repo.name}</div>
                <div class="profile-username">
                    <a href="${repo.git_url}">@${repo.username}</a>
                </div>
                <div class="profile-description" id="typewriterTarget">
                    ${repo.description}
                </div>
            `;

            // Typewriter effect
            const typewriter = new Typewriter("#typewriterTarget", {
                loop: true,
                delay: 75,
                cursor: "|",
            });

            typewriter
                .deleteAll()
                .typeString(repo.description)
                .start();
        })
        .catch(error => console.error("Error fetching repo data:", error));
});
// REPO CARD
document.addEventListener("DOMContentLoaded", function () {
    fetch("json/repo_list.json")  // JSON file fetch kar rahe hain
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok:" + response.status);
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
                    <h2 class="repo_title">${repo.name}</h2>
                    <p class="repo_desc">${repo.description}</p>
                    <span class="repo_stack"><strong>Tech Stack:</strong> ${repo.tech_stack.join(", ")}</span>
                    <div class="mt-4">
                        <a href="${repo.repo_link}" target="_blank" class="repo_git" id="link"><i class="repo_icon_1"></i>  GitHub Repo</a>
                        <a href="${repo.live_link}" target="_blank" class="repo_live" id="live"><i class="repo_icon_2"></>  Live Demo</a>
                    </div>    
                `;
                // debugging line
                console.log("Adding card to container: ", repo.name);
                container.appendChild(card);
                // ✅ Elements ko select karo (ab ye properly work karega)
                const h2 = card.querySelector(".repo_title");
                const p = card.querySelector(".repo_desc");
                const span = card.querySelector(".repo_stack");
                const a1 = card.querySelector(".repo_git");
                const i1 = card.querySelector(".repo_icon_1");
                const a2 = card.querySelector(".repo_live");
                const i2 = card.querySelector(".repo_icon_2");

                h2.classList.add("text-2xl", "font-bold", "text-blue-600", "mb-2");
                p.classList.add("text-gray-700", "mb-4");
                span.classList.add("inline-block", "bg-blue-100", "text-blue-800", "text-xs", "px-2", "py-1", "rounded-full", "uppercase", "font-semibold", "tracking-wide");
                // a.classList.add("btn");
                // i.classList.add("icn");
                // let btns = document.querySelectorAll(".btn");
                // let icns = document.querySelectorAll(".icn");
                a1.classList.add("bg-blue-500", "text-white", "px-4", "py-2", "rounded-lg", "shadow", "hover:bg-blue-600", "transition", "duration-300", "inline-block", "mr-2");
                i1.classList.add("fab", "fa-github");
                a2.classList.add("bg-green-500", "text-white", "px-4", "py-3", "rounded-lg", "shadow", "hover:bg-green-600", "transition", "duration-300", "inline-block");
                i2.classList.add("fas", "fa-external-link-alt");
            });
        })
        .catch(error => console.error("Error fetching repo data:", error));
});
// notification.js
function requestNotificationPermission() {
    if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Notification permission granted.");
            } else {
                console.warn("Notification permission denied.");
            }
        });
    } else {
        console.error("Browser does not support notifications.");
    }
}
// 
function showCustomNotification(title, bodyText, iconUrl) {
    if (Notification.permission === "granted") {
        new Notification(title, {
            body: bodyText,
            icon: iconUrl || "json/devboard_small.png", // fallback icon
            vibrate: [200, 100, 200], // optional
            tag: "custom-tag", // replace old notification if tag is same
        });
    } else {
        requestNotificationPermission();
    }
}
// Call this somewhere like a button press or app load
requestNotificationPermission();
const live = document.getElementById("live");
console.log(live);
live.addEventListener("click", function () {
    showCustomNotification("Devboard", "got live on DevBoard Application","json/devboard_small.png");
    console.log("OK Notification",live);
});
