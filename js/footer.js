document.addEventListener("DOMContentLoaded", function () {
    fetch("https://urnjoya.github.io/devboard/json/footer.json")
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
                <button onclick="shareData()">
                <img src="https://img.icons8.com/?size=20&id=YxakpbprUt1s&format=png&color=000000"> Share devboard</button>
            </section>
            <section class="g-form">
                <a href="https://forms.gle/uFMDxspf9UiyMgT26">Feedback</a>
            </section>
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
