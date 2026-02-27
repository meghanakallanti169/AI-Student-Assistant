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
    loading.innerHTML = "🤖 AI preparing study notes...";

    const apiKey = "YOUR_API_KEY_HERE";

    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{
                                text: `
Explain the topic for a student.

Topic: ${question}

Give response in this format:
1. Simple Explanation
2. Key Points
3. Real Life Example
4. Important Exam Notes
`
                            }]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        const answer =
            data.candidates[0].content.parts[0].text;

        // Show AI response
        chatBox.innerHTML +=
            `<div class="ai">🤖 ${answer}</div>`;

        // Show diagram
        showDiagram(question);

        // Show video
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


// ================= DIAGRAM =================
function showDiagram(topic) {

    const diagramURL =
        `https://source.unsplash.com/700x350/?${topic},diagram,education`;

    document.getElementById("chatBox").innerHTML += `
        <div class="ai">
            📊 Concept Diagram:
            <img src="${diagramURL}" width="100%">
        </div>`;
}


// ================= VIDEO =================
function showVideo(topic) {

    document.getElementById("chatBox").innerHTML += `
        <div class="ai">
            🎥 Related Learning Video:
            <iframe width="100%" height="250"
            src="https://www.youtube.com/embed?listType=search&list=${topic}"
            allowfullscreen>
            </iframe>
        </div>`;
}


// ================= QUICK PROMPTS =================
function quickPrompt(text) {
    document.getElementById("question").value = text;
}


// ================= DOWNLOAD NOTES =================
function downloadNotes() {

    const content =
        document.getElementById("chatBox").innerText;

    const blob =
        new Blob([content], { type: "text/plain" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "StudyNotes.txt";
    a.click();
}


// ================= CLEAR CHAT =================
function clearChat() {
    document.getElementById("chatBox").innerHTML = "";
}


// ================= ENTER KEY SEND =================
document.getElementById("question")
.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        askAI();
    }
});
