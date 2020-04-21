FROM node:12

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/client

# Install dependencies
COPY package*.json ./
RUN npm install

# Copying source files
COPY . .

# Running the app
ENTRYPOINT npm run dev