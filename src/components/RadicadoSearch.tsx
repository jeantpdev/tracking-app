import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RadicadoSearch: React.FC = () => {
  const [radicado, setRadicado] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (radicado.trim()) {
      navigate(`/seguimiento/${radicado.trim()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center my-8">
      <input
        type="text"
        value={radicado}
        onChange={e => setRadicado(e.target.value)}
        placeholder="Ingrese el ID de radicado"
        className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
      >
        Buscar
      </button>
    </form>
  );
};

export default RadicadoSearch; 