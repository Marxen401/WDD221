SINGERVERSE OPERATIVE MEMORY — IMAGE GUIDE
==========================================

Drop your images into the /images/ folder.
Name each file EXACTLY as listed below.
That's all — the game handles the rest.

If a file is missing, the card shows its
symbol emoji as a fallback automatically.


REQUIRED IMAGE FILENAMES
-------------------------
star-singer.png       → Star Singer (Matt Marxen)
scarlet-sentry.png    → Scarlet Sentry (Nishihara Norio)
quiverkill.png        → Quiverkill (Archer Bowman)
morningstar.png       → Morningstar (Mia Maria)
scarlet-shade.png     → Scarlet Shade (Renji Renshin)
invis.png             → Invis
ruby-fist.png         → Ruby Fist
american-speed.png    → American Speed
bartender.png         → Bartender
detective-skull.png   → Detective Skull
scarlet-kllr.png      → Scarlet Kllr (Renji Renshin)
flannel-man.png       → Flannel Man
phantom.png           → Phantom
cipher.png            → Cipher
aria-zero.png         → Aria Zero


ADDING A NEW CHARACTER
-----------------------
1. Open js/script.js
2. Find CARD_POOL near the top
3. Copy any existing block and paste it
   before the closing ]; of the array
4. Fill in the fields:
     name, alias, role, color, symbol, power, img
5. Drop the image into /images/
6. Done — bump PAIRS_TO_PLAY if you want it
   included in every game


CHANGING HOW MANY CARDS APPEAR
--------------------------------
Open js/script.js, find this line near the top:

    const PAIRS_TO_PLAY = 6;

Change 6 to any number from 2 to 15.
Each game randomly pulls that many pairs
from the full pool, so the lineup varies.


FOLDER STRUCTURE
-----------------
index.html
css/
  style.css
js/
  script.js
images/
  star-singer.png
  scarlet-sentry.png
  ... (all files listed above)
