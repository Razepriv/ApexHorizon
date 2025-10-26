# Apex Horizon

A cutting-edge AI-powered web application that showcases the future of digital experiences.

## Features

- 🤖 AI Agent Integration
- 🧠 Neural Background Animations
- 🗣️ Voice Agent Interaction
- 📊 ROI Calculator
- 💫 Stunning UI Components
- 🔄 Real-time Data Processing

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Google AI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Razepriv/ApexHorizon.git
cd ApexHorizon
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment file and fill in your values:
```bash
cp .env.example .env
```

4. Set up the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

## Project Structure

```
ApexHorizon/
├── client/              # Frontend React application
│   └── src/
│       ├── components/  # Reusable components
│       ├── examples/    # Example implementations
│       ├── hooks/       # Custom React hooks
│       ├── lib/         # Utility functions
│       ├── pages/       # Page components
│       └── services/    # API services
├── server/              # Backend Express application
├── shared/              # Shared types and utilities
└── attached_assets/     # Static assets
```

## Development

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.