import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Header from './components/Header';

//pages
import DashBoard from './pages/Dashboard';
import Landing from './pages/Landing';
import SurveyNew from './pages/SurveyNew';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={ <Landing />} />
        <Route path='/surveys' element={ <DashBoard /> } />
        <Route path='/surveys/new' element={ <SurveyNew/> } />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
