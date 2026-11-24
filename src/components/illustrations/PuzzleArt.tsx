import React from 'react';
import {PuzzleImageId} from '../../types/puzzle';

interface PuzzleArtProps {
  imageId: PuzzleImageId;
}

const OUTLINE = '#2D2424';

export const PuzzleArt: React.FC<PuzzleArtProps> = ({imageId}) => {
  switch (imageId) {
    case 'kucing':
      return (
        <g>
          {/* Sky & Meadow */}
          <rect width="300" height="300" fill="#BAE6FD" />
          <circle cx="52" cy="52" r="28" fill="#FDE047" stroke={OUTLINE} strokeWidth="5" />
          {/* Clouds */}
          <path
            d="M195 62 C195 48, 212 40, 224 48 C234 36, 256 40, 260 56 C272 58, 276 74, 262 78 L200 78 C188 78, 185 64, 195 62 Z"
            fill="#FFFFFF"
            stroke={OUTLINE}
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {/* Rolling green hill */}
          <path d="M0 220 Q150 185 300 220 L300 300 L0 300 Z" fill="#4ADE80" stroke={OUTLINE} strokeWidth="5" />
          {/* Little flowers */}
          <circle cx="42" cy="252" r="10" fill="#FB7185" stroke={OUTLINE} strokeWidth="3.5" />
          <circle cx="42" cy="252" r="4" fill="#FDE047" />
          <circle cx="258" cy="260" r="10" fill="#FBBF24" stroke={OUTLINE} strokeWidth="3.5" />
          <circle cx="258" cy="260" r="4" fill="#FFFFFF" />

          {/* Cat tail */}
          <path
            d="M198 232 C245 232, 258 188, 240 165 C228 150, 214 166, 222 182 C230 198, 216 212, 194 214"
            fill="#FB923C"
            stroke={OUTLINE}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Cat body */}
          <ellipse cx="150" cy="210" rx="58" ry="52" fill="#FB923C" stroke={OUTLINE} strokeWidth="6" />
          <ellipse cx="150" cy="218" rx="34" ry="34" fill="#FFEDD5" stroke={OUTLINE} strokeWidth="4" />
          {/* Front paws */}
          <ellipse cx="122" cy="255" rx="18" ry="13" fill="#FDBA74" stroke={OUTLINE} strokeWidth="5" />
          <ellipse cx="178" cy="255" rx="18" ry="13" fill="#FDBA74" stroke={OUTLINE} strokeWidth="5" />

          {/* Cat ears */}
          <path d="M88 122 L80 62 L130 92 Z" fill="#FB923C" stroke={OUTLINE} strokeWidth="6" strokeLinejoin="round" />
          <path d="M96 112 L92 78 L120 96 Z" fill="#FDA4AF" />
          <path d="M212 122 L220 62 L170 92 Z" fill="#FB923C" stroke={OUTLINE} strokeWidth="6" strokeLinejoin="round" />
          <path d="M204 112 L208 78 L180 96 Z" fill="#FDA4AF" />

          {/* Cat head */}
          <ellipse cx="150" cy="132" rx="64" ry="54" fill="#FB923C" stroke={OUTLINE} strokeWidth="6" />
          {/* Forehead stripes */}
          <path d="M150 82 V98 M134 85 L138 100 M166 85 L162 100" stroke="#C2410C" strokeWidth="6" strokeLinecap="round" />
          {/* Cheeks */}
          <ellipse cx="106" cy="144" rx="11" ry="7" fill="#FDA4AF" />
          <ellipse cx="194" cy="144" rx="11" ry="7" fill="#FDA4AF" />
          {/* Eyes */}
          <circle cx="124" cy="126" r="11" fill={OUTLINE} />
          <circle cx="121" cy="122" r="4" fill="#FFFFFF" />
          <circle cx="176" cy="126" r="11" fill={OUTLINE} />
          <circle cx="173" cy="122" r="4" fill="#FFFFFF" />
          {/* Cute nose & smile */}
          <polygon points="142,138 158,138 150,148" fill="#F43F5E" stroke={OUTLINE} strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M150 148 Q140 160 130 153 M150 148 Q160 160 170 153" fill="none" stroke={OUTLINE} strokeWidth="4.5" strokeLinecap="round" />
          {/* Whiskers */}
          <path d="M72 132 L102 136 M70 148 L102 146 M228 132 L198 136 M230 148 L198 146" stroke={OUTLINE} strokeWidth="4" strokeLinecap="round" />
          {/* Collar bell */}
          <path d="M108 175 Q150 192 192 175" fill="none" stroke="#EF4444" strokeWidth="10" strokeLinecap="round" />
          <circle cx="150" cy="186" r="10" fill="#FACC15" stroke={OUTLINE} strokeWidth="4" />
        </g>
      );

    case 'gajah':
      // 360 x 240
      return (
        <g>
          <rect width="360" height="240" fill="#FEF3C7" />
          {/* Sunny sky band */}
          <rect width="360" height="175" fill="#E0F2FE" />
          <circle cx="50" cy="44" r="24" fill="#FACC15" stroke={OUTLINE} strokeWidth="4.5" />
          {/* Clouds */}
          <ellipse cx="300" cy="48" rx="34" ry="18" fill="#FFFFFF" stroke={OUTLINE} strokeWidth="4" />
          <circle cx="288" cy="38" r="14" fill="#FFFFFF" stroke={OUTLINE} strokeWidth="4" />
          <circle cx="308" cy="42" r="13" fill="#FFFFFF" />
          {/* Grass */}
          <path d="M0 175 Q180 155 360 175 L360 240 L0 240 Z" fill="#4ADE80" stroke={OUTLINE} strokeWidth="5" />
          <circle cx="44" cy="210" r="8" fill="#F43F5E" stroke={OUTLINE} strokeWidth="3" />
          <circle cx="320" cy="212" r="9" fill="#FBBF24" stroke={OUTLINE} strokeWidth="3" />

          {/* Water spray drops */}
          <path d="M276 74 C282 54, 296 54, 292 74 C290 82, 274 82, 276 74 Z" fill="#38BDF8" stroke={OUTLINE} strokeWidth="3.5" />
          <path d="M304 92 C314 78, 326 84, 316 98 C310 104, 300 98, 304 92 Z" fill="#38BDF8" stroke={OUTLINE} strokeWidth="3.5" />
          <circle cx="256" cy="60" r="7" fill="#38BDF8" stroke={OUTLINE} strokeWidth="3" />

          {/* Tail */}
          <path d="M98 145 Q72 142 74 166" fill="none" stroke="#64748B" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="74" cy="170" rx="7" ry="10" fill="#475569" stroke={OUTLINE} strokeWidth="3.5" />

          {/* Back & Front Legs */}
          <rect x="108" y="158" width="32" height="50" rx="12" fill="#94A3B8" stroke={OUTLINE} strokeWidth="5" />
          <rect x="168" y="158" width="32" height="50" rx="12" fill="#94A3B8" stroke={OUTLINE} strokeWidth="5" />

          {/* Body */}
          <ellipse cx="154" cy="140" rx="64" ry="48" fill="#94A3B8" stroke={OUTLINE} strokeWidth="5.5" />

          {/* Big Elephant Ear */}
          <ellipse cx="174" cy="108" rx="34" ry="42" fill="#CBD5E1" stroke={OUTLINE} strokeWidth="5.5" />
          <ellipse cx="174" cy="112" rx="20" ry="26" fill="#FDA4AF" stroke={OUTLINE} strokeWidth="3.5" />

          {/* Elephant Head & Trunk */}
          <circle cx="222" cy="104" r="42" fill="#94A3B8" stroke={OUTLINE} strokeWidth="5.5" />
          <path
            d="M250 106 C282 106, 286 144, 266 150 C252 154, 246 138, 256 134 C264 130, 262 118, 244 122"
            fill="#94A3B8"
            stroke={OUTLINE}
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Cute tusk */}
          <path d="M244 124 Q256 132 250 140 Q240 136 238 128 Z" fill="#FFFBEB" stroke={OUTLINE} strokeWidth="3.5" />

          {/* Eye & Cheek */}
          <circle cx="232" cy="94" r="8" fill={OUTLINE} />
          <circle cx="230" cy="91" r="3" fill="#FFFFFF" />
          <ellipse cx="222" cy="112" rx="9" ry="6" fill="#FDA4AF" />
          {/* Smile */}
          <path d="M226 118 Q236 125 244 118" fill="none" stroke={OUTLINE} strokeWidth="4" strokeLinecap="round" />
        </g>
      );

    case 'ikan':
      // 300 x 300
      return (
        <g>
          {/* Ocean gradient bands */}
          <rect width="300" height="300" fill="#38BDF8" />
          <path d="M0 44 Q75 28 150 44 T300 44 L300 0 L0 0 Z" fill="#BAE6FD" stroke={OUTLINE} strokeWidth="4" />
          {/* Seaweed & Sandy seabed */}
          <path d="M0 245 Q150 230 300 245 L300 300 L0 300 Z" fill="#FDE68A" stroke={OUTLINE} strokeWidth="5" />
          <path d="M36 254 Q22 210 42 178 Q56 210 46 254 Z" fill="#22C55E" stroke={OUTLINE} strokeWidth="4.5" strokeLinejoin="round" />
          <path d="M256 252 Q242 204 264 170 Q278 206 268 252 Z" fill="#10B981" stroke={OUTLINE} strokeWidth="4.5" strokeLinejoin="round" />
          {/* Starfish on sand */}
          <polygon
            points="65,264 71,276 84,277 74,286 77,298 65,292 53,298 56,286 46,277 59,276"
            fill="#FB7185"
            stroke={OUTLINE}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Bubbles */}
          <circle cx="234" cy="94" r="14" fill="#E0F2FE" stroke={OUTLINE} strokeWidth="4" />
          <circle cx="229" cy="89" r="4" fill="#FFFFFF" />
          <circle cx="258" cy="64" r="9" fill="#E0F2FE" stroke={OUTLINE} strokeWidth="3.5" />
          <circle cx="218" cy="56" r="7" fill="#E0F2FE" stroke={OUTLINE} strokeWidth="3" />

          {/* Tail fin */}
          <path d="M88 152 L36 106 C28 136, 28 168, 36 198 Z" fill="#FACC15" stroke={OUTLINE} strokeWidth="6" strokeLinejoin="round" />
          {/* Top & Bottom fins */}
          <path d="M126 102 Q155 56 186 98 Z" fill="#FACC15" stroke={OUTLINE} strokeWidth="5.5" strokeLinejoin="round" />
          <path d="M132 198 Q154 232 176 202 Z" fill="#FACC15" stroke={OUTLINE} strokeWidth="5.5" strokeLinejoin="round" />

          {/* Fish body */}
          <ellipse cx="164" cy="150" rx="84" ry="58" fill="#FB923C" stroke={OUTLINE} strokeWidth="6" />
          {/* Clownfish stripes */}
          <path
            d="M142 94 Q156 150 142 206 L164 208 Q178 150 164 92 Z"
            fill="#FFFFFF"
            stroke={OUTLINE}
            strokeWidth="5"
          />
          <path
            d="M106 108 Q118 150 106 192 L122 198 Q134 150 122 102 Z"
            fill="#FFFFFF"
            stroke={OUTLINE}
            strokeWidth="5"
          />
          {/* Side pectoral fin */}
          <path d="M158 154 Q132 148 134 174 Q158 176 164 162 Z" fill="#FDE047" stroke={OUTLINE} strokeWidth="4.5" strokeLinejoin="round" />

          {/* Eye, Cheek & Smile */}
          <circle cx="208" cy="134" r="14" fill="#FFFFFF" stroke={OUTLINE} strokeWidth="4.5" />
          <circle cx="211" cy="134" r="7" fill={OUTLINE} />
          <circle cx="209" cy="131" r="2.5" fill="#FFFFFF" />
          <ellipse cx="204" cy="158" rx="10" ry="6" fill="#FDA4AF" />
          <path d="M214 168 Q228 174 236 162" fill="none" stroke={OUTLINE} strokeWidth="5" strokeLinecap="round" />
        </g>
      );

    case 'apel':
      // 300 x 300
      return (
        <g>
          {/* Cheerful pastel sky & polka garden */}
          <rect width="300" height="300" fill="#FEF9C3" />
          <circle cx="48" cy="52" r="22" fill="#FDE047" stroke={OUTLINE} strokeWidth="4.5" />
          <circle cx="254" cy="56" r="14" fill="#FCA5A5" stroke={OUTLINE} strokeWidth="4" />
          <path d="M0 232 Q150 205 300 232 L300 300 L0 300 Z" fill="#86EFAC" stroke={OUTLINE} strokeWidth="5" />
          <circle cx="52" cy="264" r="10" fill="#FFFFFF" stroke={OUTLINE} strokeWidth="3.5" />
          <circle cx="52" cy="264" r="4" fill="#FACC15" />
          <circle cx="250" cy="262" r="10" fill="#F472B6" stroke={OUTLINE} strokeWidth="3.5" />

          {/* Stem */}
          <path d="M150 92 Q146 56 162 42" fill="none" stroke="#78350F" strokeWidth="12" strokeLinecap="round" />
          {/* Leaf */}
          <path
            d="M154 74 C174 42, 222 46, 214 80 C206 102, 166 92, 154 74 Z"
            fill="#22C55E"
            stroke={OUTLINE}
            strokeWidth="5.5"
            strokeLinejoin="round"
          />
          <path d="M162 74 Q186 72 204 64" fill="none" stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />

          {/* Big glossy red apple */}
          <path
            d="M150 100 C115 80, 62 98, 62 156 C62 214, 102 256, 134 254 C144 254, 148 248, 150 248 C152 248, 156 254, 166 254 C198 256, 238 214, 238 156 C238 98, 185 80, 150 100 Z"
            fill="#EF4444"
            stroke={OUTLINE}
            strokeWidth="6.5"
            strokeLinejoin="round"
          />
          {/* Shine highlight */}
          <path d="M88 134 Q96 114 114 112" fill="none" stroke="#FCA5A5" strokeWidth="10" strokeLinecap="round" />
          <circle cx="84" cy="152" r="5" fill="#FCA5A5" />

          {/* Cute face */}
          <circle cx="122" cy="164" r="11" fill={OUTLINE} />
          <circle cx="119" cy="160" r="4" fill="#FFFFFF" />
          <circle cx="178" cy="164" r="11" fill={OUTLINE} />
          <circle cx="175" cy="160" r="4" fill="#FFFFFF" />
          <ellipse cx="102" cy="182" rx="12" ry="7" fill="#FDA4AF" />
          <ellipse cx="198" cy="182" rx="12" ry="7" fill="#FDA4AF" />
          <path d="M134 186 Q150 204 166 186" fill="none" stroke={OUTLINE} strokeWidth="5.5" strokeLinecap="round" />
        </g>
      );

    case 'pisang':
      // 360 x 240
      return (
        <g>
          <rect width="360" height="240" fill="#E0F2FE" />
          {/* Decorative sunny corner & shapes */}
          <circle cx="48" cy="44" r="24" fill="#FBBF24" stroke={OUTLINE} strokeWidth="4.5" />
          <circle cx="315" cy="46" r="18" fill="#86EFAC" stroke={OUTLINE} strokeWidth="4" />
          <path d="M0 184 Q180 160 360 184 L360 240 L0 240 Z" fill="#FDE68A" stroke={OUTLINE} strokeWidth="5" />
          <circle cx="54" cy="212" r="9" fill="#FB7185" stroke={OUTLINE} strokeWidth="3.5" />
          <circle cx="308" cy="212" r="9" fill="#38BDF8" stroke={OUTLINE} strokeWidth="3.5" />

          {/* Back banana */}
          <path
            d="M118 46 C158 32, 232 62, 258 134 C264 152, 248 168, 228 158 C198 140, 148 96, 118 60 Z"
            fill="#FACC15"
            stroke={OUTLINE}
            strokeWidth="5.5"
            strokeLinejoin="round"
          />
          {/* Front big smiling banana */}
          <path
            d="M104 54 C96 106, 128 168, 214 190 C238 196, 258 176, 244 156 C204 134, 152 96, 126 52 Z"
            fill="#FDE047"
            stroke={OUTLINE}
            strokeWidth="6"
            strokeLinejoin="round"
          />
          {/* Stem cap */}
          <rect x="98" y="34" width="32" height="22" rx="8" fill="#92400E" stroke={OUTLINE} strokeWidth="5" />

          {/* Banana cute face */}
          <circle cx="146" cy="128" r="8" fill={OUTLINE} />
          <circle cx="144" cy="125" r="3" fill="#FFFFFF" />
          <circle cx="182" cy="144" r="8" fill={OUTLINE} />
          <circle cx="180" cy="141" r="3" fill="#FFFFFF" />
          <ellipse cx="136" cy="142" rx="8" ry="5" fill="#FDA4AF" />
          <ellipse cx="190" cy="158" rx="8" ry="5" fill="#FDA4AF" />
          <path d="M150 148 Q162 162 174 154" fill="none" stroke={OUTLINE} strokeWidth="4.5" strokeLinecap="round" />
        </g>
      );

    case 'semangka':
      // 300 x 300
      return (
        <g>
          <rect width="300" height="300" fill="#DCFCE7" />
          {/* Cheerful picnic gingham-like corner accents */}
          <circle cx="48" cy="48" r="22" fill="#FDE047" stroke={OUTLINE} strokeWidth="4.5" />
          <circle cx="254" cy="52" r="18" fill="#FB923C" stroke={OUTLINE} strokeWidth="4.5" />
          <path d="M0 230 Q150 210 300 230 L300 300 L0 300 Z" fill="#FDBA74" stroke={OUTLINE} strokeWidth="5" />
          <circle cx="46" cy="264" r="10" fill="#EF4444" stroke={OUTLINE} strokeWidth="3.5" />
          <circle cx="254" cy="264" r="10" fill="#22C55E" stroke={OUTLINE} strokeWidth="3.5" />

          {/* Outer green rind arc */}
          <path
            d="M36 126 A114 114 0 0 0 264 126 Z"
            fill="#16A34A"
            stroke={OUTLINE}
            strokeWidth="6.5"
            strokeLinejoin="round"
          />
          {/* White pith layer */}
          <path
            d="M48 126 A102 102 0 0 0 252 126 Z"
            fill="#ECFDF5"
            stroke={OUTLINE}
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {/* Juicy red flesh */}
          <path
            d="M58 126 A92 92 0 0 0 242 126 Z"
            fill="#F43F5E"
            stroke={OUTLINE}
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* Black seeds */}
          <ellipse cx="92" cy="148" rx="5" ry="9" transform="rotate(18 92 148)" fill={OUTLINE} />
          <ellipse cx="208" cy="148" rx="5" ry="9" transform="rotate(-18 208 148)" fill={OUTLINE} />
          <ellipse cx="118" cy="188" rx="5" ry="9" transform="rotate(10 118 188)" fill={OUTLINE} />
          <ellipse cx="182" cy="188" rx="5" ry="9" transform="rotate(-10 182 188)" fill={OUTLINE} />

          {/* Happy face on watermelon */}
          <circle cx="128" cy="152" r="9.5" fill={OUTLINE} />
          <circle cx="125" cy="149" r="3.5" fill="#FFFFFF" />
          <circle cx="172" cy="152" r="9.5" fill={OUTLINE} />
          <circle cx="169" cy="149" r="3.5" fill="#FFFFFF" />
          <ellipse cx="112" cy="166" rx="9" ry="5.5" fill="#FDA4AF" />
          <ellipse cx="188" cy="166" rx="9" ry="5.5" fill="#FDA4AF" />
          <path d="M138 168 Q150 182 162 168" fill="none" stroke={OUTLINE} strokeWidth="5" strokeLinecap="round" />
        </g>
      );

    case 'mobil':
      // 300 x 300
      return (
        <g>
          {/* Sky & Clouds */}
          <rect width="300" height="300" fill="#BAE6FD" />
          <circle cx="246" cy="52" r="24" fill="#FDE047" stroke={OUTLINE} strokeWidth="4.5" />
          <path
            d="M36 68 C36 54, 54 46, 66 54 C76 42, 98 46, 102 62 C114 64, 116 80, 102 82 L40 82 C28 82, 26 70, 36 68 Z"
            fill="#FFFFFF"
            stroke={OUTLINE}
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {/* Green hills & road */}
          <path d="M0 198 Q80 170 150 194 Q230 172 300 196 L300 232 L0 232 Z" fill="#4ADE80" stroke={OUTLINE} strokeWidth="5" />
          <rect x="0" y="220" width="300" height="80" fill="#64748B" stroke={OUTLINE} strokeWidth="5" />
          {/* Dashed road lines */}
          <rect x="24" y="256" width="44" height="10" rx="5" fill="#FDE047" />
          <rect x="128" y="256" width="44" height="10" rx="5" fill="#FDE047" />
          <rect x="232" y="256" width="44" height="10" rx="5" fill="#FDE047" />

          {/* Car Cabin */}
          <path
            d="M84 148 L108 98 C114 88, 126 84, 140 84 L184 84 C198 84, 210 90, 216 102 L236 148 Z"
            fill="#EF4444"
            stroke={OUTLINE}
            strokeWidth="6"
            strokeLinejoin="round"
          />
          {/* Windows */}
          <path d="M100 142 L116 104 Q120 98 130 98 L152 98 L152 142 Z" fill="#E0F2FE" stroke={OUTLINE} strokeWidth="4.5" strokeLinejoin="round" />
          <path d="M164 98 L194 98 Q202 98 206 106 L220 142 L164 142 Z" fill="#E0F2FE" stroke={OUTLINE} strokeWidth="4.5" strokeLinejoin="round" />

          {/* Car Body */}
          <rect x="42" y="142" width="216" height="66" rx="22" fill="#EF4444" stroke={OUTLINE} strokeWidth="6" />
          {/* Yellow racing stripe */}
          <rect x="46" y="170" width="208" height="14" fill="#FACC15" stroke={OUTLINE} strokeWidth="3.5" />
          {/* Headlight & Bumper */}
          <circle cx="246" cy="160" r="12" fill="#FEF08A" stroke={OUTLINE} strokeWidth="4" />
          <circle cx="56" cy="160" r="9" fill="#FB923C" stroke={OUTLINE} strokeWidth="4" />

          {/* Wheels */}
          <circle cx="96" cy="212" r="32" fill="#334155" stroke={OUTLINE} strokeWidth="6" />
          <circle cx="96" cy="212" r="15" fill="#E2E8F0" stroke={OUTLINE} strokeWidth="4" />
          <circle cx="96" cy="212" r="5" fill={OUTLINE} />

          <circle cx="204" cy="212" r="32" fill="#334155" stroke={OUTLINE} strokeWidth="6" />
          <circle cx="204" cy="212" r="15" fill="#E2E8F0" stroke={OUTLINE} strokeWidth="4" />
          <circle cx="204" cy="212" r="5" fill={OUTLINE} />
        </g>
      );

    case 'pesawat':
      // 360 x 240
      return (
        <g>
          <rect width="360" height="240" fill="#7DD3FC" />
          {/* Sun & fluffy clouds */}
          <circle cx="312" cy="46" r="24" fill="#FDE047" stroke={OUTLINE} strokeWidth="4.5" />
          <path
            d="M26 56 C26 42, 46 36, 56 44 C68 32, 92 38, 94 54 C106 58, 106 72, 92 74 L32 74 C18 74, 18 58, 26 56 Z"
            fill="#FFFFFF"
            stroke={OUTLINE}
            strokeWidth="4.5"
          />
          <path
            d="M236 196 C236 182, 256 176, 268 184 C280 172, 304 178, 306 194 C318 198, 318 214, 304 216 L242 216 C228 216, 228 198, 236 196 Z"
            fill="#FFFFFF"
            stroke={OUTLINE}
            strokeWidth="4.5"
          />
          <path
            d="M40 198 C40 186, 56 180, 68 188 C78 178, 96 184, 98 198 C108 200, 108 214, 94 214 L46 214 C34 214, 32 200, 40 198 Z"
            fill="#FFFFFF"
            stroke={OUTLINE}
            strokeWidth="4"
          />

          {/* Top Wing */}
          <path d="M168 94 L132 42 L182 42 L208 94 Z" fill="#FACC15" stroke={OUTLINE} strokeWidth="5.5" strokeLinejoin="round" />
          {/* Tail Fin */}
          <path d="M74 106 L52 58 L96 58 L114 102 Z" fill="#F43F5E" stroke={OUTLINE} strokeWidth="5.5" strokeLinejoin="round" />
          {/* Airplane Fuselage */}
          <path
            d="M66 112 C66 96, 106 94, 178 94 C244 94, 294 108, 294 128 C294 148, 244 156, 178 156 C106 156, 66 142, 66 112 Z"
            fill="#FFFFFF"
            stroke={OUTLINE}
            strokeWidth="6"
          />
          {/* Blue stripe */}
          <path d="M76 130 Q180 138 286 128" fill="none" stroke="#0284C7" strokeWidth="10" strokeLinecap="round" />
          {/* Cockpit & Windows */}
          <path d="M236 102 C258 104, 274 112, 280 122 L236 122 Z" fill="#BAE6FD" stroke={OUTLINE} strokeWidth="4.5" strokeLinejoin="round" />
          <circle cx="132" cy="116" r="10" fill="#BAE6FD" stroke={OUTLINE} strokeWidth="4" />
          <circle cx="164" cy="116" r="10" fill="#BAE6FD" stroke={OUTLINE} strokeWidth="4" />
          <circle cx="196" cy="116" r="10" fill="#BAE6FD" stroke={OUTLINE} strokeWidth="4" />

          {/* Bottom Wing */}
          <path d="M158 136 L124 196 L176 196 L204 136 Z" fill="#FACC15" stroke={OUTLINE} strokeWidth="5.5" strokeLinejoin="round" />
          {/* Propeller */}
          <ellipse cx="298" cy="128" rx="8" ry="26" fill="#F43F5E" stroke={OUTLINE} strokeWidth="4.5" />
          <circle cx="294" cy="128" r="8" fill="#FACC15" stroke={OUTLINE} strokeWidth="4" />
        </g>
      );

    case 'kereta':
      // 300 x 300
      return (
        <g>
          {/* Sky & Hills */}
          <rect width="300" height="300" fill="#E0F2FE" />
          <circle cx="48" cy="50" r="24" fill="#FDE047" stroke={OUTLINE} strokeWidth="4.5" />
          {/* Steam puffs */}
          <circle cx="220" cy="76" r="16" fill="#FFFFFF" stroke={OUTLINE} strokeWidth="4" />
          <circle cx="242" cy="54" r="20" fill="#FFFFFF" stroke={OUTLINE} strokeWidth="4" />
          <circle cx="268" cy="40" r="14" fill="#FFFFFF" stroke={OUTLINE} strokeWidth="3.5" />

          {/* Green hills & Railroad track */}
          <path d="M0 212 Q150 185 300 212 L300 245 L0 245 Z" fill="#4ADE80" stroke={OUTLINE} strokeWidth="5" />
          <rect x="0" y="242" width="300" height="58" fill="#D97706" stroke={OUTLINE} strokeWidth="5" />
          <rect x="0" y="242" width="300" height="12" fill="#94A3B8" stroke={OUTLINE} strokeWidth="4" />
          {[20, 65, 110, 155, 200, 245].map((tx) => (
            <rect key={tx} x={tx} y="256" width="24" height="14" rx="3" fill="#78350F" stroke={OUTLINE} strokeWidth="3" />
          ))}

          {/* Chimney */}
          <path d="M198 134 L192 98 L226 98 L220 134 Z" fill="#334155" stroke={OUTLINE} strokeWidth="5.5" strokeLinejoin="round" />
          <rect x="188" y="90" width="42" height="12" rx="6" fill="#FACC15" stroke={OUTLINE} strokeWidth="4" />

          {/* Train Cab */}
          <rect x="44" y="88" width="90" height="122" rx="10" fill="#3B82F6" stroke={OUTLINE} strokeWidth="6" />
          <rect x="36" y="76" width="106" height="18" rx="8" fill="#EF4444" stroke={OUTLINE} strokeWidth="5" />
          <rect x="64" y="108" width="50" height="44" rx="8" fill="#BAE6FD" stroke={OUTLINE} strokeWidth="4.5" />

          {/* Train Boiler */}
          <rect x="134" y="126" width="114" height="84" rx="16" fill="#EF4444" stroke={OUTLINE} strokeWidth="6" />
          <rect x="134" y="158" width="114" height="14" fill="#FACC15" stroke={OUTLINE} strokeWidth="3.5" />
          {/* Front bumper / cowcatcher */}
          <polygon points="248,186 276,216 248,216" fill="#FACC15" stroke={OUTLINE} strokeWidth="5" strokeLinejoin="round" />
          <circle cx="250" cy="148" r="11" fill="#FEF08A" stroke={OUTLINE} strokeWidth="4" />

          {/* Train Wheels */}
          <circle cx="88" cy="218" r="28" fill="#334155" stroke={OUTLINE} strokeWidth="5.5" />
          <circle cx="88" cy="218" r="12" fill="#FACC15" stroke={OUTLINE} strokeWidth="4" />
          <circle cx="164" cy="222" r="22" fill="#334155" stroke={OUTLINE} strokeWidth="5.5" />
          <circle cx="164" cy="222" r="9" fill="#FACC15" stroke={OUTLINE} strokeWidth="3.5" />
          <circle cx="218" cy="222" r="22" fill="#334155" stroke={OUTLINE} strokeWidth="5.5" />
          <circle cx="218" cy="222" r="9" fill="#FACC15" stroke={OUTLINE} strokeWidth="3.5" />
        </g>
      );
  }
};
