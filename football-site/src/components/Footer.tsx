import React from 'react';
import { Trophy, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Команды', href: '#teams' },
    { name: 'Игроки', href: '#players' },
    { name: 'Турниры', href: '#tournaments' },
    { name: 'Расписание', href: '#schedule' },
    { name: 'Новости', href: '#news' },
    { name: 'Статистика', href: '#stats' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' }
  ];

  const contactInfo = [
    { icon: Mail, text: 'info@footballleague.com' },
    { icon: Phone, text: '+1 (555) 123-4567' },
    { icon: MapPin, text: '123 Football Street, Sports City' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo and Description */}
          <div>
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <Trophy size={24} color="#000" />
              </div>
              <span className="footer-logo-text gradient-text">Football League</span>
            </div>
            <p className="footer-description">
              Лучшая футбольная лига мира. Следите за матчами, командами и игроками в режиме реального времени.
            </p>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="social-link"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3>Быстрые ссылки</h3>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3>Контакты</h3>
            <div>
              {contactInfo.map((contact, index) => (
                <div key={index} className="footer-contact">
                  <contact.icon size={20} className="footer-contact-icon" />
                  <span>{contact.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3>Подписка на новости</h3>
            <div className="newsletter">
              <p className="newsletter-description">
                Получайте последние новости и обновления о матчах
              </p>
              <input
                type="email"
                placeholder="Ваш email"
                className="newsletter-input"
              />
              <button className="btn-primary newsletter-btn">
                Подписаться
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {currentYear} Football League. Все права защищены.
          </div>
          <div className="footer-bottom-links">
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Условия использования</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;