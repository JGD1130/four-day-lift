# 4-Day Lift — Version 3

A mobile-first four-workout lifting tracker designed to be hosted with GitHub Pages and added to an iPhone Home Screen.

## Version 3 highlights

- A → B → C → D workout rotation instead of fixed weekdays
- Automatically recommends the next workout based on the last completed workout
- Shows when major muscle groups were last trained
- Workout and rest timers
- Skip any exercise or add a custom exercise
- Save custom exercises permanently to a workout
- Workout notes and history
- Selected exercises include offline FORM guides with simple looping movement animations
- Abdominal crunch machine on all workouts
- Strider cardio finisher on all workouts
- Knee-conscious lower-body programming

## Update an existing GitHub Pages install

Upload all files and the `icons` folder from this directory to the root of the existing GitHub repository and commit the changes. The Version 3 service worker uses a new cache name so the Home Screen app will refresh its offline files after the update reaches GitHub Pages.

If the Home Screen app briefly shows the old version, open the hosted URL in Safari, refresh once, fully close the Home Screen app, and reopen it.

Workout history and preferences remain in the browser's local storage. Version 3 migrates the prior Monday/Tuesday/Thursday/Saturday workout IDs into A/B/C/D rotation IDs.
