import React from 'react';
import 'bulma/css/bulma.css'
import './App.css';

import SearchPage from './scenes/SearchPage/SearchPage';

const App: React.FC = () => {
	return (
		<div className="app">
			<SearchPage />
		</div>
	);
}

export default App;
