# Daj mi dačo 🎰

Výherný automat pre **Stenlyho**. Stlačíš **ZATOČ!** (alebo potiahneš páku), valec sa roztočí, pekne spomalí a zastaví na náhodnej výhre. Potom príde otázka **„Stenly, dám ti dačo?"** – lenže tlačidlo **Áno** uteká. Po 2–3 pokusoch sa umúdri („No dobre, dobre…") a dá sa kliknúť. **Nie** sa neberie – automat sa naštve a točí znova.

Živá verzia: https://jicarosni.github.io/dajmidaco/

## Čo to vie
- jeden veľký valec s 3 viditeľnými políčkami, výherná čiara v strede, realistické spomalenie s malým prekmitom a rozmazaním pri rýchlosti
- konfety, pri „diamantových" výhrach (Osiris D3, rekes Pilsnera) jackpot dážď
- zvuky cez WebAudio (bez súborov), tlačidlo 🔊/🔇 si pamätá nastavenie
- utekajúce **Áno**: na počítači uskočí, keď sa k nemu priblíži myš; na mobile uskočí pri dotyku (touchstart), takže sa nedá „trafiť"; aj klávesnica (Enter) ho najprv odpáli
- **Dr. Dre moment**: keď padnú topánky Osiris D3, pustí sa vlastný G-funk beat (WebAudio, 92 BPM, ~10 s slučka), ukáže sa fotka Stenlyho a na oči mu zletia pixelové „deal with it" okuliare; potom tlačidlo **Pokračovať** (alebo samo po ~7 s). Beat hrá, kým sa dialóg nezavrie. Test: `?force=osiris` – najbližšie točenie padne na Osiris
- história posledných 10 točení (v `localStorage`) s tým, či Stenly prijal ✅ alebo odmietol ❌
- responzívne (mobil aj desktop), favicon, `prefers-reduced-motion`

## Výhry
Ty daj mne dačo · Audi za 5 eur · Topánky Osiris D3 💎 · Rekes piva Pilsner Urquell 💎 · Bryndzové halušky navždy · Nič, ale s láskou · Lístok na hokej · Starý Favorit bez STK · Objatie od Ľuboša · Fľaša slivovice · Kofola na celý život · Víkend u Maroša doma · Vrece zemiakov · Ponožky do sandálov · Kľúče od Lamborghini · Selfie s Marošom · Zlatá reťaz · Bicykel od Ľuboša · Pivo na účet Ľuboša · Martin ti umyje riad · Umytie auta

Pridať / zmeniť výhru: uprav `js/prizes.js` (názov, vtipný podtitul, obrázok v `img/`).

## Štruktúra
```
index.html        stránka
css/style.css     neónový kasínový vzhľad
js/prizes.js      zoznam výhier
js/app.js         valec, dialóg, utekajúce Áno, história
js/sound.js       zvuky (WebAudio)
js/confetti.js    konfety (canvas)
img/              obrázky výhier
tools/make-svgs.py  generátor SVG ilustrácií (python3 tools/make-svgs.py)
```
Je to čisté HTML/CSS/JS bez buildu, všetky cesty sú relatívne – funguje na GitHub Pages aj pod podadresárom. Lokálne: `python3 -m http.server` a otvor `http://localhost:8000/`.

## Zdroje obrázkov
- **Topánky Osiris D3** – „Osiris D3 2001.JPG", autor Tking61, Wikimedia Commons, licencia CC0 1.0 (public domain): https://commons.wikimedia.org/wiki/File:Osiris_D3_2001.JPG (orezané a zmenšené na 600×600)
- **Rekes Pilsner Urquell** – „PilsnerUrquell-20101030-02.jpeg", autor Speifensender, Wikimedia Commons, public domain: https://commons.wikimedia.org/wiki/File:PilsnerUrquell-20101030-02.jpeg (orezané a zmenšené na 600×600)
- Ostatné ilustrácie (SVG) a favicon sú vlastné, vygenerované skriptom `tools/make-svgs.py`.

Značky Osiris, Pilsner Urquell, Audi, Lamborghini, Kofola, Tesco a Favorit (Škoda) patria ich vlastníkom; tu sú len pre srandu, žiadna skutočná výhra sa neposiela. 😉
