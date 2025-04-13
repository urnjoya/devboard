const profile = document.getElementById("profile");
const repo_card = document.getElementById("repo-card");
const first = document.getElementById("first");
const container = document.getElementById("navigation");
// import Typewriter from 'typewriter-effect/dist/core';

// new Typewriter('#typewriter', {
//     strings: ['Hello', 'World'],
//     autoStart: true,
// });
document.addEventListener("DOMContentLoaded", function () {
    fetch("json/profile.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok: " + response.status);
            }
            return response.json();
        })
        .then(profile => { // 'data' ki jagah 'repo' (ek single object)

            if (!container) {
                console.info("Container element not found");
                return;
            }
            container.innerHTML = `
                <nav class="navbar">
                    <div class="logo"><img src="${profile.profile_url}" alt="Logo" width="40px" height="40px"></div>
                        <ul>
                            <li class="first"><a href="##">Home</a></li>
                            <li class="second"><a href="##">Thought</a></li>
                            <li class="third"><a href="##">About us</a></li>
                            <li class="fourth"><a href="##">IMP</a></li>
                        </ul>
                        <div class="hamburger" onclick="toggleSidebar()">
                            <div></div>
                            <div></div>
                            <div></div>
                    </div>
                </nav>
                <div class="sidebar" id="sidebar">
                    <ul>
                        <li class="first"><a href="#">Home</a></li>
                        <li class="second"><a href="#">Thought</a></li>
                        <li class="third"><a href="#">About us</a></li>
                        <li class="fourth"><a href="#">IMP</a></li>
                    </ul>
        </div>
              `;
        })
        .catch(error => console.error("Error fetching repo data:", error));
});

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

// footer
document.addEventListener("DOMContentLoaded", function () {
    fetch("json/footer.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok: " + response.status);
            }
            return response.json();
        })
        .then(foot => { // 'data' ki jagah 'repo' (ek single object)
            const container = document.getElementById("footer");

            if (!container) {
                console.info("Container element not found");
                return;
            }

            container.innerHTML = `
            <section class="version-info">
                Version ${foot.version}
            </section>
            <section class="share-data">
                <button onclick="shareData()" id="share">
                <img src="https://img.icons8.com/?size=20&id=YxakpbprUt1s&format=png&color=000000"> Share devboard</button>
            </section>
            <section class="g-form">
                <a href="https://forms.gle/uFMDxspf9UiyMgT26">Feedback</a>
            </section>
            <button id="colorButton" onclick="clearCacheAndRefresh()" >
                    Refresh
            </button>
            <section class="email-connect">
                Connect via Email: <a href="mailto:${foot.email}">${foot.email}</a>
            </section>
            `;

            console.log("Profile data added:", foot.name);
        })
        .catch(error => console.error("Error fetching repo data:", error));
});

function shareData() {
    if (navigator.share) {
        navigator.share({
            title: 'devboard',
            text: 'Check out this awesome dev portfolio! called devboard',
            url: window.location.href
        })
            .then(() => console.log('Shared successfully!'))
            .catch((error) => console.log('Error sharing:', error));
    } else {
        alert('Share not supported on this browser.');
    }
}

// notification.js
const share = document.getElementById("share");
console.log(share);
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

share.addEventListener("click", function () {
    showCustomNotification("Devboard", "got live on DevBoard Application","json/devboard_small.png");
    console.log("OK Notification",share);
});

// SECRET
// const frc = document.getElementById("colorButton");
// frc.style.display = "none";
// let inputBuffer = "";

// document.addEventListener("keydown", function (e) {
//     // Only take number keys (ignore other)
//     if (!isNaN(e.key)) {
//         inputBuffer += e.key;

//         // Limit buffer size to 4
//         if (inputBuffer.length > 4) {
//             inputBuffer = inputBuffer.slice(-4); // Keep last 4 digits
//         }

//         // Check if sequence matched
//         if (inputBuffer === "5565") {
//             alert("force refresh button generate");
//             // Tum yahan koi bhi action chala sakte ho
//             frc.style.display = "inline";
//             inputBuffer = ""; // Reset buffer if you want
//         }
//     }
// });
