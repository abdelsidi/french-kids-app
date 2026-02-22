import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Check, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'

export const avatars = [
  { id: 'lion', emoji: '🦁', name: 'Léo', color: '#FF6B6B', description: 'Le roi courageux' },
  { id: 'cat', emoji: '🐱', name: 'Mimi', color: '#4ECDC4', description: 'La curieuse' },
  { id: 'dog', emoji: '🐶', name: 'Max', color: '#FFE66D', description: 'Le fidèle ami' },
  { id: 'rabbit', emoji: '🐰', name: 'Luna', color: '#F8B4D9', description: 'La rapide' },
  { id: 'bear', emoji: '🐻', name: 'Bruno', color: '#D4A574', description: 'Le protecteur' },
  { id: 'fox', emoji: '🦊', name: 'Roux', color: '#FF8C42', description: 'Le malin' },
  { id: 'panda', emoji: '🐼', name: 'Bamboo', color: '#98D8C8', description: 'Le doux' },
  { id: 'unicorn', emoji: '🦄', name: 'Sparkle', color: '#E0BBE4', description: 'La magique' },
  { id: 'dragon', emoji: '🐉', name: 'Draco', color: '#7B68EE', description: 'Le puissant' },
  { id: 'robot', emoji: '🤖', name: 'Pixel', color: '#5DADE2', description: 'Le futuriste' }
]

export const accessories = [
  { id: 'none', name: 'Rien', emoji: '', price: 0 },
  { id: 'crown', name: 'Couronne', emoji: '👑', price: 100 },
  { id: 'glasses', name: 'Lunettes', emoji: '🕶️', price: 50 },
  { id: 'bow', name: 'Nœud', emoji: '🎀', price: 50 },
  { id: 'hat', name: 'Chapeau', emoji: '🎩', price: 75 },
  { id: 'flower', name: 'Fleur', emoji: '🌸', price: 30 },
  { id: 'cape', name: 'Cape', emoji: '🦸', price: 150 },
  { id: 'crown-gold', name: 'Couronne Or', emoji: '👑✨', price: 500 },
  { id: 'wings', name: 'Ailes', emoji: '🧚', price: 300 }
]

