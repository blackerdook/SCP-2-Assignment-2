function loadScpmenu() {
    fetch('assets/data.json') // Make sure the path to your data.json is correct
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const scpNav = document.getElementById("SCP-nav");

            // Dynamically add SCP links
            data.forEach(SCP => {
                const link = document.createElement('a');
                link.href = `#${SCP.item}`;
                link.textContent = SCP.item;
                link.onclick = function(event) {
                    event.preventDefault();
                    loadSCP(SCP);  
                };
                scpNav.appendChild(link);
            });
        })
        .catch(error => console.error("Error loading data:", error));
}

function loadSCP(SCP) {
    const displayDiv = document.getElementById("screen");

    // Stop any ongoing speech before loading new SCP
    stopSpeech();

    const content = `
        <div class="scp-container">
            <img src="${SCP.image}" alt="${SCP.item}" class="scp-image">
            <div class="scp-info">
                <h2>${SCP.item}</h2>
                <p><strong>Class: </strong>${SCP.class}</p>
                <p><strong>Containment: </strong>${SCP.containment}</p>
                <p><strong>Description: </strong>${SCP.description}</p>
                <button id="read-description">Read</button>
            </div>
        </div>
    `;

    displayDiv.innerHTML = content;

    // Text-to-Speech functionality
    document.getElementById('read-description').onclick = function() {
        read_description(SCP.description);
    };
}

function read_description(description) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = description;
    speech.voice = speechSynthesis.getVoices()[5];
    speechSynthesis.speak(speech);
}

function stopSpeech() {
    speechSynthesis.cancel();
}

window.onload = () => { 
    loadScpmenu(); 
};
