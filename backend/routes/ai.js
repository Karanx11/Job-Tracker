const router = require("express").Router();
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

//Resume Buid
router.post("/resume", async (req, res) => {
  try {
    const { role, company } = req.body;

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `Generate 4 strong resume bullet points for a ${role} role at ${company}.

Return ONLY JSON like this:
{"points":["point1","point2","point3","point4"]}

DO NOT add any extra text.`,
        },
      ],
    });

    const text = response.choices[0].message.content;

    // 🔥 SAFE PARSE (IMPORTANT)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const data = jsonMatch ? JSON.parse(jsonMatch[0]) : { points: [] };

    res.json(data);
  } catch (err) {
    console.log("AI ERROR:", err.response?.data || err.message);
    res.status(500).json("AI error");
  }
});

//Parse Ai
router.post("/parse", async (req, res) => {
  try {
    const { jd } = req.body;

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `Extract the following from this job description:

- company
- role
- required_skills
- nice_to_have_skills
- seniority
- location

Return ONLY JSON in this format:
{
  "company": "",
  "role": "",
  "required_skills": [],
  "nice_to_have_skills": [],
  "seniority": "",
  "location": ""
}

Job Description:
${jd}
`,
        },
      ],
    });

    const text = response.choices[0].message.content;

    // ✅ SAFE PARSE
    let data = {};
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) data = JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.log("Parse error");
    }

    res.json(data);
  } catch (err) {
    console.log("AI ERROR:", err.response?.data || err.message);
    res.status(500).json("AI error");
  }
});

module.exports = router;