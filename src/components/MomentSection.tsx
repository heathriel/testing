
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import DetailCard from './DetailCard';

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

const moments: Moment[] = [
  {
    id: 1,
    title: "Filling the Tech Training Gap",
    context: "Prime Digital Academy, a key local tech-training provider, recently closed. Mary's team views this closure as creating an urgent gap in entry-level and mid-level tech skill development in St. Paul. Workforce development, particularly for higher-wage tech jobs, is central to addressing income inequality.",
    asks: [
      {
        title: "Identify and Recruit Tech Training Providers",
        description: "She needs organizations or education partners (coding bootcamps, workforce orgs, etc.) ready to step into St. Paul to deliver in-demand tech and AI-related skills training."
      },
      {
        title: "Evaluate Training Programs",
        description: "She needs help evaluating which training programs align best with employer demand—especially around AI, data analytics, software engineering, and other emergent skills."
      },
      {
        title: "Secure Funding for Tech Scholarships",
        description: "She needs philanthropic, state, or federal dollars to subsidize tuition for new training cohorts, especially for underrepresented communities."
      },
      {
        title: "Connect with Foundations",
        description: "She needs connections to philanthropic entities or foundations that can underwrite pilot programs in the absence of Prime Digital Academy."
      }
    ],
    offers: [
      {
        title: "City-Backed Scholarship Resources",
        description: "Mary can coordinate scholarship dollars through city and/or county channels for qualifying providers and students."
      },
      {
        title: "Municipal & Workforce Board Relationships",
        description: "She can leverage her roles (City of Saint Paul, Workforce Innovation Board) to facilitate introductions to hiring companies, city departments, and other relevant stakeholders."
      },
      {
        title: "Physical Space & Facilitation",
        description: "Through collaborations with local partners (e.g., the new downtown space, City-owned facilities), Mary can help secure sites for training."
      },
      {
        title: "Organizational Network Support",
        description: "She can also tap into the City's organizational network to publicize, convene, and support these programs."
      }
    ]
  },
  {
    id: 2,
    title: "Funding & Incentives for Downtown Revitalization",
    context: "There is a continued push to revitalize downtown St. Paul, create more attractive office spaces, and recruit/retain businesses post-pandemic. Companies often need capital for build-outs, tenant improvements, or other physical infrastructure to make relocations or expansions feasible.",
    asks: [
      {
        title: "Capital for Infrastructure & Build-Outs",
        description: "She needs external investors or government grants to support building upgrades, tenant improvements, and modernization of older downtown spaces."
      },
      {
        title: "Philanthropic Partnerships",
        description: "She needs philanthropic or state/federal partnerships to augment programs like STAR (Sales Tax Revitalization) when they aren't funded at sufficient levels."
      },
      {
        title: "Developer Engagement",
        description: "She needs developers who are willing to commit to reconfiguring office or retail spaces for modern usage (e.g., coworking, event space, tech labs)."
      },
      {
        title: "Stakeholder Coordination",
        description: "She needs help convening stakeholder groups—from skyway businesses to large building owners—to plan, coordinate, and pitch revitalization opportunities."
      }
    ],
    offers: [
      {
        title: "Navigation of City Funding Mechanisms",
        description: "Mary can assist in guiding developers, building owners, or entrepreneurs through the city's processes for grants, low-interest loans, and other incentives."
      },
      {
        title: "Facilitation of Meetings with City Officials",
        description: "She can help arrange high-level discussions involving the mayor's office, city council, or relevant committees to expedite approvals or gain political support."
      },
      {
        title: "Access to the 'New Space' and City Partnerships",
        description: "Mary can connect businesses to the newly activated downtown innovation hub, bridging them with resources (DOD contracting facilitation, workforce collaborations, etc.)."
      }
    ]
  },
  {
    id: 3,
    title: "Engaging Cross-Sector & Federal Partnerships",
    context: "Conversations in the transcript highlighted opportunities to leverage federal contracts (Department of Defense, NASA) to generate local business growth and new jobs. St. Paul's ecosystem could benefit from bridging local tech/clean-tech companies with large federal contracting opportunities.",
    asks: [
      {
        title: "Introduce Local Businesses to Federal Pathways",
        description: "She needs help from conveners or liaisons experienced with SBIR/SBTT or 'AFWERX' style challenges to guide local entrepreneurs or mid-stage companies toward these programs."
      },
      {
        title: "Demystify Federal Procurement",
        description: "She needs partners who can demystify federal procurement processes and train entrepreneurs on how to pursue these large contracts."
      },
      {
        title: "Attract Federal Funding & Presence",
        description: "She needs support in bringing more federal agencies or large prime contractors to St. Paul events, coworking sessions, or 'pitch' gatherings."
      }
    ],
    offers: [
      {
        title: "City-Level Coordination & Storytelling",
        description: "Mary can craft or amplify success stories to highlight local entrepreneurs who won SBIR awards or NASA/AFWERX challenges—encouraging more to try."
      },
      {
        title: "Connections to City's Economic Council & Workforce Boards",
        description: "She can open doors for direct conversations with city economic councils, workforce boards, and planning departments, ensuring that participating businesses get official backing."
      },
      {
        title: "Potential Space & Event Collaboration",
        description: "She can help facilitate events, meetups, and 'challenge' days in the newly activated downtown space or other City-hosted venues."
      }
    ]
  },
  {
    id: 4,
    title: "Cross-Cutting Collaboration & Facilitation",
    context: "From the transcript, Mary and her networks see high value in convening stakeholders—business owners, city departments, philanthropic partners—to rapidly solve problems and generate new initiatives. The conversation references design-thinking or agile-like frameworks (e.g., 'United We Transform' events) that Mary wants to bring into city problem-solving.",
    asks: [
      {
        title: "Workshop & Event Collaboration",
        description: "She needs experts/facilitators to run design sprints or collaborative sessions specifically tailored to issues like housing, sustainability, or workforce."
      },
      {
        title: "Stakeholder Commitments",
        description: "She needs commitments from relevant stakeholders (developers, philanthropic groups, private companies) to participate meaningfully in these sessions."
      },
      {
        title: "Follow-Up & Resource Tracking",
        description: "She needs technology solutions or administrative support to track the actions/commitments that emerge from these sessions, ensuring accountability and momentum."
      }
    ],
    offers: [
      {
        title: "Citywide Convening Power",
        description: "Mary can bring in city officials, nonprofits, workforce leaders, and local businesses to ensure the right people are 'in the room.'"
      },
      {
        title: "Platform & Public Visibility",
        description: "Through city storytelling initiatives and public channels, Mary can publicize workshop outcomes, success stories, or major breakthroughs."
      },
      {
        title: "Experience in Ecosystem Building",
        description: "Drawing on her background with Full Stack Saint Paul and other collaborations, Mary can ensure these events align with broader city priorities and quickly link to official programs (e.g., workforce boards, city grants)."
      }
    ]
  }
];

