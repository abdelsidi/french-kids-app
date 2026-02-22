import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Target, TrendingUp, Calendar } from 'lucide-react'

function Progress({ userProgress, lessons }) {
  const completedCount = userProgress.completedLessons.length
  const totalLessons = lessons.length
  const completionRate = Math.round((completedCount / totalLessons) * 100)
  const nextGoal = Math.ceil(userProgress.points / 100) * 100
  const pointsToNext = nextGoal - userProgress.points

  return (
    <div className="card">
      <h1 className="card-title">📊 تقدمي</h1>
      
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
          <div>نقطة</div>
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
          <div>نجمة</div>
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
          <div>درس متتالي</div>
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
          <div>درس من {totalLessons}</div>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold' }}>تقدم الدروس</span>
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
        border: '2px solid #ffd700'
      }}>
        <h3 style={{ color: '#744210', marginBottom: '10px' }}>🎯 الهدف القادم</h3>
        <p>متبقي {pointsToNext} نقطة للوصول إلى {nextGoal} نقطة!</p>
        
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
      <div style={{ marginTop: '30px' }}>
        <h3 style={{ marginBottom: '15px' }}>✅ الدروس المكتملة</h3>
        
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
            لم تكمل أي درس بعد. ابدأ رحلتك الآن! 🚀
          </p>
        )}
      </div>
    </div>
  )
}

export default Progress