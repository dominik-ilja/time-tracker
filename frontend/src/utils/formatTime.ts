// format expected is ISO : YYYY-MM-DDTHH:MM:SS.000Z

export default function formatTime(time: string): string {
  const endOfMinutes = 16;
  const formattedTime = time.slice(0, endOfMinutes); // returns "YYYY-MM-DDTHH:MM"
  return formattedTime.replace('T', ' '); // returns "YYYY-MM-DD HH:MM"
}
