# GeoQuest Map

A location-based quest system that allows users to discover and interact with quests on an interactive map.

## Features

- **Interactive Map**: Shows quests and user location on an OpenStreetMap-based interface
- **Geolocation**: Tracks user's current position in real-time
- **Quest System**: Displays quests with details and activation based on proximity
- **Mobile-Friendly**: Works on both desktop and mobile devices

## Files

- `map.html` - The main GeoQuest application with the interactive map
- `qr.html` - QR code generator for easy mobile access
- `index.html` - Simple test page to verify server functionality

## How to Use

1. Open `map.html` in a web browser
2. Allow location access when prompted
3. Explore the map to find quests
4. Get within 100 meters of a quest to activate it
5. View quest details by clicking on markers

## Mobile Access

To access the map on a mobile device:
1. Make sure your phone is connected to the same WiFi network as the server
2. Open the QR code page (`qr.html`) on your computer
3. Scan the QR code with your phone
4. Allow location access on your phone

## Technologies Used

- HTML, CSS, JavaScript
- Leaflet.js for mapping
- Geolocation API for location tracking
- Haversine formula for distance calculations

## Development

This is a standalone application that doesn't require any build tools or frameworks. Simply edit the HTML files directly to modify the application.

To add new quests, edit the `quests` array in the JavaScript section of `map.html`.
