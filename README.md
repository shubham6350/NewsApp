# NewsApp

## Description

This project is a React Native application developed using Expo, designed to fetch and display news articles from various sources based on user-defined criteria. The application allows users to specify query parameters and dates to retrieve relevant articles, which are then displayed in a user-friendly format.

## Features

- Fetches news articles from the News API based on user-defined queries.
- Stores fetched articles in AsyncStorage for offline access.
- Truncates article text to improve readability.
- User-friendly interface built using Expo.

## Assumptions

1. **Environment**:

   - The project is developed using Expo, and users should have the Expo Go app installed on their mobile devices for testing and deployment.

2. **Node.js and NPM**:

   - Node.js (version >= 20.x) and npm (or Yarn) must be installed on your machine to run the project.

3. **API Key**:

   - A valid API key from the News API is required to fetch news articles. This should be added to the `.env` file as `API_KEY`.

4. **Internet Connection**:

   - The application requires an active internet connection to fetch articles from the News API.

5. **AsyncStorage**:
   - Articles fetched from the API are stored using AsyncStorage for offline access. Make sure to have permission to use AsyncStorage on the device.

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:shubham6350/NewsApp.git
   cd mobile-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the root of the project and add your API key:
   ```bash
   API_KEY=your_api_key_here
   ```
4. Start the Expo project:
   ```bash
   npm start
   ```
