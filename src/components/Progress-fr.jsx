import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Target, TrendingUp, Calendar } from 'lucide-react'

function ProgressFr({ userProgress, lessons }) {
  const completedCount = userProgress.completedLessons.length
  const totalLessons = lessons.length
  const completionRate = Math.round((completedCount / totalLessons) * 100)
  const nextGoal = Math.ceil(userProgress.points / 100) * 100
  const pointsToNext = nextGoal - userProgress.points

  return (
    <div className="card">
      <h1 className="card-title">📊 Ma progression</h1>
      
      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px',
        marginBottom: '30px'
      }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            padding: '20px',
            borderRadius: '15px',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Trophy size={32} style={{ marginBottom: '10px' }} />
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{userProgress.points}</div>
          <div>Points</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            background: 'linear-gradient(135deg, #f093fb, #f5576c)',
            padding: '20px',
            borderRadius: '15px',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Target size={32} style={{ marginBottom: '10px' }} />
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{userProgress.stars}</div>
          <div>Étoiles</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
            padding: '20px',
            borderRadius: '15px',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <TrendingUp size={32} style={{ marginBottom: '10px' }} />
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{userProgress.streak}</div>
          <div>Série</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
            padding: '20px',
            borderRadius: '15px',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Calendar size={32} style={{ marginBottom: '10px' }} />
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{completedCount}</div>
          <div>Leçons sur {totalLessons}</div>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold' }}>Progression des leçons</span>
          <span style={{ color: '#667eea' }}>{completionRate}%</span>
        </div>
        <div style={{
          height: '20px',
          background: '#e2e8f0',
          borderRadius: '10px',
          overflow: 'hidden'
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              borderRadius: '10px'
            }}
          />
        </div>
      </div>

      {/* Next Goal */}
      <div style={{
        background: 'linear-gradient(135deg, #ffd70020, #ffed4a20)',
        padding: '20px',
        borderRadius: '15px',
        border: '2px solid #ffd700',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#744210', marginBottom: '10px' }}>🎯 Prochain objectif</h3>
        <p>Encore {pointsToNext} points pour atteindre {nextGoal} points !</p>
        
        <div style={{
          height: '10px',
          background: '#e2e8f0',
          borderRadius: '5px',
          overflow: 'hidden',
          marginTop: '10px'
        }}>
          <div style={{
            width: `${(userProgress.points % 100) || 100}%`,
            height: '100%',
            background: '#ffd700',
            borderRadius: '5px'
          }} />
        </div>
      </div>

      {/* Completed Lessons List */}
      <div>
        <h3 style={{ marginBottom: '15px' }}>✅ Leçons terminées</h3>
        
        {userProgress.completedLessons.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {userProgress.completedLessons.map(lessonId => {
              const lesson = lessons.find(l => l.id === lessonId)
              return (
                <motion.span
                  key={lessonId}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '8px 16px',
                    background: '#c6f6d5',
                    borderRadius: '20px',
                    fontSize: '0.9rem'
                  }}
                >
                  {lesson?.icon} {lesson?.title}
                </motion.span>
              )
            })}
          </div>
        ) : (
          <p style={{ color: '#718096' }}>
            Tu n\'as pas encore terminé de leçons. Commence ton aventure ! 🚀
          </p>
        )}
      </div>
    </div>
  )
}

export default ProgressFr