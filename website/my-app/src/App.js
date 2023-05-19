import "./App.css";
import InitPage from "./components/InitPage";
import MainPage from "./components/MainPage";
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
	return (
	<BrowserRouter>
		<Routes>
			<Route exact path="/" Component={InitPage}/>
			<Route exact path='/main' Component={MainPage}/>
		</Routes>
	</BrowserRouter>
	);
}

export default App;
