# Content Script Inspector

Demo extension for Chromium CL
[8623059](https://chromium-review.googlesource.com/c/chromium/src/+/8623059),
which adds a `contentScripts` field to `chrome.management.ExtensionInfo`
(crbug.com/41131764).

It calls `chrome.management.getAll()` and lists, for every installed
extension, the content scripts declared in that extension's manifest:
`matches`, `excludeMatches`, `js` and `css`.

## Run it

```bash
chrome --load-extension=/path/to/cl-8623059-extension
```

Then click the extension action.

- On a build with the CL: each extension shows its declared content scripts.
- On current Chrome: every extension shows "no contentScripts reported",
  because the field does not exist yet.

## Sample extension to inspect

`sample-target/` is a trivial extension that declares two content scripts, so
there is something to look at:

```bash
chrome --load-extension=/path/to/cl-8623059-extension,/path/to/cl-8623059-extension/sample-target
```
