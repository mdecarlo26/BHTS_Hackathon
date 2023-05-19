import "./App.css";
import mainPage from "./components/mainPage";
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
	return (
	<BrowserRouter>
		<Routes>
			<Route exact path='/main' Component={mainPage}/>
		</Routes>
	</BrowserRouter>
	);
}

export default App;
