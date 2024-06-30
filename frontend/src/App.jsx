


import MenuCard from './components/MenuCard'
import SearchComponent from './components/SearchComponent';
import CommunityDisplay from './components/CommunityDisplay';
import Button from './components/Button';
import ChatComponent from './components/ChatComponent';
import NavigationBar from './components/NavigationBar';
import Dashboard from './pages/Dashboard';
import CreateCommunity from './components/CreateCommunity';

function App() {
  const sampleMenuItems = [
    { title: "Dashboard" ,
      imgUrl : "https://cdn3.iconfinder.com/data/icons/office-485/100/ICON_BASIC-13-512.png"
    },
    { title: "Settings" },
    { title: "Profile" },
    { title: "Logout" },
  ];
  const dummyMessages = [
    { text: 'Hello! How are you?', sender: 'them' },
    { text: 'I am good, thank you! How about you?', sender: 'me' },
    { text: 'I am doing well too. What are you up to?', sender: 'them' },
    { text: 'Just working on a project.', sender: 'me' },
    { text: 'That sounds interesting!', sender: 'them' },
    { text: 'Yeah, it is. Thanks!', sender: 'me' }
  ];
  

  return (
    <>
    
      <Dashboard/>
    </>
    
  )
}

export default App
