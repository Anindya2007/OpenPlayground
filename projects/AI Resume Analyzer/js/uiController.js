document.addEventListener("DOMContentLoaded", () => {

    const analyzeBtn = document.getElementById("analyzeBtn");
    const resumeText = document.getElementById("resumeText");
    const jdText = document.getElementById("jdText");

    const score = document.getElementById("score");
    const matchedSkills = document.getElementById("matchedSkills");
    const missingSkills = document.getElementById("missingSkills");

    analyzeBtn.addEventListener("click", () => {

        analyzeBtn.innerHTML = "Analyzing...";
        analyzeBtn.disabled = true;

        setTimeout(() => {

            const resume = resumeText.value.trim().toLowerCase();
            const jd = jdText.value.trim().toLowerCase();

            if (!resume || !jd) {

                alert("Please fill both Resume and Job Description.");

                analyzeBtn.innerHTML = "Analyze Resume";
                analyzeBtn.disabled = false;

                return;
            }

            // Split into exact words
            const resumeWords = [...new Set(resume.split(/\s+/))];
            const jdWords = [...new Set(jd.split(/\s+/))];

            const matched = [];
            const missing = [];

            jdWords.forEach(word => {

                if (resumeWords.includes(word)) {
                    matched.push(word);
                } else {
                    missing.push(word);
                }

            });

            // ATS Score Calculation
            const atsScore = Math.round(
                (matched.length / jdWords.length) * 100
            );

            // Update Score
            score.textContent = atsScore + "%";

            // Update Matched Skills
            matchedSkills.innerHTML = matched
                .map(skill => `<li>${skill}</li>`)
                .join("");

            // Update Missing Skills
            missingSkills.innerHTML = missing
                .map(skill => `<li>${skill}</li>`)
                .join("");

            // Reset Button
            analyzeBtn.innerHTML = "Analyze Resume";
            analyzeBtn.disabled = false;

        }, 1200);

    });

});