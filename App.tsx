import { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import LearningModules from './LearingModule';
import StockSimulator from './stocksimulator';
import Glossary from './Glossary';
import Footer from './footer';

type Tab = 'learn' | 'simulator' | 'glossary';

export default function App() {
	const [activeTab, setActiveTab] = useState<Tab>('learn');

	return (
		<div className="min-h-screen concrete-grid concrete-texture relative">
			<div className="relative z-10">
				<Header activeTab={activeTab} onTabChange={setActiveTab} />

				{activeTab === 'learn' && (
					<>
						<Hero />
						<LearningModules />
					</>
				)}

				{activeTab === 'simulator' && <StockSimulator />}
				{activeTab === 'glossary' && <Glossary />}

				<Footer />
			</div>
		</div>
	);
}
