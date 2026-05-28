const express = require("express");

const fetchRepo = require("../services/repoFetcher");
const analyzeRepo = require("../services/codeAnalyzer");
const buildPrompt = require("../services/promptBuilder");
const generateReadme = require("../services/geminiService");

const router = express.Router();

const saveReadme = require("../services/saveReadme");

router.post("/generate", async (req, res) => {

    try {

        const { repoUrl } = req.body;

        if (!repoUrl) {

            return res.status(400).json({
                success: false,
                message: "Repository URL is required"
            });

        }

        if (!repoUrl.includes("github.com")) {
              return res.status(400).json({
                success: false,
                message: "Invalid GitHub repository URL"
            });

        }

        const repoResponse = await fetchRepo(repoUrl);

        if (!repoResponse.success) {

            return res.status(500).json(repoResponse);

        }

        const analysis = analyzeRepo(repoResponse.extractPath);

        if (analysis.files.length === 0) {

            return res.status(400).json({
                success: false,
                message: "No readable files found in repository"
            });

        }

        const prompt = buildPrompt(
            repoResponse.repoData,
            analysis
        );

        const readme = await generateReadme(prompt);

        const savedFile = await saveReadme(readme);

        res.json({
    success: true,
    analysis,
    readme,
    savedFile
});

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });

    }

});

module.exports = router;