import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import strings from '../../string_values.json';

interface Movement {
  id: number;
  title: string;
  description: string;
}

const MovementSection = () => {
  const [activeMovement, setActiveMovement] = useState<number>(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px 0px' });
  const controls = useAnimation();

  // Fetch movements array from JSON
  const movements: Movement[] = strings.MovementSection.movements;

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section
      id="movements"
      ref={sectionRef}
      className="relative py-24 min-h-screen flex flex-col justify-center bg-secondary/30"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="tag tag-movement mb-3">{strings.MovementSection.tag}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {strings.MovementSection.sectionHeading}
          </h2>
          <p className="text-foreground/80 text-lg md:text-xl">
            {strings.MovementSection.sectionDescription}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-11 gap-8 items-start"
        >
          <motion.div variants={cardVariants} className="lg:col-span-4 flex flex-col space-y-4">
            {movements.map((movement) => (
              <button
                key={movement.id}
                onClick={() => setActiveMovement(movement.id)}
                className={cn(
                  'text-left p-6 rounded-xl transition-all duration-300 group hover-card',
                  activeMovement === movement.id ? 'bg-primary text-white' : 'bg-white hover:bg-primary/5'
                )}
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={cn(
                      'text-sm font-medium px-2 py-0.5 rounded-full',
                      activeMovement === movement.id
                        ? 'bg-white/20 text-white'
                        : 'bg-primary/10 text-primary'
                    )}
                  >
                    {strings.MovementSection.movementLabel} {movement.id}
                  </span>

                  <ChevronRight
                    className={cn(
                      'w-5 h-5 transition-transform',
                      activeMovement === movement.id
                        ? 'text-white'
                        : 'text-primary group-hover:translate-x-1'
                    )}
                  />
                </div>

                <h3
                  className={cn(
                    'text-xl font-semibold mb-2',
                    activeMovement !== movement.id && 'text-foreground'
                  )}
                >
                  {movement.title}
                </h3>

                <p
                  className={cn(
                    'text-sm',
                    activeMovement === movement.id ? 'text-white/90' : 'text-foreground/70'
                  )}
                >
                  {movement.description}
                </p>
              </button>
            ))}
          </motion.div>

          <motion.div variants={cardVariants} className="lg:col-span-7">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="mb-6">
                <span className="tag tag-movement mb-2">
                  {strings.MovementSection.movementLabel} {activeMovement}
                </span>
                <h3 className="text-2xl font-bold mb-4">
                  {movements.find((m) => m.id === activeMovement)?.title}
                </h3>

                <p className="text-foreground/80 mb-8">
                  {movements.find((m) => m.id === activeMovement)?.description}
                </p>
              </div>

              {/* Additional details for each movement remain unchanged (A/B/C items). */}
              <div className="space-y-6">
                {activeMovement === 1 && (
                  <>
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1">
                        A
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Increase Higher-Wage Jobs</h4>
                        <p className="text-foreground/70 text-sm">
                          Creating opportunities for residents to access quality jobs with wages that
                          provide financial stability and growth potential.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1">
                        B
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Expand Access & Training for Tech Jobs</h4>
                        <p className="text-foreground/70 text-sm">
                          Providing pathways to tech careers through accessible education, training
                          programs, and industry partnerships.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1">
                        C
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Recruit & Retain Companies in St. Paul</h4>
                        <p className="text-foreground/70 text-sm">
                          Attracting businesses to locate and remain in Saint Paul, creating a vibrant
                          economic ecosystem and job opportunities.
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {activeMovement === 2 && (
                  <>
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1">
                        A
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Improve Housing Access & Development</h4>
                        <p className="text-foreground/70 text-sm">
                          Creating strategic housing developments that address gaps in the market and
                          improve accessibility for all residents.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1">
                        B
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">
                          Secure Investment for Affordable & Mixed-Income Projects
                        </h4>
                        <p className="text-foreground/70 text-sm">
                          Establishing funding mechanisms and partnerships to support diverse housing
                          options at various price points.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1">
                        C
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">
                          Strengthen Coordination with Developers and City Programs
                        </h4>
                        <p className="text-foreground/70 text-sm">
                          Building effective collaborations between public agencies, developers, and
                          community organizations to streamline housing initiatives.
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {activeMovement === 3 && (
                  <>
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1">
                        A
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">
                          Foster Clean Tech Partnerships & Innovation
                        </h4>
                        <p className="text-foreground/70 text-sm">
                          Collaborating with technology providers and innovators to develop and
                          implement sustainable solutions across the city.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1">
                        B
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">
                          Incorporate Sustainable Practices in All City/Private Developments
                        </h4>
                        <p className="text-foreground/70 text-sm">
                          Ensuring that new construction and development projects adhere to
                          environmentally conscious standards and best practices.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1">
                        C
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">
                          Ensure Workforce Programs Incorporate \"Green\"/Sustainability Skills
                        </h4>
                        <p className="text-foreground/70 text-sm">
                          Training the workforce in environmentally sustainable practices and
                          emerging green technologies to prepare for future job markets.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MovementSection;