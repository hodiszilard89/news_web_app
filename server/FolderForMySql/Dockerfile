FROM ubuntu:latest

# Telepítés MySQL és egyéb szükséges csomagok
RUN apt-get update && apt-get install -y mysql-server && apt-get install -y netcat

# Adatok importálása
COPY fakenews.sql /fakenews.sql
COPY database_entrypoint.sh /opt/script.sh
#ENTRYPOINT /opt/script.sh
# MySQL indítása
CMD service mysql start && mysql -u < /fakenews.sql && tail -f /dev/null