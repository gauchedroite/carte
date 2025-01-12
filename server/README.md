# Carte server
Serveur pour les cartes de Laura.

## Accès au serveur de cartes à partir d'un LAN
Une fois le serveur lancé avec `node server.js`, l'accès à l'application sur le poste de développement est trivial. Il suffit de lancer `http://localhost:9340`.

Par contre, pour un accès par un iPad sur le LAN, il faut configurer quelques morceaux:

1. Ouvrir un port sur le firewall, par exemple le port 4998.

2. Connecter ce port externe 4998 au port interne 9340 du serveur:

```
netsh interface portproxy add v4tov4 listenport=4998 listenaddress=0.0.0.0 connectport=9340 connectaddress=127.0.0.1
```

Le serveur (express) doit écouter toutes les interfaces (0.0.0.0) au lieu de localhost (la valeur par défaut). C'est une contrainte causée par mon utilisation de WSL pour le développement.

Une fois que tout ça est fait, il suffit de lancer `http://<adresse privée de mon laptop>:4998`.

Voici deux autres commandes `netsh` bonnes à connaître:
```
netsh interface portproxy show all
netsh interface portproxy delete v4tov4 listenport=4998 listenaddress=0.0.0.0
```

## Service
Pour que "node server.js" sous WSL se lance automatiquement après un re-démarrage de l'ordinateur:

1. Write a batch script to start WSL and run your node application. For example, save the following as `C:\scripts\start_carte_server.bat`:

```batch
@echo off
wsl -e bash -c "cd ~/carte/server && node server.js"
```

Replace `~/carte/server` with the actual Linux path to your application directory in WSL.

2. Set Up a Scheduled Task that runs `C:\scripts\start_carte_server.bat` "At Startup"

3. Profit

