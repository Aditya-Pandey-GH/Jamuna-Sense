const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;

// Voice settings for Web Speech API
const VOICES_CONFIG = {
  bujho: {
    rate: 1.05, // Not too fast
    pitch: 1.05, // Natural, not cartoonish
    volume: 1,
  }, // Curious Indian student vibe

  paheli: {
    rate: 0.85, // Calm & explanatory
    pitch: 0.9, // Mature, grounded
    volume: 1,
  }, // Teacher / narrator Indian tone
};

/**
 * Audio cache to prevent regenerating same audio
 */
const audioCache = new Map();

/**
 * Generate audio for entire conversation using Web Speech API
 * @param {Array} conversation - Structured conversation data
 * @param {string} cacheKey - Unique key for caching
 * @returns {Promise<string>} - Audio blob URL or data URL
 */
export const generateConversationAudio = async (conversation, cacheKey) => {
  // Check cache first
  if (audioCache.has(cacheKey)) {
    return audioCache.get(cacheKey);
  }

  try {
    const audioChunks = [];

    // Generate audio for each dialogue line using Web Speech API
    for (const line of conversation) {
      const config =
        line.character.toLowerCase() === "bujho"
          ? VOICES_CONFIG.bujho
          : VOICES_CONFIG.paheli;

      const audio = await generateSingleLine(line.text, config);
      audioChunks.push(audio);

      // Add pause between dialogues
      audioChunks.push(await generateSilence(500)); // 500ms pause
    }

    // Combine all audio chunks
    const finalAudioBlob = await combineAudioChunks(audioChunks);
    const audioUrl = URL.createObjectURL(finalAudioBlob);

    // Cache the result
    audioCache.set(cacheKey, audioUrl);

    return audioUrl;
  } catch (error) {
    console.error("Error generating conversation audio:", error);
    throw error;
  }
};

/**
 * Generate audio for a single line using Web Speech API
 * @param {string} text - Text to convert to speech
 * @param {Object} config - Voice configuration
 * @returns {Promise<Blob>} - Audio blob
 */
const generateSingleLine = async (text, config) => {
  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = config.rate || 1;
    utterance.pitch = config.pitch || 1;
    utterance.volume = config.volume || 1;

    // Use available voices, prefer female for paheli, male for bujho
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      utterance.voice = voices[0];
    }

    utterance.onend = () => {
      // Return a simple audio blob (using Web Audio API)
      createAudioBlob(text, config).then(resolve).catch(reject);
    };

    utterance.onerror = (e) => {
      console.error("Speech synthesis error:", e);
      reject(new Error("Speech synthesis failed"));
    };

    // Speak the text
    speechSynthesis.speak(utterance);
  });
};

/**
 * Create an audio blob using Web Audio API
 * @param {string} text - Text being converted
 * @param {Object} config - Voice configuration
 * @returns {Promise<Blob>} - Audio blob
 */
const createAudioBlob = async (text, config) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const sampleRate = audioContext.sampleRate;
  const duration = Math.max(2, text.length / 10); // Estimate duration based on text length
  const numSamples = duration * sampleRate;

  const buffer = audioContext.createBuffer(1, numSamples, sampleRate);
  const data = buffer.getChannelData(0);

  // Generate a simple sine wave for demonstration
  const frequency = config.pitch ? 440 * config.pitch : 440;
  for (let i = 0; i < numSamples; i++) {
    data[i] = Math.sin((2 * Math.PI * frequency * i) / sampleRate) * 0.3;
  }

  // Convert buffer to blob
  return new Promise((resolve) => {
    const offlineContext = new OfflineAudioContext(1, numSamples, sampleRate);
    const offlineBuffer = offlineContext.createBuffer(
      1,
      numSamples,
      sampleRate,
    );
    const offlineData = offlineBuffer.getChannelData(0);

    for (let i = 0; i < numSamples; i++) {
      offlineData[i] = data[i];
    }

    const source = offlineContext.createBufferSource();
    source.buffer = offlineBuffer;
    source.connect(offlineContext.destination);
    source.start(0);

    offlineContext.startRendering().then((renderedBuffer) => {
      const blob = new Blob([renderedBuffer.getChannelData(0)], {
        type: "audio/wav",
      });
      resolve(blob);
    });
  });
};

/**
 * Generate silence audio
 * @param {number} durationMs - Duration in milliseconds
 * @returns {Promise<Blob>} - Silent audio blob
 */
const generateSilence = async (durationMs) => {
  // Create silent audio using Web Audio API
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const sampleRate = audioContext.sampleRate;
  const numSamples = (durationMs / 1000) * sampleRate;
  const buffer = audioContext.createBuffer(1, numSamples, sampleRate);

  // Convert buffer to WAV blob
  return bufferToWave(buffer, numSamples);
};

/**
 * Combine multiple audio blobs into one
 * @param {Array<Blob>} audioChunks - Array of audio blobs
 * @returns {Promise<Blob>} - Combined audio blob
 */
const combineAudioChunks = async (audioChunks) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const buffers = [];

  // Decode all audio chunks
  for (const chunk of audioChunks) {
    const arrayBuffer = await chunk.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    buffers.push(audioBuffer);
  }

  // Calculate total length
  const totalLength = buffers.reduce((sum, buffer) => sum + buffer.length, 0);

  // Create combined buffer
  const combinedBuffer = audioContext.createBuffer(
    1,
    totalLength,
    audioContext.sampleRate,
  );

  // Copy all buffers into combined buffer
  let offset = 0;
  buffers.forEach((buffer) => {
    combinedBuffer.copyToChannel(buffer.getChannelData(0), 0, offset);
    offset += buffer.length;
  });

  // Convert to blob
  return bufferToWave(combinedBuffer, totalLength);
};

/**
 * Convert AudioBuffer to WAV Blob
 * @param {AudioBuffer} buffer - Audio buffer
 * @param {number} length - Length in samples
 * @returns {Blob} - WAV audio blob
 */
const bufferToWave = (buffer, length) => {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;

  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;

  const data = new Float32Array(length);
  buffer.copyFromChannel(data, 0);

  const dataLength = length * blockAlign;
  const headerLength = 44;
  const totalLength = headerLength + dataLength;

  const arrayBuffer = new ArrayBuffer(totalLength);
  const view = new DataView(arrayBuffer);

  // WAV header
  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + dataLength, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(view, 36, "data");
  view.setUint32(40, dataLength, true);

  // Write audio data
  floatTo16BitPCM(view, 44, data);

  return new Blob([arrayBuffer], { type: "audio/wav" });
};

const writeString = (view, offset, string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};

const floatTo16BitPCM = (view, offset, input) => {
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
};
