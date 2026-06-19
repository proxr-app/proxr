// Mock for @solana-program/memo to bypass Vite build/resolution errors
export function getAddMemoInstruction() {
  return null;
}
export function getMemoEncoder() {
  return null;
}
export function getMemoDecoder() {
  return null;
}
export function getMemoCodec() {
  return null;
}
