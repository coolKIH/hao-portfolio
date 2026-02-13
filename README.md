# hao-portfolio

A personal portfolio website built with **Next.js** and **Tailwind CSS**. This repository serves as the core rendering engine and UI layer for the site.

## 🛠 Tech Stack

* **Framework**: Next.js (App Router)
* **Styling**: Tailwind CSS
* **Content Processing**: MDX

## 🏗 Architecture

The project is structured to separate logic from content:

* **Logic**: This repository handles UI components, routing, and styling.
* **Content Management**: Content is managed via a Git submodule (private), which contains MDX files for posts and other data. This allows the core engine and the raw data to be maintained independently.

## 🚀 Getting Started

1. **Clone the repository**:
    ```bash
    git clone --recursive <this repo>
    ```

2. **Install dependencies**:
    ```bash
    pnpm install
    ```

3. **Run the development server**:
    ```bash
    pnpm run dev
    ```

## 📝 Ongoing Updates
The project is still in its early stages. Current focus areas include:
* **UI/UX Development**: Implementing the core layout and styling system.
* **Content Integration**: Improving Blog page and setting up Projects page.
* **Information Architecture**: There is still placeholder information and they will be updated when content becomes available.
