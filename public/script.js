// ================= ASK AI =================
async function askAI() {

    const questionInput =
        document.getElementById("question");

    const question = questionInput.value.trim();

    const chatBox =
        document.getElementById("chatBox");

    const loading =
        document.getElementById("loading");

    if (question === "") {
        alert("Please enter a question");
        return;
    }

    // Show user message
    chatBox.innerHTML +=
        `<div class="user">🧑 ${question}</div>`;

    questionInput.value = "";
    loading.innerHTML = "🤖 AI is thinking...";

    try {

        // Call backend instead of Gemini directly
        const response = await fetch("/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question })
        });

        const data = await response.json();

        const answer =
            data.candidates[0].content.parts[0].text;

        // Show AI response
        chatBox.innerHTML +=
            `<div class="ai">🤖 ${answer}</div>`;

        // Show related image
        showImage(question);

        // Show related video
        showVideo(question);

        loading.innerHTML = "";

        chatBox.scrollTop =
            chatBox.scrollHeight;

    } catch (error) {
        console.log(error);
        loading.innerHTML = "";
        chatBox.innerHTML +=
            `<div class="ai">⚠️ Error getting response</div>`;
    }
}


// ================= SHOW IMAGE =================
function showImage(topic) {

    const imageURL =
        `https://source.unsplash.com/600x300/?${topic},education`;

    document.getElementById("chatBox").innerHTML += `
        <div class="ai">
            🖼 Concept Image:
            <img src="${imageURL}" width="100%" 
            style="border-radius:10px;margin-top:8px;">
        </div>`;
}


// ================= SHOW VIDEO =================
function showVideo(topic) {

    document.getElementById("chatBox").innerHTML += `
        <div class="ai">
            🎥 Related Video:
            <iframe width="100%" height="250"
            src="https://www.youtube.com/embed?listType=search&list=${topic}"
            frameborder="0"
            allowfullscreen>
            </iframe>
        </div>`;
}


// ================= CLEAR CHAT =================
function clearChat() {
    document.getElementById("chatBox").innerHTML = "";
}


// ================= ENTER KEY SUPPORT =================
document
.getElementById("question")
.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        askAI();
    }
});
