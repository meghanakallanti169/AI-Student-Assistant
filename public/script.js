async function askAI() {

    const input =
        document.getElementById("question");

    const question = input.value.trim();

    const chatBox =
        document.getElementById("chatBox");

    if (!question) return;

    chatBox.innerHTML +=
        `<div class="user">${question}</div>`;

    input.value = "";

    try {

        const response = await fetch("/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question })
        });

        const data = await response.json();

        console.log("AI Response:", data);

        let answer = "No response received";

        if (
            data.candidates &&
            data.candidates.length > 0
        ) {
            answer =
            data.candidates[0]
            .content.parts[0].text;
        } 
        else if (data.error) {
            answer = data.error.message;
        }

        chatBox.innerHTML +=
            `<div class="ai">${answer}</div>`;

        showImage(question);
        showVideo(question);

        chatBox.scrollTop =
            chatBox.scrollHeight;

    } catch (error) {
        console.error(error);
        chatBox.innerHTML +=
            `<div class="ai">Error getting response</div>`;
    }
}

// Image
function showImage(topic) {
    document.getElementById("chatBox").innerHTML += `
        <div class="ai">
            <img src="https://source.unsplash.com/600x300/?${topic},education"
            width="100%">
        </div>`;
}

// Video
function showVideo(topic) {
    document.getElementById("chatBox").innerHTML += `
        <div class="ai">
            <iframe width="100%" height="250"
            src="https://www.youtube.com/embed?listType=search&list=${topic}"
            allowfullscreen></iframe>
        </div>`;
}

function clearChat(){
    document.getElementById("chatBox").innerHTML="";
}
