# Marche à suivre

Voici les démarches obligatoires à entreprendre :

1. Vous abonner aux notifications 🔔 avec l'option **Watch/Surveiller** du dépôt original (celui-ci), pour ne pas manquer des éventuels changements dans l'énoncé ou des annonces sur le projet.
2. Créez un.e **Fork/Divergence** de ce dépôt dans votre namespace. Cette action va créer une copie du projet sur lequel vous êtes propriétaire et avez les droits admin. Passez le dépôt copié en **privé** (Settings/Paramètres -> General/Général -> Visibility/Visibilité). Seuls les membres de votre équipe pourront accéder au projet.
3. Ajoutez **les droits de Maintainer/Mainteneur** à l'autre membre de votre équipe (Settings/Paramètres -> Members/Membres).
4. Ajoutez Michael Minelli (@michael.minelli), Stephane Malandain (@stephane.malandai) et Jeremy Gobet (@jeremy.gobet) en tant que **Reporter** de votre dépôt.
5. **Clonez votre dépôt privé** en local sur votre machine (la configuration locale va automatiquement définir votre dépôt comme remote par défaut nommé `origin`)
6. Ajoutez le dépot de base (le projet exemple) comme deuxième remote (différent de `origin`, nommé `base`)
`git remote add base ssh://git@ssh.hesge.ch:10572/jeremy.gobet/app-et-archi-web-tp-2020.git`).
7. Vérifiez que les deux dépôts sont enregistrés dans la configuration locale:
`git remote -v`

**En cas de non-respect de ces consignes, des pénalités seront encourues !**

Pensez bien à effectuez des commits réguliers de votre projet.


## Si vous avez déjà un projet existant

Au lieu de cloner le projet, vous pouvez initialiser le projet git en local et pousser votre projet sur le dépôt copié:

```
cd chemin/vers/mon/projet
git init
git remote add origin ssh://git@ssh.hesge.ch:00000/chemin-vers-votre-dépôt-privé.git
git add .
git commit -m "First commit"
git pull origin master
git push -u origin master
```
