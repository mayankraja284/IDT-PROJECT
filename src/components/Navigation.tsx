import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BookOpen, Gamepad2, LayoutDashboard, Leaf } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/learn', label: 'Learn', icon: BookOpen },
  { path: '/games', label: 'Games', icon: Gamepad2 },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-3xl"
            >
              🌱
            </motion.div>
            <span className="font-bold text-xl text-primary hidden sm:block">
              EcoKids
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-4 py-2 rounded-xl transition-all duration-200"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-primary/10 rounded-xl"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className={`relative flex items-center gap-2 font-semibold ${
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}>
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Eco Points Display */}
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
            <Leaf className="w-5 h-5 text-primary" />
            <span className="font-bold text-primary">Eco Points</span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active-mobile"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className={`relative w-6 h-6 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`} />
                <span className={`relative text-xs font-semibold ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
