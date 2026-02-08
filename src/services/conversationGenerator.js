const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Generate a short conversation between Bujho and Paheli
 * @param {string} fact - The fact to build conversation around
 * @param {string} language - 'hinglish' or 'english'
 * @returns {Promise<Array>} - Array of conversation objects
 */
export const generateConversation = async (fact, language = "hinglish") => {
  const prompt =
    language === "hinglish"
      ? `Create a very short conversation (6-8 lines MAXIMUM) between two characters about this Yamuna river fact: "${fact}"

Characters:
- Bujho: A curious, playful student who is surprised and asks questions (speaks in Hinglish)
- Paheli: A knowledgeable friend who explains calmly but dramatically (speaks in Hinglish)

Rules:
1. Use Hinglish (Hindi-English mix) naturally
2. Keep each dialogue under 15 words
3. Include emotions in square brackets: [surprised], [serious], [concerned], [excited], [worried]
4. Make it engaging for students
5. End on an impactful note

Format each line as:
Character [emotion]: dialogue text

Example:
Bujho [surprised]: Kya sach mein Yamuna itni polluted hai?
Paheli [serious]: Haan, 70% Delhi ka sewage directly river mein jaata hai.`
      : `Create a very short conversation (6-8 lines MAXIMUM) between two characters about this Yamuna river fact: "${fact}"

Characters:
- Bujho: A curious, playful student who is surprised and asks questions
- Paheli: A knowledgeable friend who explains calmly but dramatically

Rules:
1. Use simple English
2. Keep each dialogue under 15 words
3. Include emotions in square brackets: [surprised], [serious], [concerned], [excited], [worried]
4. Make it engaging for students
5. End on an impactful note

Format each line as:
Character: [emotion] dialogue text

Example:
Bujho [surprised]: Is the Yamuna really that polluted?
Paheli [serious]: Yes, 70% of Delhi's sewage flows directly into it.`;

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const data = await response.json();
    const conversationText = data.candidates[0].content.parts[0].text.trim();

    // Parse conversation into structured format
    return parseConversation(conversationText);
  } catch (error) {
    console.error("Error generating conversation:", error);
    throw error;
  }
};

/**
 * Parse conversation text into structured array
 * @param {string} text - Raw conversation text
 * @returns {Array} - Structured conversation data
 */
const parseConversation = (text) => {
  const lines = text.split("\n").filter((line) => line.trim());
  const conversation = [];

  lines.forEach((line) => {
    // Match format: "Character [emotion]: dialogue"
    const match = line.match(/^(Bujho|Paheli)\s*\[(.*?)\]:\s*(.+)$/i);
    if (match) {
      conversation.push({
        character: match[1],
        emotion: match[2],
        text: match[3].trim(),
      });
    }
  });

  return conversation;
};

/**
 * Convert conversation array to SSML for ElevenLabs
 * @param {Array} conversation - Structured conversation data
 * @returns {string} - SSML formatted text
 */
export const conversationToSSML = (conversation) => {
  return conversation
    .map((line) => {
      // ElevenLabs doesn't use full SSML but we can add pauses
      return `${line.text}<break time="0.5s"/>`;
    })
    .join(" ");
};
