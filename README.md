# 4-Day Lift

A mobile-first, installable workout tracker for the four-day upper-body-focused, knee-conscious program.

## Features

- All four workouts and exercise cues
- Weight, repetitions, and set-completion tracking
- Automatic local saving
- Previous-weight prefilling
- Completed-workout history
- Automatic rest timer with 60-, 90-, and 120-second presets
- Offline use after the first hosted visit
- Installable on an iPhone Home Screen

## Publish with GitHub Pages

1. Create a new GitHub repository, such as `four-day-lift`.
2. Upload the contents of this folder to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. Open the published GitHub Pages address in Safari on the iPhone.
7. Tap **Share → Add to Home Screen → Add**.

The app stores workout entries only in the browser on the current device. It does not upload personal workout data to a server.

## Local preview

Service workers require a web server rather than opening `index.html` directly.

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
