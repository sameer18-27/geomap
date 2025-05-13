import React, { useState } from 'react';
import './QuestBlocks.css';

const QuestBlocks = () => {
  const [userLocation, setUserLocation] = useState('');
  const [activeQuest, setActiveQuest] = useState(null);
  const [completedQuests, setCompletedQuests] = useState([]);

  // Sample quests data
  const quests = [
    {
      id: 'quest1',
      title: 'Hidden Treasure',
      description: 'Find the hidden treasure in the park.',
      location: 'Central Park, New York',
      mapLink: 'https://goo.gl/maps/8ZLdY3v5Jzc7JLWL6',
      reward: '50 tokens',
      difficulty: 'Easy',
      type: 'Exploration'
    },
    {
      id: 'quest2',
      title: 'Deliver Package',
      description: 'Deliver this important package to the coffee shop.',
      location: 'Starbucks, Times Square',
      mapLink: 'https://goo.gl/maps/QKp7wrKwXHZHCbJH7',
      reward: '75 tokens',
      difficulty: 'Medium',
      type: 'Delivery'
    },
    {
      id: 'quest3',
      title: 'Help with Groceries',
      description: 'Help an elderly person carry their groceries from the supermarket.',
      location: 'Whole Foods Market, Union Square',
      mapLink: 'https://goo.gl/maps/8mJJFm7W5ZdPFZ6v6',
      reward: '100 tokens',
      difficulty: 'Easy',
      type: 'Assistance'
    },
    {
      id: 'quest4',
      title: 'Street Performance',
      description: 'Perform a song or dance in a public place for at least 5 minutes.',
      location: 'Washington Square Park',
      mapLink: 'https://goo.gl/maps/LZ4zrdTWgKvD9Dft9',
      reward: '150 tokens',
      difficulty: 'Hard',
      type: 'Performance'
    }
  ];

  // Handle location input
  const handleLocationChange = (e) => {
    setUserLocation(e.target.value);
  };

  // Handle quest activation
  const activateQuest = (quest) => {
    setActiveQuest(quest);
  };

  // Handle quest completion
  const completeQuest = (quest) => {
    setCompletedQuests([...completedQuests, quest.id]);
    setActiveQuest(null);
    alert(`Congratulations! You've completed "${quest.title}" and earned ${quest.reward}!`);
  };

  // Check if quest is completed
  const isQuestCompleted = (questId) => {
    return completedQuests.includes(questId);
  };

  return (
    <div className="quest-blocks-container">
      <header className="quest-header">
        <h1>GeoQuest</h1>
        <p>Discover and complete quests in your area</p>
      </header>

      <div className="location-input">
        <h2>Your Location</h2>
        <input
          type="text"
          placeholder="Enter your location or address"
          value={userLocation}
          onChange={handleLocationChange}
        />
        <button className="location-button">Update Location</button>
      </div>

      {activeQuest ? (
        <div className="active-quest-container">
          <h2>Active Quest</h2>
          <div className="active-quest-card">
            <div className="quest-header">
              <h3>{activeQuest.title}</h3>
              <span className={`quest-type ${activeQuest.type.toLowerCase()}`}>
                {activeQuest.type}
              </span>
            </div>
            <p className="quest-description">{activeQuest.description}</p>
            <div className="quest-details">
              <p><strong>Location:</strong> {activeQuest.location}</p>
              <p><strong>Difficulty:</strong> {activeQuest.difficulty}</p>
              <p><strong>Reward:</strong> {activeQuest.reward}</p>
            </div>
            <div className="quest-actions">
              <a 
                href={activeQuest.mapLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="map-link-button"
              >
                Open in Google Maps
              </a>
              <button 
                className="complete-button"
                onClick={() => completeQuest(activeQuest)}
              >
                Mark as Completed
              </button>
              <button 
                className="cancel-button"
                onClick={() => setActiveQuest(null)}
              >
                Cancel Quest
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="available-quests">
          <h2>Available Quests</h2>
          <div className="quest-grid">
            {quests.map(quest => (
              <div 
                key={quest.id} 
                className={`quest-block ${isQuestCompleted(quest.id) ? 'completed' : ''}`}
                onClick={() => !isQuestCompleted(quest.id) && activateQuest(quest)}
              >
                <div className="quest-block-header">
                  <h3>{quest.title}</h3>
                  <span className={`quest-type ${quest.type.toLowerCase()}`}>
                    {quest.type}
                  </span>
                </div>
                <p className="quest-description">{quest.description}</p>
                <div className="quest-footer">
                  <span className="quest-difficulty">{quest.difficulty}</span>
                  <span className="quest-reward">{quest.reward}</span>
                </div>
                {isQuestCompleted(quest.id) && (
                  <div className="completed-overlay">
                    <span>Completed</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="completed-quests-section">
        <h2>Completed Quests</h2>
        {completedQuests.length === 0 ? (
          <p className="no-quests">You haven't completed any quests yet.</p>
        ) : (
          <ul className="completed-quests-list">
            {quests
              .filter(quest => completedQuests.includes(quest.id))
              .map(quest => (
                <li key={quest.id} className="completed-quest-item">
                  <span className="completed-quest-title">{quest.title}</span>
                  <span className="completed-quest-reward">{quest.reward}</span>
                </li>
              ))
            }
          </ul>
        )}
      </div>
    </div>
  );
};

export default QuestBlocks;
