
# Finvv - Financial Management Platform

## About This Project

Finvv is a sleek, modern financial management application designed to help users take control of their financial future. With its elegant black, white, and gold interface, Finvv provides a premium experience for tracking spending, setting savings goals, and gaining financial insights.

## Features

- **User Authentication**: Secure email/password and Google authentication
- **Responsive Design**: Seamless experience across mobile and desktop
- **Dashboard**: Track your financial data with visual representations
- **Spending Analysis**: Monitor and categorize your spending habits
- **Goal Setting**: Create and track progress towards savings goals
- **Financial Insights**: Get expert recommendations tailored to your financial behavior

## Technology Stack

This project is built with:

- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Supabase for authentication and database

## Getting Started

### Prerequisites

- Node.js & npm installed

### Installation

```sh
# Clone the repository
git clone <your-repo-url>

# Navigate to the project directory
cd finvv

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Development

The application follows a component-based architecture, with the main application screens found in the `src/pages` directory and reusable UI components in `src/components`.

## Deployment

To build the application for production:

```sh
npm run build
```

This will generate optimized assets in the `dist` directory which can be deployed to your preferred hosting provider.

## Customization

The application theme can be customized by modifying the variables in `tailwind.config.ts` and the CSS variables in `src/index.css`.