const MomentSection = () => {
  const [activeMoment, setActiveMoment] = useState<number>(1);
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

  return (
    <section 
      id="moments" 
      ref={sectionRef}
      className="py-24 min-h-screen flex flex-col justify-center bg-gradient-to-b from-white to-secondary/30"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div 
          className={cn(
            "max-w-3xl mx-auto text-center mb-16 transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <span className="tag tag-moment mb-3">MOMENTS:</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Current Needs & Opportunities</h2>
          <p className="text-foreground/80 text-lg md:text-xl">
            These are Mary's immediate or near-term priorities—where she is actively seeking help or collaboration.
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
                    "w-full text-left p-5 rounded-xl transition-all duration-300",
                    isInView && "animate-fade-in-left",
                    activeMoment === moment.id
                      ? "bg-accent text-white shadow-lg" 
                      : "bg-white hover:bg-accent/5 shadow"
                  )}
                  style={{ animationDelay: `${moment.id * 0.1}s` }}
                >
                  <span className={cn(
                    "text-sm font-medium px-2 py-0.5 rounded-full mb-2 inline-block",
                    activeMoment === moment.id
                      ? "bg-white/20 text-white" 
                      : "bg-accent/10 text-accent"
                  )}>
                    Moment {moment.id}
                  </span>
                  
                  <h3 className={cn(
                    "text-lg font-semibold",
                    activeMoment !== moment.id && "text-foreground"
                  )}>
                    {moment.title}
                  </h3>
                </button>
              ))}
            </div>
          </div>
          
          <div className="md:w-2/3">
            <DetailCard 
              moment={moments.find(m => m.id === activeMoment) || moments[0]} 
              isVisible={isInView}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MomentSection;
