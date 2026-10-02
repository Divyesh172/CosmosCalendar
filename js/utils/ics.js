/**
 * CosmosCommand - iCalendar (.ICS) Exporter
 * Generates RFC 5545 compliant calendar files for Google Calendar, Apple Calendar, and Outlook.
 */
class CosmosICS {
  static formatICSDate(date) {
    const pad = n => String(n).padStart(2, '0');
    return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
  }

  static generateEventICS(event) {
    const start = new Date(event.date || event.start || Date.now());
    const end = new Date(start.getTime() + (event.durationHours || 2) * 3600 * 1000);
    const now = new Date();

    const uid = `cosmos-${event.id || Date.now()}-${Math.random().toString(36).substring(2, 9)}@cosmoscommand`;
    const summary = (event.title || 'Space Event').replace(/[,;\\]/g, ' ');
    const description = (event.description || event.details || 'Deep space event tracked via CosmosCommand')
      .replace(/\n/g, '\\n')
      .replace(/[,;\\]/g, ' ');
    const location = (event.location || event.agency || 'Low Earth Orbit / Celestial Sphere')
      .replace(/[,;\\]/g, ' ');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//CosmosCommand//Deep Space Observatory//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${this.formatICSDate(now)}`,
      `DTSTART:${this.formatICSDate(start)}`,
      `DTEND:${this.formatICSDate(end)}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT1H',
      'ACTION:DISPLAY',
      `DESCRIPTION:Reminder: ${summary}`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    return icsContent;
  }

  static downloadICS(event) {
    const content = this.generateEventICS(event);
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const sanitizedTitle = (event.title || 'space_event')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .substring(0, 30);
    link.download = `${sanitizedTitle}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }
}

window.cosmosICS = CosmosICS;
