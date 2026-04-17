const generateInterviewReport = require('../services/ai.service');
const interviewReportModel = require('../models/interviewReport.model');

async function extractTextFromPDF(buffer) {
    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
    const pdf = await loadingTask.promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        fullText += content.items.map(item => item.str).join(" ") + "\n";
    }

    return fullText;
}

async function generateInterViewReportController(req, res) {
    try {
        const resumeText = await extractTextFromPDF(req.file.buffer);
        const { selfDescription, jobDescription } = req.body;

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        });

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        });

        res.status(201).json({
            message: "Interview Report generated Successfully",
            interviewReport
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Failed to generate report", error: error.message });
    }
}

module.exports = { generateInterViewReportController };