const qrType = document.getElementById("qrType");
const dynamicFields = document.getElementById("dynamicFields");

const qrColor = document.getElementById("qrColor");
const bgColor = document.getElementById("bgColor");
const qrSize = document.getElementById("qrSize");
const sizeValue = document.getElementById("sizeValue");

const qrCode = document.getElementById("qrCode");
const qrDataOutput = document.getElementById("qrDataOutput");
const message = document.getElementById("message");
const historyList = document.getElementById("historyList");

const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const copyDataBtn = document.getElementById("copyDataBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

let currentData = "";
let qrHistory = JSON.parse(localStorage.getItem("qrHistory")) || [];

const fieldTemplates = {
  url: `
    <div class="control">
      <label>Website URL</label>
      <input type="url" id="urlInput" value="https://stefantusjak.cz">
    </div>
  `,

  text: `
    <div class="control">
      <label>Text</label>
      <textarea id="textInput">Hello from QR Code Generator Pro!</textarea>
    </div>
  `,

  email: `
    <div class="control">
      <label>Email Address</label>
      <input type="email" id="emailInput" value="info@example.com">
    </div>

    <div class="control">
      <label>Subject</label>
      <input type="text" id="emailSubject" value="Hello">
    </div>

    <div class="control">
      <label>Message</label>
      <textarea id="emailBody">I would like to contact you.</textarea>
    </div>
  `,

  phone: `
    <div class="control">
      <label>Phone Number</label>
      <input type="tel" id="phoneInput" value="+420777123456">
    </div>
  `,

  sms: `
    <div class="control">
      <label>Phone Number</label>
      <input type="tel" id="smsPhone" value="+420777123456">
    </div>

    <div class="control">
      <label>SMS Message</label>
      <textarea id="smsMessage">Hello!</textarea>
    </div>
  `,

  wifi: `
    <div class="control">
      <label>Network Name SSID</label>
      <input type="text" id="wifiSsid" value="My WiFi">
    </div>

    <div class="control">
      <label>Password</label>
      <input type="text" id="wifiPassword" value="mypassword123">
    </div>

    <div class="control">
      <label>Encryption</label>
      <select id="wifiEncryption">
        <option value="WPA">WPA/WPA2</option>
        <option value="WEP">WEP</option>
        <option value="nopass">No Password</option>
      </select>
    </div>
  `
};

function renderFields() {
  dynamicFields.innerHTML = fieldTemplates[qrType.value];

  dynamicFields.querySelectorAll("input, textarea, select").forEach(input => {
    input.addEventListener("input", generateQRCode);
    input.addEventListener("change", generateQRCode);
  });

  generateQRCode();
}

function getFieldValue(id) {
  const element = document.getElementById(id);
  return element ? element.value.trim() : "";
}

function buildQRData() {
  const type = qrType.value;

  if (type === "url") {
    const url = getFieldValue("urlInput");
    return url || "https://example.com";
  }

  if (type === "text") {
    return getFieldValue("textInput") || "Hello!";
  }

  if (type === "email") {
    const email = getFieldValue("emailInput");
    const subject = encodeURIComponent(getFieldValue("emailSubject"));
    const body = encodeURIComponent(getFieldValue("emailBody"));

    return `mailto:${email}?subject=${subject}&body=${body}`;
  }

  if (type === "phone") {
    return `tel:${getFieldValue("phoneInput")}`;
  }

  if (type === "sms") {
    const phone = getFieldValue("smsPhone");
    const text = encodeURIComponent(getFieldValue("smsMessage"));

    return `sms:${phone}?body=${text}`;
  }

  if (type === "wifi") {
    const ssid = getFieldValue("wifiSsid");
    const password = getFieldValue("wifiPassword");
    const encryption = getFieldValue("wifiEncryption");

    if (encryption === "nopass") {
      return `WIFI:T:nopass;S:${ssid};;`;
    }

    return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
  }

  return "";
}

function generateQRCode(saveHistory = false) {
  currentData = buildQRData();

  qrCode.innerHTML = "";

  new QRCode(qrCode, {
    text: currentData,
    width: Number(qrSize.value),
    height: Number(qrSize.value),
    colorDark: qrColor.value,
    colorLight: bgColor.value,
    correctLevel: QRCode.CorrectLevel.H
  });

  qrDataOutput.textContent = currentData;
  sizeValue.textContent = `${qrSize.value}px`;

  if (saveHistory) {
    addToHistory();
  }

  message.textContent = "";
}

function addToHistory() {
  const item = {
    type: qrType.value,
    data: currentData,
    date: new Date().toLocaleString()
  };

  qrHistory = [
    item,
    ...qrHistory.filter(historyItem => historyItem.data !== currentData)
  ].slice(0, 5);

  localStorage.setItem("qrHistory", JSON.stringify(qrHistory));
  renderHistory();
}

function renderHistory() {
  if (qrHistory.length === 0) {
    historyList.innerHTML = `<div class="empty">No recent QR codes yet.</div>`;
    return;
  }

  historyList.innerHTML = `
    <div class="history-list">
      ${qrHistory.map((item, index) => `
        <div class="history-item">
          <div>
            <strong>${item.type.toUpperCase()}</strong>
            <span>${item.data}</span>
          </div>

          <button onclick="loadHistoryItem(${index})">
            Load
          </button>
        </div>
      `).join("")}
    </div>
  `;
}

function loadHistoryItem(index) {
  const item = qrHistory[index];

  qrType.value = item.type;
  renderFields();

  setTimeout(() => {
    if (item.type === "url") {
      document.getElementById("urlInput").value = item.data;
    }

    if (item.type === "text") {
      document.getElementById("textInput").value = item.data;
    }

    if (item.type === "phone") {
      document.getElementById("phoneInput").value = item.data.replace("tel:", "");
    }

    currentData = item.data;
    generateQRCode();
  }, 0);
}

function downloadPNG() {
  const canvas = qrCode.querySelector("canvas");
  const img = qrCode.querySelector("img");

  let dataUrl = "";

  if (canvas) {
    dataUrl = canvas.toDataURL("image/png");
  } else if (img) {
    dataUrl = img.src;
  }

  if (!dataUrl) {
    message.textContent = "Download failed.";
    return;
  }

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "qr-code.png";
  link.click();

  message.textContent = "QR Code downloaded!";
}

async function copyCurrentData() {
  try {
    await navigator.clipboard.writeText(currentData);
    message.textContent = "QR data copied to clipboard!";
  } catch {
    message.textContent = "Copy failed.";
  }
}

function clearHistory() {
  qrHistory = [];
  localStorage.removeItem("qrHistory");
  renderHistory();
  message.textContent = "History cleared.";
}

qrType.addEventListener("change", renderFields);

[
  qrColor,
  bgColor,
  qrSize
].forEach(input => {
  input.addEventListener("input", generateQRCode);
});

generateBtn.addEventListener("click", () => generateQRCode(true));
downloadBtn.addEventListener("click", downloadPNG);
copyDataBtn.addEventListener("click", copyCurrentData);
clearHistoryBtn.addEventListener("click", clearHistory);

renderFields();
renderHistory();