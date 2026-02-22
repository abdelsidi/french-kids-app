import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Volume2, Star, CheckCircle, XCircle } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useSpeech } from '../hooks/useSpeech'

// Sound effects using AudioContext
const playSound = (type) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  if (type === 'correct') {
    // Happy ascending sound
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime) // C5
    oscillator.frequency.exponentialRampToValueAtTime(1046.5, audioContext.currentTime + 0.1) // C6
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
    
    // Second note for chord
    const osc2 = audioContext.createOscillator()
    const gain2 = audioContext.createGain()
    osc2.connect(gain2)
    gain2.connect(audioContext.destination)
    osc2.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1) // E5
    gain2.gain.setValueAtTime(0.2, audioContext.currentTime + 0.1)
    gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4)
    osc2.start(audioContext.currentTime + 0.1)
    osc2.stop(audioContext.currentTime + 0.4)
  } else if (type === 'wrong') {
    // Low descending sound
    oscillator.frequency.setValueAtTime(300, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.3)
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  } else if (type === 'complete') {
    // Victory fanfare
    const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()
      osc.connect(gain)
      gain.connect(audioContext.destination)
      osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.15)
      gain.gain.setValueAtTime(0.3, audioContext.currentTime + i * 0.15)
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.15 + 0.4)
      osc.start(audioContext.currentTime + i * 0.15)
      osc.stop(audioContext.currentTime + i * 0.15 + 0.4)
    })
  }
}

function QuizFr({ lesson, onBack, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [showReward, setShowReward] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const { speak, speaking, supported } = useSpeech()

  const question = lesson.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / lesson.questions.length) * 100

  // Extract French word to speak from question
  const getFrenchText = () => {
    // Try to extract the French word from the question
    const match = question.question.match(/"([^"]+)"/) || question.question.match(/'([^']+)'/)
    if (match) return match[1]
    // Otherwise speak the correct answer
    return question.options[question.correct]
  }

  const handleSpeak = () => {
    if (supported) {
      const text = getFrenchText()
      speak(text, 'fr-FR')
    }
  }

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return
    
    setSelectedAnswer(index)
    const correct = index === question.correct
    setIsCorrect(correct)
    
    if (correct) {
      setScore(s => s + 1)
      playSound('correct')
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#48bb78', '#ffd700']
      })
    } else {
      playSound('wrong')
    }
    
    setShowResult(true)
    setAnsweredQuestions([...answeredQuestions, { question: currentQuestion, correct }])
  }

  const nextQuestion = () => {
    if (currentQuestion < lesson.questions.length - 1) {
      setCurrentQuestion(c => c + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setIsCorrect(false)
    } else {
      const earnedPoints = Math.round((score / lesson.questions.length) * lesson.reward)
      setShowReward(true)
      onComplete(earnedPoints)
      
      if (score === lesson.questions.length) {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#667eea', '#764ba2', '#ffd700', '#ff6b6b']
        })
      }
    }
  }

  if (showReward) {
    const earnedPoints = Math.round((score / lesson.questions.length) * lesson.reward)
    const isPerfect = score === lesson.questions.length
    
    return (
      <>
        <div className="overlay" onClick={onBack} />
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="reward-popup"
        >
          <div style={{ fontSize: '4rem', marginBottom: '10px' }}>
            {isPerfect ? '🎉' : score > lesson.questions.length / 2 ? '👏' : '💪'}
          </div>
          
          <h2>{isPerfect ? 'Bravo ! Excellent !' : score > lesson.questions.length / 2 ? 'Très bien !' : 'Continue !'}</h2>
          
          <div className="points-earned">+{earnedPoints} points</div>
          
          <p style={{ color: '#718096', marginBottom: '20px' }}>
            {score} / {lesson.questions.length} réponses correctes
          </p>
          
          {isPerfect && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              style={{ marginBottom: '20px' }}
            >
              <span style={{ fontSize: '3rem' }}>⭐⭐⭐</span>
              <p style={{ color: '#667eea', fontWeight: 'bold' }}>Score parfait !</p>
            </motion.div>
          )}
          
          <button
            onClick={onBack}
            style={{
              padding: '15px 40px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            Retour aux leçons 🏠
          </button>
        </motion.div>
      </>
    )
  }

  return (
    <div className="app-container">
      {/* Quiz Header */}
      <header className="header">
        <button 
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontFamily: 'inherit',
            fontSize: '1rem',
            color: '#667eea'
          }}
        >
          <ArrowLeft size={24} />
          Retour
        </button>
        
        <div style={{ fontWeight: 'bold', color: '#667eea' }}>
          {lesson.title}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Star size={20} fill="#ffd700" color="#ffd700" />
          <span>{score}</span>
        </div>
      </header>

      <div className="quiz-container">
        {/* Progress */}
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {/* Question */}
            <div className="question-box">
              {question.image && (
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>
                  {question.image}
                </div>
              )}
              
              {question.color && (
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '20px',
                    background: question.color,
                    margin: '0 auto 20px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                  }}
                />
              )}
              
              <h2 className="question-text">{question.question}</h2>
              <p className="question-hint">{question.hint}</p>
              
              <button
                onClick={handleSpeak}
                disabled={speaking}
                style={{
                  background: speaking ? '#9f7aea' : '#667eea',
                  border: 'none',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: supported ? 'pointer' : 'not-allowed',
                  margin: '20px auto 0',
                  opacity: supported ? 1 : 0.5,
                  transition: 'all 0.3s ease',
                  animation: speaking ? 'pulse 1s infinite' : 'none'
                }}
                title={supported ? 'Écouter la prononciation' : 'Audio non supporté'}
              >
                <Volume2 size={24} color="white" />
              </button>
            </div>

            {/* Options */}
            <div className="options-grid">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  className={`option-btn ${
                    showResult 
                      ? index === question.correct 
                        ? 'correct' 
                        : index === selectedAnswer 
                          ? 'wrong' 
                          : ''
                      : ''
                  }`}
                  onClick={() => handleAnswer(index)}
                  whileHover={!showResult ? { scale: 1.02 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                  disabled={showResult}
                >
                  {showResult && index === question.correct && <CheckCircle size={20} style={{ marginRight: '10px' }} />}
                  {showResult && index === selectedAnswer && index !== question.correct && <XCircle size={20} style={{ marginRight: '10px' }} />}
                  {option}
                </motion.button>
              ))}
            </div>

            {/* Result */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    textAlign: 'center',
                    marginTop: '30px',
                    padding: '20px',
                    borderRadius: '15px',
                    background: isCorrect ? '#c6f6d5' : '#fed7d7'
                  }}
                >
                  <p style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    color: isCorrect ? '#22543d' : '#c53030'
                  }}>
                    {isCorrect 
                      ? ['Génial ! 🎉', 'Excellent ! ⭐', 'Bravo ! 🌟'][Math.floor(Math.random() * 3)]
                      : ['Essaye encore 💪', 'Pas tout à fait 🤔', 'La prochaine fois ! 🎯'][Math.floor(Math.random() * 3)]
                    }
                  </p>
                  
                  <button
                    onClick={nextQuestion}
                    style={{
                      marginTop: '15px',
                      padding: '12px 30px',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      background: isCorrect ? '#48bb78' : '#ed8936',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontFamily: 'inherit'
                    }}
                  >
                    {currentQuestion < lesson.questions.length - 1 ? 'Question suivante ➡️' : 'Terminer 🎊'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default QuizFr