FROM node:12

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/client

# Copying source files and installing dependencies
COPY . .
RUN npm install

# Running the app
ENTRYPOINT npm run dev