
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar style when scrolled
      setIsScrolled(window.scrollY > 50);
      
      // Set active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionId = section.getAttribute('id') || '';
        
        if (sectionTop < 200 && sectionTop >= -200) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "py-2 bg-white/80 backdrop-blur-md shadow-sm" 
          : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div 
          className="font-serif text-2xl font-medium cursor-pointer" 
          onClick={() => scrollToSection('hero')}
        >
          Saint Paul Vision
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { id: 'movements', label: 'Movements' },
            { id: 'missions', label: 'Missions' },
            { id: 'moments', label: 'Moments' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "relative font-medium transition-colors",
                activeSection === item.id 
                  ? "text-primary" 
                  : "text-foreground/80 hover:text-foreground"
              )}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </nav>
        
        <div className="md:hidden">
          <button 
            className="flex items-center space-x-1 text-foreground/80 p-2"
            onClick={() => {
              const mobileMenu = document.getElementById('mobile-menu');
              mobileMenu?.classList.toggle('hidden');
            }}
          >
            <span>Menu</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          
          <div id="mobile-menu" className="hidden absolute top-full right-0 mt-2 w-48 rounded-md shadow-lg bg-white p-2 z-50">
            {[
              { id: 'hero', label: 'Home' },
              { id: 'movements', label: 'Movements' },
              { id: 'missions', label: 'Missions' },
              { id: 'moments', label: 'Moments' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  document.getElementById('mobile-menu')?.classList.add('hidden');
                }}
                className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted rounded-md"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
