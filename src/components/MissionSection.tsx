
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Mission {
  id: string;
  movement: number;
  title: string;
  description: string;
}

const missions: Mission[] = [
  // Movement 1: Solve for Income Inequality
  {
    id: "1A",
    movement: 1,
    title: "Increase Higher-Wage Jobs",
    description: "Creating opportunities for residents to access quality jobs with wages that provide financial stability and growth potential."
  },
  {
    id: "1B",
    movement: 1,
    title: "Expand Access & Training for Tech Jobs",
    description: "Providing pathways to tech careers through accessible education, training programs, and industry partnerships."
  },
  {
    id: "1C",
    movement: 1,
    title: "Recruit & Retain Companies in St. Paul",
    description: "Attracting businesses to locate and remain in Saint Paul, creating a vibrant economic ecosystem and job opportunities."
  },
  
  // Movement 2: Solve for Housing
  {
    id: "2A",
    movement: 2,
    title: "Improve Housing Access & Development",
    description: "Creating strategic housing developments that address gaps in the market and improve accessibility for all residents."
  },
  {
    id: "2B",
    movement: 2,
    title: "Secure Investment for Affordable & Mixed-Income Projects",
    description: "Establishing funding mechanisms and partnerships to support diverse housing options at various price points."
  },
  {
    id: "2C",
    movement: 2,
    title: "Strengthen Coordination with Developers and City Programs",
    description: "Building effective collaborations between public agencies, developers, and community organizations to streamline housing initiatives."
  },
  
  // Movement 3: Advance Sustainability
  {
    id: "3A",
    movement: 3,
    title: "Foster Clean Tech Partnerships & Innovation",
    description: "Collaborating with technology providers and innovators to develop and implement sustainable solutions across the city."
  },
  {
    id: "3B",
    movement: 3,
    title: "Incorporate Sustainable Practices in All City/Private Developments",
    description: "Ensuring that new construction and development projects adhere to environmentally conscious standards and best practices."
  },
  {
    id: "3C",
    movement: 3,
    title: "Ensure Workforce Programs Incorporate Green/Sustainability Skills",
    description: "Training the workforce in environmentally sustainable practices and emerging green technologies to prepare for future job markets."
  }
];

const MissionSection = () => {
  const [selectedMovement, setSelectedMovement] = useState<number>(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
  
  const filteredMissions = selectedMovement === 0 
    ? missions 
    : missions.filter(mission => mission.movement === selectedMovement);

  const movementNames = [
    "All Missions",
    "Income Inequality",
    "Housing",
    "Sustainability"
  ];

  return (
    <section 
      id="missions" 
      ref={sectionRef}
      className="py-24 min-h-screen flex flex-col justify-center"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div 
          className={cn(
            "max-w-3xl mx-auto text-center mb-16 transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <span className="tag tag-mission mb-3">MISSIONS:</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Concrete Focus Areas</h2>
          <p className="text-foreground/80 text-lg md:text-xl">
            These missions represent the specific, actionable objectives that drive Mary's work toward each broader movement.
          </p>
        </div>
        
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {movementNames.map((name, index) => (
            <button
              key={index}
              onClick={() => setSelectedMovement(index)}
              className={cn(
                "px-4 py-2 rounded-full text-sm transition-all duration-300",
                selectedMovement === index
                  ? "bg-accent text-white shadow-md"
                  : "bg-white hover:bg-accent/10 border border-accent/20"
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
                "bg-white rounded-xl p-6 shadow hover-card opacity-0 transition-all duration-500",
                isInView && "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="tag tag-mission">Mission {mission.id}</span>
                <span className={cn(
                  "tag",
                  mission.movement === 1 && "tag-movement",
                  mission.movement === 2 && "bg-emerald-500/10 text-emerald-700",
                  mission.movement === 3 && "bg-amber-500/10 text-amber-700"
                )}>
                  {mission.movement === 1 && "Income Inequality"}
                  {mission.movement === 2 && "Housing"}
                  {mission.movement === 3 && "Sustainability"}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{mission.title}</h3>
              <p className="text-foreground/70 text-sm">{mission.description}</p>
              
              <div className="mt-6 pt-4 border-t border-foreground/10">
                <button className="text-sm text-accent font-medium hover:underline">
                  Related Moments →
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
