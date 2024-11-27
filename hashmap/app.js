const hashMap = new HashMap();

function displayOutput(message) {
  const outputElement = document.getElementById("output");
  outputElement.textContent = message;
}

function addEntry() {
  const key = document.getElementById("key").value.trim();
  const value = document.getElementById("value").value.trim();

  if (!key || !value) {
    displayOutput("Error: Both key and value are required.");
    return;
  }

  hashMap.set(key, value);
  displayOutput(`Added: ${key} = ${value}`);
}

function getEntry() {
  const key = document.getElementById("key").value.trim();
  if (!key) {
    displayOutput("Error: Key is required.");
    return;
  }

  const value = hashMap.get(key);
  displayOutput(value ? `Value: ${value}` : `Key "${key}" not found.`);
}

function deleteEntry() {
  const key = document.getElementById("key").value.trim();
  if (!key) {
    displayOutput("Error: Key is required.");
    return;
  }

  const success = hashMap.remove(key);
  displayOutput(success ? `Removed: ${key}` : `Key "${key}" not found.`);
}

function checkKey() {
  const key = document.getElementById("key").value.trim();
  if (!key) {
    displayOutput("Error: Key is required.");
    return;
  }

  const result = hashMap.has(key);
  displayOutput(result ? `Key "${key}" exists.` : `Key "${key}" does not exist.`);
}

function showLength() {
  const length = hashMap.length();
  displayOutput(`Total entries: ${length}`);
}

function showKeys() {
  const keys = hashMap.keys();
  displayOutput(keys.length > 0 ? `Keys: ${keys.join(", ")}` : "No keys found.");
}

function showValues() {
  const values = hashMap.values();
  displayOutput(values.length > 0 ? `Values: ${values.join(", ")}` : "No values found.");
}

function showAll() {
  const entries = hashMap.entries();
  if (entries.length > 0) {
    displayOutput(entries.map(e => `${e.key}: ${e.value}`).join("\n"));
  } else {
    displayOutput("No entries found.");
  }
}

function clearAll() {
  hashMap.clear();
  displayOutput("All entries cleared.");
}
