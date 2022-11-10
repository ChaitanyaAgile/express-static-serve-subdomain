import express from "express";
import { join } from "path";

const __dirname = process.cwd();

const app = express();

// app.use(express.static(join(process.cwd(), 'frontend/pam')));

app.use((req, res, next) => {
  const host = req.headers.host.split('.')[0];
  req.surveyName = host;
  // protect against missing or unexpected hostName
  if (host) {
    let middleware = express.static(join(__dirname, 'frontend', host));
    middleware(req, res, next);
  } else {
    // nothing to do here, keep routing
    next();
  }
});

app.get('/*', (req, res) => res.sendFile('index.html', { root: join(process.cwd(), `frontend/${req.surveyName}`) }));

app.listen(3000, () => console.log('listening on 3000'))