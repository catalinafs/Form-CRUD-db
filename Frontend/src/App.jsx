// React
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

// Pages
import Register from './pages/Register';
import Encode from './pages/Encode';
import Decode from './pages/Decode';
import ImageProfile from './pages/ImageProfile';
import NotFound from './pages/NotFound';

// Material UI
import theme from './utils/theme';
import { ThemeProvider } from '@mui/material';

// Styles
import './index.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* <Route path={'/'} exact element={<Navigate to='/encode' />} /> */}
          <Route path={'/register'} exact element={<Register />} />
          <Route path={'/encode'} exact element={<Encode />} />
          <Route path={'/decode'} exact element={<Decode />} />
          <Route path={'/imageProfile'} exact element={<ImageProfile />} />
          <Route path={'/NotFound'} exact element={<NotFound />} />
          <Route path={'*'} element={<Navigate to='/NotFound' />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;