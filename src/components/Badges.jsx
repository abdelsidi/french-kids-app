import React from 'react'
import { motion } from 'framer-motion'
import { Lock, Award } from 'lucide-react'
import { badges } from '../data/lessons'

function Badges({ userProgress }) {
  return (
    <div className="card">
      <h1 className="card-title">🏅 إنجازاتك</h1>
      <p className="card-subtitle">
        لديك {userProgress.badges.length} من أصل {badges.length} شارات
      </p>

      <div className="badges-grid">
        {badges.map((badge, index) => {
          const isUnlocked = userProgress.badges.includes(badge.id)
          
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`badge-item ${isUnlocked ? 'unlocked' : ''}`}
            >
              <div className="badge-icon">
                {isUnlocked ? badge.icon : <Lock size={40} color="#cbd5e0" />}
              </div>
              
              <div className="badge-name">{badge.name}</div>
              <div className="badge-desc">{badge.desc}</div>
              
              {isUnlocked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    background: '#48bb78',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✓
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Badges