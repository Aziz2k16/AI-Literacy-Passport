import React from 'react';
import { 
  Compass, 
  Dumbbell, 
  Sparkles, 
  Trophy, 
  BookOpen, 
  ShoppingBag, 
  Settings as SettingsIcon 
} from 'lucide-react';

export type ActiveTab = 'path' | 'practice' | 'coach' | 'leaderboard' | 'passport' | 'shop' | 'settings';

interface NavbarProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onChangeTab }) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'path', label: 'Skill Path', icon: Compass },
    { id: 'practice', label: 'Practice Hub', icon: Dumbbell },
    { id: 'coach', label: 'AI Prompt Coach', icon: Sparkles, badge: 'AI' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'passport', label: 'My Passport', icon: BookOpen },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <aside id="desktop-sidebar-nav" className="hidden md:flex flex-col w-64 border-r border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-4 space-y-2 shrink-0 min-h-[calc(100vh-57px)]">
        <div className="px-3 py-2 text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Main Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`sidebar-nav-${item.id}`}
              onClick={() => onChangeTab(item.id)}
              className={`flex items-center justify-between w-full px-3.5 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav id="mobile-bottom-nav" className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {navItems.slice(0, 6).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => onChangeTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold scale-105'
                  : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">{item.label.split(' ')[0]}</span>
              {isActive && (
                <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
};
