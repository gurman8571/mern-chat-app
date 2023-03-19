import Register from './Auth/Register';
import Login from './Auth/Login'
import Chat from './Pages/Chat'
import { BrowserRouter as Router,Route, Routes  } from 'react-router-dom';
import axios from 'axios'
function App() {

  //axios.defaults.withCredentials = true;
  //axios.defaults.baseURL = "http:";
  axios.defaults.headers.post['Accept']='application/json';
  axios.defaults.headers.post['Content-Type']='application/json';
  
  
  
  return (
    <>

<Router>
     <Routes>

     <Route exact path="/" element={  <Register/>} />
     <Route exact path="/login" element={  <Login/>} />
     <Route exact path="/chats" element={  <Chat/>} />
   
     </Routes>
    </Router>
   
  
    </>
  );
}

export default App;
