#!/usr/bin/env python3
"""Generuje jednoduché SVG ilustrácie výhier do ../img/ (spusti: python3 tools/make-svgs.py)."""
import os
OUT = os.path.join(os.path.dirname(__file__), '..', 'img')

def wrap(c1, c2, body):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="400" height="400">
<defs><radialGradient id="bg" cx="50%" cy="40%" r="70%"><stop offset="0" stop-color="{c1}"/><stop offset="1" stop-color="{c2}"/></radialGradient></defs>
<rect width="200" height="200" fill="url(#bg)"/>
<g stroke-linejoin="round" stroke-linecap="round">{body}</g>
</svg>'''

S = {}
# Ty daj mne dačo – darček s otáznikom a ukazovák
S['ty-daj-mne'] = wrap('#ffd36b', '#ff7a2f', '''
<rect x="45" y="85" width="110" height="80" rx="8" fill="#e63946" stroke="#5a0d14" stroke-width="5"/>
<rect x="38" y="68" width="124" height="28" rx="6" fill="#ff4d5e" stroke="#5a0d14" stroke-width="5"/>
<rect x="91" y="68" width="18" height="97" fill="#ffd23f" stroke="#5a0d14" stroke-width="4"/>
<path d="M100 68 C80 40 55 50 70 66 Z M100 68 C120 40 145 50 130 66 Z" fill="#ffd23f" stroke="#5a0d14" stroke-width="5"/>
<text x="100" y="150" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="54" text-anchor="middle" fill="#fff" stroke="#5a0d14" stroke-width="3">?</text>
<path d="M150 40 l20 -14 M160 55 l26 -4 M140 28 l6 -20" stroke="#fff" stroke-width="6"/>''')
# Audi za 5 eur – auto so 4 krúžkami a cenovkou
S['audi-5-eur'] = wrap('#9be7ff', '#2363c9', '''
<path d="M22 130 L30 105 Q40 90 60 88 L78 70 Q85 64 98 64 L132 64 Q145 64 152 72 L168 90 Q182 94 182 110 L182 130 Z" fill="#d9dde3" stroke="#1b2333" stroke-width="5"/>
<path d="M84 74 L100 72 L100 90 L68 90 Z M108 72 L130 72 Q138 72 144 80 L152 90 L108 90 Z" fill="#7fc4ff" stroke="#1b2333" stroke-width="4"/>
<circle cx="58" cy="132" r="18" fill="#222" stroke="#000" stroke-width="4"/><circle cx="58" cy="132" r="7" fill="#aaa"/>
<circle cx="150" cy="132" r="18" fill="#222" stroke="#000" stroke-width="4"/><circle cx="150" cy="132" r="7" fill="#aaa"/>
<g fill="none" stroke="#1b2333" stroke-width="3"><circle cx="84" cy="112" r="7"/><circle cx="94" cy="112" r="7"/><circle cx="104" cy="112" r="7"/><circle cx="114" cy="112" r="7"/></g>
<g transform="rotate(-14 150 40)"><path d="M112 22 H180 V58 H112 L100 40 Z" fill="#ffe14d" stroke="#5a4400" stroke-width="4"/><circle cx="112" cy="40" r="4" fill="#5a4400"/>
<text x="146" y="50" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="26" text-anchor="middle" fill="#c1121f">5 €</text></g>''')
# Bryndzové halušky navždy
S['halusky'] = wrap('#fff3c4', '#d9a441', '''
<ellipse cx="100" cy="128" rx="80" ry="34" fill="#fff" stroke="#6b4a1a" stroke-width="5"/>
<ellipse cx="100" cy="122" rx="62" ry="22" fill="#f4f0e4"/>
<g fill="#fffdf4" stroke="#c9bf9f" stroke-width="2">
<ellipse cx="70" cy="118" rx="12" ry="7"/><ellipse cx="90" cy="110" rx="12" ry="7"/><ellipse cx="112" cy="112" rx="12" ry="7"/><ellipse cx="132" cy="120" rx="12" ry="7"/><ellipse cx="84" cy="126" rx="12" ry="7"/><ellipse cx="106" cy="126" rx="12" ry="7"/><ellipse cx="124" cy="104" rx="10" ry="6"/></g>
<g fill="#c0392b" stroke="#6b1d12" stroke-width="2"><rect x="76" y="100" width="10" height="9" rx="2"/><rect x="102" y="100" width="10" height="9" rx="2"/><rect x="118" y="114" width="10" height="9" rx="2"/><rect x="92" y="118" width="10" height="9" rx="2"/></g>
<g fill="#2e8b57"><circle cx="66" cy="110" r="3"/><circle cx="140" cy="112" r="3"/><circle cx="98" cy="96" r="3"/></g>
<path d="M76 70 q-8 -14 0 -26 M100 66 q-8 -14 0 -26 M124 70 q-8 -14 0 -26" stroke="#fff" stroke-width="5" fill="none" opacity=".8"/>
<text x="100" y="186" font-family="Arial Black,Arial,sans-serif" font-size="22" text-anchor="middle" fill="#6b4a1a">∞</text>''')
# Nič, ale s láskou – srdce
S['nic-s-laskou'] = wrap('#ffc2d9', '#d6336c', '''
<path d="M100 165 C30 115 25 70 55 55 C78 44 95 58 100 72 C105 58 122 44 145 55 C175 70 170 115 100 165 Z" fill="#ff2e63" stroke="#6d0022" stroke-width="6"/>
<path d="M60 75 q8 -12 22 -10" stroke="#fff" stroke-width="7" fill="none" opacity=".7"/>
<text x="100" y="118" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="30" text-anchor="middle" fill="#fff">0 €</text>''')
# Lístok na hokej
S['hokej'] = wrap('#c8f1ff', '#0b5ea8', '''
<g transform="rotate(-10 100 100)">
<path d="M30 65 H170 V88 a12 12 0 0 0 0 24 V135 H30 V112 a12 12 0 0 0 0 -24 Z" fill="#fff" stroke="#08355e" stroke-width="5"/>
<line x1="128" y1="68" x2="128" y2="132" stroke="#08355e" stroke-width="3" stroke-dasharray="6 5"/>
<text x="78" y="96" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="18" text-anchor="middle" fill="#c1121f">HOKEJ</text>
<text x="78" y="120" font-family="Arial,sans-serif" font-weight="700" font-size="13" text-anchor="middle" fill="#08355e">SVK : CZE</text>
<text x="149" y="105" font-family="Arial,sans-serif" font-weight="700" font-size="12" text-anchor="middle" fill="#08355e" transform="rotate(90 149 100)">VIP</text></g>
<path d="M40 170 L80 150 L150 150" stroke="#3b2a1a" stroke-width="9" fill="none"/>
<ellipse cx="160" cy="168" rx="16" ry="6" fill="#111"/>''')
# Starý Favorit bez STK
S['favorit'] = wrap('#e6ffd1', '#5f8f3a', '''
<path d="M25 132 V108 L45 104 L62 74 H132 L152 104 L178 108 V132 Z" fill="#e8d44d" stroke="#3a3000" stroke-width="5"/>
<path d="M70 82 H96 V102 H58 Z M104 82 H128 L142 102 H104 Z" fill="#a9d6ff" stroke="#3a3000" stroke-width="4"/>
<g fill="#a0522d" opacity=".85"><circle cx="48" cy="120" r="6"/><circle cx="60" cy="126" r="4"/><circle cx="150" cy="118" r="7"/><circle cx="120" cy="125" r="4"/></g>
<circle cx="58" cy="134" r="16" fill="#222" stroke="#000" stroke-width="4"/><circle cx="148" cy="134" r="16" fill="#222" stroke="#000" stroke-width="4"/>
<circle cx="58" cy="134" r="5" fill="#999"/><circle cx="148" cy="134" r="5" fill="#999"/>
<path d="M170 100 q12 -20 4 -36 q14 10 8 30" fill="#999" opacity=".6"/>
<g transform="rotate(12 150 45)"><circle cx="150" cy="45" r="26" fill="#fff" stroke="#c1121f" stroke-width="6"/>
<text x="150" y="51" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="15" text-anchor="middle" fill="#c1121f">STK</text>
<line x1="132" y1="27" x2="168" y2="63" stroke="#c1121f" stroke-width="6"/></g>''')
# Objatie od suseda
S['objatie'] = wrap('#ffe5b4', '#f08c00', '''
<circle cx="72" cy="70" r="24" fill="#ffd7a8" stroke="#5c3300" stroke-width="5"/>
<circle cx="128" cy="70" r="24" fill="#ffd7a8" stroke="#5c3300" stroke-width="5"/>
<path d="M58 34 q14 -10 28 0" stroke="#5c3300" stroke-width="8" fill="none"/>
<rect x="104" y="40" width="48" height="10" rx="5" fill="#2b2b2b"/>
<g fill="#5c3300"><circle cx="64" cy="68" r="3"/><circle cx="80" cy="68" r="3"/><circle cx="120" cy="68" r="3"/><circle cx="136" cy="68" r="3"/></g>
<path d="M64 80 q8 7 16 0 M120 80 q8 7 16 0" stroke="#5c3300" stroke-width="3" fill="none"/>
<path d="M118 82 h20" stroke="#5c3300" stroke-width="6"/>
<path d="M40 180 V120 Q40 98 72 98 Q100 98 100 120 V180 Z" fill="#3a86ff" stroke="#0b2b66" stroke-width="5"/>
<path d="M100 180 V120 Q100 98 128 98 Q160 98 160 120 V180 Z" fill="#8338ec" stroke="#2a0b5e" stroke-width="5"/>
<path d="M60 128 Q100 150 140 122 M140 130 Q100 156 62 124" stroke="#ffd7a8" stroke-width="12" fill="none"/>
<path d="M100 30 c-6 -8 -18 -2 -10 8 l10 10 l10 -10 c8 -10 -4 -16 -10 -8z" fill="#ff2e63"/>''')
# Slivovica od dedka
S['slivovica'] = wrap('#e9d8ff', '#5a2ca0', '''
<rect x="86" y="20" width="28" height="34" rx="4" fill="#cfd8dc" stroke="#263238" stroke-width="4"/>
<rect x="82" y="14" width="36" height="12" rx="3" fill="#8d6e63" stroke="#3e2723" stroke-width="4"/>
<path d="M86 54 Q60 70 60 100 V170 Q60 180 70 180 H130 Q140 180 140 170 V100 Q140 70 114 54 Z" fill="#e3f2fd" fill-opacity=".85" stroke="#263238" stroke-width="5"/>
<path d="M64 120 H136 V170 Q136 176 130 176 H70 Q64 176 64 170 Z" fill="#fff8e1" opacity=".9"/>
<rect x="72" y="104" width="56" height="40" rx="5" fill="#fff" stroke="#263238" stroke-width="3"/>
<text x="100" y="122" font-family="Arial Black,Arial,sans-serif" font-size="11" text-anchor="middle" fill="#5a2ca0">SLIVOVICA</text>
<text x="100" y="137" font-family="Arial,sans-serif" font-size="10" font-weight="700" text-anchor="middle" fill="#263238">od dedka 52%</text>
<ellipse cx="150" cy="150" rx="20" ry="22" fill="#5e2b97" stroke="#2a0b4d" stroke-width="4"/><path d="M150 128 q6 -12 16 -12" stroke="#3e2723" stroke-width="4" fill="none"/><path d="M158 118 q10 -6 16 2 q-10 6 -16 -2z" fill="#43a047"/>
<path d="M72 70 q-4 20 0 40" stroke="#fff" stroke-width="5" fill="none" opacity=".8"/>''')
# Kofola na celý život
S['kofola'] = wrap('#ffe0e0', '#b71c1c', '''
<path d="M55 50 H145 L132 178 H68 Z" fill="#fff" fill-opacity=".35" stroke="#3e0a0a" stroke-width="5"/>
<path d="M60 78 H140 L130 172 H70 Z" fill="#4a1c0c"/>
<rect x="58" y="70" width="84" height="12" rx="3" fill="#f5deb3"/>
<g fill="#fff" opacity=".75"><circle cx="85" cy="110" r="4"/><circle cx="110" cy="130" r="3"/><circle cx="95" cy="150" r="3"/><circle cx="120" cy="100" r="2.5"/></g>
<rect x="66" y="96" width="22" height="18" rx="3" fill="#bfe9ff" opacity=".8" transform="rotate(-12 77 105)"/>
<rect x="108" y="112" width="20" height="16" rx="3" fill="#bfe9ff" opacity=".8" transform="rotate(14 118 120)"/>
<path d="M118 20 L108 90" stroke="#e53935" stroke-width="8"/>
<path d="M118 20 L140 12" stroke="#e53935" stroke-width="8"/>
<text x="100" y="196" font-family="Arial Black,Arial,sans-serif" font-size="14" text-anchor="middle" fill="#fff">∞ LITROV</text>''')
# Víkend na chate v Tatrách
S['chata-tatry'] = wrap('#d3f0ff', '#4f8fd6', '''
<path d="M0 150 L50 70 L80 110 L120 40 L170 120 L200 90 V200 H0 Z" fill="#6b7f99" stroke="#2b3a4f" stroke-width="4"/>
<path d="M120 40 L106 63 L116 60 L124 70 L132 58 L138 64 Z M50 70 L40 86 L52 82 L60 90 Z" fill="#fff"/>
<path d="M0 160 Q100 140 200 160 V200 H0 Z" fill="#3c8d40"/>
<path d="M70 168 V132 L100 110 L130 132 V168 Z" fill="#8d5524" stroke="#3e2410" stroke-width="4"/>
<path d="M60 136 L100 104 L140 136" stroke="#5a2e0e" stroke-width="9" fill="none"/>
<rect x="92" y="144" width="16" height="24" fill="#3e2410"/><rect x="76" y="136" width="12" height="11" fill="#ffd54f"/><rect x="112" y="136" width="12" height="11" fill="#ffd54f"/>
<rect x="116" y="110" width="8" height="14" fill="#5a2e0e"/><path d="M120 106 q-6 -10 2 -18 q-6 -8 2 -14" stroke="#fff" stroke-width="4" fill="none" opacity=".8"/>
<circle cx="170" cy="36" r="16" fill="#ffeb3b"/>''')
# Vrece zemiakov od babky
S['zemiaky'] = wrap('#f1e3c6', '#8b6b3d', '''
<path d="M50 70 Q40 120 48 168 Q100 186 152 168 Q160 120 150 70 Q100 82 50 70 Z" fill="#c8a165" stroke="#4e3418" stroke-width="5"/>
<path d="M50 70 Q100 54 150 70 Q100 86 50 70 Z" fill="#a37a40" stroke="#4e3418" stroke-width="4"/>
<path d="M88 60 q12 -14 24 0" stroke="#4e3418" stroke-width="5" fill="none"/>
<g fill="#c89b5d" stroke="#5c3d1a" stroke-width="3"><ellipse cx="80" cy="62" rx="16" ry="12"/><ellipse cx="118" cy="58" rx="18" ry="12"/><ellipse cx="100" cy="50" rx="14" ry="10"/></g>
<g fill="#5c3d1a"><circle cx="76" cy="60" r="1.8"/><circle cx="122" cy="56" r="1.8"/><circle cx="102" cy="48" r="1.8"/></g>
<text x="100" y="128" font-family="Arial Black,Arial,sans-serif" font-size="18" text-anchor="middle" fill="#4e3418">25 kg</text>
<text x="100" y="150" font-family="Arial,sans-serif" font-weight="700" font-size="12" text-anchor="middle" fill="#4e3418">od babky ♥</text>''')
# Ponožky do sandálov
S['ponozky-sandale'] = wrap('#e0f7e9', '#2a9d8f', '''
<path d="M70 30 V110 Q70 130 50 140 Q30 150 40 168 Q50 182 80 172 L108 160 Q118 154 118 140 V30 Z" fill="#fff" stroke="#16423c" stroke-width="5"/>
<g stroke="#e63946" stroke-width="8"><line x1="72" y1="44" x2="116" y2="44"/><line x1="72" y1="60" x2="116" y2="60"/></g>
<path d="M30 168 Q60 186 116 166 L120 176 Q60 198 26 178 Z" fill="#8d5524" stroke="#3e2410" stroke-width="4"/>
<path d="M52 150 L60 172 M90 140 L98 166 M60 152 Q80 138 100 146" stroke="#3e2410" stroke-width="7" fill="none"/>
<text x="155" y="100" font-family="Arial Black,Arial,sans-serif" font-size="40" text-anchor="middle" fill="#16423c">+</text>
<text x="155" y="140" font-family="Arial Black,Arial,sans-serif" font-size="13" text-anchor="middle" fill="#16423c">MÓDA</text>
<text x="155" y="156" font-family="Arial Black,Arial,sans-serif" font-size="13" text-anchor="middle" fill="#16423c">2026</text>''')
# Kľúče od Lamborghini (od hračky)
S['lambo-hracka'] = wrap('#fff6a8', '#e0a800', '''
<rect x="40" y="120" width="120" height="34" rx="14" fill="#ff8f00" stroke="#4a2c00" stroke-width="5"/>
<path d="M58 120 L80 100 H120 L146 120 Z" fill="#ffb300" stroke="#4a2c00" stroke-width="5"/>
<circle cx="66" cy="156" r="12" fill="#222"/><circle cx="134" cy="156" r="12" fill="#222"/>
<circle cx="70" cy="58" r="22" fill="none" stroke="#9e9e9e" stroke-width="8"/>
<path d="M90 64 L150 80 L146 92 L138 88 L134 98 L126 94 L122 102 L86 76 Z" fill="#bdbdbd" stroke="#424242" stroke-width="4"/>
<text x="100" y="188" font-family="Arial Black,Arial,sans-serif" font-size="13" text-anchor="middle" fill="#4a2c00">1 : 64</text>''')
# Selfie s Jicom
S['selfie-jic'] = wrap('#d7f5ff', '#00a6c8', '''
<rect x="50" y="22" width="100" height="160" rx="16" fill="#263238" stroke="#0b1418" stroke-width="5"/>
<rect x="58" y="38" width="84" height="124" rx="6" fill="#80deea"/>
<circle cx="84" cy="96" r="16" fill="#ffd7a8" stroke="#5c3300" stroke-width="3"/><circle cx="118" cy="96" r="16" fill="#ffd7a8" stroke="#5c3300" stroke-width="3"/>
<path d="M76 102 q8 7 16 0 M110 102 q8 7 16 0" stroke="#5c3300" stroke-width="3" fill="none"/>
<g fill="#5c3300"><circle cx="78" cy="92" r="2.5"/><circle cx="90" cy="92" r="2.5"/><circle cx="112" cy="92" r="2.5"/><circle cx="124" cy="92" r="2.5"/></g>
<path d="M66 160 V130 Q66 116 84 116 Q100 116 100 130 V160 Z" fill="#e63946"/><path d="M100 160 V130 Q100 116 118 116 Q136 116 136 130 V160 Z" fill="#1d3557"/>
<path d="M128 62 l6 -14 l6 14 l14 6 l-14 6 l-6 14 l-6 -14 l-14 -6z" fill="#fff"/>
<circle cx="100" cy="30" r="3" fill="#90a4ae"/>''')
# Zlatá reťaz z Tesca
S['zlata-retaz'] = wrap('#fff1c1', '#b8860b', '''
<g fill="none" stroke="#ffd700" stroke-width="10">
<path d="M40 40 Q100 160 160 40"/></g>
<g fill="none" stroke="#8a6a00" stroke-width="3"><path d="M40 40 Q100 160 160 40" stroke-dasharray="10 8"/></g>
<circle cx="100" cy="118" r="28" fill="#ffd700" stroke="#8a6a00" stroke-width="5"/>
<text x="100" y="128" font-family="Arial Black,Arial,sans-serif" font-size="26" text-anchor="middle" fill="#8a6a00">$</text>
<g transform="rotate(-8 140 160)"><rect x="98" y="146" width="88" height="28" rx="4" fill="#fff" stroke="#333" stroke-width="3"/>
<text x="142" y="166" font-family="Arial,sans-serif" font-weight="700" font-size="13" text-anchor="middle" fill="#c1121f">AKCIA 2,99 €</text></g>
<path d="M60 30 l4 -10 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4z" fill="#fff"/>''')
# Bicykel bez sedla
S['bicykel'] = wrap('#ffe3f1', '#c2185b', '''
<g fill="none" stroke="#1a1a2e" stroke-width="7"><circle cx="55" cy="130" r="32"/><circle cx="145" cy="130" r="32"/></g>
<g fill="none" stroke="#e91e63" stroke-width="8"><path d="M55 130 L85 82 L130 82 L145 130 M85 82 L100 130 L55 130 M100 130 L130 82"/><path d="M130 82 L124 62 H142"/><path d="M85 82 L80 66"/></g>
<text x="80" y="54" font-family="Arial Black,Arial,sans-serif" font-size="28" text-anchor="middle" fill="#1a1a2e">?</text>
<circle cx="100" cy="130" r="7" fill="#1a1a2e"/>''')
# Pivo na účet Jica (krígeľ)
S['pivo-jic'] = wrap('#fff4c2', '#e09f00', '''
<path d="M140 76 Q176 76 176 112 Q176 146 140 146" fill="none" stroke="#795548" stroke-width="12"/>
<rect x="44" y="60" width="100" height="120" rx="12" fill="#ffb300" stroke="#5d3a00" stroke-width="6"/>
<g fill="#fff3d0" opacity=".7"><rect x="58" y="78" width="10" height="90" rx="5"/><rect x="118" y="78" width="10" height="90" rx="5"/></g>
<path d="M38 64 Q40 36 64 42 Q72 22 96 32 Q116 18 132 38 Q154 36 150 64 Z" fill="#fff" stroke="#c9b48a" stroke-width="4"/>
<g fill="#fff"><circle cx="90" cy="110" r="4"/><circle cx="100" cy="140" r="3"/><circle cx="84" cy="150" r="3"/></g>
<text x="94" y="198" font-family="Arial Black,Arial,sans-serif" font-size="13" text-anchor="middle" fill="#5d3a00">PLATÍ JIC</text>''')
# Výlet do Bardejova / Kúpele
S['umyvanie-auta'] = wrap('#d6f0ff', '#1e88e5', '''
<path d="M30 140 L40 112 Q48 100 64 98 L80 80 H128 L146 98 Q170 100 172 120 V140 Z" fill="#ef476f" stroke="#4a0d1e" stroke-width="5"/>
<path d="M86 88 H102 V100 H74 Z M110 88 H126 L136 100 H110 Z" fill="#bde0fe" stroke="#4a0d1e" stroke-width="3"/>
<circle cx="64" cy="142" r="14" fill="#222"/><circle cx="144" cy="142" r="14" fill="#222"/>
<g fill="#fff" stroke="#90caf9" stroke-width="2"><circle cx="60" cy="70" r="14"/><circle cx="84" cy="56" r="10"/><circle cx="150" cy="70" r="12"/><circle cx="128" cy="52" r="8"/><circle cx="104" cy="46" r="6"/></g>
<rect x="150" y="150" width="30" height="34" rx="4" fill="#ffd166" stroke="#7a5800" stroke-width="3"/><path d="M158 150 V140 H172 V150" stroke="#7a5800" stroke-width="3" fill="none"/>
<text x="70" y="186" font-family="Arial Black,Arial,sans-serif" font-size="14" text-anchor="middle" fill="#0d3b66">RUČNE</text>''')

for name, svg in S.items():
    with open(os.path.join(OUT, name + '.svg'), 'w') as f:
        f.write(svg)
print(len(S), 'SVG')
