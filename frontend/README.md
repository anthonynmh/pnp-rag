# PromptCraft Frontend

This repository contains the frontend application for **PromptCraft**, a platform designed to help users build better AI prompts with ease. It offers both a "Quick Start" mode for simple settings and an "Advanced Mode" for guided prompt engineering.

## ✨ Features

*   **Quick Start Mode:** Easily adjust AI role, tone, and response format using intuitive dropdowns.
*   **Advanced Mode:** Guided prompt building with dedicated fields for defining the task, context, target audience, desired examples, output format, and specific constraints.
*   **Interactive Chat Interface:** A dynamic chat area where users can input their prompts and view AI responses (currently mock responses).
*   **Augmented Prompt Visibility:** Option to display the full augmented prompt that is constructed and sent to the AI based on your selections.
*   **Responsive UI:** Built with modern web technologies to ensure a seamless experience across various devices.

## 🚀 Technologies Used

*   **React 19:** A declarative, component-based JavaScript library for building user interfaces.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and maintainability.
*   **Vite:** A fast and opinionated build tool for modern web projects.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
*   **Shadcn UI:** A collection of re-usable components built using Radix UI and Tailwind CSS.
*   **ESLint:** Configured with TypeScript-aware rules to maintain high code quality and consistency.

## ⚙️ Setup and Installation

To get the PromptCraft frontend up and running on your local machine, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The application will typically be available at `http://localhost:5173` (or another port if 5173 is in use).

## 💡 Usage

Once the application is running, you can interact with the PromptCraft interface:

*   **Toggle Modes:** Switch between "Quick Start" and "Advanced Mode" using the buttons at the top of the chat interface.
*   **Quick Start Mode:** Select your desired AI role, tone, and response format from the respective dropdowns. Then, type your prompt into the main input field and click the "Send Message" button.
*   **Advanced Mode:** In this mode, you'll find guided input fields for "Task," "Context," "Target Audience," "Example(s) of desired output," "Output Format," and "Constraints/Rules." Fill these out to build a more detailed and structured prompt. Your main message can be entered in the "Your message" textarea.
*   **View Augmented Prompt:** Click the "Show Prompts" button to reveal the full, constructed prompt that is sent to the AI, incorporating all your selected settings and advanced fields.

## 📂 Project Structure

Key directories and files within the `frontend`:

*   `src/app/App.tsx`: The main application component that orchestrates the overall layout and state.
*   `src/app/components/ChatInterface.tsx`: Contains the core logic and UI for the chat functionality, including the quick start and advanced prompt building features.
*   `src/app/components/ui/`: Houses the Shadcn UI components used throughout the application.
*   `src/index.css`: Global CSS styles, including the integration of Tailwind CSS.
*   `vite.config.ts`: Configuration file for Vite, handling build processes and path aliases.
*   `eslint.config.js`: ESLint configuration for maintaining code quality and consistency.
