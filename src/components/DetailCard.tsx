import { useState } from 'react';
import { cn } from '@/lib/utils';
import strings from '../../string_values.json';

interface Ask {
  title: string;
  description: string;
}

interface Offer {
  title: string;
  description: string;
}

interface Moment {
  id: number;
  title: string;
  context: string;
  asks: Ask[];
  offers: Offer[];
}

interface DetailCardProps {
  moment: Moment;
  isVisible: boolean;
}

const DetailCard = ({ moment, isVisible }: DetailCardProps) => {
  const [activeTab, setActiveTab] = useState<'context' | 'asks' | 'offers'>('context');

  // Map tab keys to strings from JSON
  const tabLabels = {
    context: strings.DetailCard.tabContext,
    asks: strings.DetailCard.tabAsks,
    offers: strings.DetailCard.tabOffers
  };

  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500',
        isVisible ? 'opacity-100 translate-y-0 animate-fade-in-right' : 'opacity-0 translate-y-10'
      )}
    >
      <div className="p-6 md:p-8 border-b border-foreground/10">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <span className="tag tag-moment">
            {strings.DetailCard.momentLabel} {moment.id}
          </span>
          <div className="flex gap-2">
            <span className="tag tag-ask">
              {moment.asks.length}{' '}
              {moment.asks.length === 1
                ? strings.DetailCard.askSingleLabel
                : strings.DetailCard.askPluralLabel}
            </span>
            <span className="tag tag-offer">
              {moment.offers.length}{' '}
              {moment.offers.length === 1
                ? strings.DetailCard.offerSingleLabel
                : strings.DetailCard.offerPluralLabel}
            </span>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">{moment.title}</h2>
      </div>

      <div className="border-b border-foreground/10">
        <div className="flex">
          {['context', 'asks', 'offers'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'context' | 'asks' | 'offers')}
              className={cn(
                'flex-1 py-3 px-4 text-center font-medium text-sm transition-colors relative',
                activeTab === tab
                  ? 'text-accent'
                  : 'text-foreground/60 hover:text-foreground/80 hover:bg-accent/5'
              )}
            >
              {tabLabels[tab]}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8">
        {activeTab === 'context' && (
          <div className="animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">{strings.DetailCard.contextTitle}</h3>
            <p className="text-foreground/80 leading-relaxed">{moment.context}</p>
          </div>
        )}

        {activeTab === 'asks' && (
          <div className="animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">{strings.DetailCard.whatMaryNeeds}</h3>
            <div className="space-y-6">
              {moment.asks.map((ask, index) => (
                <div
                  key={index}
                  className="bg-amber-500/5 p-4 rounded-lg border border-amber-500/10"
                >
                  <h4 className="font-medium text-amber-700 mb-2">{ask.title}</h4>
                  <p className="text-sm text-foreground/70">{ask.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'offers' && (
          <div className="animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">{strings.DetailCard.whatMaryOffers}</h3>
            <div className="space-y-6">
              {moment.offers.map((offer, index) => (
                <div
                  key={index}
                  className="bg-sky-500/5 p-4 rounded-lg border border-sky-500/10"
                >
                  <h4 className="font-medium text-sky-700 mb-2">{offer.title}</h4>
                  <p className="text-sm text-foreground/70">{offer.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailCard;