import qrcode from "qrcode-generator";

/** Returns an inline SVG string for a QR code (type 0 = auto size, error correction M). */
export function qrSvg(text, cellSize = 4) {
  const qr = qrcode(0, "M");
  qr.addData(text);
  qr.make();
  return qr.createSvgTag({ cellSize, margin: 2, scalable: true });
}
