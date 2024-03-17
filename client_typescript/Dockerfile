# # Használj egy Node.js alapú image-et
# FROM node:14

# # Állítsd be a munkakönyvtárat a konténerben
# WORKDIR /usr/src/app

# # Másold be a szükséges fájlokat és telepítsd a függőségeket
# COPY package*.json ./
# RUN npm install
# COPY . .

# # Építsd meg az alkalmazást
# RUN npm run build

# # Indítsd el az alkalmazást
# CMD ["npm", "start"]

# Használj egy Node.js alapú image-et
FROM node:14-alpine

# Állítsd be a munkakönyvtárat a konténerben
WORKDIR /usr/src/app

# Másold be a szükséges fájlokat és telepítsd a függőségeket
COPY package*.json ./

# Építsd meg az alkalmazást
RUN npm run build

# Állítsd be a konténer futási parancsát
CMD ["npm", "start"]