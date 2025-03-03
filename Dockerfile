# ------------------------------
# STAGE 1: Frontend Build
# ------------------------------
    FROM node:18-alpine AS frontend-build

    # Create and change to the frontend working directory
    WORKDIR /ctxcloud/frontend
    
    # Copy package files and install dependencies
    COPY frontend/package.json frontend/package-lock.json ./
    RUN npm install
    
    # Copy the rest of the frontend code and build
    COPY frontend/ .
    RUN npm run build
    
    # ------------------------------
    # STAGE 2: Backend Build
    # ------------------------------
    FROM node:18-alpine AS backend-build
    
    # Create and change to the backend working directory
    WORKDIR /ctxcloud/backend
    
    # Copy package files and install dependencies
    COPY backend/package.json backend/package-lock.json ./
    RUN npm install
    
    # Copy the rest of the backend code
    COPY backend/ .
    
    # If your backend needs a build step (e.g. TypeScript), do it here:
    # RUN npm run build
    
    # ------------------------------
    # STAGE 3: Final Production Image
    # ------------------------------
    FROM node:18-alpine
    
    # Create /app as our final working directory
    WORKDIR /app
    
    # Copy backend artifacts from the backend-build stage
    COPY --from=backend-build /ctxcloud/backend ./backend
    
    # Copy the compiled frontend build artifacts into the backend's public folder
    COPY --from=frontend-build /ctxcloud/frontend/build ./backend/public
    
    # Expose the port the backend will run on
    EXPOSE 8080
    
    # Start the Node server
    CMD ["node", "backend/src/app.js"]