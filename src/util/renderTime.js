/**
 * Renders a time string of type: HH:MM:SS from number of milliseconds.
 * @param {number} timestamp - number of milliseconds.
 * @return {string} Time string as HH : MM : SS. 
 */
export default function renderTime(timestamp) {
  let milliseconds = timestamp;

  let hours = Math.floor(milliseconds / 3600000);
  milliseconds -= hours * 3600000;

  let minutes = Math.floor(milliseconds / 60000);
  milliseconds -= minutes * 60000;

  let seconds = Math.floor(milliseconds / 1000);
  
  return [ hours, minutes, seconds ]
    .map(value => (value < 10) ? `0${value}` : value)
    .join(" : ");
}
