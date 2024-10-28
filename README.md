# Instructions
- Lead dev: Owen Hey (owen@fablevision.com)
- Producer: Snow Xue Dong (snow@fablevision.com)

# Tech

To run:
- npm install
- npm run dev   <--- for dev mode
- npm run build    <--- to make build, output gets placed in 'dist' folder.

Build notes:
- npm run build
- make sure to replace the favicon delivered with the build with the swiss flag one in the repo. Vue overwrites this for some reason
- can remove the .htaccess file on the server once everything is content-complete to improve load speeds

Uploading content sheet:
- Go here: https://docs.google.com/spreadsheets/d/1nM1ZI8YFJj6GgfEdif_OBIgxcIoqICMprXfXyzKCDEs/edit?gid=0#gid=0
- Export JSON -> **Export json for this sheet** (we only need the second sheet for this, labeled "rounds")
- Replace text.json in the text folder before building
- If the new content / translation is for something not coming from the json, just update it in the HTML / JavaScript.

If you run into caching issues on the server, just use a new folder / url on the server and update the `npm run build` script accordingly.

Place the created dist files in vhosts -> ami/landesmuseum on fvdev3
