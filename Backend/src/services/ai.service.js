const {GoogleGenAI} = require("@google/genai")
const{ z }= require("zod")
const {zodToJsonSchema} =require("zod-to-json-schema")


const ai= new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY

})

// async function invokeGeminiAi(){
//    const response= await ai.models.generateContent({
//     model:"gemini-2.5-flash",
//     contents:"Hello gemini explain what is a interview?"
//    })

//    console.log(response.text)
// }
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
         
     })


async function generateInterviewReport({resume, selfDescription, jobDescription}){
    const prompt=`You are an AI interview assistant.

Generate a detailed interview report in STRICT JSON format.

Follow the provided schema EXACTLY.

Rules:
- Do NOT return anything except JSON
- Do NOT add explanations
- Fill all fields
- matchScore must be between 0–100
- technicalQuestions must have at least 5 items
- behavioralQuestions must have at least 4 items
- skillGaps must have at least 3 items
- preparationPlan must cover at least 7 days

                    Resume:${resume}
                    self Description:${selfDescription}
                    job Description: ${jobDescription}

     `
         const response= await ai.models.generateContent({
                 model:"gemini-3-flash-preview",
                 contents:prompt,
                 config:{
                    responseMimeType:"application/json",
                    responseSchema:zodToJsonSchema( interviewReportSchema)
                 }
         })

        return (JSON.parse(response.text))
     
}

module.exports=generateInterviewReport