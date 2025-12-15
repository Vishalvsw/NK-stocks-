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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-secondary/30 group h-full flex flex-col">
      <div className="mb-4 bg-gray-50 w-12 h-12 rounded-lg flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed flex-grow">{description}</p>
      <div className="mt-4 flex items-center text-secondary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
        Learn More <ArrowRight className="ml-1 h-4 w-4" />
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h1>
            <p className="text-gray-600 text-lg">
              We offer a wide range of trading and investment services tailored to meet your financial goals. 
              From Equity to Commodities, we have you covered.
            </p>
          </div>

          {/* Equity Services */}
          <div className="mb-16">
            <div className="flex items-center space-x-3 mb-8 border-b border-gray-200 pb-4">
              <TrendingUp className="h-8 w-8 text-secondary" />
              <h2 className="text-2xl font-bold text-slate-900">Equity Services</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {equityServices.map((service, index) => (
                <ServiceCard key={index} {...service} icon={TrendingUp} />
              ))}
            </div>
          </div>

          {/* Derivative Services */}
          <div className="mb-16">
            <div className="flex items-center space-x-3 mb-8 border-b border-gray-200 pb-4">
              <Activity className="h-8 w-8 text-secondary" />
              <h2 className="text-2xl font-bold text-slate-900">Derivative Services</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {derivativeServices.map((service, index) => (
                <ServiceCard key={index} {...service} icon={Activity} />
              ))}
            </div>
          </div>

          {/* Index Services */}
          <div className="mb-16">
            <div className="flex items-center space-x-3 mb-8 border-b border-gray-200 pb-4">
              <BarChart2 className="h-8 w-8 text-secondary" />
              <h2 className="text-2xl font-bold text-slate-900">Index Services</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {indexServices.map((service, index) => (
                <ServiceCard key={index} {...service} icon={BarChart2} />
              ))}
            </div>
          </div>

           {/* MCX Services */}
           <div className="mb-8">
            <div className="flex items-center space-x-3 mb-8 border-b border-gray-200 pb-4">
              <Zap className="h-8 w-8 text-secondary" />
              <h2 className="text-2xl font-bold text-slate-900">MCX Services</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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