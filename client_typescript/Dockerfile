

# # Használj egy Node.js alapú image-et
# FROM node:14-alpine

# # Állítsd be a munkakönyvtárat a konténerben
# WORKDIR /usr/src/app

# # Másold be a szükséges fájlokat és telepítsd a függőségeket

# COPY package*.json ./

# COPY . .

# # Építsd meg az alkalmazást
# RUN npm install

# # Állítsd be a konténer futási parancsát
# CMD ["npm", "start"]
# Használjuk az Alpine Linux alapú hivatkozást
FROM alpine:latest

ENV SERVER_HOST=localhost
#ENV MY_VARIABLE=$SERVER_HOST

# Installáljuk az egyszerű webszervert, pl. a 'nginx' alkalmazást
RUN apk update && apk add --no-cache nginx

# Másoljuk át az HTML fájlt a helyes helyre az Nginx szerver számára
COPY ./build/ /usr/share/nginx/html/
# COPY ./cliententrypoint.sh /opt/client-entrypoint.sh
# ENTRYPOINT /opt/cliententrypoint.sh

RUN cat > /etc/nginx/http.d/default.conf <<EOF
server {    

            listen 3000;    
            server_name example.com;
            root /usr/share/nginx/html;

            index index.html;

        }
EOF

            # location /api {
            #     proxy_pass "http://172.18.0.3:8080";
            #     }
# Engedélyezzük a 80-as porton a hozzáférést
EXPOSE 3000

# Indítsuk el az Nginx szervert, amikor a konténer fut

CMD ["nginx", "-g", "daemon off;"]