export const backgrounds = [
  { id: 'default', name: 'Classique', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', price: 0 },
  { id: 'sunset', name: 'Couché de soleil', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', price: 100 },
  { id: 'ocean', name: 'Océan', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', price: 100 },
  { id: 'forest', name: 'Forêt', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', price: 100 },
  { id: 'galaxy', name: 'Galaxie', color: 'linear-gradient(135deg, #4a00e0 0%, #8e2de2 100%)', price: 200 },
  { id: 'candy', name: 'Bonbon', color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', price: 150 }
]

function AvatarSelector({ userProgress, setUserProgress, onComplete }) {
  const [selectedAvatar, setSelectedAvatar] = useState(
    userProgress.avatar || avatars[0]
  )
  const [selectedAccessory, setSelectedAccessory] = useState(
    userProgress.accessory || accessories[0]
  )
  const [selectedBackground, setSelectedBackground] = useState(
    userProgress.background || backgrounds[0]
  )
  const [activeTab, setActiveTab] = useState('avatar') // avatar, accessory, background
  const [unlockedAccessories, setUnlockedAccessories] = useState(
    userProgress.unlockedAccessories || ['none']
  )
  const [unlockedBackgrounds, setUnlockedBackgrounds] = useState(
    userProgress.unlockedBackgrounds || ['default']
  )

  useEffect(() => {
    // Check for new unlocks based on points
    accessories.forEach(acc => {
      if (userProgress.points >= acc.price && !unlockedAccessories.includes(acc.id)) {
        setUnlockedAccessories(prev => [...prev, acc.id])
      }
    })
    backgrounds.forEach(bg => {
      if (userProgress.points >= bg.price && !unlockedBackgrounds.includes(bg.id)) {
        setUnlockedBackgrounds(prev => [...prev, bg.id])
      }
    })
  }, [userProgress.points])

  const saveAvatar = () => {
    setUserProgress(prev => ({
      ...prev,
      avatar: selectedAvatar,
      accessory: selectedAccessory,
      background: selectedBackground,
      unlockedAccessories,
      unlockedBackgrounds
    }))
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: [selectedAvatar.color, '#ffd700']
    })
    
    onComplete()
  }

  const buyItem = (item, type) => {
    if (userProgress.points >= item.price) {
      setUserProgress(prev => ({
        ...prev,
        points: prev.points - item.price
      }))
      
      if (type === 'accessory') {
        setUnlockedAccessories(prev => [...prev, item.id])
        setSelectedAccessory(item)
      } else {
        setUnlockedBackgrounds(prev => [...prev, item.id])
        setSelectedBackground(item)
      }
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      })
    }
  }

  return (
    <div className="avatar-selector-container">
      {/* Preview */}
      <div className="avatar-preview-section" style={{ 
        background: selectedBackground.color,
        borderRadius: '20px',
        padding: '40px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <motion.div 
          className="avatar-preview"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ fontSize: '8rem', position: 'relative' }}
        >
          {selectedAvatar.emoji}
          {selectedAccessory.emoji && (
            <span style={{ 
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              fontSize: '3rem',
              animation: 'bounce 1s infinite'
            }}>
              {selectedAccessory.emoji}
            </span>
          )}
        </motion.div>
        
        <h2 style={{ color: 'white', marginTop: '20px' }}>
          {selectedAvatar.name}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.9)' }}>
          {selectedAvatar.description}
        </p>
        {selectedAccessory.id !== 'none' && (
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
            Accessoire: {selectedAccessory.name}
          </p>
        )}
      </div>

      {/* Tabs */}
      <div className="avatar-tabs">
        {['avatar', 'accessory', 'background'].map(tab => (
          <button
            key={tab}
            className={`avatar-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'avatar' && 'Personnage'}
            {tab === 'accessory' && 'Accessoires'}
            {tab === 'background' && 'Fonds'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="avatar-content">
        {activeTab === 'avatar' && (
          <div className="avatar-grid">
            {avatars.map(avatar => (
              <motion.button
                key={avatar.id}
                className={`avatar-option ${selectedAvatar.id === avatar.id ? 'selected' : ''}`}
                style={{ borderColor: avatar.color }}
                onClick={() => setSelectedAvatar(avatar)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="avatar-emoji">{avatar.emoji}</span>
                <span className="avatar-name">{avatar.name}</span>
                {selectedAvatar.id === avatar.id && (
                  <div className="selected-indicator">
                    <Check size={20} color="white" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        )}

        {activeTab === 'accessory' && (
          <div className="accessory-grid">
            <div className="points-display">
              💎 {userProgress.points} points disponibles
            </div>
            {accessories.map(accessory => {
              const isUnlocked = unlockedAccessories.includes(accessory.id)
              const isSelected = selectedAccessory.id === accessory.id
              
              return (
                <motion.button
                  key={accessory.id}
                  className={`accessory-option ${isSelected ? 'selected' : ''} ${!isUnlocked ? 'locked' : ''}`}
                  onClick={() => isUnlocked ? setSelectedAccessory(accessory) : buyItem(accessory, 'accessory')}
                  whileHover={isUnlocked ? { scale: 1.05 } : {}}
                  disabled={!isUnlocked && userProgress.points < accessory.price}
                >
                  <span className="accessory-emoji">{accessory.emoji || '❌'}</span>
                  <span className="accessory-name">{accessory.name}</span>
                  {!isUnlocked && (
                    <span className="accessory-price">
                      🔒 {accessory.price} pts
                    </span>
                  )}
                  {isSelected && (
                    <div className="selected-indicator">
                      <Check size={16} color="white" />
                    </div>
                  )}
                </motion.button>
              )
            })}
          </div>
        )}

        {activeTab === 'background' && (
          <div className="background-grid">
            <div className="points-display">
              💎 {userProgress.points} points disponibles
            </div>
            {backgrounds.map(background => {
              const isUnlocked = unlockedBackgrounds.includes(background.id)
              const isSelected = selectedBackground.id === background.id
              
              return (
                <motion.button
                  key={background.id}
                  className={`background-option ${isSelected ? 'selected' : ''}`}
                  style={{ background: background.color }}
                  onClick={() => isUnlocked ? setSelectedBackground(background) : buyItem(background, 'background')}
                  whileHover={isUnlocked ? { scale: 1.05 } : {}}
                  disabled={!isUnlocked && userProgress.points < background.price}
                >
                  <span className="background-name" style={{ color: 'white' }}>
                    {background.name}
                  </span>
                  {!isUnlocked && (
                    <span className="background-price">
                      🔒 {background.price} pts
                    </span>
                  )}
                  {isSelected && (
                    <div className="selected-indicator">
                      <Check size={16} color="white" />
                    </div>
                  )}
                </motion.button>
              )
            })}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="avatar-actions">
        <button className="save-avatar-btn" onClick={saveAvatar}>
          <Sparkles size={20} />
          Enregistrer mon personnage
          <Sparkles size={20} />
        </button>
      </div>
    </div>
  )
}

export default AvatarSelector