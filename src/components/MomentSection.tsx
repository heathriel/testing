import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import DetailCard from './DetailCard';
import strings from '../../string_values.json';

interface Moment {
  id: number;
  title: string;
  context: string;
  asks: Array<{
    title: string;
    description: string;
  }>;
  offers: Array<{
    title: string;
    description: string;
  }>;
}

const MomentSection = () => {
  const [activeMoment, setActiveMoment] = useState<number>(1);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fetch moments array from JSON
  const moments: Moment[] = strings.MomentSection.moments;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="moments"
      ref={sectionRef}
      className="py-24 min-h-screen flex flex-col justify-center bg-gradient-to-b from-white to-secondary/30"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={cn(
            'max-w-3xl mx-auto text-center mb-16 transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}
        >
          <span className="tag tag-moment mb-3">{strings.MomentSection.tag}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {strings.MomentSection.sectionHeading}
          </h2>
          <p className="text-foreground/80 text-lg md:text-xl">
            {strings.MomentSection.sectionDescription}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="sticky top-24 space-y-4">
              {moments.map((moment) => (
                <button
                  key={moment.id}
                  onClick={() => setActiveMoment(moment.id)}
                  className={cn(
                    'w-full text-left p-5 rounded-xl transition-all duration-300',
                    isInView && 'animate-fade-in-left',
                    activeMoment === moment.id
                      ? 'bg-accent text-white shadow-lg'
                      : 'bg-white hover:bg-accent/5 shadow'
                  )}
                  style={{ animationDelay: `${moment.id * 0.1}s` }}
                >
                  <span
                    className={cn(
                      'text-sm font-medium px-2 py-0.5 rounded-full mb-2 inline-block',
                      activeMoment === moment.id
                        ? 'bg-white/20 text-white'
                        : 'bg-accent/10 text-accent'
                    )}
                  >
                    {strings.MomentSection.momentLabel} {moment.id}
                  </span>

                  <h3
                    className={cn(
                      'text-lg font-semibold',
                      activeMoment !== moment.id && 'text-foreground'
                    )}
                  >
                    {moment.title}
                  </h3>
                </button>
              ))}
            </div>
          </div>

          <div className="md:w-2/3">
            <DetailCard
              moment={moments.find((m) => m.id === activeMoment) || moments[0]}
              isVisible={isInView}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MomentSection;