
import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { createChatSession } from './services/geminiService';
import type { Message } from './types';
import ChatMessage from './components/ChatMessage';
import { SendIcon, FriendlyBotIcon, SuggestionIcon } from './components/IconComponents';
import Spinner from './components/Spinner';

// IMPORTANTE: Reemplaza este enlace de ejemplo por el de tu Formulario de Google
const SUGGESTION_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfCQz3FTTAF_zDVarI8Mpus9cjhaLg47phRs8DvpM-n89IP3Q/viewform?usp=header';

const App: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const welcomeMessage: Message = {
    role: 'model',
    text: '¡Hola! Soy InfoClase Bot. ¿En qué puedo ayudaros hoy con la clase del profe Guille?',
  };

  const examplePrompts = [
    '¿Qué tiene que hacer mi hijo/a en la tarea de Lengua?',
    '¿Cuándo es la actividad evaluativa de Matemáticas?',
    '¿Qué se evalúa en la tarea de Francés?',
  ];

  useEffect(() => {
    setChat(createChatSession());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = useCallback(async (messageText: string) => {
    if (!chat || !messageText.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: messageText };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setUserInput('');

    try {
      const stream = await chat.sendMessageStream({ message: messageText });
      let modelResponse = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      for await (const chunk of stream) {
        modelResponse += chunk.text;
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].text = modelResponse;
            return newMessages;
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = { role: 'model', text: 'Lo siento, ha ocurrido un error y no puedo responder en este momento.' };
      setMessages(prev => {
        const newMessages = [...prev];
        if(newMessages[newMessages.length-1].text === ''){
             newMessages[newMessages.length-1] = errorMessage;
        } else {
            newMessages.push(errorMessage);
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, [chat, isLoading]);
  
  const handlePromptClick = (prompt: string) => {
    setUserInput(prompt);
    document.getElementById('chat-input')?.focus();
  };

  return (
    <div className="flex flex-col h-screen bg-yellow-50">
      <header className="bg-yellow-100 border-b border-yellow-200 p-4 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <FriendlyBotIcon className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold text-slate-800">Aula Ayuda Familias</h1>
              <p className="text-sm text-slate-600">Asistente digital de la clase del profe Guille.</p>
            </div>
          </div>
          <a
            href={SUGGESTION_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-yellow-200 transition-colors"
            aria-label="Enviar una sugerencia"
            title="Enviar una sugerencia"
          >
            <SuggestionIcon className="w-6 h-6 text-slate-600" />
          </a>
        </div>
      </header>

      <>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                    <FriendlyBotIcon className="w-20 h-20" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{welcomeMessage.text}</h2>
                <p className="mt-4 text-slate-600">Puedes empezar con una de estas preguntas:</p>
                <div className="mt-6 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
                  {examplePrompts.map((prompt, i) => (
                    <button key={i} onClick={() => handlePromptClick(prompt)} className="px-4 py-2 bg-white border border-slate-300 rounded-full text-slate-700 hover:bg-yellow-100 transition-colors shadow-sm">
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
                messages.map((msg, index) => <ChatMessage key={index} message={msg} />)
            )}
            {isLoading && messages[messages.length-1]?.text === '' && (
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="flex-shrink-0 mt-1"><FriendlyBotIcon className="w-8 h-8" /></div>
                  <div className="max-w-xl lg:max-w-2xl px-4 py-3 rounded-2xl bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none">
                      <Spinner className="w-5 h-5 text-slate-500" />
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>
        <footer className="bg-yellow-100/90 backdrop-blur-lg border-t border-yellow-200 p-4 sticky bottom-0">
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(userInput);
              }}
              className="flex items-center gap-3"
            >
              <input
                id="chat-input"
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Escribe tu pregunta aquí..."
                className="flex-1 w-full px-4 py-3 rounded-full border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:opacity-50"
                disabled={isLoading}
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={isLoading || !userInput.trim()}
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:scale-100"
                aria-label="Enviar mensaje"
              >
                {isLoading ? <Spinner className="w-6 h-6"/> : <SendIcon className="w-6 h-6" />}
              </button>
            </form>
              <p className="text-xs text-center text-slate-500 mt-2 px-4">
                Soy un asistente digital. Para dudas pedagógicas o personales, consultad siempre con el profe Guille.
              </p>
          </div>
        </footer>
      </>
    </div>
  );
};

export default App;