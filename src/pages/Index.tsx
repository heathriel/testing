import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import MovementSection from '@/components/MovementSection';
import MissionSection from '@/components/MissionSection';
import MomentSection from '@/components/MomentSection';

import strings from '../../string_values.json';

const Index = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    });
  }, [controls]);

  // Handle year substitution in the footer copyright
  const year = new Date().getFullYear();
  const footerCopyright = strings.IndexPage
    .copyright
    .replace('{year}', String(year));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="min-h-screen scroll-container"
    >
      <Navigation />
      <Hero />
      <MovementSection />
      <MissionSection />
      <MomentSection />

      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl font-serif font-bold mb-6">
            {strings.IndexPage.footerHeading}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            {strings.IndexPage.footerParagraph}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="#movements" className="text-white/80 hover:text-white transition-colors">
              {strings.IndexPage.movementsLinkLabel}
            </a>
            <span className="text-white/40">•</span>
            <a href="#missions" className="text-white/80 hover:text-white transition-colors">
              {strings.IndexPage.missionsLinkLabel}
            </a>
            <span className="text-white/40">•</span>
            <a href="#moments" className="text-white/80 hover:text-white transition-colors">
              {strings.IndexPage.momentsLinkLabel}
            </a>
          </div>

          <p className="text-white/60 text-sm">
            {footerCopyright}
          </p>
        </div>
      </footer>
    </motion.div>
  );
};

export default Index;