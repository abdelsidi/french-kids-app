export const lessonsFr = [
  {
    id: 1,
    title: "L'Alphabet",
    description: 'Apprends à prononcer les lettres françaises',
    icon: '🔤',
    reward: 50,
    questions: [
      {
        type: 'letter',
        question: 'Quelle est cette lettre : "A" ?',
        hint: 'Première lettre de l\'alphabet',
        options: ['A', 'B', 'C', 'D'],
        correct: 0,
        audio: '/audio/a.mp3'
      },
      {
        type: 'letter',
        question: 'Quelle est cette lettre : "B" ?',
        hint: 'B comme bébé',
        options: ['A', 'B', 'C', 'D'],
        correct: 1,
        audio: '/audio/b.mp3'
      },
      {
        type: 'match',
        question: 'Associe la lettre au son',
        hint: 'Écoute attentivement',
        options: ['C = sa', 'C = ka', 'C = cha', 'C = ja'],
        correct: 1,
        audio: '/audio/c.mp3'
      },
      {
        type: 'sound',
        question: 'Quel mot commence par le son "D" ?',
        hint: 'D comme dinosaure',
        options: ['chat', 'chien', 'dinosaure', 'éléphant'],
        correct: 2,
        image: '🦕'
      },
      {
        type: 'letter',
        question: 'Quelle est cette lettre : "E" ?',
        hint: 'comme éléphant',
        options: ['A', 'E', 'I', 'O'],
        correct: 1,
        image: '🐘'
      }
    ]
  },
  {
    id: 2,
    title: 'Les Couleurs 🎨',
    description: 'Apprends les noms des couleurs en français',
    icon: '🌈',
    reward: 60,
    questions: [
      {
        type: 'color',
        question: 'Quelle est la couleur "Rouge" ?',
        hint: 'Couleur chaude',
        options: ['Bleu', 'Rouge', 'Vert', 'Jaune'],
        correct: 1,
        color: '#ff4444'
      },
      {
        type: 'color',
        question: 'Quelle est la couleur "Bleu" ?',
        hint: 'Couleur du ciel',
        options: ['Bleu', 'Rouge', 'Vert', 'Jaune'],
        correct: 0,
        color: '#4444ff'
      },
      {
        type: 'color',
        question: 'Quelle est la couleur "Vert" ?',
        hint: 'Couleur de l\'herbe',
        options: ['Bleu', 'Rouge', 'Vert', 'Jaune'],
        correct: 2,
        color: '#44ff44'
      },
      {
        type: 'match',
        question: 'Associe la couleur au nom',
        hint: '🟡 = ?',
        options: ['Blanc', 'Noir', 'Jaune', 'Rose'],
        correct: 2,
        image: '💛'
      }
    ]
  },
  {
    id: 3,
    title: 'Les Nombres 1-10 🔢',
    description: 'Apprends à compter de 1 à 10',
    icon: '🔢',
    reward: 70,
    questions: [
      {
        type: 'number',
        question: 'Combien y a-t-il de pommes ?',
        hint: '🍎 = ?',
        options: ['Un (1)', 'Deux (2)', 'Trois (3)', 'Quatre (4)'],
        correct: 0,
        image: '🍎'
      },
      {
        type: 'number',
        question: '🍎🍎 Combien de pommes ?',
        hint: 'Deux = ?',
        options: ['1', '2', '3', '4'],
        correct: 1,
        image: '🍎🍎'
      },
      {
        type: 'count',
        question: 'Choisis le nombre 3',
        hint: 'Trois',
        options: ['1', '2', '3', '4'],
        correct: 2,
        visual: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐']
      },
      {
        type: 'sequence',
        question: 'Complète : 1, 2, 3, __',
        hint: 'Quel est le nombre suivant ?',
        options: ['3', '4', '5', '6'],
        correct: 1
      }
    ]
  },
  {
    id: 4,
    title: 'Les Animaux 🐾',
    description: 'Apprends les noms des animaux',
    icon: '🦁',
    reward: 80,
    questions: [
      {
        type: 'animal',
        question: 'Quel est le nom de cet animal ? 🐕',
        hint: 'Chien = ?',
        options: ['Chat', 'Chien', 'Lion', 'Éléphant'],
        correct: 1
      },
      {
        type: 'animal',
        question: 'Chat = 🐱',
        hint: 'Que signifie Chat ?',
        options: ['Chien', 'Lion', 'Chat', 'Ours'],
        correct: 2
      },
      {
        type: 'sound',
        question: 'Quel est le cri du "Lion" ?',
        hint: '🦁 = ?',
        options: ['Miaou', 'Wouf', 'Rugissement', 'Cocorico'],
        correct: 2,
        audio: '/audio/lion.mp3'
      },
      {
        type: 'match',
        question: 'Associe l\'animal à sa maison',
        hint: '🐟 = ?',
        options: ['Sur terre', 'Dans l\'eau', 'Dans les airs', 'Dans la forêt'],
        correct: 1
      }
    ]
  },
  {
    id: 5,
    title: 'La Famille 👨‍👩‍👧‍👦',
    description: 'Apprends les membres de la famille',
    icon: '👨‍👩‍👧‍👦',
    reward: 90,
    questions: [
      {
        type: 'family',
        question: 'Père = 👨',
        hint: 'C\'est qui ?',
        options: ['Le père', 'La mère', 'Le grand-père', 'L\'oncle'],
        correct: 0
      },
      {
        type: 'family',
        question: 'Mère = 👩',
        hint: 'C\'est qui ?',
        options: ['La mère', 'La sœur', 'La tante', 'La grand-mère'],
        correct: 0
      },
      {
        type: 'match',
        question: '👧 Frère ou Sœur ?',
        hint: 'Une fille = ?',
        options: ['Frère', 'Sœur', 'Père', 'Mère'],
        correct: 1
      }
    ]
  },
  {
    id: 6,
    title: 'La Nourriture 🍕',
    description: 'Apprends les noms des aliments',
    icon: '🍕',
    reward: 100,
    questions: [
      {
        type: 'food',
        question: '🍎 Pomme = ?',
        hint: 'Fruit rouge',
        options: ['Orange', 'Pomme', 'Banane', 'Raisin'],
        correct: 1
      },
      {
        type: 'food',
        question: '🥖 Baguette = ?',
        hint: 'Pain français long',
        options: ['Gâteau', 'Pain', 'Biscuit', 'Croissant'],
        correct: 1
      },
      {
        type: 'like',
        question: 'J\'aime les 🍕',
        hint: 'Pizza = ?',
        options: ['Pâtes', 'Pizza', 'Salade', 'Soupe'],
        correct: 1
      }
    ]
  },
  {
    id: 7,
    title: 'Le Corps 🫁',
    description: 'Les parties du corps en français',
    icon: '👤',
    reward: 110,
    questions: [
      {
        type: 'body',
        question: '👁️ Oeil = ?',
        hint: 'On voit avec',
        options: ['L\'oreille', 'L\'œil', 'Le nez', 'La bouche'],
        correct: 1
      },
      {
        type: 'body',
        question: '👂 Oreille = ?',
        hint: 'On entend avec',
        options: ['L\'oreille', 'La main', 'Le pied', 'La tête'],
        correct: 0
      },
      {
        type: 'action',
        question: 'Je touche avec ma 👋',
        hint: 'Main = ?',
        options: ['Ma tête', 'Ma main', 'Mon pied', 'Mon œil'],
        correct: 1
      }
    ]
  },
  {
    id: 8,
    title: 'La Météo ☀️',
    description: 'Les expressions météo et les saisons',
    icon: '🌤️',
    reward: 120,
    questions: [
      {
        type: 'weather',
        question: '☀️ Il fait soleil = ?',
        hint: 'Chaud et brillant',
        options: ['Pluvieux', 'Ensoleillé', 'Nuageux', 'Venteux'],
        correct: 1
      },
      {
        type: 'weather',
        question: '🌧️ Il pleut = ?',
        hint: 'On a besoin d\'un parapluie',
        options: ['Neige', 'Pluie', 'Soleil', 'Vent'],
        correct: 1
      },
      {
        type: 'season',
        question: '🌸 Le printemps = ?',
        hint: 'Les fleurs s\'épanouissent',
        options: ['L\'été', 'Le printemps', 'L\'automne', 'L\'hiver'],
        correct: 1
      }
    ]
  },
  {
    id: 9,
    title: 'L\'École 📚',
    description: 'Les fournitures et la salle de classe',
    icon: '🎒',
    reward: 130,
    locked: true,
    questions: [
      {
        type: 'school',
        question: '📖 Livre = ?',
        hint: 'On lit dedans',
        options: ['Stylo', 'Livre', 'Cahier', 'Gomme'],
        correct: 1
      },
      {
        type: 'school',
        question: '✏️ Crayon = ?',
        hint: 'On écrit avec',
        options: ['Crayon', 'Stylo', 'Pinceau', 'Règle'],
        correct: 0
      },
      {
        type: 'place',
        question: '🏫 École = ?',
        hint: 'On apprend là-bas',
        options: ['L\'hôpital', 'L\'école', 'La maison', 'Le magasin'],
        correct: 1
      }
    ]
  },
  {
    id: 10,
    title: 'Le Sport ⚽',
    description: 'Les sports et les mouvements',
    icon: '⚽',
    reward: 150,
    locked: true,
    questions: [
      {
        type: 'sport',
        question: '⚽ Je joue au foot',
        hint: 'Sport avec un ballon',
        options: ['Basket', 'Football', 'Tennis', 'Natation'],
        correct: 1
      },
      {
        type: 'action',
        question: '🏃 Je cours = ?',
        hint: 'Mouvement rapide',
        options: ['Je marche', 'Je cours', 'Je saute', 'Je nage'],
        correct: 1
      },
      {
        type: 'sport',
        question: '🏊 La natation = ?',
        hint: 'Dans l\'eau',
        options: ['La course', 'La natation', 'Le saut', 'L\'équitation'],
        correct: 1
      }
    ]
  }
]

