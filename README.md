# Petit recap du projet :

resources/examples et resources/talisman sont juste des examples et ne sont pas utilisées pour le projet donc pourront etre virés a terme.

# Tour d'horizon des fichiers :

* eons-plugin : c'est le tool pour setup le plugin, j'ai mis des valeurs qui me paraissent pertinente mais on verra plus tard pour l'utiliser
* resources/
  * cards/
    * character.js : carte pour les persos
    * item.js : carte pour les items
    * action.js : carte pour les actions
  * fonts/* : les fonts en elle-meme, elles sont registered dans resources/objects.js line 20
  * img/* : J'ai mis la en vrac toutes les images, on peut reorganiser ca au besoin
  * text/ : Toutes les strings localisables
    * common.properties : pour l'interface
    * game.properties : pour le game (ce qui s'Affiche sur la carte quand elle est rendue)
  * nvsr.js : Devrait nous permettre d'enregistrer un nouveau jeu, c'est le script d'install du plugin, a utiliser plus tard ua besoin
  * objects.js : lib qui definit l'object NVsR utilisé par resources/cards/character.js avec plein de fonctions interessantes
  * settings.settings : En gros des key value de config genre images et coordonnées (certainement mal nommé)
  * test-lib.js : Utilisé quand on fait un Run sur resources/cards/character.js
	