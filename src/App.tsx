// App.tsx
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "https://seu-backend-na-render.com";

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [report, setReport] = useState<any[]>([]);

  const handlePunch = async (type: 'entrada' | 'saida') => {
    try {
      const res = await axios.post(`${API_URL}/punch`, { email, password, type });
      alert(res.data.message);
    } catch (err) {
      alert("Erro ao bater ponto");
    }
  };

  const fetchReport = async () => {
    const res = await axios.get(`${API_URL}/report/${email}`);
    setReport(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Ponto Digital</h1>
        <input 
          className="w-full border p-2 mb-2 rounded"
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          className="w-full border p-2 mb-4 rounded"
          type="password" 
          placeholder="Senha" 
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        <div className="flex gap-4">
          <button 
            onClick={() => handlePunch('entrada')}
            className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Entrada
          </button>
          <button 
            onClick={() => handlePunch('saida')}
            className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Saída
          </button>
        </div>

        <button 
          onClick={fetchReport}
          className="w-full mt-6 text-blue-600 underline"
        >
          Gerar Relatório
        </button>
      </div>

      {report.length > 0 && (
        <div className="mt-8 w-full max-w-2xl bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Histórico de {email}</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th>Tipo</th>
                <th>Data/Hora</th>
                <th>IP</th>
              </tr>
            </thead>
            <tbody>
              {report.map((item, i) => (
                <tr key={i} className="border-b">
                  <td>{item.type}</td>
                  <td>{new Date(item.timestamp).toLocaleString()}</td>
                  <td className="text-xs text-gray-500">{item.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
