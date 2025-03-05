import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import strings from '../../string_values.json';

interface Mission {
  id: string;
  movement: number;
  title: string;
  description: string;
}

const MissionSection = () => {
  const [selectedMovement, setSelectedMovement] = useState<number>(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fetch missions array from JSON
  const missions: Mission[] = strings.MissionSection.missions;

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

  // Filter based on selected movement
  const filteredMissions = selectedMovement === 0
    ? missions
    : missions.filter((mission) => mission.movement === selectedMovement);

  const movementNames = [
    strings.MissionSection.movementFilterAll,
    strings.MissionSection.movementFilter1,
    strings.MissionSection.movementFilter2,
    strings.MissionSection.movementFilter3
  ];

  return (
    <section id="missions" ref={sectionRef} className="py-24 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={cn(
            'max-w-3xl mx-auto text-center mb-16 transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}
        >
          <span className="tag tag-mission mb-3">{strings.MissionSection.tag}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {strings.MissionSection.sectionHeading}
          </h2>
          <p className="text-foreground/80 text-lg md:text-xl">
            {strings.MissionSection.sectionDescription}
          </p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {movementNames.map((name, index) => (
            <button
              key={index}
              onClick={() => setSelectedMovement(index)}
              className={cn(
                'px-4 py-2 rounded-full text-sm transition-all duration-300',
                selectedMovement === index
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-white hover:bg-accent/10 border border-accent/20'
              )}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMissions.map((mission, index) => (
            <div
              key={mission.id}
              className={cn(
                'bg-white rounded-xl p-6 shadow hover-card opacity-0 transition-all duration-500',
                isInView && 'animate-fade-in'
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="tag tag-mission">
                  {strings.MissionSection.missionLabel} {mission.id}
                </span>
                <span
                  className={cn(
                    'tag',
                    mission.movement === 1 && 'tag-movement',
                    mission.movement === 2 && 'bg-emerald-500/10 text-emerald-700',
                    mission.movement === 3 && 'bg-amber-500/10 text-amber-700'
                  )}
                >
                  {mission.movement === 1 && strings.MissionSection.movementFilter1}
                  {mission.movement === 2 && strings.MissionSection.movementFilter2}
                  {mission.movement === 3 && strings.MissionSection.movementFilter3}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-3">{mission.title}</h3>
              <p className="text-foreground/70 text-sm">{mission.description}</p>

              <div className="mt-6 pt-4 border-t border-foreground/10">
                <button className="text-sm text-accent font-medium hover:underline">
                  {strings.MissionSection.relatedMoments}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;