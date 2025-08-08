import React, { useState, useEffect } from 'react';
import { Heart, Camera, Calendar, Edit, Trash2, Save, X, Plus, Home, Upload, MessageCircle, Gift, Star } from 'lucide-react';

interface Memory {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

interface Message {
  id: string;
  text: string;
  date: string;
  type: 'love' | 'memory' | 'promise';
}

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [memories, setMemories] = useState<Memory[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [editingMemory, setEditingMemory] = useState<Memory | null>(null);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    date: ''
  });
  const [messageData, setMessageData] = useState({
    text: '',
    type: 'love' as 'love' | 'memory' | 'promise'
  });

  // Fechas correctas de su relación
  const startDate = new Date('2025-04-10'); // 10 de abril de 2025
  const fourMonthsDate = new Date('2025-08-10'); // 10 de agosto de 2025
  const today = new Date();
  const daysTogether = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  // Cargar datos desde localStorage
  useEffect(() => {
    const savedMemories = localStorage.getItem('anniversaryMemories');
    const savedMessages = localStorage.getItem('anniversaryMessages');
    
    if (savedMemories) {
      setMemories(JSON.parse(savedMemories));
    } else {
      // Memorias de ejemplo
      const defaultMemories: Memory[] = [
        {
          id: '1',
          title: 'Nuestro primer día juntos',
          description: 'El 10 de abril de 2025, el día que cambió nuestras vidas para siempre. Ese momento mágico cuando supimos que éramos el uno para el otro.',
          image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800',
          date: '2025-04-10'
        },
        {
          id: '2',
          title: 'Primera cita oficial',
          description: 'Nervios, mariposas en el estómago, pero sobre todo esa conexión especial que nos hizo saber que esto era diferente.',
          image: 'https://images.pexels.com/photos/1024957/pexels-photo-1024957.jpeg?auto=compress&cs=tinysrgb&w=800',
          date: '2025-04-20'
        },
        {
          id: '3',
          title: '¡4 meses juntos!',
          description: 'El 10 de agosto celebramos nuestros primeros 4 meses. Cada día contigo ha sido una aventura llena de amor.',
          image: 'https://images.pexels.com/photos/1024959/pexels-photo-1024959.jpeg?auto=compress&cs=tinysrgb&w=800',
          date: '2025-08-10'
        }
      ];
      setMemories(defaultMemories);
      localStorage.setItem('anniversaryMemories', JSON.stringify(defaultMemories));
    }

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Mensajes de ejemplo
      const defaultMessages: Message[] = [
        {
          id: '1',
          text: 'Cada día contigo es como vivir en un cuento de hadas. Gracias por llenar mi vida de tanto amor y felicidad.',
          date: '2025-04-10',
          type: 'love'
        },
        {
          id: '2',
          text: 'Prometo amarte cada día más, cuidar de ti y construir juntos los sueños más hermosos.',
          date: '2025-05-10',
          type: 'promise'
        },
        {
          id: '3',
          text: 'Recuerdo perfectamente la primera vez que me dijiste "te amo". Mi corazón no ha dejado de latir fuerte desde entonces.',
          date: '2025-06-10',
          type: 'memory'
        }
      ];
      setMessages(defaultMessages);
      localStorage.setItem('anniversaryMessages', JSON.stringify(defaultMessages));
    }
  }, []);

  // Guardar datos en localStorage
  const saveMemories = (newMemories: Memory[]) => {
    setMemories(newMemories);
    localStorage.setItem('anniversaryMemories', JSON.stringify(newMemories));
  };

  const saveMessages = (newMessages: Message[]) => {
    setMessages(newMessages);
    localStorage.setItem('anniversaryMessages', JSON.stringify(newMessages));
  };

  // Funciones para memorias
  const addMemory = () => {
    if (!formData.title || !formData.description) return;
    
    const newMemory: Memory = {
      id: Date.now().toString(),
      ...formData,
      date: formData.date || new Date().toISOString().split('T')[0]
    };
    
    const newMemories = [...memories, newMemory];
    saveMemories(newMemories);
    setFormData({ title: '', description: '', image: '', date: '' });
    setShowForm(false);
  };

  const updateMemory = () => {
    if (!editingMemory) return;
    
    const updatedMemories = memories.map(memory => 
      memory.id === editingMemory.id ? editingMemory : memory
    );
    saveMemories(updatedMemories);
    setEditingMemory(null);
  };

  const deleteMemory = (id: string) => {
    const filteredMemories = memories.filter(memory => memory.id !== id);
    saveMemories(filteredMemories);
  };

  // Funciones para mensajes
  const addMessage = () => {
    if (!messageData.text) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageData.text,
      date: new Date().toISOString().split('T')[0],
      type: messageData.type
    };
    
    const newMessages = [...messages, newMessage];
    saveMessages(newMessages);
    setMessageData({ text: '', type: 'love' });
  };

  const updateMessage = () => {
    if (!editingMessage) return;
    
    const updatedMessages = messages.map(message => 
      message.id === editingMessage.id ? editingMessage : message
    );
    saveMessages(updatedMessages);
    setEditingMessage(null);
  };

  const deleteMessage = (id: string) => {
    const filteredMessages = messages.filter(message => message.id !== id);
    saveMessages(filteredMessages);
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'love': return <Heart className="text-rose-400" size={20} />;
      case 'memory': return <Star className="text-amber-400" size={20} />;
      case 'promise': return <Gift className="text-emerald-400" size={20} />;
      default: return <Heart className="text-rose-400" size={20} />;
    }
  };

  const getMessageColor = (type: string) => {
    switch (type) {
      case 'love': return 'from-rose-500/20 to-pink-500/20 border-rose-300/30';
      case 'memory': return 'from-amber-500/20 to-yellow-500/20 border-amber-300/30';
      case 'promise': return 'from-emerald-500/20 to-teal-500/20 border-emerald-300/30';
      default: return 'from-rose-500/20 to-pink-500/20 border-rose-300/30';
    }
  };

  const MemoryCard = ({ memory }: { memory: Memory }) => (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/15">
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img 
          src={memory.image || 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800'} 
          alt={memory.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => setEditingMemory(memory)}
            className="bg-indigo-500/80 hover:bg-indigo-600 text-white p-2 rounded-full transition-colors shadow-lg"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => deleteMemory(memory.id)}
            className="bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full transition-colors shadow-lg"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{memory.title}</h3>
      <p className="text-gray-200 mb-3 leading-relaxed">{memory.description}</p>
      <p className="text-indigo-300 text-sm font-medium">{new Date(memory.date).toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}</p>
    </div>
  );

  const MessageCard = ({ message }: { message: Message }) => (
    <div className={`bg-gradient-to-r ${getMessageColor(message.type)} backdrop-blur-md rounded-2xl p-6 shadow-xl border hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          {getMessageIcon(message.type)}
          <span className="text-white font-semibold capitalize">{message.type === 'love' ? 'Amor' : message.type === 'memory' ? 'Recuerdo' : 'Promesa'}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setEditingMessage(message)}
            className="bg-indigo-500/80 hover:bg-indigo-600 text-white p-2 rounded-full transition-colors shadow-lg"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => deleteMessage(message.id)}
            className="bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full transition-colors shadow-lg"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <p className="text-white text-lg leading-relaxed mb-3">{message.text}</p>
      <p className="text-gray-300 text-sm">{new Date(message.date).toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}</p>
    </div>
  );

  const HomeView = () => (
    <div className="space-y-12">
      {/* Header romántico */}
      <div className="text-center space-y-6">
        <div className="flex justify-center items-center gap-4 mb-4">
          <Heart className="text-rose-400 animate-pulse" size={48} />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-400 to-indigo-400 bg-clip-text text-transparent">
            4 Meses de Amor
          </h1>
          <Heart className="text-rose-400 animate-pulse" size={48} />
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 inline-block border border-white/20">
          <p className="text-2xl text-indigo-300 mb-2">Llevamos</p>
          <p className="text-6xl font-bold bg-gradient-to-r from-rose-400 to-indigo-400 bg-clip-text text-transparent mb-2">{daysTogether}</p>
          <p className="text-2xl text-indigo-300">días creando recuerdos</p>
          <p className="text-lg text-gray-300 mt-4">Desde el 10 de abril de 2025</p>
        </div>
      </div>

      {/* Timeline de amor */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
        <h2 className="text-3xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
          <Calendar className="text-indigo-400" />
          Nuestra Historia de Amor
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {memories.map((memory) => (
            <MemoryCard key={memory.id} memory={memory} />
          ))}
        </div>
      </div>

      {/* Mensajes de amor */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
        <h2 className="text-3xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
          <MessageCircle className="text-rose-400" />
          Mensajes del Corazón
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {messages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>
      </div>

      {/* Mensaje romántico */}
      <div className="bg-gradient-to-r from-rose-500/10 to-indigo-500/10 rounded-2xl p-8 text-center border border-white/10 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-white mb-4">Cada día contigo es especial</h2>
        <p className="text-xl text-gray-200 leading-relaxed">
          Estos 4 meses han sido los más hermosos de nuestras vidas. Cada sonrisa, cada abrazo, 
          cada momento compartido se ha convertido en un tesoro en nuestros corazones. 
          Aquí está nuestra historia, nuestros recuerdos, nuestro amor eterno.
        </p>
      </div>
    </div>
  );

  const UploadView = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
          <Camera className="text-indigo-400" />
          Agregar Nuevo Recuerdo
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-white font-semibold mb-2">Título del recuerdo</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent backdrop-blur-sm"
              placeholder="Ej: Nuestra primera aventura juntos"
            />
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-2">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none backdrop-blur-sm"
              placeholder="Cuéntanos sobre este momento especial..."
            />
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-2">URL de la imagen</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent backdrop-blur-sm"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-2">Fecha</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent backdrop-blur-sm"
            />
          </div>
          
          <button
            onClick={addMemory}
            className="w-full bg-gradient-to-r from-rose-500 to-indigo-500 hover:from-rose-600 hover:to-indigo-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
          >
            <Plus size={20} />
            Agregar Recuerdo
          </button>
        </div>
      </div>
    </div>
  );

  const MessagesView = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
          <MessageCircle className="text-rose-400" />
          Agregar Mensaje de Amor
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-white font-semibold mb-2">Tipo de mensaje</label>
            <select
              value={messageData.type}
              onChange={(e) => setMessageData({...messageData, type: e.target.value as 'love' | 'memory' | 'promise'})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent backdrop-blur-sm"
            >
              <option value="love" className="bg-gray-800">💕 Mensaje de Amor</option>
              <option value="memory" className="bg-gray-800">⭐ Recuerdo Especial</option>
              <option value="promise" className="bg-gray-800">🎁 Promesa</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-2">Tu mensaje</label>
            <textarea
              value={messageData.text}
              onChange={(e) => setMessageData({...messageData, text: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none backdrop-blur-sm"
              placeholder="Escribe aquí tu mensaje del corazón..."
            />
          </div>
          
          <button
            onClick={addMessage}
            className="w-full bg-gradient-to-r from-rose-500 to-indigo-500 hover:from-rose-600 hover:to-indigo-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
          >
            <Plus size={20} />
            Agregar Mensaje
          </button>
        </div>
      </div>
    </div>
  );

  // Modales de edición
  const EditMemoryModal = () => (
    editingMemory && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full max-h-screen overflow-y-auto border border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Editar Recuerdo</h3>
            <button
              onClick={() => setEditingMemory(null)}
              className="text-white hover:text-red-300 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">Título</label>
              <input
                type="text"
                value={editingMemory.title}
                onChange={(e) => setEditingMemory({...editingMemory, title: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-sm"
              />
            </div>
            
            <div>
              <label className="block text-white font-semibold mb-2">Descripción</label>
              <textarea
                value={editingMemory.description}
                onChange={(e) => setEditingMemory({...editingMemory, description: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none backdrop-blur-sm"
              />
            </div>
            
            <div>
              <label className="block text-white font-semibold mb-2">URL de la imagen</label>
              <input
                type="url"
                value={editingMemory.image}
                onChange={(e) => setEditingMemory({...editingMemory, image: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-sm"
              />
            </div>
            
            <div>
              <label className="block text-white font-semibold mb-2">Fecha</label>
              <input
                type="date"
                value={editingMemory.date}
                onChange={(e) => setEditingMemory({...editingMemory, date: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-sm"
              />
            </div>
            
            <button
              onClick={updateMemory}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              <Save size={20} />
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    )
  );

  const EditMessageModal = () => (
    editingMessage && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full max-h-screen overflow-y-auto border border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Editar Mensaje</h3>
            <button
              onClick={() => setEditingMessage(null)}
              className="text-white hover:text-red-300 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">Tipo de mensaje</label>
              <select
                value={editingMessage.type}
                onChange={(e) => setEditingMessage({...editingMessage, type: e.target.value as 'love' | 'memory' | 'promise'})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-sm"
              >
                <option value="love" className="bg-gray-800">💕 Mensaje de Amor</option>
                <option value="memory" className="bg-gray-800">⭐ Recuerdo Especial</option>
                <option value="promise" className="bg-gray-800">🎁 Promesa</option>
              </select>
            </div>
            
            <div>
              <label className="block text-white font-semibold mb-2">Mensaje</label>
              <textarea
                value={editingMessage.text}
                onChange={(e) => setEditingMessage({...editingMessage, text: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none backdrop-blur-sm"
              />
            </div>
            
            <button
              onClick={updateMessage}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              <Save size={20} />
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navegación */}
      <nav className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => setCurrentView('home')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentView === 'home' 
                  ? 'bg-gradient-to-r from-rose-500 to-indigo-500 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Home size={20} />
              Inicio
            </button>
            <button
              onClick={() => setCurrentView('upload')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentView === 'upload' 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Upload size={20} />
              Agregar Recuerdo
            </button>
            <button
              onClick={() => setCurrentView('messages')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentView === 'messages' 
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <MessageCircle size={20} />
              Agregar Mensaje
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {currentView === 'home' && <HomeView />}
        {currentView === 'upload' && <UploadView />}
        {currentView === 'messages' && <MessagesView />}
      </main>

      {/* Modales de edición */}
      <EditMemoryModal />
      <EditMessageModal />
    </div>
  );
}

export default App;