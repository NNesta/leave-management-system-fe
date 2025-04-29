# Running the Leave Management System

This guide will walk you through the steps to run the Leave Management System, which consists of both a frontend and a backend service. Both services are hosted on Docker Hub.

## Prerequisites

- **Docker**: Ensure you have Docker installed on your machine. You can download it from [Docker's official website](https://www.docker.com/products/docker-desktop).
- **Docker Compose**: Make sure Docker Compose is also installed, as it will help in managing multi-container Docker applications.

## Steps to Run the Application

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
# Replace <YOUR_GIT_URL> with the actual Git URL of your project
git clone <YOUR_GIT_URL>
cd leave-management-system-fe
```

### 2. Pull Docker Images

Pull the latest Docker images for both the frontend and backend from Docker Hub:

```bash
# Pull the backend image
docker pull <DOCKER_HUB_BACKEND_IMAGE>

# Pull the frontend image
docker pull <DOCKER_HUB_FRONTEND_IMAGE>
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory of your project and configure it with necessary environment variables. Example:

```
# .env file
REACT_APP_API_URL=http://backend:8080/api
```

### 4. Start the Backend

Run the backend service using Docker:

```bash
docker run -d --name backend -p 8080:8080 <DOCKER_HUB_BACKEND_IMAGE>
```

### 5. Start the Frontend

Run the frontend service using Docker:

```bash
docker run -d --name frontend -p 4000:4000 --env-file .env --link backend <DOCKER_HUB_FRONTEND_IMAGE>
```

### 6. Access the Application

Open your web browser and navigate to `http://localhost:4000` to access the Leave Management System.

### 7. Set Up Microsoft Account

To use the authentication features of the Leave Management System, you need to set up a Microsoft account:

1. **Register an Application in Azure AD:**

   - Go to the [Azure Portal](https://portal.azure.com/).
   - Navigate to "Azure Active Directory" > "App registrations" > "New registration".
   - Enter a name for your application and set the redirect URI to `http://localhost:4000`.
   - Note the Application (client) ID and Directory (tenant) ID for later use.

2. **Configure API Permissions:**

   - In the app registration page, go to "API permissions".
   - Click on "Add a permission" and select Microsoft Graph.
   - Choose the permissions your application needs, such as `User.Read`.
   - Grant admin consent for the selected permissions.

3. **Add Client Secret:**

   - Go to "Certificates & secrets" and create a new client secret.
   - Note the secret value for later use.

4. **Update Environment Variables:**

   - Update your `.env` file with the following variables:

   ```
   REACT_APP_AZURE_CLIENT_ID=<Your_Application_Client_ID>
   REACT_APP_AZURE_TENANT_ID=<Your_Directory_Tenant_ID>
   REACT_APP_AZURE_CLIENT_SECRET=<Your_Client_Secret>
   ```

Following these steps will ensure that your Microsoft account is properly configured for authentication with the Leave Management System.

## Task Description

_(Provide a detailed description of the task here)_

## Images

_(Include images or diagrams relevant to the setup or tasks here)_

## Additional Notes

- Ensure that ports 8080 and 3000 are not in use by other applications on your machine.
- If you encount er any issues, check the Docker logs for more information using `docker logs <CONTAINER_ID>`.

Following these steps will set up and run the Leave Management System on your local machine. If you need further assistance, please refer to the project's documentation or reach out to the support team.
