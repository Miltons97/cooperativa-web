/**
 * exportEngine.js — Canvas 2D card generator
 *
 * Draws a professional social-media card entirely on a <canvas> element.
 * No html2canvas, no CSS modules — full pixel control.
 *
 * Supports any image ratio (portrait, landscape, square, panoramic, low-res)
 * through the cinematic technique: blurred ambient layer + contained main image.
 * Images are NEVER stretched or cropped.
 */

const FONT   = '"Space Grotesk", system-ui, -apple-system, sans-serif';
const FNAME  = 'Space Grotesk';
const BG     = '#070b12';

/* ─── image loader ─────────────────────────────────────────── */
export function loadImage(src) {
  return new Promise((resolve) => {
    if (!src) { resolve(null); return; }
    const img  = new Image();
    img.crossOrigin = 'anonymous';
    img.onload  = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/* ─── geometry helpers ──────────────────────────────────────── */
function contain(iw, ih, cw, ch) {
  const s = Math.min(cw / iw, ch / ih);
  const sw = iw * s, sh = ih * s;
  return { x: (cw - sw) / 2, y: (ch - sh) / 2, w: sw, h: sh };
}

function cover(iw, ih, cw, ch) {
  const s = Math.max(cw / iw, ch / ih);
  const sw = iw * s, sh = ih * s;
  return { x: (cw - sw) / 2, y: (ch - sh) / 2, w: sw, h: sh };
}

/* ─── word-wrap with ellipsis ───────────────────────────────── */
function wrap(ctx, text, maxW, maxLines) {
  if (!text) return [];
  const words = text.replace(/\s+/g, ' ').trim().split(' ');
  const lines = [];
  let cur     = '';

  for (const w of words) {
    const trial = cur ? `${cur} ${w}` : w;
    if (ctx.measureText(trial).width > maxW && cur) {
      lines.push(cur);
      if (lines.length >= maxLines) {
        let last = lines[lines.length - 1];
        while (last.length && ctx.measureText(`${last}…`).width > maxW)
          last = last.slice(0, -1).trimEnd();
        lines[lines.length - 1] = `${last}…`;
        return lines;
      }
      cur = w;
    } else {
      cur = trial;
    }
  }
  if (cur && lines.length < maxLines) lines.push(cur);
  return lines;
}

/* ─── rounded rectangle path ───────────────────────────────── */
function rrect(ctx, x, y, w, h, r) {
  const rx = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rx, y);
  ctx.lineTo(x + w - rx, y);
  ctx.arcTo(x + w, y,     x + w, y + rx,    rx);
  ctx.lineTo(x + w, y + h - rx);
  ctx.arcTo(x + w, y + h, x + w - rx, y + h, rx);
  ctx.lineTo(x + rx, y + h);
  ctx.arcTo(x,     y + h, x,     y + h - rx, rx);
  ctx.lineTo(x, y + rx);
  ctx.arcTo(x,     y,     x + rx, y,          rx);
  ctx.closePath();
}

/* ─── gradient helper ───────────────────────────────────────── */
function linearGrad(ctx, x0, y0, x1, y1, stops) {
  const g = ctx.createLinearGradient(x0, y0, x1, y1);
  stops.forEach(([pos, col]) => g.addColorStop(pos, col));
  return g;
}

/* ─── main export function ──────────────────────────────────── */
/**
 * @param {object}  opts
 * @param {object}  opts.selected      — noticia object
 * @param {string}  opts.catColor      — hex category colour
 * @param {string}  opts.formattedDate — already-formatted date string
 * @param {{ w: number, h: number }} opts.format
 * @param {string}  opts.API_URL
 * @returns {Promise<HTMLCanvasElement>}
 */
export async function generateCard({ selected, catColor, formattedDate, format, API_URL }) {
  const { w, h } = format;

  /* ── scale factor based on shorter dimension ── */
  const BASE = 1080;
  const S    = Math.min(w, h) / BASE;
  const isLS = w > h * 1.35;   // landscape flag

  /* ── font sizes ── */
  const FS_CHIP = Math.round(18 * S);
  const FS_BRAN = Math.round(18 * S);
  const FS_TITL = Math.round(52 * S);
  const FS_EXCP = Math.round(27 * S);
  const FS_FOOT = Math.round(18 * S);

  /* ── spacing ── */
  const PAD  = Math.round(58 * S);
  const PADV = Math.round(52 * S);

  /* ── load fonts ── */
  try {
    await Promise.all([
      document.fonts.load(`700 ${FS_TITL}px "${FNAME}"`),
      document.fonts.load(`400 ${FS_EXCP}px "${FNAME}"`),
      document.fonts.load(`600 ${FS_CHIP}px "${FNAME}"`),
      document.fonts.load(`700 ${FS_FOOT}px "${FNAME}"`),
      document.fonts.load(`500 ${FS_FOOT}px "${FNAME}"`),
      document.fonts.load(`300 ${FS_EXCP}px "${FNAME}"`),
    ]);
  } catch (_) { /* continue without guarantee */ }

  /* ── load images ── */
  const imgUrl = selected.imagen ? `${API_URL}${selected.imagen}` : null;
  const [img, logo] = await Promise.all([
    loadImage(imgUrl),
    loadImage('/assets/logoSinFondo.jpg'),
  ]);

  /* ── create canvas ── */
  const canvas  = document.createElement('canvas');
  canvas.width  = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { alpha: false });

  /* ══════════════════════════════════════════════════════════
     LAYER 1 — solid background
  ══════════════════════════════════════════════════════════ */
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, w, h);

  /* ══════════════════════════════════════════════════════════
     LAYER 2 — blurred ambient (covers full canvas via "cover")
     The image is drawn at cover-scale with a generous over-bleed
     so the gaussian blur never fades at the canvas edges.
  ══════════════════════════════════════════════════════════ */
  if (img) {
    const cr  = cover(img.naturalWidth, img.naturalHeight, w, h);
    const BP  = Math.round(Math.max(80, 48 * S));  // bleed padding
    const blurPx = Math.round(42 * S);

    ctx.save();
    ctx.filter = `blur(${blurPx}px) brightness(0.27) saturate(210%)`;
    ctx.drawImage(img,
      cr.x - BP, cr.y - BP,
      cr.w + BP * 2, cr.h + BP * 2
    );
    ctx.restore();
    ctx.filter = 'none';
  } else {
    /* Fallback: category-colour gradient background */
    ctx.fillStyle = linearGrad(ctx, 0, 0, w * 0.65, h, [
      [0, catColor + 'ee'],
      [1, BG],
    ]);
    ctx.fillRect(0, 0, w, h);
  }

  /* ══════════════════════════════════════════════════════════
     LAYER 3 — main image (contain — never cropped/stretched)
  ══════════════════════════════════════════════════════════ */
  if (img) {
    const r = contain(img.naturalWidth, img.naturalHeight, w, h);
    ctx.drawImage(img, r.x, r.y, r.w, r.h);
  }

  /* ══════════════════════════════════════════════════════════
     LAYER 4 — cinematic vignettes
  ══════════════════════════════════════════════════════════ */
  // Top
  ctx.fillStyle = linearGrad(ctx, 0, 0, 0, h * 0.48, [
    [0,    'rgba(4,8,20,0.95)'],
    [0.40, 'rgba(4,8,20,0.46)'],
    [1,    'rgba(4,8,20,0)'],
  ]);
  ctx.fillRect(0, 0, w, h);

  // Bottom
  ctx.fillStyle = linearGrad(ctx, 0, h, 0, h * 0.34, [
    [0,    'rgba(4,8,20,0.99)'],
    [0.26, 'rgba(4,8,20,0.92)'],
    [0.62, 'rgba(4,8,20,0.22)'],
    [1,    'rgba(4,8,20,0)'],
  ]);
  ctx.fillRect(0, 0, w, h);

  // Subtle side darkening for landscape (helps readability on wide canvas)
  if (isLS) {
    const sideW = Math.round(w * 0.22);
    ctx.fillStyle = linearGrad(ctx, 0, 0, sideW, 0, [
      [0, 'rgba(4,8,20,0.62)'], [1, 'rgba(4,8,20,0)'],
    ]);
    ctx.fillRect(0, 0, sideW, h);
    ctx.fillStyle = linearGrad(ctx, w, 0, w - sideW, 0, [
      [0, 'rgba(4,8,20,0.62)'], [1, 'rgba(4,8,20,0)'],
    ]);
    ctx.fillRect(w - sideW, 0, sideW, h);
  }

  /* ══════════════════════════════════════════════════════════
     LAYER 5 — category chip (top-left)
  ══════════════════════════════════════════════════════════ */
  {
    ctx.font          = `600 ${FS_CHIP}px ${FONT}`;
    ctx.letterSpacing = Math.round(FS_CHIP * 0.07) + 'px';
    ctx.textBaseline  = 'middle';
    const label  = (selected.categoria || '').toUpperCase();
    const tw     = ctx.measureText(label).width;
    const CPH    = Math.round(FS_CHIP * 1.72);
    const CPX    = Math.round(FS_CHIP * 0.58);
    const cpW    = tw + CPX * 2;
    const cpX    = PAD;
    const cpY    = PADV;

    ctx.fillStyle = 'rgba(255,255,255,0.93)';
    rrect(ctx, cpX, cpY, cpW, CPH, CPH / 2); ctx.fill();

    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.lineWidth   = 1.5;
    rrect(ctx, cpX, cpY, cpW, CPH, CPH / 2); ctx.stroke();

    ctx.fillStyle     = catColor;
    ctx.fillText(label, cpX + CPX, cpY + CPH / 2 + 1);
    ctx.letterSpacing = '0px';
  }

  /* ══════════════════════════════════════════════════════════
     LAYER 6 — brand (logo + org name, top-right)
  ══════════════════════════════════════════════════════════ */
  {
    const LSZ = Math.round(56 * S);
    const LR  = Math.round(10 * S);
    const LX  = w - PAD - LSZ;
    const LY  = PADV;

    // Logo bg
    ctx.fillStyle = 'rgba(255,255,255,0.96)';
    rrect(ctx, LX, LY, LSZ, LSZ, LR); ctx.fill();

    // Logo image clipped to rounded square
    if (logo) {
      ctx.save();
      rrect(ctx, LX, LY, LSZ, LSZ, LR);
      ctx.clip();
      const lp = Math.round(4 * S);
      ctx.drawImage(logo, LX + lp, LY + lp, LSZ - lp * 2, LSZ - lp * 2);
      ctx.restore();
    }

    // Org name
    ctx.font         = `700 ${FS_BRAN}px ${FONT}`;
    ctx.textBaseline = 'middle';
    ctx.fillStyle    = 'rgba(255,255,255,0.92)';
    ctx.shadowColor  = 'rgba(0,0,0,0.75)'; ctx.shadowBlur = 14;
    const orgTxt = 'COPEOSPIL Ltda.';
    const orgW   = ctx.measureText(orgTxt).width;
    ctx.fillText(orgTxt, LX - Math.round(12 * S) - orgW, LY + LSZ / 2);
    ctx.shadowBlur = 0;
  }

  /* ══════════════════════════════════════════════════════════
     LAYER 7 — content block (bottom)
     Adaptive layout: text area width narrows for portrait,
     title lines cap lower for landscape.
  ══════════════════════════════════════════════════════════ */
  {
    /* Text zone width — for landscape keep it comfortably narrower */
    const TW  = isLS
      ? Math.min(Math.round(w * 0.55), Math.round(BASE * 1.05 * S))
      : w - PAD * 2;
    const TX  = PAD;

    /* Title */
    ctx.font = `700 ${FS_TITL}px ${FONT}`;
    const TITLE_MAX_LINES = isLS ? 2 : 3;
    const titleLines = wrap(ctx, selected.titulo || '', TW, TITLE_MAX_LINES);
    const T_LH = Math.round(FS_TITL * 1.18);

    /* Excerpt */
    ctx.font = `400 ${FS_EXCP}px ${FONT}`;
    const rawExc     = ((selected.resumen || selected.contenido || '').replace(/\n+/g, ' ').trim());
    const excMaxChar = h >= 1800 ? 310 : h >= 1300 ? 230 : isLS ? 160 : 190;
    const EXC_MAX_LINES = isLS ? 2 : 3;
    const excLines   = wrap(ctx, rawExc.slice(0, excMaxChar), TW, EXC_MAX_LINES);
    const E_LH = Math.round(FS_EXCP * 1.58);

    /* Block geometry */
    const ACCENT_H = Math.max(3, Math.round(4  * S));
    const ACCENT_W = Math.round(46 * S);
    const FOOT_H   = Math.round(FS_FOOT * 1.2);
    const SEP_H    = Math.round(18 * S);
    const G1 = Math.round(22 * S);  // accent → title
    const G2 = Math.round(18 * S);  // title  → excerpt
    const G3 = Math.round(26 * S);  // excerpt → separator

    const totalH =
      ACCENT_H + G1 +
      titleLines.length * T_LH + G2 +
      (excLines.length ? excLines.length * E_LH + G3 : G3) +
      SEP_H + FOOT_H;

    let y = h - PADV - totalH;
    /* Safety: never push text above the 42% vertical mark */
    if (y < Math.round(h * 0.42)) y = Math.round(h * 0.42);

    /* ── Accent bar ── */
    ctx.fillStyle = catColor;
    ctx.fillRect(TX, y, ACCENT_W, ACCENT_H);
    y += ACCENT_H + G1;

    /* ── Title ── */
    ctx.font          = `700 ${FS_TITL}px ${FONT}`;
    ctx.letterSpacing = Math.round(-FS_TITL * 0.022) + 'px';
    ctx.fillStyle     = '#ffffff';
    ctx.textBaseline  = 'top';
    ctx.shadowColor   = 'rgba(0,0,0,0.80)'; ctx.shadowBlur = 28;
    for (const line of titleLines) {
      ctx.fillText(line, TX, y);
      y += T_LH;
    }
    ctx.shadowBlur    = 0;
    ctx.letterSpacing = '0px';
    y += G2;

    /* ── Excerpt ── */
    if (excLines.length) {
      ctx.font      = `400 ${FS_EXCP}px ${FONT}`;
      ctx.fillStyle = 'rgba(255,255,255,0.68)';
      for (const line of excLines) {
        ctx.fillText(line, TX, y);
        y += E_LH;
      }
      y += G3;
    } else {
      y += G3;
    }

    /* ── Separator ── */
    ctx.beginPath();
    ctx.moveTo(TX, y); ctx.lineTo(w - PAD, y);
    ctx.strokeStyle = 'rgba(255,255,255,0.13)';
    ctx.lineWidth   = 1;
    ctx.stroke();
    y += SEP_H;

    /* ── Footer: date left, URL right ── */
    ctx.textBaseline = 'top';

    ctx.font      = `500 ${FS_FOOT}px ${FONT}`;
    ctx.fillStyle = 'rgba(255,255,255,0.40)';
    ctx.fillText(formattedDate, TX, y);

    ctx.font = `700 ${FS_FOOT}px ${FONT}`;
    const urlStr = 'www.copeospil.com.ar';
    ctx.fillText(urlStr, w - PAD - ctx.measureText(urlStr).width, y);
  }

  return canvas;
}
