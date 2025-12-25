# Nuxt Contact Card

This project is a responsive single-page contact card application built with Nuxt.js, designed specifically for mobile devices. It features a modern dark theme with technological colors and includes functionalities for user interaction.

## Features

- User photo display
- Introduction text
- Text input box for user messages
- Audio recording functionality
- Send button to submit data
- Integration with Supabase for data storage

## Project Structure

```
nuxt-contact-card
├── assets
│   └── css
│       └── main.css
├── components
│   ├── ContactCard.vue
│   ├── AudioRecorder.vue
│   └── SendButton.vue
├── composables
│   └── useSupabase.ts
├── layouts
│   └── default.vue
├── pages
│   └── index.vue
├── plugins
│   └── supabase.client.ts
├── server
│   └── api
│       └── contact.post.ts
├── types
│   └── index.ts
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
   cd nuxt-contact-card
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set up your Supabase project and configure the environment variables as needed.

5. Run the development server:
   ```
   npm run dev
   ```

## Usage

- Open the application in your mobile browser.
- Fill in the text input box with your message.
- Use the audio recording button to record a voice message.
- Click the send button to submit your information.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.