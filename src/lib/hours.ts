/** Opening hours of the Jūrmala branch (as published on redbus.lv). */
export interface OpenState {
  open: boolean;
  /** "24:00" / "03:00" when open, "11:00" when closed */
  time: string;
}

export function openState(now = new Date()): OpenState {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Riga',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dow = days.indexOf(get('weekday'));
  const minutes = (Number(get('hour')) % 24) * 60 + Number(get('minute'));
  const yesterday = (dow + 6) % 7;
  const lateNight = (d: number) => d === 4 || d === 5; // Fri, Sat run until 03:00

  if (minutes < 3 * 60 && lateNight(yesterday)) return { open: true, time: '03:00' };
  if (minutes >= 11 * 60) return { open: true, time: lateNight(dow) ? '03:00' : '24:00' };
  return { open: false, time: '11:00' };
}
