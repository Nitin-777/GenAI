const {GoogleGenAI} = require("@google/genai")
const{ z }= require("zod")


const ai= new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY

})
     const interviewReportSchema= z.object({
        
        matchScore: z.number().describe("A score between 0 and 100 indication how well the candidate's profile matches the job describe"),

        technicalQuestions: z.array(z.object({
             question: z.string().describe("The technical questions that can be asked in an interview"),
             intention: z.string().describe("The intention of interviewer behind asking this question"),
             answer: z.string().describe("How to answer this question , what points to cover, what approach to take")
        })).describe("Technical questions that can be asked in the interview along with the intention and how to answer them"),

        behavioralQuestions: z.array(z.object({
             question: z.string().describe("The behavioral questions that can be asked in an interview"),
             intention: z.string().describe("The intention of interviewer behind asking this question"),
             answer: z.string().describe("How to answer this question , what points to cover, what approach to take")
        })).describe("Behavioural questions that can be asked in the interview with their intentions"),

        skillGaps:z.array(z.object({
            skill: z.string().describe("The skill which candidate is lacking"), 
            severity: z.enum(["low", "medium", "high"]).describe("The Severity of this skill gap")
        })).describe("List of skill Gaps int the candidates profile along with their severity"),

        preparationPlan:z.array(z.object({
             day: z.number().describe("The number in preperation plan starting from 1"),
             focus: z.string().describe("The main focus of this day in the preperation plan eg. data"),
             tasks:  z.array(z.string()).describe(" List of tasks to be done on this particular day ")
        })).describe("A day wise preparation plan for the candidate to follow"),
         title:z.string().describe("The title of the job for which the report is generated"),
     })


async function generateInterviewReport({resume, selfDescription, jobDescription}){
    try {
        if (!resume || resume.trim().length === 0) {
            throw new Error("Resume text is empty");
        }
        if (!jobDescription || jobDescription.trim().length === 0) {
            throw new Error("Job description is empty");
        }
        if (!selfDescription || selfDescription.trim().length === 0) {
            throw new Error("Self description is empty");
        }

        const prompt = `You are an expert career coach and interview preparation specialist. Analyze the following candidate's resume, self-description, and job description to generate a comprehensive interview preparation report.

CANDIDATE RESUME:
${resume}

CANDIDATE SELF-DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}

Generate a detailed interview preparation report in VALID JSON format (no markdown, no extra text). The JSON must contain exactly these fields:
{
  "matchScore": <number 0-100>,
  "title": "<job title>",
  "technicalQuestions": [
    {
      "question": "<question>",
      "intention": "<why asked>",
      "answer": "<how to answer>"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "<question>",
      "intention": "<why asked>",
      "answer": "<how to answer>"
    }
  ],
  "skillGaps": [
    {
      "skill": "<skill name>",
      "severity": "low|medium|high"
    }
  ],
  "preparationPlan": [
    {
      "day": <number>,
      "focus": "<focus area>",
      "tasks": ["<task1>", "<task2>"]
    }
  ]
}

IMPORTANT: Return ONLY valid JSON. No markdown, no explanation, no extra text.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt,
        });

        const responseText = response.candidates[0].content.parts[0].text;
        
        // Extract JSON from the response (in case there's any formatting)
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("No valid JSON found in API response");
        }
        
        const parsedResponse = JSON.parse(jsonMatch[0]);
        return parsedResponse;
    } catch (error) {
        throw new Error(`AI Service failed: ${error.message}`);
    }
}



module.exports=generateInterviewReport