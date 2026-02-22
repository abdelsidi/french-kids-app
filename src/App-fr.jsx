import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Trophy, Flame, Home, BookOpen, Award, User } from 'lucide-react'
import confetti from 'canvas-confetti'
import { lessonsFr } from './data/lessons-fr'
import QuizFr from './components/Quiz-fr'
import BadgesFr from './components/Badges-fr'
import ProgressFr from './components/Progress-fr'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [userProgress, setUserProgress] = useState(() => {
    const saved = localStorage.getItem('frenchKidsProgressFr')
    return saved ? JSON.parse(saved) : {
      points: 0,
      stars: 0,
      streak: 0,
      completedLessons: [],
      badges: []
    }
  })

  useEffect(() => {
    localStorage.setItem('frenchKidsProgressFr', JSON.stringify(userProgress))
  }, [userProgress])

  const addPoints = (points) => {
    setUserProgress(prev => ({
      ...prev,
      points: prev.points + points,
      stars: prev.stars + Math.floor(points / 10)
    }))
    triggerConfetti()
  }

  const completeLesson = (lessonId) => {
    if (!userProgress.completedLessons.includes(lessonId)) {
      setUserProgress(prev => ({
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        streak: prev.streak + 1
      }))
    }
  }

  const unlockBadge = (badgeId) => {
    if (!userProgress.badges.includes(badgeId)) {
      setUserProgress(prev => ({
        ...prev,
        badges: [...prev.badges, badgeId]
      }))
    }
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#667eea', '#764ba2', '#f093fb', '#ffd700']
    })
  }

  const renderContent = () => {
    switch(currentView) {
      case 'home':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <h1 className="card-title">🎓 Bienvenue dans le monde du français !</h1>
            <p className="card-subtitle">Choisis une leçon pour commencer ton aventure d'apprentissage</p>
            
            <div className="game-grid">
              {lessonsFr.map((lesson, index) => {
                const isLocked = index > 0 && !userProgress.completedLessons.includes(lessonsFr[index-1].id)
                const isCompleted = userProgress.completedLessons.includes(lesson.id)
                
                return (
                  <motion.div
                    key={lesson.id}
                    whileHover={!isLocked ? { scale: 1.02 } : {}}
                    whileTap={!isLocked ? { scale: 0.98 } : {}}
                    className={`lesson-card ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`}
                    onClick={() => !isLocked && setSelectedLesson(lesson)}
                  >
                    <div className="lesson-icon float">{lesson.icon}</div>
                    <h3 className="lesson-title">{lesson.title}</h3>
                    <p className="lesson-desc">{lesson.description}</p>
                    {isCompleted ? (
                      <span className="lesson-reward">✅ Terminé !</span>
                    ) : isLocked ? (
                      <span className="lesson-reward">🔒 Verrouillé</span>
                    ) : (
                      <span className="lesson-reward">+{lesson.reward} points ⭐</span>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )

      case 'badges':
        return <BadgesFr userProgress={userProgress} />

      case 'progress':
        return <ProgressFr userProgress={userProgress} lessons={lessonsFr} />

      default:
        return null
    }
  }

  if (selectedLesson) {
    return (
      <QuizFr
        lesson={selectedLesson}
        onBack={() => setSelectedLesson(null)}
        onComplete={(points) => {
          addPoints(points)
          completeLesson(selectedLesson.id)
          if (points >= selectedLesson.reward) {
            unlockBadge(`lesson-${selectedLesson.id}`)
          }
        }}
      />
    )
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span>🦞</span>
          <span>Apprendre le Français</span>
        </div>
        
        <div className="score-board">
          <div className="score-item points">
            <Trophy size={20} />
            <span>{userProgress.points}</span>
          </div>
          <div className="score-item streak">
            <Flame size={20} />
            <span>{userProgress.streak}</span>
          </div>
          <div className="score-item stars">
            <Star size={20} />
            <span>{userProgress.stars}</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav-menu">
        <button
          className={`nav-btn ${currentView === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentView('home')}
        >
          <Home size={18} style={{marginRight: '8px'}} />
          Accueil
        </button>
        <button
          className={`nav-btn ${currentView === 'progress' ? 'active' : ''}`}
          onClick={() => setCurrentView('progress')}
        >
          <BookOpen size={18} style={{marginRight: '8px'}} />
          Ma progression
        </button>
        <button
          className={`nav-btn ${currentView === 'badges' ? 'active' : ''}`}
          onClick={() => setCurrentView('badges')}
        >
          <Award size={18} style={{marginRight: '8px'}} />
          Mes badges
        </button>
      </nav>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App