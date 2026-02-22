import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Trophy, Flame, Home, BookOpen, Award, User, Type, Palette } from 'lucide-react'
import confetti from 'canvas-confetti'
import { lessonsFr as lessons } from './data/lessons-fr'
import QuizFr from './components/Quiz-fr'
import BadgesFr from './components/Badges-fr'
import ProgressFr from './components/Progress-fr'
import Alphabet from './components/Alphabet'
import AvatarSelector from './components/AvatarSelector'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [showAlphabet, setShowAlphabet] = useState(false)
  const [userProgress, setUserProgress] = useState(() => {
    const saved = localStorage.getItem('frenchKidsProgress')
    return saved ? JSON.parse(saved) : {
      points: 0,
      stars: 0,
      streak: 0,
      completedLessons: [],
      badges: []
    }
  })

  useEffect(() => {
    localStorage.setItem('frenchKidsProgress', JSON.stringify(userProgress))
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
            <h1 className="card-title">🎓 مرحباً بك في عالم الفرنسية!</h1>
            <p className="card-subtitle">اختر درساً لتبدأ رحلة التعلم الممتعة</p>
            
            <div className="game-grid">
              {/* Alphabet Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="lesson-card"
                onClick={() => setCurrentView('alphabet')}
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
                  border: 'none'
                }}
              >
                <div className="lesson-icon float">🔤</div>
                <h3 className="lesson-title" style={{ color: 'white' }}>L'Alphabet</h3>
                <p className="lesson-desc" style={{ color: 'rgba(255,255,255,0.9)' }}>Apprends les lettres et les mots</p>
                <span className="lesson-reward">Nouveau ! 🌟</span>
              </motion.div>

              {lessons.map((lesson, index) => {
                const isLocked = index > 0 && !userProgress.completedLessons.includes(lessons[index-1].id)
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
                      <span className="lesson-reward">✅ مكتمل!</span>
                    ) : isLocked ? (
                      <span className="lesson-reward">🔒 مغلق</span>
                    ) : (
                      <span className="lesson-reward">+{lesson.reward} نقطة ⭐</span>
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
        return <ProgressFr userProgress={userProgress} lessons={lessons} />

      case 'alphabet':
        return <Alphabet onBack={() => setCurrentView('home')} />

      case 'avatar':
        return (
          <AvatarSelector
            userProgress={userProgress}
            setUserProgress={setUserProgress}
            onComplete={() => setCurrentView('home')}
          />
        )

      default:
        return null
    }
  }

  if (showAlphabet) {
    return <Alphabet onBack={() => setShowAlphabet(false)} />
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
          <Home size={18} style={{marginLeft: '8px'}} />
          الرئيسية
        </button>
        <button
          className={`nav-btn ${currentView === 'alphabet' ? 'active' : ''}`}
          onClick={() => setCurrentView('alphabet')}
        >
          <Type size={18} style={{marginLeft: '8px'}} />
          L'Alphabet
        </button>
        <button
          className={`nav-btn ${currentView === 'progress' ? 'active' : ''}`}
          onClick={() => setCurrentView('progress')}
        >
          <BookOpen size={18} style={{marginLeft: '8px'}} />
          تقدمي
        </button>
        <button
          className={`nav-btn ${currentView === 'badges' ? 'active' : ''}`}
          onClick={() => setCurrentView('badges')}
        >
          <Award size={18} style={{marginLeft: '8px'}} />
          الإنجازات
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