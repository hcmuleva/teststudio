# Stage 1: Build the Node.js application
FROM node as build

WORKDIR /build
ENV PATH /build/node_modules/.bin:$PATH

COPY package.json ./

# Install npm globally and then install dependencies
RUN npm install -g npm@latest
RUN npm install --force

COPY . .

# Run the build command
RUN npm run build

# Stage 2: Create the final image using Nginx
FROM nginx

# Copy the built artifacts from the previous build stage
COPY --from=build /build/build /usr/share/nginx/html

# Copy the nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Set permissions and expose port
RUN chmod 755 -R /usr/share/nginx/html
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
