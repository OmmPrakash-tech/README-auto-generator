const fs = require("fs");
const path = require("path");

function getAllFiles(dirPath, arrayOfFiles = []) {

    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {

        const fullPath = path.join(dirPath, file);

        if (fs.statSync(fullPath).isDirectory()) {

            getAllFiles(fullPath, arrayOfFiles);

        } else {

            arrayOfFiles.push(file);

        }

    });

    return arrayOfFiles;
}

function analyzeRepo(repoPath) {

    const folders = fs.readdirSync(repoPath);

    const mainFolder =
        path.join(repoPath, folders[0]);

    const files = getAllFiles(mainFolder);

    return {
        totalFiles: files.length,
        files,
    };
}

module.exports = analyzeRepo;