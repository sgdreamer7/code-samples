FROM node:10-alpine

# Create doc directory
WORKDIR /usr/src/doc

# Install dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD ["node_modules/.bin/redoc-cli", "serve", "/usr/src/doc/doc.yaml"]
