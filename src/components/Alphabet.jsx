import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, ArrowLeft, ArrowRight, Grid3X3, BookOpen, Mic } from 'lucide-react'
import { frenchAlphabet, alphabetQuiz } from '../data/alphabet-fr'
import confetti from 'canvas-confetti'

function Alphabet({ onBack }) {
  const [activeTab, setActiveTab] = useState('learn') // 'learn', 'grid', 'quiz'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedLetter, setSelectedLetter] = useState(null)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [showQuizResult, setShowQuizResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [quizComplete, setQuizComplete] = useState(false)

  const currentLetter = frenchAlphabet[currentIndex]

  const nextLetter = () => {
    if (currentIndex < frenchAlphabet.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const prevLetter = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      // Get all available voices
      const voices = window.speechSynthesis.getVoices()
      
      // Find a native French voice
      const frenchVoice = voices.find(voice => 
        voice.lang.includes('fr-FR') || 
        voice.lang.includes('fr-CA') ||
        voice.lang.includes('fr-BE')
      )
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'fr-FR'
      utterance.rate = 0.7  // Slightly slower for children
      utterance.pitch = 1.1  // Slightly higher pitch for clarity
      
      if (frenchVoice) {
        utterance.voice = frenchVoice
      }
      
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleQuizAnswer = (index) => {
    if (selectedAnswer !== null) return
    
    setSelectedAnswer(index)
    const isCorrect = index === alphabetQuiz[quizIndex].correct
    
    if (isCorrect) {
      setQuizScore(prev => prev + 1)
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } })
    }
    
    setShowQuizResult(true)
  }

  const nextQuizQuestion = () => {
    if (quizIndex < alphabetQuiz.length - 1) {
      setQuizIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowQuizResult(false)
    } else {
      setQuizComplete(true)
      if (quizScore >= alphabetQuiz.length / 2) {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } })
      }
    }
  }

  const renderLearnMode = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="alphabet-learn"
    >
      <div className="letter-display" style={{ background: currentLetter.color }}>
        <motion.div
          key={currentIndex}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="big-letter"
        >
          {currentLetter.letter}
        </motion.div>
        
        <div className="letter-info">
          <h2>Nom : {currentLetter.name}</h2>
          <p>Son : {currentLetter.sound}</p>
        </div>
        
        <button className="sound-btn" onClick={() => speak(currentLetter.name)}>
          <Volume2 size={32} />
          <span>Écouter</span>
        </button>
      </div>

      <div className="words-section">
        <h3>Mots avec cette lettre :</h3>
        <div className="words-grid">
          {currentLetter.words.map((word, idx) => (
            <motion.div
              key={idx}
              className="word-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => speak(word.word)}
            >
              <span className="word-emoji">{word.image}</span>
              <span className="word-text">{word.word}</span>
              <Volume2 size={16} className="word-sound" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="navigation">
        <button 
          className="nav-arrow" 
          onClick={prevLetter}
          disabled={currentIndex === 0}
        >
          <ArrowLeft size={24} />
          Précédent
        </button>
        
        <div className="letter-counter">
          {currentIndex + 1} / {frenchAlphabet.length}
        </div>
        
        <button 
          className="nav-arrow" 
          onClick={nextLetter}
          disabled={currentIndex === frenchAlphabet.length - 1}
        >
          Suivant
          <ArrowRight size={24} />
        </button>
      </div>

      {/* Letter Progress Dots */}
      <div className="letter-dots">
        {frenchAlphabet.map((_, idx) => (
          <button
            key={idx}
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </motion.div>
  )

  const renderGridMode = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="alphabet-grid"
    >
      {selectedLetter ? (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="letter-detail"
        >
          <button className="close-btn" onClick={() => setSelectedLetter(null)}>
            ✕
          </button>
          
          <div 
            className="detail-letter"
            style={{ background: selectedLetter.color }}
          >
            {selectedLetter.letter}
          </div>
          
          <h2>{selectedLetter.name}</h2>
          <p>Son : {selectedLetter.sound}</p>
          
          <div className="detail-words">
            {selectedLetter.words.map((word, idx) => (
              <div key={idx} className="detail-word">
                <span>{word.image}</span>
                <span>{word.word}</span>
              </div>
            ))}
          </div>
          
          <button 
            className="sound-btn large"
            onClick={() => speak(selectedLetter.name)}
          >
            <Volume2 size={24} />
            Écouter
          </button>
        </motion.div>
      ) : (
        <>
          <h2 className="grid-title">Clique sur une lettre</h2>
          <div className="letters-grid">
            {frenchAlphabet.map((item, idx) => (
              <motion.button
                key={idx}
                className="letter-tile"
                style={{ background: item.color }}
                onClick={() => setSelectedLetter(item)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.letter}
              </motion.button>
            ))}
          </div>
        </>
      )}
    </motion.div>
  )

  const renderQuizMode = () => {
    if (quizComplete) {
      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="quiz-complete"
        >
          <div className="trophy">🏆</div>
          <h2>Quiz terminé !</h2>
          <div className="final-score">
            {quizScore} / {alphabetQuiz.length} bonnes réponses
          </div>
          <div className="score-percentage">
            {Math.round((quizScore / alphabetQuiz.length) * 100)}%
          </div>
          <button 
            className="restart-btn"
            onClick={() => {
              setQuizIndex(0)
              setQuizScore(0)
              setSelectedAnswer(null)
              setShowQuizResult(false)
              setQuizComplete(false)
            }}
          >
            Recommencer
          </button>
        </motion.div>
      )
    }

    const currentQ = alphabetQuiz[quizIndex]
    const progress = ((quizIndex + 1) / alphabetQuiz.length) * 100

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="alphabet-quiz"
      >
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="quiz-counter">
          Question {quizIndex + 1} / {alphabetQuiz.length}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={quizIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h3 className="quiz-question">{currentQ.question}</h3>

            <div className="quiz-options">
              {currentQ.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  className={`quiz-option ${
                    showQuizResult
                      ? idx === currentQ.correct
                        ? 'correct'
                        : idx === selectedAnswer
                          ? 'wrong'
                          : ''
                      : ''
                  }`}
                  onClick={() => handleQuizAnswer(idx)}
                  disabled={showQuizResult}
                  whileHover={!showQuizResult ? { scale: 1.02 } : {}}
                >
                  {option}
                </motion.button>
              ))}
            </div>

            {showQuizResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`quiz-feedback ${
                  selectedAnswer === currentQ.correct ? 'correct' : 'wrong'
                }`}
              >
                {selectedAnswer === currentQ.correct ? (
                  <>
                    <span className="feedback-icon">✅</span>
                    <span>Bravo ! Bonne réponse !</span>
                  </>
                ) : (
                  <>
                    <span className="feedback-icon">❌</span>
                    <span>La bonne réponse était : {currentQ.options[currentQ.correct]}</span>
                  </>
                )}
                
                <button className="next-quiz-btn" onClick={nextQuizQuestion}>
                  {quizIndex < alphabetQuiz.length - 1 ? 'Question suivante ➡️' : 'Voir les résultats 🎉'}
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    )
  }

  return (
    <div className="app-container alphabet-page">
      <header className="header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={24} />
          Retour
        </button>
        
        <h1 className="page-title">🔤 L'Alphabet Français</h1>
        
        <div className="score-mini">
          <span>⭐ {quizScore}</span>
        </div>
      </header>

      <div className="alphabet-tabs">
        <button
          className={`tab-btn ${activeTab === 'learn' ? 'active' : ''}`}
          onClick={() => setActiveTab('learn')}
        >
          <BookOpen size={18} />
          Apprendre
        </button>
        <button
          className={`tab-btn ${activeTab === 'grid' ? 'active' : ''}`}
          onClick={() => setActiveTab('grid')}
        >
          <Grid3X3 size={18} />
          Grille
        </button>
        <button
          className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          <Mic size={18} />
          Quiz
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'learn' && renderLearnMode()}
          {activeTab === 'grid' && renderGridMode()}
          {activeTab === 'quiz' && renderQuizMode()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Alphabet