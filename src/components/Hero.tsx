
import { useEffect, useRef } from 'react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Parallax scroll effect
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const opacity = Math.max(1 - scrollY / 500, 0);
        const transform = `translateY(${scrollY * 0.4}px)`;
        
        heroRef.current.style.opacity = opacity.toString();
        heroRef.current.style.transform = transform;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToMovements = () => {
    const movementsSection = document.getElementById('movements');
    if (movementsSection) {
      movementsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="noise"></div>
      
      <div 
        ref={heroRef}
        className="container mx-auto px-4 md:px-6 relative z-10"
      >
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Mary Rick
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/80 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              A vision for reducing income inequality, solving housing challenges, and advancing sustainability.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <button 
              onClick={scrollToMovements}
              className="px-6 py-3 rounded-md bg-primary text-white font-medium hover-card"
            >
              Explore the Vision
            </button>
            
            <a 
              href="#moments" 
              className="px-6 py-3 rounded-md border border-foreground/20 hover:border-foreground/40 transition-colors"
            >
              Current Initiatives
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center">
          <div className="w-1 h-2 bg-foreground/30 rounded-full mt-2 animate-pulse-subtle"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
