import React from 'react';
import { Layout } from '../components/Layout';
import { TrendingUp, BarChart2, Activity, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

const Services = () => {
  const equityServices = [
    {
      title: 'Stock Cash',
      description: 'Stock Cash services are specially designed for stock cash traders who trade in NSE and BSE on each and every sector.'
    },
    {
      title: 'Stock Cash Exclusive',
      description: 'Designed for the traders who want to earn more profit compared to regular stock cash intraday services.'
    },
    {
      title: 'BTST / STBT',
      description: 'BTST / STBT service is for the trader who wants to trade with gap up and gap down opening of market.'
    },
    {
      title: 'Swing Pack',
      description: 'It is an Opportunity for the short term investors who want to invest in blue chip stocks with minimum risk.'
    }
  ];

  const derivativeServices = [
    {
      title: 'Stock Future',
      description: 'These Stock Futures Tips are the result of core research and analysis of our technical team and help you to grab a profit.'
    },
    {
      title: 'Stock Future Exclusive',
      description: 'Stock Future segment is very prominent segment of Equity market. Stock Future exclusive is the flagship product of Ours.'
    },
    {
      title: 'Stock Options',
      description: 'In our service of Call Options Tips and Put Options Tips we make very safe strategy with all the required knowledge of our brilliant analysts.'
    }
  ];

  const indexServices = [
    {
      title: 'Index Futures',
      description: 'We provide NIFTY / BANKNIFTY Trading Tips during market hours, depending upon Market Conditions & expected movement from Global Market Indices.'
    },
    {
      title: 'Index Options',
      description: 'Here, by tracking indices during market hours and depending upon Market Conditions our research team analyse key macro sectors and develope equity strategy.'
    },
    {
      title: 'Index Options Exclusive',
      description: 'This is the flagship product of Ours and this package is designed for the traders who want to earn more profit compared to regular Index Options intraday services.'
    }
  ];

  const mcxServices = [
    {
      title: 'Energy',
      description: 'This Service is designed for traders Who trading in MCX Energy Segment i.e. MCX Natural Gas, MCX Crude.'
    },
    {
      title: 'Base Metal',
      description: 'Researching upon global Economic events & activities, we provide advice base metal insights.'
    },
    {
      title: 'Bullions',
      description: 'We spend thousands of hours to make sure that our clients can earn the profits in the Bullion Markets.'
    },
    {
      title: 'Commodity Exclusive',
      description: 'Commodity Exclusive is specially designed for traders who trade in heavy volumes to earn profit.'
    }
  ];

  const ServiceCard: React.FC<{ title: string, description: string, icon: any }> = ({ title, description, icon: Icon }) => (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all hover:border-secondary/30 group h-full flex flex-col">
      <div className="mb-6 bg-slate-50 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-primary transition-all duration-300">
        <Icon className="h-6 w-6 md:h-7 md:w-7" />
      </div>
      <h3 className="text-lg md:text-xl font-bold text-primary mb-3">{title}</h3>
      <p className="text-slate-500 text-sm md:text-base leading-relaxed flex-grow">{description}</p>
      <div className="mt-6 flex items-center text-secondary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
        Learn More <ArrowRight className="ml-1.5 h-4 w-4" />
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
             <h2 className="text-xs md:text-sm font-black text-secondary uppercase tracking-[0.3em] mb-4">Domain Expertise</h2>
            <h1 className="text-3xl md:text-5xl font-black text-primary mb-6">Our Services</h1>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed">
              We offer a wide range of trading and investment services tailored to meet your financial goals. 
              From Equity to Commodities, we have you covered.
            </p>
          </div>

          {/* Equity Services */}
          <div className="mb-20 md:mb-24">
            <div className="flex items-center space-x-3 mb-10 border-b border-slate-200 pb-5">
              <TrendingUp className="h-7 w-7 md:h-8 md:w-8 text-secondary" />
              <h2 className="text-xl md:text-2xl font-black text-primary uppercase tracking-tight">Equity Services</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {equityServices.map((service, index) => (
                <ServiceCard key={index} {...service} icon={TrendingUp} />
              ))}
            </div>
          </div>

          {/* Derivative Services */}
          <div className="mb-20 md:mb-24">
            <div className="flex items-center space-x-3 mb-10 border-b border-slate-200 pb-5">
              <Activity className="h-7 w-7 md:h-8 md:w-8 text-secondary" />
              <h2 className="text-xl md:text-2xl font-black text-primary uppercase tracking-tight">Derivative Services</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {derivativeServices.map((service, index) => (
                <ServiceCard key={index} {...service} icon={Activity} />
              ))}
            </div>
          </div>

          {/* Index Services */}
          <div className="mb-20 md:mb-24">
            <div className="flex items-center space-x-3 mb-10 border-b border-slate-200 pb-5">
              <BarChart2 className="h-7 w-7 md:h-8 md:w-8 text-secondary" />
              <h2 className="text-xl md:text-2xl font-black text-primary uppercase tracking-tight">Index Services</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {indexServices.map((service, index) => (
                <ServiceCard key={index} {...service} icon={BarChart2} />
              ))}
            </div>
          </div>

           {/* MCX Services */}
           <div className="mb-8">
            <div className="flex items-center space-x-3 mb-10 border-b border-slate-200 pb-5">
              <Zap className="h-7 w-7 md:h-8 md:w-8 text-secondary" />
              <h2 className="text-xl md:text-2xl font-black text-primary uppercase tracking-tight">MCX Services</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {mcxServices.map((service, index) => (
                <ServiceCard key={index} {...service} icon={Zap} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Services;