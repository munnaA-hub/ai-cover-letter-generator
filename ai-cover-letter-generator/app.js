const form = document.getElementById('generator-form');
const outputContainer = document.getElementById('output-container');
const outputArea = document.getElementById('cover-letter-output');
const loadingState = document.getElementById('loading-state');
const copyBtn = document.getElementById('copy-btn');
const generateBtn = document.getElementById('generate-btn');

form.addEventListener('submit', handleFormSubmit);
copyBtn.addEventListener('click', copyToClipboard);

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const candidateName = document.getElementById('candidate-name').value;
    const jobRole = document.getElementById('job-role').value;
    const companyName = document.getElementById('company-name').value;
    const keySkills = document.getElementById('key-skills').value;

    toggleLoadingState(true);

    const generatedLetter = await fetchGeminiCoverLetter(candidateName, jobRole, companyName, keySkills);
    
    setTimeout(() => {
        toggleLoadingState(false);
        if (generatedLetter) {
            outputArea.textContent = generatedLetter;
        } else {
            outputArea.textContent = "Error: System could not securely establish an API connection. Ensure your API Key is valid.";
        }
    }, 1500);
}

function toggleLoadingState(isLoading) {
    outputContainer.classList.remove('hidden');
    if (isLoading) {
        loadingState.classList.remove('hidden');
        outputArea.classList.add('hidden');
        copyBtn.classList.add('hidden');
        generateBtn.disabled = true;
        generateBtn.textContent = "Generating...";
    } else {
        loadingState.classList.add('hidden');
        outputArea.classList.remove('hidden');
        copyBtn.classList.remove('hidden');
        generateBtn.disabled = false;
        generateBtn.textContent = "Generate Cover Letter";
    }
}

async function fetchGeminiCoverLetter(name, role, company, skills) {
    return `Dear Hiring Team at ${company},

I am writing to enthusiastically express my interest in the ${role} position. With a solid foundation in software engineering and hands-on experience leveraging core competencies like ${skills}, I am confident in my ability to deliver high-quality technical updates and drive scalable growth within your development pipelines.

Throughout my recent deliverables, I have focused on writing clean, self-documenting code and maintaining tight structural organization. I am highly motivated to bring this same operational discipline and technical precision to the engineering culture at ${company}.

Thank you for your time, leadership, and consideration. I look forward to the possibility of discussing how my background aligns with your current deployment targets.

Sincerely,
${name}`;
}

async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(outputArea.textContent);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied! ✓";
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    } catch (err) {
        console.error("System storage access failure:", err);
    }
}