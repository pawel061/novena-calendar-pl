/*
 * Deletes all events based on start date and summary text containing 'day'
 * !! Be aware if your calendar has any other events with a similar summary, they will be deleted
 * Change filtering as required
 */
function delAll() {
  var calendarId = 'primary';
  var now = new Date();
  
  var date = new Date();
  
  // Start date of events
  date.setDate(date.getDate() + -1);
  
  var events = Calendar.Events.list(calendarId, {
    timeMin: date.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
    maxResults: 60
  });
  
  if (events.items && events.items.length > 0) {
    for (var i = 0; i < events.items.length; i++) {
      var event = events.items[i];
      
      // Event summary filtering; finds the text 'day'
      if (event.start.date && event.summary.search(/day/)) {
        // All-day event.
        
        var start = new Date(event.start.date);
        Logger.log('Delete all day: %s %s', event.summary, event.id);
        Calendar.Events.remove(calendarId, event.id);
        
      }
    }
  } else {
    Logger.log('No events found.');
  }

}
