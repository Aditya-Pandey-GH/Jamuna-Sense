const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export const generateConversation = async (fact, language = "hinglish") => {
  const prompt =
    language === "hinglish"
      ? `Create a SHORT conversation (EXACTLY 6-8 lines) between Bujho and Paheli about: "${fact}"

Bujho: Curious student (surprised, playful)
Paheli: Knowledgeable friend (calm, dramatic)

Rules:
- Use Hinglish naturally
- Each line under 15 words
- Add emotion: [surprised], [serious], [concerned], [excited], [worried], [shocked]
- Student-friendly
- Impactful ending

Format:
Bujho [emotion]: text
Paheli [emotion]: text

Example:
Bujho [surprised]: Kya Yamuna mein swimming karna safe hai?
Paheli [serious]: Bilkul nahi! Paani mein bacteria itna zyada hai ki bimar ho jaoge.
Bujho [worried]: Toh phir fish kaise survive karti hain?
Paheli [sad]: Wahi toh problem hai, bahut saari fish species extinct ho gayi hain.`
      : `Create a SHORT conversation (EXACTLY 6-8 lines) between Bujho and Paheli about: "${fact}"

Bujho: Curious student (surprised, playful)
Paheli: Knowledgeable friend (calm, dramatic)

Rules:
- Simple English
- Each line under 15 words
- Add emotion: [surprised], [serious], [concerned], [excited], [worried], [shocked]
- Student-friendly
- Impactful ending

Format:
Bujho [emotion]: text
Paheli [emotion]: text

Example:
Bujho [surprised]: Is it safe to swim in the Yamuna?
Paheli [serious]: Not at all! The water has so much bacteria you'll get sick.
Bujho [worried]: Then how do fish survive?
Paheli [sad]: That's the problem, many fish species have gone extinct.`;

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 500,
        },
      }),
    });

    if (!response.ok) throw new Error("Gemini API failed");

    const data = await response.json();
    const conversationText = data.candidates[0].content.parts[0].text.trim();

    return parseConversation(conversationText);
  } catch (error) {
    console.error("Gemini error:", error);
    throw error;
  }
};

const parseConversation = (text) => {
  const lines = text.split("\n").filter((line) => line.trim());
  const conversation = [];

  lines.forEach((line) => {
    const match = line.match(/^(Bujho|Paheli)\s*\[(.*?)\]:\s*(.+)$/i);
    if (match) {
      conversation.push({
        character: match[1].trim(),
        emotion: match[2].trim(),
        text: match[3].trim(),
      });
    }
  });

  return conversation;
};