export const badgesFr = [
  { id: 'first-lesson', name: 'Premier pas', desc: 'Termine ta première leçon', icon: '🌟' },
  { id: 'lesson-1', name: 'Lecteur expert', desc: 'Maîtrise l\'alphabet', icon: '🔤' },
  { id: 'lesson-2', name: 'Petit artiste', desc: 'Apprends les couleurs', icon: '🎨' },
  { id: 'lesson-3', name: 'Mathématicien', desc: 'Maîtrise les nombres', icon: '🔢' },
  { id: 'lesson-4', name: 'Explorateur', desc: 'Connais les animaux', icon: '🦁' },
  { id: 'lesson-5', name: 'Familial', desc: 'Connais ta famille', icon: '👨‍👩‍👧‍👦' },
  { id: 'lesson-6', name: 'Délicieux !', desc: 'Apprends la nourriture', icon: '🍕' },
  { id: 'lesson-7', name: 'Petit médecin', desc: 'Connais ton corps', icon: '🫁' },
  { id: 'lesson-8', name: 'Météo', desc: 'Apprends la météo', icon: '🌤️' },
  { id: 'lesson-9', name: 'Élève studieux', desc: 'Aime l\'école', icon: '🎒' },
  { id: 'lesson-10', name: 'Sportif', desc: 'Aime le sport', icon: '🏆' },
  { id: 'streak-3', name: 'Grimpeur', desc: '3 leçons de suite', icon: '🔥' },
  { id: 'streak-7', name: 'Champion', desc: '7 leçons de suite', icon: '⚡' },
  { id: 'points-500', name: 'Riche', desc: '500 points', icon: '💎' },
  { id: 'points-1000', name: 'Millionnaire', desc: '1000 points', icon: '👑' },
  { id: 'perfect', name: 'Parfait', desc: 'Leçon avec 100%', icon: '💯' },
  { id: 'speed', name: 'Rapide', desc: 'Termine une leçon vite', icon: '⚡' },
  { id: 'collector', name: 'Collectionneur', desc: '10 badges', icon: '🏅' },
  { id: 'master', name: 'Expert français', desc: 'Termine toutes les leçons', icon: '🥇' },
  { id: 'champion', name: 'Héros', desc: '2000 points', icon: '🏆' }
]