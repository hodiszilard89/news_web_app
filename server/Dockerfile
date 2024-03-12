# Válassza le az Alpine Linux alapú képet
FROM openjdk:17
ADD target/hirportal-0.1.jar
ENTRYPOINT ["java", "-jar", "/hirportal-0.1.jar"]

## Állítsa be a munkakönyvtárat
#WORKDIR /app
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
