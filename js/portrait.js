(function () {
  const PIC = {
    scientist_m: 'picture/scientist_male.webp',
    scientist_f: 'picture/scientist_female.webp',
    astronaut_m: 'picture/astronaut_male.webp',
    astronaut_f: 'picture/astronaut_female.webp',
    writer_m: 'picture/writer_male.webp',
    writer_f: 'picture/writer_female.webp',
    student_m: 'picture/student_male.webp',
    student_f: 'picture/student_female.webp',
    teacher_m: 'picture/teacher_male.webp',
    teacher_f: 'picture/teacher_female.webp'
  };
  function hairPath(style, g, hc) {
    switch (style) {
      case 'salt': return 'M62 88 Q64 44 100 42 Q136 44 138 88 L134 74 Q120 56 100 56 Q80 56 66 74 Z';
      case 'bun_salt': return '<path d="M62 92 Q60 48 100 44 Q140 48 138 92 L132 72 Q118 58 100 58 Q82 58 68 72 Z"/><circle cx="146" cy="52" r="13"/>';
      case 'buzz': return '<path d="M64 90 Q66 50 100 48 Q134 50 136 90 Q128 62 100 60 Q72 62 64 90 Z"/>';
      case 'braid': return `<path d="M62 94 Q60 48 100 44 Q140 48 138 94 L130 70 Q116 56 100 56 Q84 56 70 70 Z"/><path d="M136 60 Q160 78 150 150" fill="none" stroke="${hc}" stroke-width="10" stroke-linecap="round"/>`;
      case 'parted': return '<path d="M60 96 Q58 46 100 42 Q142 46 140 96 L134 76 Q126 54 96 58 Q72 62 66 78 Z"/>';
      case 'long': return '<path d="M58 170 Q52 60 100 44 Q148 60 142 170 L128 168 Q134 110 126 74 Q112 60 88 60 Q74 66 72 74 Q64 110 72 168 Z"/>';
      case 'messy': return `<path d="M60 92 Q56 44 102 40 Q146 44 140 92 L132 72 Q124 52 98 54 Q74 58 66 76 Z"/><path d="M64 52 Q70 38 86 36 M104 34 Q122 32 134 46" fill="none" stroke="${hc}" stroke-width="6" stroke-linecap="round"/>`;
      case 'bob': return '<path d="M58 128 Q54 48 100 44 Q146 48 142 128 L128 126 Q132 96 126 72 Q112 58 88 58 Q74 64 72 72 Q68 96 72 126 Z"/>';
      case 'white_short': return '<path d="M64 88 Q66 50 100 48 Q134 50 136 88 Q126 64 100 62 Q74 64 64 88 Z"/>';
      case 'bun_white': return '<circle cx="146" cy="50" r="12"/><path d="M62 92 Q60 48 100 44 Q140 48 138 92 L132 72 Q118 58 100 58 Q82 58 68 72 Z"/>';
      default: return '';
    }
  }
  function glassesPath(kind) {
    if (kind === 'rect') return '<g stroke="#223" stroke-width="3" fill="none"><rect x="72" y="84" width="24" height="17" rx="4"/><rect x="104" y="84" width="24" height="17" rx="4"/><line x1="96" y1="92" x2="104" y2="92"/><line x1="72" y1="90" x2="64" y2="87"/><line x1="128" y1="90" x2="136" y2="87"/></g>';
    if (kind === 'round') return '<g stroke="#5a4632" stroke-width="3" fill="rgba(210,230,255,0.18)"><circle cx="84" cy="93" r="11"/><circle cx="116" cy="93" r="11"/><line x1="95" y1="93" x2="105" y2="93"/><line x1="73" y1="90" x2="65" y2="86"/><line x1="127" y1="90" x2="135" y2="86"/></g>';
    return '';
  }
  UM.portrait = function (bgIdx, g, size) {
    const b = UM.DATA.BGS[bgIdx];
    const pic = PIC[b.id + '_' + g];
    if (pic) return `<img class="portrait-svg" src="${pic}" alt="${b.job}">`;
    const age = b.age;
    const hc = (b.hairM.indexOf('salt') >= 0 || b.hairF.indexOf('salt') >= 0) ? '#8d8f96'
      : (b.hairM.indexOf('white') >= 0 || b.hairF.indexOf('white') >= 0) ? '#e8e6e0'
      : (b.id === 'astronaut') ? '#4a3524'
      : (b.id === 'writer') ? '#26222b'
      : (b.id === 'student') ? '#a8743c' : '#33302e';
    const hairStyle = g === 'm' ? b.hairM : b.hairF;
    const wr = [];
    if (age >= 50) {
      wr.push('<path d="M78 108 q7 3 14 1 M122 109 q-7 3 -14 1" stroke="rgba(90,60,40,.45)" stroke-width="2" fill="none"/>');
      wr.push('<path d="M84 66 q16 -6 32 0" stroke="rgba(90,60,40,.35)" stroke-width="2" fill="none"/>');
    }
    if (age >= 60) {
      wr.push('<path d="M88 78 q12 4 24 0 M90 120 q10 5 20 0" stroke="rgba(90,60,40,.4)" stroke-width="2" fill="none"/>');
    }
    const blush = age <= 30 ? '<ellipse cx="76" cy="106" rx="7" ry="4" fill="rgba(240,130,120,.28)"/><ellipse cx="124" cy="106" rx="7" ry="4" fill="rgba(240,130,120,.28)"/>' : '';
    const smile = b.id === 'teacher' ? 'M88 122 q12 9 24 0' : 'M90 123 q10 6 20 0';
    const svg = `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" class="portrait-svg">
<defs><radialGradient id="pbg${b.id}${g}" cx="50%" cy="38%" r="75%">
<stop offset="0%" stop-color="#1d2b53"/><stop offset="100%" stop-color="#070b18"/></radialGradient></defs>
<circle cx="100" cy="104" r="96" fill="url(#pbg${b.id}${g})"/>
<circle cx="100" cy="104" r="96" fill="none" stroke="${b.trim}" stroke-opacity=".55" stroke-width="2"/>
<g opacity=".8"><circle cx="40" cy="40" r="1.4" fill="#fff"/><circle cx="166" cy="58" r="1.1" fill="#fff"/><circle cx="30" cy="150" r="1.2" fill="#fff"/><circle cx="172" cy="152" r="1.5" fill="#fff"/></g>
<path d="M40 220 Q44 172 100 168 Q156 172 160 220 Z" fill="#141a2e"/>
<path d="M52 220 Q56 182 100 178 Q144 182 148 220 Z" fill="#1b2340"/>
<path d="M84 176 L100 200 L116 176 L112 170 L88 170 Z" fill="${b.trim}" opacity=".9"/>
<path d="M96 186 h8 v22 h-8 z" fill="${b.trim}" opacity=".5"/>
<rect x="90" y="146" width="20" height="26" rx="9" fill="${b.skin}"/>
<ellipse cx="100" cy="100" rx="40" ry="47" fill="${b.skin}"/>
<ellipse cx="59" cy="103" rx="7" ry="11" fill="${b.skin}"/>
<ellipse cx="141" cy="103" rx="7" ry="11" fill="${b.skin}"/>
<g fill="${hc}">${hairPath(hairStyle, g, hc)}</g>
<ellipse cx="83" cy="94" rx="5.5" ry="6.5" fill="#fff"/><ellipse cx="117" cy="94" rx="5.5" ry="6.5" fill="#fff"/>
<circle cx="84.5" cy="95" r="3" fill="#20242e"/><circle cx="118.5" cy="95" r="3" fill="#20242e"/>
<circle cx="85.6" cy="93.6" r="1" fill="#fff"/><circle cx="119.6" cy="93.6" r="1" fill="#fff"/>
<path d="M75 85 q8 -5 16 -1 M109 84 q8 -4 16 1" stroke="${hc}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
<path d="M99 100 q3 7 0 11" stroke="rgba(90,60,40,.5)" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<path d="${smile}" stroke="#8a4b41" stroke-width="3" fill="none" stroke-linecap="round"/>
${blush}${wr.join('')}${glassesPath(b.glasses)}
</svg>`;
    return svg;
  };
})();
