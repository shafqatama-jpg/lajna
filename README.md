# Lajna Ima'illah coach lists & receipts

A phone-first app for running a coach trip: keep the attendee list for Friday, Saturday and Sunday, export a PDF list per day, and issue PDF receipts to anyone on the list. No server, no accounts — it all runs in the browser and works offline once opened.

## Upload to GitHub (all five files)

Put these in the root of the repository:

```
index.html
sw.js
manifest.webmanifest
icon-192.png
icon-512.png
icon-maskable.png
```

1. Create a repository on GitHub, e.g. `lajna-coach`. Make it **Public**.
2. Add file → Upload files → drag all six files in → Commit.
3. **Settings → Pages** → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`. Save.
4. After a minute open `https://<your-username>.github.io/lajna-coach/`.

All six must sit together. Without `sw.js` and the manifest the app still works, but it won't install to the home screen or work offline.

## On the phone — do this once

1. Open the link in **Safari** (iPhone) or **Chrome** (Android).
2. iPhone: Share button → *Add to Home Screen*. Android: three dots → *Install app*.
3. Open it from the home screen icon, go to **Setup** and tap **Protect this data**.

This matters. iPhones delete the stored data of ordinary web pages that haven't been opened for a few weeks. A home screen app with protected storage is exempt. The Setup tab shows you where you stand: whether saving works, whether storage is protected, whether you're running the home screen app, and when you last backed up.

Both PDF and Excel files are built on the phone itself, so it also works with no signal — the coach park, the motorway — including making PDFs.

## The six tabs

- **Overview** — where the app opens. Headcounts per day, a majlis-by-majlis table, money collected broken down by payment method, and who is still waiting on a receipt (with an Issue button beside each name). There's a one-page summary PDF to send to the president or finance secretary.
- **List** — add a person: name, phone, majlis, and the days they're attending. Tick all three for the whole weekend. Filter by day, search, edit, remove, or issue a receipt straight from their entry.
- **Day lists** — pick a day (or all three) and optionally a majlis, then download or share the list as **PDF** or **Excel (.xlsx)**. Columns are No., Name, Phone, Majlis, sorted alphabetically, with the total at the end. Tick "Separate page or sheet for each majlis" to break the list up: separate pages in the PDF, separate tabs in the Excel file. Phone numbers keep their leading zero in Excel.
- **Receipt** — pick someone from the list, tick the days they're travelling (these print on the fare line with their dates, e.g. "Coach fare — Friday 18, Saturday 19 & Sunday 20 September"), set the amount, sign on screen. The date field is the date the receipt is issued.
- **Issued** — every receipt issued, searchable. Re-share, download, edit or delete.
- **Setup** — defaults so each receipt is mostly pre-filled, the travel dates (set the Friday and the other two follow), plus storage status and backups.

## Sharing

On a phone, Share opens the normal share sheet — pick WhatsApp and a contact. On a laptop the PDF downloads and WhatsApp Web opens with a message ready, so you attach the file there.

## Backups

Everything lives on that one device. Use **Setup → Export backup** at the end of each day; the app reminds you if it's been a week. Keep the JSON file in email or cloud storage, and import it if you change phone. There are CSV exports too, for the list and for the receipts.

If several officers add people on different phones, export from each and import into one device to combine — nothing is lost, duplicates are skipped.

## Updating later

Upload a new `index.html` over the old one and bump `CACHE` in `sw.js` (e.g. `lajna-v2`). Saved lists and receipts are untouched by updates.
