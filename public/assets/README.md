# Audio Configuration

To change the background music:

1. Place your MP3 file in `public/assets/wedding-music.mp3`
2. Update the audio URL in `src/config/weddingConfig.ts` if using a different filename
3. Adjust the volume (0.0 to 1.0) in the same file

## Alternative: External URL

If you prefer to host audio elsewhere, update the `audio.url` in `weddingConfig.ts` to a full URL. Note that the external server must have CORS enabled.

## Current Setup

The audio is served locally from `/assets/wedding-music.mp3` which eliminates CORS issues and provides faster loading.
