/**
 * CosmosCommand - Central State & Event Dispatcher
 * Manages active date filters, active categories, search terms, and current view mode.
 */
class CosmosState {
  constructor() {
    const now = new Date();
    this.currentYear = now.getFullYear();
    this.currentMonth = now.getMonth() + 1; // 1-12
    this.currentDay = now.getDate();

    this.filters = {
      launches: true,
      anniversaries: true,
      natural: true,
      asteroids: true,
      news: true
    };

    this.agencyFilter = 'ALL'; // ALL, NASA, ISRO, ESA, SpaceX, JAXA, CNSA, Roscosmos
    this.searchQuery = '';
    this.viewMode = 'CALENDAR'; // CALENDAR, RADAR_3D, TIMELINE, AGENT_PIPELINE
    this.selectedEvent = null;

    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(eventType, payload) {
    this.listeners.forEach(fn => fn(eventType, payload, this));
  }

  setMonth(year, month) {
    this.currentYear = year;
    this.currentMonth = month;
    this.notify('DATE_CHANGED', { year, month });
  }

  prevMonth() {
    let y = this.currentYear;
    let m = this.currentMonth - 1;
    if (m < 1) {
      m = 12;
      y -= 1;
    }
    this.setMonth(y, m);
  }

  nextMonth() {
    let y = this.currentYear;
    let m = this.currentMonth + 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
    this.setMonth(y, m);
  }

  setToday() {
    const now = new Date();
    this.setMonth(now.getFullYear(), now.getMonth() + 1);
  }

  toggleCategory(catName) {
    if (this.filters.hasOwnProperty(catName)) {
      this.filters[catName] = !this.filters[catName];
      this.notify('FILTERS_CHANGED', { filters: this.filters });
    }
  }

  setAgency(agency) {
    this.agencyFilter = agency;
    this.notify('AGENCY_CHANGED', { agency });
  }

  setSearch(query) {
    this.searchQuery = (query || '').toLowerCase().trim();
    this.notify('SEARCH_CHANGED', { query: this.searchQuery });
  }

  setViewMode(mode) {
    this.viewMode = mode;
    this.notify('VIEW_MODE_CHANGED', { mode });
  }

  selectEvent(event) {
    this.selectedEvent = event;
    this.notify('EVENT_SELECTED', { event });
  }

  closeModal() {
    this.selectedEvent = null;
    this.notify('MODAL_CLOSED', {});
  }
}

window.cosmosState = new CosmosState();
