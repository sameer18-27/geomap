import React, { useState, useEffect } from 'react';
import './HelpRequestSystem.css';

const HelpRequestSystem = () => {
  // User state
  const [currentUser, setCurrentUser] = useState({
    id: 'user1',
    name: 'Current User',
    location: null,
    locationLink: ''
  });

  // Help requests state
  const [helpRequests, setHelpRequests] = useState([]);

  // New request form state
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    type: 'medical',
    locationLink: ''
  });

  // UI state
  const [activeTab, setActiveTab] = useState('nearby'); // 'nearby', 'my-requests', 'create'
  const [showRequestDetails, setShowRequestDetails] = useState(null);

  // Mock data for initial requests
  useEffect(() => {
    const mockRequests = [
      {
        id: 'req1',
        userId: 'user2',
        userName: 'Sarah Johnson',
        title: 'Need help with groceries',
        description: 'I broke my leg and need someone to help me carry groceries from the store to my apartment.',
        type: 'domestic',
        status: 'active',
        locationLink: 'https://goo.gl/maps/QKp7wrKwXHZHCbJH7',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        distance: 0.7 // km
      },
      {
        id: 'req2',
        userId: 'user3',
        userName: 'Michael Chen',
        title: 'Need ride to hospital',
        description: 'I need a ride to my doctor\'s appointment. I can\'t drive myself due to my medication.',
        type: 'medical',
        status: 'active',
        locationLink: 'https://goo.gl/maps/8ZLdY3v5Jzc7JLWL6',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        distance: 0.3 // km
      },
      {
        id: 'req3',
        userId: 'user4',
        userName: 'Emily Rodriguez',
        title: 'Help setting up WiFi router',
        description: 'I\'m not tech-savvy and need help setting up my new WiFi router. It shouldn\'t take more than 15 minutes.',
        type: 'technical',
        status: 'active',
        locationLink: 'https://goo.gl/maps/LZ4zrdTWgKvD9Dft9',
        createdAt: new Date(Date.now() - 10800000).toISOString(),
        distance: 0.9 // km
      }
    ];

    setHelpRequests(mockRequests);
  }, []);

  // Handle location input change
  const handleLocationLinkChange = (e) => {
    setCurrentUser({
      ...currentUser,
      locationLink: e.target.value
    });
  };

  // Update user location
  const updateUserLocation = () => {
    if (currentUser.locationLink) {
      // Check if it's a valid Google Maps link (basic validation)
      if (!currentUser.locationLink.includes('goo.gl/maps') &&
          !currentUser.locationLink.includes('google.com/maps')) {
        alert('Please enter a valid Google Maps link');
        return;
      }

      // In a real app, you would parse the coordinates from the Google Maps link
      // or use geocoding to get the actual coordinates
      setCurrentUser({
        ...currentUser,
        location: {
          lat: 40.7128,
          lng: -74.0060
        }
      });

      alert('Your location has been updated! You can now see help requests within 1km of your location.');

      // Switch to nearby tab to show available requests
      setActiveTab('nearby');
    } else {
      alert('Please enter a Google Maps link to your location');
    }
  };

  // Handle new request form changes
  const handleNewRequestChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({
      ...newRequest,
      [name]: value
    });
  };

  // Submit new help request
  const submitHelpRequest = (e) => {
    e.preventDefault();

    // Validate location
    if (!currentUser.location && !newRequest.locationLink) {
      alert('Please update your location or provide a specific location for this request');
      return;
    }

    // Validate Google Maps link if provided
    if (newRequest.locationLink &&
        !newRequest.locationLink.includes('goo.gl/maps') &&
        !newRequest.locationLink.includes('google.com/maps')) {
      alert('Please enter a valid Google Maps link for the specific location');
      return;
    }

    // Create new help request
    const newHelpRequest = {
      id: `req${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      title: newRequest.title,
      description: newRequest.description,
      type: newRequest.type,
      status: 'active',
      locationLink: newRequest.locationLink || currentUser.locationLink,
      createdAt: new Date().toISOString(),
      distance: 0 // It's the user's own request
    };

    // Add to help requests list
    setHelpRequests([newHelpRequest, ...helpRequests]);

    // Reset form
    setNewRequest({
      title: '',
      description: '',
      type: 'medical',
      locationLink: ''
    });

    // Switch to my requests tab
    setActiveTab('my-requests');

    // Show success message
    alert(`Your ${newRequest.type} help request has been created! Users within 1km will be able to see and respond to it.`);
  };

  // Accept a help request
  const acceptRequest = (requestId) => {
    setHelpRequests(
      helpRequests.map(req =>
        req.id === requestId
          ? { ...req, status: 'accepted', acceptedBy: currentUser.id }
          : req
      )
    );

    setShowRequestDetails(null);
    alert('You have accepted this help request. Please contact the requester.');
  };

  // Complete a help request
  const completeRequest = (requestId) => {
    setHelpRequests(
      helpRequests.map(req =>
        req.id === requestId
          ? { ...req, status: 'completed' }
          : req
      )
    );

    setShowRequestDetails(null);
    alert('This help request has been marked as completed. Thank you for your help!');
  };

  // Cancel a help request
  const cancelRequest = (requestId) => {
    setHelpRequests(
      helpRequests.map(req =>
        req.id === requestId
          ? { ...req, status: 'cancelled' }
          : req
      )
    );

    setShowRequestDetails(null);
    alert('This help request has been cancelled.');
  };

  // Filter requests by tab
  const filteredRequests = () => {
    switch (activeTab) {
      case 'nearby':
        return helpRequests.filter(req =>
          req.userId !== currentUser.id &&
          req.status === 'active' &&
          req.distance <= 1 // Within 1km
        );
      case 'my-requests':
        return helpRequests.filter(req => req.userId === currentUser.id);
      default:
        return [];
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'accepted': return 'status-accepted';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  return (
    <div className="help-request-system">
      <header className="app-header">
        <h1>Community Help</h1>
        <p>Connect with people nearby who need or can offer help</p>
      </header>

      <div className="location-section">
        <h2>Your Location</h2>
        <p className="location-instruction">
          Set your location to see help requests within 1km and allow others to find your requests.
        </p>
        <div className="location-input-group">
          <input
            type="text"
            placeholder="Paste Google Maps link to your location (e.g., https://goo.gl/maps/...)"
            value={currentUser.locationLink}
            onChange={handleLocationLinkChange}
          />
          <button onClick={updateUserLocation}>Update Location</button>
        </div>
        {currentUser.location ? (
          <p className="location-status">
            <span className="location-status-icon">✓</span> Your location is set. You can now see help requests within 1km.
          </p>
        ) : (
          <p className="location-warning">
            <span className="location-warning-icon">!</span> Please set your location to see nearby help requests.
          </p>
        )}
      </div>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'nearby' ? 'active' : ''}`}
          onClick={() => setActiveTab('nearby')}
        >
          Nearby Requests
        </button>
        <button
          className={`tab-button ${activeTab === 'my-requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-requests')}
        >
          My Requests
        </button>
        <button
          className={`tab-button ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          Create Request
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'nearby' && (
          <div className="nearby-requests">
            <h2>Help Requests Near You</h2>
            {filteredRequests().length === 0 ? (
              <p className="no-requests">No help requests in your area at the moment.</p>
            ) : (
              <div className="request-list">
                {filteredRequests().map(request => (
                  <div
                    key={request.id}
                    className="request-card"
                    onClick={() => setShowRequestDetails(request)}
                  >
                    <div className="request-header">
                      <h3>{request.title}</h3>
                      <span className={`request-type ${request.type}`}>
                        {request.type}
                      </span>
                    </div>
                    <p className="request-description">{request.description.substring(0, 100)}...</p>
                    <div className="request-footer">
                      <span className="request-user">{request.userName}</span>
                      <span className="request-distance">{request.distance} km away</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'my-requests' && (
          <div className="my-requests">
            <h2>My Help Requests</h2>
            {filteredRequests().length === 0 ? (
              <p className="no-requests">You haven't created any help requests yet.</p>
            ) : (
              <div className="request-list">
                {filteredRequests().map(request => (
                  <div
                    key={request.id}
                    className="request-card"
                    onClick={() => setShowRequestDetails(request)}
                  >
                    <div className="request-header">
                      <h3>{request.title}</h3>
                      <span className={`status-badge ${getStatusBadgeClass(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="request-description">{request.description.substring(0, 100)}...</p>
                    <div className="request-footer">
                      <span className="request-type-small">{request.type}</span>
                      <span className="request-date">{formatDate(request.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'create' && (
          <div className="create-request">
            <h2>Create a Help Request</h2>
            <form onSubmit={submitHelpRequest}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newRequest.title}
                  onChange={handleNewRequestChange}
                  placeholder="Brief title for your request"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">Type of Help</label>
                <select
                  id="type"
                  name="type"
                  value={newRequest.type}
                  onChange={handleNewRequestChange}
                  required
                >
                  <option value="medical">Medical</option>
                  <option value="domestic">Domestic</option>
                  <option value="social">Social</option>
                  <option value="technical">Technical</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newRequest.description}
                  onChange={handleNewRequestChange}
                  placeholder="Describe what kind of help you need"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="locationLink">
                  Specific Location (optional)
                </label>
                <input
                  type="text"
                  id="locationLink"
                  name="locationLink"
                  value={newRequest.locationLink}
                  onChange={handleNewRequestChange}
                  placeholder="Google Maps link (if different from your location)"
                />
                <small>
                  Leave empty to use your current location, or provide a specific Google Maps link
                </small>
              </div>

              <button type="submit" className="submit-button">Create Help Request</button>
            </form>
          </div>
        )}
      </div>

      {showRequestDetails && (
        <div className="request-details-overlay">
          <div className="request-details-modal">
            <button
              className="close-button"
              onClick={() => setShowRequestDetails(null)}
            >
              ×
            </button>

            <div className="request-details-header">
              <h2>{showRequestDetails.title}</h2>
              <span className={`request-type ${showRequestDetails.type}`}>
                {showRequestDetails.type}
              </span>
            </div>

            <div className="request-details-content">
              <p className="request-description-full">{showRequestDetails.description}</p>

              <div className="request-meta">
                <p><strong>Requested by:</strong> {showRequestDetails.userName}</p>
                <p><strong>Created:</strong> {formatDate(showRequestDetails.createdAt)}</p>
                <p><strong>Status:</strong> <span className={`status-text ${getStatusBadgeClass(showRequestDetails.status)}`}>{showRequestDetails.status}</span></p>
                {showRequestDetails.distance > 0 && (
                  <p><strong>Distance:</strong> {showRequestDetails.distance} km away</p>
                )}
              </div>

              <div className="request-location">
                <h3>Location</h3>
                <a
                  href={showRequestDetails.locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="maps-link"
                >
                  Open in Google Maps
                </a>
              </div>

              <div className="request-actions">
                {showRequestDetails.userId !== currentUser.id && showRequestDetails.status === 'active' && (
                  <button
                    className="accept-button"
                    onClick={() => acceptRequest(showRequestDetails.id)}
                  >
                    Accept Request
                  </button>
                )}

                {showRequestDetails.userId === currentUser.id && showRequestDetails.status === 'active' && (
                  <button
                    className="cancel-button"
                    onClick={() => cancelRequest(showRequestDetails.id)}
                  >
                    Cancel Request
                  </button>
                )}

                {showRequestDetails.status === 'accepted' && (
                  <button
                    className="complete-button"
                    onClick={() => completeRequest(showRequestDetails.id)}
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpRequestSystem;
