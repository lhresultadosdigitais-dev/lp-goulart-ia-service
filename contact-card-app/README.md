# Contact Card App

## Overview
The Contact Card App is a responsive single-page application designed for mobile devices. It features a dark theme with modern technological colors and allows users to submit their contact information through a user-friendly interface.

## Features
- **Responsive Design**: Optimized for mobile devices.
- **Dark Theme**: A modern aesthetic with a focus on usability.
- **Contact Card**: Displays user information and a photo.
- **Audio Recording**: Users can record audio messages.
- **Contact Form**: Includes a text input for messages and a send button.
- **API Integration**: Utilizes Supabase for data storage and processing.

## Project Structure
```
contact-card-app
├── components
│   ├── ContactCard.vue
│   ├── AudioRecorder.vue
│   └── ContactForm.vue
├── pages
│   └── index.vue
├── layouts
│   └── default.vue
├── assets
│   └── css
│       └── main.css
├── plugins
│   └── supabase.client.js
├── composables
│   └── useSupabase.js
├── server
│   └── api
│       └── contact.post.js
├── public
│   └── favicon.ico
├── nuxt.config.ts
├── package.json
├── tailwind.config.js
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd contact-card-app
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
1. Start the development server:
   ```
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000` to view the application.

## API Integration
The application uses Supabase for backend services. Ensure you have a Supabase project set up and update the `supabase.client.js` file with your project credentials.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.