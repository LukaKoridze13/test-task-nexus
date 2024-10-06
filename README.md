# S3 and DynamoDB CRUD Application

This project is a Node.js and TypeScript application that provides CRUD operations on AWS S3 and DynamoDB services. The project uses AWS SDK v3 and the Express framework. Each operation on S3 is mirrored in DynamoDB to maintain consistent data.

## Features
- Upload files to S3 and create records in DynamoDB.
- Update files in S3 and the corresponding records in DynamoDB.
- Delete files from S3 and the corresponding records from DynamoDB.

## Requirements
- Node.js (v14 or higher)
- AWS account with S3 and DynamoDB access
- Environment variables set up for AWS credentials

## Installation

1. **Clone the repository**:

    ```sh
    git clone https://github.com/LukaKoridze13/test-task-nexus.git
    cd test-task-nexus
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and add the following environment variables:

    ```dotenv
    AWS_ACCESS_KEY_ID=your_access_key_id
    AWS_SECRET_ACCESS_KEY=your_secret_access_key
    AWS_REGION=your_region
    BUCKET_NAME=your_bucket_name
    DYNAMODB_TABLE_NAME=your_dynamodb_table_name
    PORT=3000
    ```

    Replace `your_access_key_id`, `your_secret_access_key`, etc., with your actual AWS credentials and configuration.

## Running the Application

1. **Development Mode**:

    ```sh
    npm run dev
    ```

2. **Production Mode**:

    First, build the TypeScript code:

    ```sh
    npm run build
    ```

    Then, start the server:

    ```sh
    npm start
    ```

3. **Access the Application**:

    The application will be running at [http://localhost:3000](http://localhost:3000).

## Endpoints

- **POST /api/s3/upload**: Upload a file to S3 and create a corresponding record in DynamoDB.
  - Use a form-data key named `file` to upload.
  
- **PUT /api/s3/update/:key**: Update an existing file in S3 and the corresponding record in DynamoDB.
  - Requires a `file` key in form-data.

- **DELETE /api/s3/delete/:key**: Delete a file from S3 and the corresponding record in DynamoDB.

### Example Usage with Postman

- **Upload a File**:
  - Send a **POST** request to `/api/s3/upload`.
  - Set **Body** to **form-data** with a key named `file` and attach the file you want to upload.

- **Update a File**:
  - Send a **PUT** request to `/api/s3/update/:key` (replace `:key` with the file name).
  - Set **Body** to **form-data** with a key named `file` and attach the updated file.

- **Delete a File**:
  - Send a **DELETE** request to `/api/s3/delete/:key` (replace `:key` with the file name).

## Running Tests

Unit tests are written using Jest to validate CRUD operations on S3 and DynamoDB.

1. **Run all tests**:

    ```sh
    npm test
    ```

## Project Structure

- **src/**
  - **controllers/**: Contains Express controllers for handling requests
    - `s3Controller.ts`
  - **routes/**: Contains Express routes for defining endpoints
    - `s3Routes.ts`
  - **services/**: Contains AWS S3 and DynamoDB service classes
    - `S3Service.ts`
    - `DynamoDBService.ts`
    - **__mocks__/**: Contains mocks for AWS SDK clients used in testing
      - `aws-sdk-client-s3.ts`
      - `aws-sdk-lib-dynamodb.ts`
  - **utils/**: Contains utility functions and logger configuration
    - `logger.ts`
  - `index.ts`: Main server file
- **__tests__/**: Unit tests for the services
  - `S3Service.test.ts`: Unit tests for the S3Service
  - `DynamoDBService.test.ts`: Unit tests for the DynamoDBService
- **package.json**: Project metadata and npm scripts
- **tsconfig.json**: TypeScript configuration
- **jest.config.js**: Jest configuration for testing
- **.env**: Environment variables (ignored by version control)
- **README.md**: Documentation file
- **logs/**: Directory for log files
  - `combined.log`: Logs all activity
  - `error.log`: Logs only error messages

## Logging

Logs are implemented using the `winston` library. Logs are saved to:
- `logs/combined.log` - for all logs.
- `logs/error.log` - for errors only.

## Dependencies

- **Express**: Web framework for Node.js.
- **AWS SDK v3**: To interact with AWS S3 and DynamoDB services.
- **TypeScript**: For type safety.
- **Winston**: Logging library.
- **Multer**: Middleware for handling file uploads.
- **Jest**: Testing framework.
- **aws-sdk-client-mock**: To mock AWS SDK clients for unit testing.

## Notes on Testing

- **Mocking AWS Services**: Tests use `aws-sdk-client-mock` to mock AWS SDK v3 clients.
- **Handling AWS Credentials in Tests**: The default region is set as `eu-central-1` in test files to ensure the S3Client is properly configured during testing.
- **Run Tests**: Make sure environment variables are set properly before running the tests to ensure the correct AWS configuration.

## Author
- Luka Koridze

