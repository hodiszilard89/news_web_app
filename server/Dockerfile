# Válassza le az Alpine Linux alapú képet

FROM ubuntu:latest
RUN apt-get update && apt-get install -y openjdk-17-jre
COPY server_entrypoint.sh /opt/server_entrypoint.sh

#WORKDIR /
ADD target/hirportal-0.0.1.jar app.jar
ENTRYPOINT /opt/server_entrypoint.sh
CMD ["java", "-jar", "app.jar"]
#RUN apk-get add --no-cache netcat-openbsd;  apk add --no-cache net-tools;
#ENTRYPOINT ["java", "-jar", "/app.jar"]

## Állítsa be a munkakönyvtárat
#WORKDIR /appdocker

#
## Telepítse a szükséges csomagokat (OpenJDK, fontosabb eszközök)
##RUN apk add --no-cache openjdk11-jre
##
## Másolja be a JAR fájlt a konténerb
#COPY target/hirportal-0.1.jar /app/app.jar
#
### Szükség esetén másolja be a további erőforrásokat
##
## Exponálja a szükséges portokat
#EXPOSE 8080
##
## Indítsa el az alkalmazást
#CMD ["java", "-jar", "app.jar"]
