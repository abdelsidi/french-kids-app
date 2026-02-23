import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Coffee, CreditCard, ArrowLeft } from 'lucide-react';

function SupportPage({ onBack }) {
  const supportMethods = [
    {
      icon: '☕',
      title: 'Buy Me a Coffee',
      description: 'ادعمنا بكوب قهوة',
      link: 'https://www.buymeacoffee.com/yourusername',
      color: '#FFDD00'
    },
    {
      icon: '💳',
      title: 'PayPal',
      description: 'تحويل عبر PayPal',
      link: 'https://paypal.me/yourusername',
      color: '#003087'
    },
    {
      icon: '💎',
      title: 'Ko-fi',
      description: 'ادعمنا على Ko-fi',
      link: 'https://ko-fi.com/yourusername',
      color: '#FF5E5B'
    }
  ];

  const stats = [
    { label: 'تكلفة الاستضافة الشهرية', value: '$5' },
    { label: 'تكلفة النطاق السنوية', value: '$12' },
    { label: 'وقت التطوير', value: '100+ ساعة' },
    { label: 'عدد الدروس', value: '10+ درس' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="support-page"
    >
      <header className="support-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={24} />
          رجوع
        </button>
        <h1>❤️ ادعم المشروع</h1>
      </header>

      <div className="support-content">
        <section className="about-section">
          <h2>🎯 لماذا نحتاج دعمك؟</h2>
          <p>
            هذا المشروع مجاني 100% للأطفال في جميع أنحاء العالم. 
            تبرعاتك تساعدنا في:
          </p>
          <ul>
            <li>✅ دفع تكاليف الاستضافة والخوادم</li>
            <li>✅ إضافة محتوى تعليمي جديد</li>
            <li>✅ تطوير ميزات ذكاء اصطناعي</li>
            <li>✅ تحسين تجربة المستخدم</li>
            <li>✅ إضافة ألعاب وأنشطة تفاعلية</li>
          </ul>
        </section>

        <section className="stats-section">
          <h2>📊 تفاصيل التكاليف</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="methods-section">
          <h2>💝 طرق الدعم</h2>
          <div className="methods-grid">
            {supportMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="method-card"
                style={{ borderColor: method.color }}
              >
                <span className="method-icon">{method.icon}</span>
                <h3>{method.title}</h3>
                <p>{method.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="thanks-section">
          <h2>🙏 شكر خاص</h2>
          <p>لجميع الداعمين الذين يجعلون هذا المشروع ممكناً:</p>
          <div className="supporters-list">
            <span className="supporter-name">🌟 أنت الأول!</span>
            <p>كن أول من يظهر اسمك هنا</p>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default SupportPage;