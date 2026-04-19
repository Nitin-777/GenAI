const generateInterviewReport = require('../services/ai.service');
const interviewReportModel = require('../models/interviewReport.model');
const { findOne } = require('../models/blacklist.model');

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

function normalizeAiResponse(data) {
    return {
        ...data,

        technicalQuestions: (data.technicalQuestions || []).map(item => {
            if (typeof item === "string") {
                return { question: item, intention: "To assess candidate knowledge", answer: "Provide a detailed explanation with examples" };
            }
            return item;
        }),

        behavioralQuestions: (data.behavioralQuestions || []).map(item => {
            if (typeof item === "string") {
                return { question: item, intention: "To assess soft skills", answer: "Use the STAR method to structure your answer" };
            }
            return item;
        }),

        skillGaps: (data.skillGaps || []).map(item => {
            if (typeof item === "string") {
                return { skill: item, severity: "medium" };
            }
            return item;
        }),

        preparationPlan: (data.preparationPlan || []).map((item, index) => {
            if (typeof item === "string") {
                return { day: index + 1, focus: item, tasks: [item] };
            }
            return item;
        }),
    };
}

async function generateInterViewReportController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume file is required" });
        }

        const { selfDescription, jobDescription } = req.body;

        if (!selfDescription || !jobDescription) {
            return res.status(400).json({ message: "Self description and job description are required" });
        }

        const resumeText = await extractTextFromPDF(req.file.buffer);
        
        if (!resumeText || resumeText.trim().length === 0) {
            return res.status(400).json({ message: "Could not extract text from PDF" });
        }
        
        const rawAiResponse = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        });

        const normalizedData = normalizeAiResponse(rawAiResponse);

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...normalizedData
        });

        res.status(201).json({
            message: "Interview Report generated Successfully",
            interviewReport
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Failed to generate report", 
            error: process.env.NODE_ENV === "production" ? "Internal server error" : error.message
        });
    }
}

async function getInterviewReportById(req,res){
    const{ interviewId } = req.params;
    const interviewReport= await interviewReportModel.findOne({_id:interviewId, user:req.user.id})

    if(!interviewReport){
        return res.status(404).json({
            message: " Interview Report Not found."
        })
    }

    res.status(201).json({
        message:"Interview Report fetched Successfully",
        interviewReport
    })
}

async function getAllInterviewReportsController(req,res){
    const interviewReports= await interviewReportModel.find({ user :req.user.id}).sort({createdAt : -1}).select("-resume -selfDescription -jobDescription -_v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(201).json({
        message:"Interview Reports fetched Successfully",
        interviewReports
    })
}

module.exports = { generateInterViewReportController, getInterviewReportById,getAllInterviewReportsController};