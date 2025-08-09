import React, { useState, useEffect } from 'react';
import { Heart, Camera, Calendar, Edit, Trash2, Save, X, Plus, Home, Upload, MessageCircle, Gift, Star, Users, Clock, Sparkles } from 'lucide-react';

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
      case 'love': return <Heart className="text-pink-500" size={20} />;
      case 'memory': return <Star className="text-yellow-500" size={20} />;
      case 'promise': return <Gift className="text-purple-500" size={20} />;
      default: return <Heart className="text-pink-500" size={20} />;
    }
  };

  const getMessageColor = (type: string) => {
    switch (type) {
      case 'love': return 'from-pink-100 to-rose-100 border-pink-200';
      case 'memory': return 'from-yellow-100 to-amber-100 border-yellow-200';
      case 'promise': return 'from-purple-100 to-violet-100 border-purple-200';
      default: return 'from-pink-100 to-rose-100 border-pink-200';
    }
  };

  // Componente de corazones flotantes
  const FloatingHearts = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <Heart
          key={i}
          className={`absolute text-pink-300/30 animate-pulse`}
          size={Math.random() * 20 + 10}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 2 + 2}s`
          }}
        />
      ))}
    </div>
  );

  const MemoryCard = ({ memory }: { memory: Memory }) => (
    <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-pink-100 hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:border-pink-200 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-200 to-rose-200 rounded-bl-full opacity-50"></div>
      <div className="relative overflow-hidden rounded-2xl mb-4">
        <img 
          src={memory.image || 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800'} 
          alt={memory.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => setEditingMemory(memory)}
            className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition-colors shadow-lg"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => deleteMemory(memory.id)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors shadow-lg"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{memory.title}</h3>
      <p className="text-gray-600 mb-3 leading-relaxed">{memory.description}</p>
      <div className="flex items-center gap-2 text-pink-600 text-sm font-medium">
        <Calendar size={16} />
        {new Date(memory.date).toLocaleDateString('es-ES', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </div>
    </div>
  );

  const MessageCard = ({ message }: { message: Message }) => (
    <div className={`bg-gradient-to-r ${getMessageColor(message.type)} rounded-3xl p-6 shadow-xl border-2 hover:shadow-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden group`}>
      <div className="absolute top-0 left-0 w-16 h-16 bg-white/30 rounded-br-full"></div>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {getMessageIcon(message.type)}
          <span className="text-gray-700 font-bold capitalize text-lg">
            {message.type === 'love' ? 'Amor' : message.type === 'memory' ? 'Recuerdo' : 'Promesa'}
          </span>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => setEditingMessage(message)}
            className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition-colors shadow-lg"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => deleteMessage(message.id)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors shadow-lg"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <p className="text-gray-700 text-lg leading-relaxed mb-4 font-medium">{message.text}</p>
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <Clock size={16} />
        {new Date(message.date).toLocaleDateString('es-ES', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </div>
    </div>
  );

  const HomeView = () => (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative">
        <div className="bg-white rounded-[3rem] p-12 shadow-2xl border-4 border-pink-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-200 to-rose-300 rounded-bl-full opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-tr-full opacity-60"></div>
          
          <div className="relative z-10 text-center space-y-8">
            <div className="flex justify-center items-center gap-6 mb-6">
              <Heart className="text-pink-500 animate-bounce" size={60} />
              <h1 className="text-6xl font-black bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">
                4 Meses de Amor
              </h1>
              <Heart className="text-pink-500 animate-bounce" size={60} style={{ animationDelay: '0.5s' }} />
            </div>
            
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 border-2 border-pink-200 inline-block">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Users className="text-pink-500" size={32} />
                <p className="text-3xl text-gray-700 font-bold">Llevamos</p>
              </div>
              <p className="text-7xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
                {daysTogether}
              </p>
              <p className="text-3xl text-gray-700 font-bold mb-2">días creando recuerdos</p>
              <div className="flex items-center justify-center gap-2 text-lg text-gray-600">
                <Sparkles className="text-pink-400" size={20} />
                <span>Desde el 10 de abril de 2025</span>
                <Sparkles className="text-pink-400" size={20} />
              </div>
            </div>

            <div className="flex justify-center gap-6 mt-8">
              <button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                Nuestros Recuerdos
              </button>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                Mensajes de Amor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline de amor */}
      <div className="bg-white rounded-[3rem] p-12 shadow-2xl border-4 border-pink-100">
        <h2 className="text-4xl font-black text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent flex items-center justify-center gap-4">
          <Camera className="text-pink-500" />
          Nuestra Historia de Amor
          <Camera className="text-pink-500" />
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {memories.map((memory) => (
            <MemoryCard key={memory.id} memory={memory} />
          ))}
        </div>
      </div>

      {/* Mensajes de amor */}
      <div className="bg-white rounded-[3rem] p-12 shadow-2xl border-4 border-pink-100">
        <h2 className="text-4xl font-black text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent flex items-center justify-center gap-4">
          <MessageCircle className="text-pink-500" />
          Mensajes del Corazón
          <MessageCircle className="text-pink-500" />
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {messages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>
      </div>

      {/* Mensaje romántico final */}
      <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-rose-100 rounded-[3rem] p-12 text-center border-4 border-pink-200 shadow-2xl">
        <h2 className="text-4xl font-black text-gray-800 mb-6">El Amor No Tiene Límites</h2>
        <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
          Estos 4 meses han sido los más hermosos de nuestras vidas. Cada sonrisa, cada abrazo, 
          cada momento compartido se ha convertido en un tesoro en nuestros corazones. 
          Aquí está nuestra historia, nuestros recuerdos, nuestro amor eterno que crece cada día más fuerte.
        </p>
        <div className="flex justify-center mt-8">
          <Heart className="text-pink-500 animate-pulse" size={48} />
        </div>
      </div>
    </div>
  );

  const UploadView = () => (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-[3rem] p-12 shadow-2xl border-4 border-pink-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-bl-full opacity-50"></div>
        
        <h2 className="text-4xl font-black text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent flex items-center justify-center gap-4">
          <Camera className="text-pink-500" />
          Agregar Nuevo Recuerdo
        </h2>
        
        <div className="space-y-8">
          <div>
            <label className="block text-gray-800 font-bold mb-3 text-lg">✨ Título del recuerdo</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-6 py-4 bg-pink-50 border-2 border-pink-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-400 transition-all duration-300 text-lg"
              placeholder="Ej: Nuestra primera aventura juntos"
            />
          </div>
          
          <div>
            <label className="block text-gray-800 font-bold mb-3 text-lg">💕 Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={5}
              className="w-full px-6 py-4 bg-pink-50 border-2 border-pink-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-400 resize-none transition-all duration-300 text-lg"
              placeholder="Cuéntanos sobre este momento especial..."
            />
          </div>
          
          <div>
            <label className="block text-gray-800 font-bold mb-3 text-lg">📸 URL de la imagen</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full px-6 py-4 bg-pink-50 border-2 border-pink-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-400 transition-all duration-300 text-lg"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>
          
          <div>
            <label className="block text-gray-800 font-bold mb-3 text-lg">📅 Fecha</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full px-6 py-4 bg-pink-50 border-2 border-pink-200 rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-400 transition-all duration-300 text-lg"
            />
          </div>
          
          <button
            onClick={addMemory}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 text-xl"
          >
            <Plus size={24} />
            Agregar Recuerdo Especial
          </button>
        </div>
      </div>
    </div>
  );

  const MessagesView = () => (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-[3rem] p-12 shadow-2xl border-4 border-pink-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-br-full opacity-50"></div>
        
        <h2 className="text-4xl font-black text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent flex items-center justify-center gap-4">
          <MessageCircle className="text-pink-500" />
          Agregar Mensaje de Amor
        </h2>
        
        <div className="space-y-8">
          <div>
            <label className="block text-gray-800 font-bold mb-3 text-lg">💝 Tipo de mensaje</label>
            <select
              value={messageData.type}
              onChange={(e) => setMessageData({...messageData, type: e.target.value as 'love' | 'memory' | 'promise'})}
              className="w-full px-6 py-4 bg-pink-50 border-2 border-pink-200 rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-400 transition-all duration-300 text-lg"
            >
              <option value="love">💕 Mensaje de Amor</option>
              <option value="memory">⭐ Recuerdo Especial</option>
              <option value="promise">🎁 Promesa</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-800 font-bold mb-3 text-lg">💌 Tu mensaje</label>
            <textarea
              value={messageData.text}
              onChange={(e) => setMessageData({...messageData, text: e.target.value})}
              rows={5}
              className="w-full px-6 py-4 bg-pink-50 border-2 border-pink-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-400 resize-none transition-all duration-300 text-lg"
              placeholder="Escribe aquí tu mensaje del corazón..."
            />
          </div>
          
          <button
            onClick={addMessage}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 text-xl"
          >
            <Plus size={24} />
            Agregar Mensaje del Corazón
          </button>
        </div>
      </div>
    </div>
  );

  // Modales de edición
  const EditMemoryModal = () => (
    editingMemory && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-[3rem] p-12 max-w-3xl w-full max-h-screen overflow-y-auto border-4 border-pink-200 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Editar Recuerdo</h3>
            <button
              onClick={() => setEditingMemory(null)}
              className="text-gray-500 hover:text-pink-500 transition-colors p-2"
            >
              <X size={32} />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-800 font-bold mb-3">Título</label>
              <input
                type="text"
                value={editingMemory.title}
                onChange={(e) => setEditingMemory({...editingMemory, title: e.target.value})}
                className="w-full px-6 py-4 bg-pink-50 border-2 border-pink-200 rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-300"
              />
            </div>
            
            <div>
              <label className="block text-gray-800 font-bold mb-3">Descripción</label>
              <textarea
                value={editingMemory.description}
                onChange={(e) => setEditingMemory({...editingMemory, description: e.target.value})}
                rows={4}
                className="w-full px-6 py-4 bg-pink-50 border-2 border-pink-200 rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-300 resize-none"
              />
            </div>
            
            <div>
              <label className="block text-gray-800 font-bold mb-3">URL de la imagen</label>
              <input
                type="url"
                value={editingMemory.image}
                onChange={(e) => setEditingMemory({...editingMemory, image: e.target.value})}
                className="w-full px-6 py-4 bg-pink-50 border-2 border-pink-200 rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-300"
              />
            </div>
            
            <div>
              <label className="block text-gray-800 font-bold mb-3">Fecha</label>
              <input
                type="date"
                value={editingMemory.date}
                onChange={(e) => setEditingMemory({...editingMemory, date: e.target.value})}
                className="w-full px-6 py-4 bg-pink-50 border-2 border-pink-200 rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-300"
              />
            </div>
            
            <button
              onClick={updateMemory}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl"
            >
              <Save size={24} />
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
        <div className="bg-white rounded-[3rem] p-12 max-w-3xl w-full max-h-screen overflow-y-auto border-4 border-pink-200 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Editar Mensaje</h3>
            <button
              onClick={() => setEditingMessage(null)}
              className="text-gray-500 hover:text-pink-500 transition-colors p-2"
            >
              <X size={32} />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-800 font-bold mb-3">Tipo de mensaje</label>
              <select
                value={editingMessage.type}
                onChange={(e) => setEditingMessage({...editingMessage, type: e.target.value as 'love' | 'memory' | 'promise'})}
                className="w-full px-6 py-4 bg-pink-50 border-2 border-pink-200 rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-300"
              >
                <option value="love">💕 Mensaje de Amor</option>
                <option value="memory">⭐ Recuerdo Especial</option>
                <option value="promise">🎁 Promesa</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-800 font-bold mb-3">Mensaje</label>
              <textarea
                value={editingMessage.text}
                onChange={(e) => setEditingMessage({...editingMessage, text: e.target.value})}
                rows={4}
                className="w-full px-6 py-4 bg-pink-50 border-2 border-pink-200 rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-300 resize-none"
              />
            </div>
            
            <button
              onClick={updateMessage}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl"
            >
              <Save size={24} />
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-rose-300 relative">
      <FloatingHearts />
      
      {/* Navegación */}
      <nav className="bg-white/80 backdrop-blur-md border-b-4 border-pink-200 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Heart className="text-pink-500" size={32} />
              <span className="text-2xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Nuestro Amor
              </span>
            </div>
            
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => setCurrentView('home')}
                className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-lg ${
                  currentView === 'home' 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xl transform scale-105' 
                    : 'bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-600 hover:shadow-xl'
                }`}
              >
                <Home size={20} />
                Inicio
              </button>
              <button
                onClick={() => setCurrentView('upload')}
                className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-lg ${
                  currentView === 'upload' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl transform scale-105' 
                    : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 hover:shadow-xl'
                }`}
              >
                <Upload size={20} />
                Agregar Recuerdo
              </button>
              <button
                onClick={() => setCurrentView('messages')}
                className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-lg ${
                  currentView === 'messages' 
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-xl transform scale-105' 
                    : 'bg-white text-gray-700 hover:bg-rose-50 hover:text-rose-600 hover:shadow-xl'
                }`}
              >
                <MessageCircle size={20} />
                Agregar Mensaje
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
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