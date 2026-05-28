const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const AdmZip = require("adm-zip");

async function fetchRepo(repoUrl) {

    try {

        const cleaned = repoUrl.replace("https://github.com/", "");

        const [owner, repo] = cleaned.split("/");

        // GitHub API
        const repoApi =
            `https://api.github.com/repos/${owner}/${repo}`;

        const repoResponse = await axios.get(repoApi);

        const defaultBranch =
            repoResponse.data.default_branch;

        console.log("Default Branch:", defaultBranch);

        // ZIP URL
        const zipUrl =
            `https://github.com/${owner}/${repo}/archive/refs/heads/${defaultBranch}.zip`;

        console.log("ZIP URL:", zipUrl);

        // Unique folders
        const tempDir =
            path.join(__dirname, "../temp");

        const zipPath =
            path.join(tempDir, `${repo}.zip`);

        const extractPath =
            path.join(tempDir, `${repo}-extracted`);

        // Cleanup
        fs.ensureDirSync(tempDir);

        if (fs.existsSync(zipPath)) {
            fs.unlinkSync(zipPath);
        }

        if (fs.existsSync(extractPath)) {
            fs.removeSync(extractPath);
        }

        // Download ZIP
        const response = await axios({
            url: zipUrl,
            method: "GET",
            responseType: "arraybuffer",
            timeout: 30000
        });

        console.log("ZIP Downloaded");

        fs.writeFileSync(zipPath, response.data);

        // Extract
        const zip = new AdmZip(zipPath);

        zip.extractAllTo(extractPath, true);

        console.log("ZIP Extracted");

        return {
    success: true,
    extractPath,
    repoData: repoResponse.data
};

    } catch (error) {

        console.log("FETCH ERROR:");
        console.log(error);

        return {
            success: false,
            message: error.message
        };

    }

}

module.exports = fetchRepo;