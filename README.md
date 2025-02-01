# Blood Matching App

## Overview
The Blood Matching App is a real-time platform that connects blood donors with recipients in the closest vicinity. By leveraging geolocation services and real-time matching technology, the app ensures that those in urgent need of blood donations can find suitable donors quickly and efficiently.

## Features
- **Real-time Blood Type Matching**: Matches donors with recipients based on blood type compatibility.
- **Geolocation Services**: Uses GPS to identify and match users within close proximity.
- **User Profiles**: Allows users to register as donors or recipients and manage their availability.
- **Notification System**: Alerts users when a match is found.
- **Secure Communication**: Enables donors and recipients to connect securely through in-app messaging.
- **Donation History Tracking**: Keeps records of past donations for users.

## Tech Stack

### **Frontend**
- **React Native (or Flutter)**: For building cross-platform mobile applications (iOS & Android).
  - _Reason_: Single codebase for both platforms, fast development, and real-time features.
- **React (for Web Version)**: A web interface for accessibility via browsers.
  - _Reason_: Component-based structure and fast rendering.
- **Tailwind CSS**: For modern, responsive UI designs.
  - _Reason_: Simplifies styling with utility classes and improves design consistency.

### **Backend**
- **Node.js with Express.js**: Handles server-side logic, user authentication, and API requests.
  - _Reason_: Lightweight, efficient, and scalable for handling real-time requests.
- **PostgreSQL**: Stores structured user data, blood type records, and donation history.
  - _Reason_: Supports complex queries for filtering and sorting data efficiently.

### **Other Technologies**
- **Geolocation API**: Retrieves and updates user locations in real time.
  - _Reason_: Essential for proximity-based matching.
- **React Leaflet Module**: Provides interactive maps for users to visualize nearby donors and recipients.
  - _Reason_: Enhances user experience with real-time location updates.

## Installation & Setup

### **Prerequisites**
- Node.js and npm installed
- PostgreSQL database set up
- React Native CLI (for mobile development)

### **Backend Setup**
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/blood-matching-app.git
   ```
2. Navigate to the backend directory:
   ```sh
   cd backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables (`.env` file):
   ```sh
   DATABASE_URL=your_postgresql_database_url
   PORT=3000
   ```
5. Start the backend server:
   ```sh
   npm start
   ```

### **Frontend Setup (Web)**
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```


## Future Enhancements
- **AI-Based Blood Demand Prediction**: Uses machine learning to predict areas with higher blood demand.
- **Blockchain for Secure Transactions**: Ensures transparency in blood donations.
- **Multilingual Support**: Expands accessibility for a diverse user base.

## Contribution
We welcome contributions! Please fork the repository, make your changes, and submit a pull request.

## License
This project is licensed under the MIT License.

