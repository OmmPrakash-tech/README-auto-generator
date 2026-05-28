function buildPrompt(repoData, analysis) {
    return `
Generate a professional README.md for this GitHub project.

Repository:
${repoData.full_name}

Description:
${repoData.description}

Primary Language:
${repoData.language}

Files:
${analysis.files.join(", ")}

Include:
- Project Title
- Description
- Features
- Installation
- Usage
- Tech Stack
- Contributing
- License
`;
}

module.exports = buildPrompt;