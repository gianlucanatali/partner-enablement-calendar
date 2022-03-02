// Shorthand for $( document ).ready()
$(function() {
  const dateTimeUtc = moment("2017-06-05T19:41:03Z").utc();

  const userTz = moment.tz.guess(true);

  const selectorOptions = moment.tz.names()
    .reduce((memo, tz) => {
      memo.push({
        name: tz,
        offset: moment.tz(tz).utcOffset()
      });
      
      return memo;
    }, [])
    .sort((a, b) => {
      return a.offset - b.offset
    })
    .reduce((memo, tz) => {
      const timezone = tz.offset ? moment.tz(tz.name).format('Z') : '';

      return memo.concat(`<option value="${tz.name}">(GMT${timezone}) ${tz.name}</option>`);
    }, "");

  document.querySelector(".js-Selector").innerHTML = selectorOptions;

  document.querySelector(".js-Selector").addEventListener("change", e => {
    const timezoneNew = encodeURIComponent(e.target.value);
    
  
    const calUrl="https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23ffffff&showDate=1&mode=WEEK&showTitle=0&showPrint=0&showTz=1&showCalendars=0&src=Y29uZmx1ZW50cGFydG5lcmVuYWJsZW1lbnRzZXNzaW9uc0Bjb25mbHVlbnQuaW8&color=%23AD1457&ctz="+timezoneNew;
    document.querySelector(".calendarIframe").src = calUrl;
  });

  document.querySelector(".js-Selector").value = userTz;

  const event = new Event("change");
  document.querySelector(".js-Selector").dispatchEvent(event);
});

