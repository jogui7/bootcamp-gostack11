import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories')
    .then(res => setRepositories(res.data));
  }, []);

  async function handleAddRepository() {
    // Done
    const res = await api.post('/repositories', {
      "title": `Novo Projeto ${Math.random()}`,
      "owner": "JoÃo"
    })

    const repository = res.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // Done
    api.delete(`/repositories/${id}`);

    const index = repositories.findIndex( repository => repository.id === id);
    const newRepositories = [...repositories];

    newRepositories.splice(index, 1);
    setRepositories(newRepositories);
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id} >
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
