# Image Annotation Tool

A React application for annotating and ranking images based on their relevance to a query image.

## Features

- Display a grid of images for annotation
- Select relevant images by clicking on them
- Rank the selected images based on their relevance
- Save annotation results as JSON files
- Skip to the next query without saving
- Multiple query images support

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies

```bash
npm install
# or
yarn install
```

### Running the Application

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:5173

## Usage

1. Enter your username and task name
2. View the query image at the top
3. Click on images in the grid to mark them as relevant/non-relevant
4. Assign ranks to the selected images in the ranking section
5. Click "Save" to save your annotations or "Skip" to move to the next query without saving

## Data Structure

The annotation results are saved as JSON files with the following structure:

```json
{
  "userName": "string",
  "taskName": "string",
  "queryImageId": "string",
  "timestamp": "ISO-8601 string",
  "annotations": [
    {
      "imageId": "string",
      "relevant": boolean,
      "rank": number | null
    }
  ]
}
```

## Customization

To use with your own images, modify the `mockImages` and `mockQueryImages` arrays in `src/mockData.ts`.

## License

MIT
