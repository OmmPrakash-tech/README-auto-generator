const fs = require("fs-extra");
const path = require("path");

async function saveReadme(content) {

    const outputDir = path.join(__dirname, "../generated");

    fs.ensureDirSync(outputDir);

    const filePath = path.join(
        outputDir,
        `README-${Date.now()}.md`
    );

    fs.writeFileSync(filePath, content);

    return filePath;

}

module.exports = saveReadme;