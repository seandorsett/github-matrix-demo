# GitHub Matrix Build Demo

A simple web application demonstrating the use of GitHub Actions matrix builds to test code across multiple environments.

## What is a Matrix Build?

A matrix build allows you to test your application across multiple configurations simultaneously. This project demonstrates testing across:
- **3 Operating Systems**: Ubuntu, Windows, and macOS
- **3 Node.js Versions**: 16.x, 18.x, and 20.x

This creates a total of **9 different build combinations** that run in parallel!

## Features

- Simple Express.js web server
- Interactive web page displaying environment information
- API endpoints for health checks and system info
- Automated tests
- GitHub Actions workflow with matrix strategy

## Getting Started

### Prerequisites

- Node.js (16.x, 18.x, or 20.x)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/seandorsett/github-matrix-demo.git
cd github-matrix-demo

# Install dependencies
npm install

# Start the server
npm start
```

The application will be available at `http://localhost:3000`

### Running Tests

```bash
npm test
```

## Project Structure

```
github-matrix-demo/
├── .github/
│   └── workflows/
│       └── matrix-build.yml    # GitHub Actions workflow with matrix strategy
├── public/
│   └── index.html              # Frontend web page
├── server.js                   # Express.js server
├── test.js                     # Test suite
├── package.json                # Project configuration
└── README.md                   # This file
```

## API Endpoints

- `GET /` - Serves the main web page
- `GET /api/info` - Returns environment information (Node.js version, platform, etc.)
- `GET /health` - Health check endpoint

## GitHub Actions Matrix Build

The workflow file (`.github/workflows/matrix-build.yml`) demonstrates how to:
1. Define a matrix with multiple dimensions (OS and Node.js version)
2. Run jobs in parallel across all matrix combinations
3. Install dependencies and run tests in each environment
4. Verify the application works in all configurations

View the workflow runs in the "Actions" tab of the GitHub repository to see the matrix in action!

## Learn More

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Using a matrix for your jobs](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs)
- [Express.js Documentation](https://expressjs.com/)

## License

MIT