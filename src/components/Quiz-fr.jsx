import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Volume2, Star, CheckCircle, XCircle } from 'lucide-react'
import confetti from 'canvas-confetti'

function QuizFr({ lesson, onBack, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [showReward, setShowReward] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState([])

  const question = lesson.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / lesson.questions.length) * 100

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return
    
    setSelectedAnswer(index)
    const correct = index === question.correct
    setIsCorrect(correct)
    
    if (correct) {
      setScore(s => s + 1)
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#48bb78', '#ffd700']
      })
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
              
              {question.audio && (
                <button
                  style={{
                    background: '#667eea',
                    border: 'none',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    margin: '20px auto 0'
                  }}
                >
                  <Volume2 size={24} color="white" />
                </button>
              )}
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