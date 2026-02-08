import React, { useState, useEffect, useRef } from "react";
import { didYouKnowFacts } from "../../data/contentData";
import { generateConversation } from "../../services/conversationGenerator";
import { generateConversationAudio } from "../../services/audioService";
import { useAudioPlayer } from "../../Hooks/useAudioPlayer";
import "./DidyouKnow.css";

/**
 * Individual Did You Know Card with Audio Conversation
 */
const DYKCard = ({ item, index, onPlay, isOtherPlaying }) => {
  const [language, setLanguage] = useState("hinglish");
  const [audioUrl, setAudioUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [conversation, setConversation] = useState(null);

  const cacheKey = `dyk-${index}-${language}`;
  const { isPlaying, isLoading, toggle, stop } = useAudioPlayer(
    audioUrl,
    onPlay,
  );

  // Stop audio if another card is playing
  useEffect(() => {
    if (isOtherPlaying && isPlaying) {
      stop();
    }
  }, [isOtherPlaying]);

  // Generate conversation and audio on first play or language change
  const handlePlayClick = async () => {
    if (!audioUrl) {
      await generateAudio();
    }
    toggle();
  };

  const generateAudio = async () => {
    setIsGenerating(true);
    try {
      // Generate conversation
      const conv = await generateConversation(item.fact, language);
      setConversation(conv);

      // Generate audio
      const url = await generateConversationAudio(conv, cacheKey);
      setAudioUrl(url);
    } catch (error) {
      console.error("Error generating audio:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle language toggle
  const toggleLanguage = async () => {
    const newLang = language === "hinglish" ? "english" : "hinglish";
    setLanguage(newLang);
    setAudioUrl(null); // Reset audio URL to trigger regeneration
  };

  return (
    <div className="dyk-card">
      <div className="dyk-number">{index + 1}</div>
      <p className="dyk-fact">{item.fact}</p>
      <div className="dyk-source">{item.source}</div>

      {/* Audio Controls */}
      <div className="dyk-controls">
        <button
          className={`dyk-play-btn ${isPlaying ? "playing" : ""}`}
          onClick={handlePlayClick}
          disabled={isGenerating || isLoading}
        >
          {isGenerating || isLoading ? (
            <span className="loader"></span>
          ) : isPlaying ? (
            "⏸"
          ) : (
            "▶"
          )}
        </button>

        <button
          className="dyk-lang-btn"
          onClick={toggleLanguage}
          disabled={isPlaying || isGenerating}
        >
          {language === "hinglish" ? "🇮🇳 Hinglish" : "🇬🇧 English"}
        </button>
      </div>
    </div>
  );
};

/**
 * Main Did You Know Component
 */
const DidyouKnow = () => {
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);

  const handleCardPlay = (index) => {
    setCurrentPlayingIndex(index);
  };

  return (
    <div className="content-section dyk-section">
      <h2 className="section-title">Did You Know?</h2>
      <p className="section-intro">
        Fascinating and alarming facts about the Yamuna that every student
        should know. Click play to hear an AI conversation!
      </p>

      <div className="dyk-grid">
        {didYouKnowFacts.map((item, index) => (
          <DYKCard
            key={index}
            item={item}
            index={index}
            onPlay={() => handleCardPlay(index)}
            isOtherPlaying={
              currentPlayingIndex !== null && currentPlayingIndex !== index
            }
          />
        ))}
      </div>
    </div>
  );
};

export default DidyouKnow;
