# Use latest node
FROM node:boron

MAINTAINER pasleto <tomas.pasler@gmail.com>

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Set the node env (we only need production dependencies in the deployed image)
ENV NODE_ENV production

# Install dependencies (we deliberately just copy packages.json so we can use the cache if no package.json changes are made)
COPY package.json /usr/src/app/
RUN npm install

# Copy the sources
COPY . /usr/src/app

# Set default env
ENV DATABASE_URL=
ENV DATABASE_USER=
ENV DATABASE_PASSWORD=
ENV DATABASE_NAME=
ENV PORT=3001

EXPOSE ${PORT}

# Start the REST interface!
CMD [ "npm", "start" ]