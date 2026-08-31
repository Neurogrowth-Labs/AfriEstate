
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { GlobeAltIcon } from './icons/NavIcons';
import { BellIcon, UserCircleIcon, CheckBadgeIcon, BanknotesIcon } from './icons/ActionIcons';
import type { User, Notification } from '../types';
import { Language, Currency } from '../types';
import { useTranslations } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { languageOptions, currencyOptions } from '../constants';
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import NotificationsPanel from './NotificationsPanel';

interface HeaderProps {
  currentUser: User | null;
  notifications: Notification[];
  readNotificationIds: Set<string>;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onDashboardClick: () => void;
  onListPropertyClick: () => void;
  onNotificationClick: (notification: Notification) => void;
  onMarkAllNotificationsAsRead: () => void;
  onHomeClick: () => void;
  onAboutClick: () => void;
  onServicesClick: () => void;
  onContactClick: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, notifications, readNotificationIds, onLoginClick, onSignUpClick, onDashboardClick, onListPropertyClick, onNotificationClick, onMarkAllNotificationsAsRead, onHomeClick, onAboutClick, onServicesClick, onContactClick, theme, onThemeToggle }) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const langRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const { language, setLanguage, t, isTranslating } = useTranslations();
  const { currency, setCurrency } = useCurrency();

  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
        if (langRef.current && !langRef.current.contains(event.target as Node)) setIsLangOpen(false);
        if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) setIsCurrencyOpen(false);
        if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) setIsNotificationsOpen(false);
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  const getButtonText = () => {
    if (!currentUser) return t.header.signUp;
    switch (currentUser.role) {
      case 'investor':
        return t.header.makeRequest;
      case 'user':
        return t.header.listService;
      case 'agent':
      default:
        return t.header.listProperty;
    }
  };

  const mobileLinkClick = (handler: () => void, event?: React.MouseEvent<HTMLAnchorElement>) => {
    event?.preventDefault();
    handler();
    setIsMobileMenuOpen(false);
  }

  const handleNotificationItemClick = (notification: Notification) => {
    onNotificationClick(notification);
    setIsNotificationsOpen(false);
  };

  return (
    <header className="glass-header sticky top-0 z-40 shadow-none">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <button onClick={onHomeClick} className="flex items-center space-x-2 flex-shrink-0 group">
          <span className="text-xl font-bold text-brand-dark dark:text-white tracking-tight">AfriEstate</span>
        </button>
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onThemeToggle}
            type="button"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/25 bg-white px-3 py-2 text-sm font-black text-brand-dark transition-colors hover:bg-brand-primary hover:text-white dark:bg-dark-bg dark:text-white dark:hover:bg-brand-primary"
          >
            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            <span className="hidden md:inline">{theme === 'light' ? 'Dark' : 'Light'} mode</span>
          </button>
          <div className="relative" ref={currencyRef}>
            <button
              type="button"
              aria-label="Choose display currency"
              aria-expanded={isCurrencyOpen}
              aria-haspopup="menu"
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              className="p-1.5 rounded-lg text-brand-dark/70 dark:text-white/70 hover:bg-brand-primary/10 hover:text-brand-primary dark:hover:text-white transition-colors flex items-center gap-1.5"
            >
                <BanknotesIcon className="w-5 h-5" />
                <span className="text-xs font-semibold hidden sm:inline">{currencyOptions[currency].symbol}</span>
            </button>
            {isCurrencyOpen && (
                <div role="menu" aria-label="Display currency" className="absolute top-full right-0 mt-2 w-48 max-h-60 overflow-y-auto custom-scrollbar glass-panel rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 py-1 z-50">
                    {Object.entries(currencyOptions).map(([code, details]) => (
                         <button 
                            key={code}
                            onClick={() => {
                                setCurrency(code as Currency);
                                setIsCurrencyOpen(false);
                            }}
                            role="menuitemradio"
                            aria-checked={currency === code}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between"
                         >
                            <span>{details.symbol} {details.name}</span>
                            {currency === code && <CheckBadgeIcon className="w-4 h-4 text-brand-primary"/>}
                         </button>
                    ))}
                </div>
            )}
          </div>
          <div className="relative" ref={langRef}>
            <button
              type="button"
              aria-label="Choose language"
              aria-expanded={isLangOpen}
              aria-haspopup="menu"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="p-1.5 rounded-lg text-brand-dark/70 dark:text-white/70 hover:bg-brand-primary/10 hover:text-brand-primary dark:hover:text-white transition-colors flex items-center gap-1.5"
            >
                <GlobeAltIcon className="w-5 h-5" />
                {isTranslating ? (
                    <div className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-lg animate-spin"></div>
                ) : (
                    <span className="text-xs font-semibold hidden sm:inline">{languageOptions[language].flag}</span>
                )}
            </button>
            {isLangOpen && (
                <div role="menu" aria-label="Language" className="absolute top-full right-0 mt-2 w-40 glass-panel rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 py-1 z-50">
                    {Object.entries(languageOptions).map(([langCode, langDetails]) => (
                         <button 
                            key={langCode}
                            onClick={() => {
                                setLanguage(langCode as Language);
                                setIsLangOpen(false);
                            }}
                            role="menuitemradio"
                            aria-checked={language === langCode}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between"
                         >
                            <span>{langDetails.flag} {langDetails.name}</span>
                            {language === langCode && <CheckBadgeIcon className="w-4 h-4 text-brand-primary"/>}
                         </button>
                    ))}
                </div>
            )}
          </div>
          <div className="relative" ref={notificationsRef}>
            <button
                type="button"
                aria-label={currentUser ? `Notifications${unreadCount ? `, ${unreadCount} unread` : ''}` : 'Sign in to view notifications'}
                aria-expanded={isNotificationsOpen}
                aria-haspopup={currentUser ? 'dialog' : undefined}
                onClick={() => currentUser ? setIsNotificationsOpen(prev => !prev) : onLoginClick()}
                className="p-1.5 rounded-lg text-brand-dark/70 dark:text-white/70 hover:bg-brand-primary/10 hover:text-brand-primary dark:hover:text-white transition-colors relative"
            >
                <BellIcon className="w-5 h-5" />
                {currentUser && unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 flex h-3 w-3 items-center justify-center rounded-lg bg-brand-primary text-white text-[9px] font-bold">
                    {unreadCount}
                </span>
                )}
            </button>
            {isNotificationsOpen && currentUser && (
                <NotificationsPanel 
                    notifications={notifications} 
                    onNotificationClick={handleNotificationItemClick}
                    onMarkAllAsRead={onMarkAllNotificationsAsRead}
                />
            )}
          </div>
          
          {currentUser ? (
            <div className="relative">
              <button onClick={onDashboardClick} className="p-1.5 rounded-lg text-brand-dark/70 dark:text-white/70 hover:bg-brand-primary/10 hover:text-brand-primary dark:hover:text-white transition-colors">
                <UserCircleIcon className="w-6 h-6" />
              </button>
              {currentUser.isVerified && (currentUser.role === 'agent' || currentUser.role === 'investor') && (
                <CheckBadgeIcon className="absolute -bottom-0.5 -right-0.5 w-4 h-4 text-brand-primary bg-white rounded-lg" />
              )}
            </div>
          ) : (
            <button onClick={onLoginClick} className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-white transition duration-200 hidden md:block">{t.header.login}</button>
          )}

          <button onClick={currentUser ? onListPropertyClick : onSignUpClick} className="bg-brand-primary text-white text-sm px-4 py-2 rounded-lg font-bold hover:bg-brand-secondary transition-all shadow-sm hover:shadow hidden sm:block">
              {getButtonText()}
          </button>

          <div className="lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1.5 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
       {/* Mobile Menu */}
      <div className={`absolute top-full left-0 w-full glass-panel lg:hidden transition-all duration-300 ease-in-out overflow-hidden shadow-2xl ${isMobileMenuOpen ? 'max-h-96 border-b border-slate-100 dark:border-slate-800' : 'max-h-0'}`}>
        <nav className="flex flex-col p-4 space-y-2">
            {!currentUser && <a href="/login" onClick={(e) => mobileLinkClick(onLoginClick, e)} className="mobile-nav-link md:hidden">{t.header.login}</a>}
            <button onClick={() => mobileLinkClick(currentUser ? onListPropertyClick : onSignUpClick)} className="bg-brand-primary text-white px-5 py-2.5 rounded-lg font-semibold w-full mt-2 sm:hidden">
              {getButtonText()}
          </button>
        </nav>
      </div>
      <style>{`.mobile-nav-link { @apply text-slate-600 dark:text-slate-300 font-semibold p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-primary; }`}</style>
    </header>
  );
};

export default Header;
