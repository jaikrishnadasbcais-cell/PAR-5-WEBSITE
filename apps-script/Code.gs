/**
 * PAR5 — /tap-in form receiver (Google Apps Script).
 *
 * Receives the JSON body POSTed by src/lib/forms/submit.ts and appends one row
 * to the active sheet. The client never sends a timestamp; we stamp server-side.
 *
 * This file is NOT part of the Next.js build. It is kept in the repo so the
 * script that receives our leads is versioned alongside the form that sends
 * them — paste it into the bound Apps Script project when it changes.
 *
 * Deploy: Deploy > New deployment > Web app
 *   - Execute as: Me
 *   - Who has access: Anyone
 * Copy the /exec URL into the GOOGLE_APPS_SCRIPT_URL env var.
 *
 * IMPORTANT — failures throw rather than returning { ok: false }.
 * Apps Script web apps always answer HTTP 200 for anything ContentService
 * returns; you cannot set a status code. submit.ts decides success purely on
 * `res.ok` and never reads the body, so a returned { ok: false } would arrive
 * as a 200 and the visitor would see "Got it — you're in" while nothing was
 * written. Throwing makes Apps Script answer 500, which is what actually
 * drives the adapter into { ok: false, error: 'server' } and surfaces the
 * WhatsApp fallback. The { ok: true } body is cosmetic: useful when curling
 * the endpoint, ignored by the adapter.
 */

// Column order must match the sheet header row exactly.
// `demoAnswers` is populated when the lead arrived through the v3.4 demo
// qualifier; drop it from this array only if the sheet has no such column.
var COLUMNS = [
  'timestamp',
  'formType',
  'name',
  'email',
  'company',
  'phone',
  'serviceInterest',
  'message',
  'sourcePage',
  'buildSelections',
  'demoAnswers',
];

function doPost(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Empty request body');
  }

  // The adapter sends Content-Type: text/plain, so read the raw body rather
  // than expecting a parsed JSON type. Do not add a content-type check.
  var payload;
  try {
    payload = JSON.parse(e.postData.contents);
  } catch (err) {
    throw new Error('Body was not valid JSON: ' + err);
  }

  if (!payload.formType || !payload.name || !payload.email) {
    throw new Error('Missing required field (formType, name, email)');
  }

  // Serialize appends: two submissions landing together can otherwise
  // interleave and clobber a row.
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Server-side timestamp. A client-sent one would be untrusted, and wrong
    // across timezones anyway.
    var row = COLUMNS.map(function (key) {
      if (key === 'timestamp') return new Date();
      return sanitizeCell(payload[key]);
    });

    sheet.appendRow(row);
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON
  );
}

/**
 * Optional fields arrive as undefined (the Server Action strips empty strings
 * before Zod parses), so they become ''. `sourcePage` is always present — its
 * Zod rule has .catch('/tap-in'). Values starting with = + @ would be
 * evaluated as formulas on append, so they get a literal-text prefix.
 */
function sanitizeCell(value) {
  if (value === undefined || value === null) return '';
  var str = String(value);
  if (/^[=+@]/.test(str)) return "'" + str;
  return str;
}

/** Health check: visiting the /exec URL in a browser should say ok. */
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, service: 'par5-tap-in' })
  ).setMimeType(ContentService.MimeType.JSON);
}
