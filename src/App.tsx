import './App.css'
import NavBar from "./components/NavBar.tsx";
import SendMessage from "./components/SendMessage.tsx";
import ChatScreen from "./components/ChatScreen.tsx";
import {useContext, useEffect} from "react";
import {IdentityContext} from "./context/IdentityContext.tsx";
import SignIn from "./components/SignIn.tsx";
import Aos from "aos";
import 'aos/dist/aos.css';

function App() {
    const id = useContext(IdentityContext)

    useEffect(()=>{
        Aos.init({
            duration: 500,
        })
    }, [])

    if(!id || !id.saved)
        return <SignIn />
    return (
        <div className={'w-full bg-slate-100'}>
            <NavBar />
            <ChatScreen />
            <SendMessage />
        </div>
    )
}

export default App
