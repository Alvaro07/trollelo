/**
 * Funcion para limitar caracteres
 * @param {string} text
 * @param {number} max
 * @returns {string}
 */

export function splitString(text, max) {
  return text.length >= max ? `${text.slice(0, max)}...` : text;
}
