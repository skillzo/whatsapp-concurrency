import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";
import ConversationsList from "./components/ConversationsList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConversationsList />} />
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
