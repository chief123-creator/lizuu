# A Love Letter for LIZAAA

## Experience
- Replace the blank home page with a dark red and black, diary-inspired animated greeting.
- Play the opening automatically: “hey mommy”, then “i have created something for you”, followed by the diary page.
- Animate the exact LIZAAA message as the requested line-by-line build, including its repeated intermediate lines, then finish by typing the complete “LIZAAA I LOVE YOU SO MUCH” message on one line.
- Float the eight uploaded cat pictures around the page in randomly chosen positions with gentle motion.
- Keep the sequence readable on phones and desktops, respect reduced-motion preferences, and provide a replay control.

## Technical details
- Implement the experience on `/` using the existing TanStack Start route and design-token stylesheet; use the uploaded cat pictures as the floating imagery.
- Add page-specific title, description, and social metadata to the home route.
- Keep the animation client-safe and self-contained; no backend or external service is needed.
- Verify the preview, animation states, and existing routing test after implementation.
