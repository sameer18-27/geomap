import React, { useState, useEffect } from 'react';
import QuestBlocks from './components/QuestBlocks';
import './App.css';

function App() {
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  // Listen for custom events
  useEffect(() => {
    // Error handler
    const handleError = (event) => {
      setError(event.detail.message);
      // Auto-hide error after 5 seconds
      setTimeout(() => setError(null), 5000);
    };

    // Quest activation notification
    const handleQuestActivation = (event) => {
      const { quest, location } = event.detail;
      setNotification(`Quest "${quest.title}" activated at ${location}!`);
      // Auto-hide notification after 5 seconds
      setTimeout(() => setNotification(null), 5000);
    };

    // Add event listeners
    window.addEventListener('geoquest-error', handleError);
    window.addEventListener('quest-activated', handleQuestActivation);

    // Clean up
    return () => {
      window.removeEventListener('geoquest-error', handleError);
      window.removeEventListener('quest-activated', handleQuestActivation);
    };
  }, []);

  return (
    <div className="app">
      {/* Error message */}
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className="notification">
          <p>{notification}</p>
          <button onClick={() => setNotification(null)}>×</button>
        </div>
      )}

      {/* Main quest blocks component */}
      <QuestBlocks />
    </div>
  );
}

export default App;
