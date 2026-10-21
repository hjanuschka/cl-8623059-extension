function fieldRow(key, values) {
  const row = document.createElement('div');
  row.className = 'field';
  const label = document.createElement('span');
  label.className = 'key';
  label.textContent = key + ': ';
  row.append(label, values.join(', '));
  return row;
}

function renderScript(script) {
  const box = document.createElement('div');
  box.className = 'script';
  box.append(fieldRow('matches', script.matches));
  if (script.excludeMatches) {
    box.append(fieldRow('excludeMatches', script.excludeMatches));
  }
  if (script.js) {
    box.append(fieldRow('js', script.js));
  }
  if (script.css) {
    box.append(fieldRow('css', script.css));
  }
  return box;
}

function renderExtension(info) {
  const item = document.createElement('li');
  item.className = 'extension';

  const name = document.createElement('div');
  name.className = 'name';
  name.textContent = info.name;

  const id = document.createElement('div');
  id.className = 'id';
  id.textContent = info.id;

  item.append(name, id);

  if (info.contentScripts) {
    for (const script of info.contentScripts) {
      item.append(renderScript(script));
    }
  } else {
    const none = document.createElement('div');
    none.className = 'none';
    none.textContent = 'no contentScripts reported';
    item.append(none);
  }
  return item;
}

chrome.management.getAll((all) => {
  const extensions = all.filter((info) => info.type === 'extension');
  const supported = extensions.some((info) => info.contentScripts);

  const support = document.getElementById('support');
  support.className = supported ? 'supported' : 'unsupported';
  support.textContent = supported
    ? 'chrome.management reports contentScripts in this build.'
    : 'chrome.management does not report contentScripts in this build.';

  const list = document.getElementById('list');
  for (const info of extensions) {
    list.append(renderExtension(info));
  }
});
