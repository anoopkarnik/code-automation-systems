const Transport = require('winston-transport');
const axios = require('axios');

export class LokiTransport extends Transport {
  constructor(opts) {
    super(opts);
    this.url = opts.url;
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    // Prepare the log entry
    const logEntry = {
      streams: [
        {
          labels: `{job="nodejs",level="${info.level}"}`,
          entries: [
            {
              ts: new Date().toISOString(),
              line: info.message,
            },
          ],
        },
      ],
    };

    // Send the log entry to Loki
    axios
      .post(this.url, logEntry)
      .then((response) => {
        callback();
      })
      .catch((error) => {
        console.error('Error sending log to Loki:', error);
        callback(error);
      });
  }
}

