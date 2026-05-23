const categories = {
  length: {
    title: "📏 Length",
    defaultFrom: "m",
    defaultTo: "cm",
    units: {
      nm: ["Nanometer", 1e-9],
      um: ["Micrometer", 1e-6],
      mm: ["Millimeter", 0.001],
      cm: ["Centimeter", 0.01],
      dm: ["Decimeter", 0.1],
      m: ["Meter", 1],
      km: ["Kilometer", 1000],
      inch: ["Inch", 0.0254],
      ft: ["Foot", 0.3048],
      yd: ["Yard", 0.9144],
      mile: ["Mile", 1609.344],
      nmi: ["Nautical mile", 1852]
    }
  },

  area: {
    title: "📐 Area",
    defaultFrom: "m2",
    defaultTo: "cm2",
    units: {
      mm2: ["Square millimeter", 0.000001],
      cm2: ["Square centimeter", 0.0001],
      m2: ["Square meter", 1],
      ar: ["Are", 100],
      ha: ["Hectare", 10000],
      km2: ["Square kilometer", 1000000],
      acre: ["Acre", 4046.8564224]
    }
  },

  weight: {
    title: "⚖️ Weight",
    defaultFrom: "kg",
    defaultTo: "lb",
    units: {
      ug: ["Microgram", 1e-9],
      mg: ["Milligram", 0.000001],
      g: ["Gram", 0.001],
      dkg: ["Dekagram", 0.01],
      kg: ["Kilogram", 1],
      q: ["Metric quintal", 100],
      t: ["Tonne", 1000],
      oz: ["Ounce", 0.028349523125],
      lb: ["Pound", 0.45359237],
      stone: ["Stone", 6.35029318]
    }
  },

  volume: {
    title: "🧪 Volume",
    defaultFrom: "l",
    defaultTo: "ml",
    units: {
      ml: ["Milliliter", 0.001],
      cl: ["Centiliter", 0.01],
      dl: ["Deciliter", 0.1],
      l: ["Liter", 1],
      m3: ["Cubic meter", 1000],
      tsp: ["US teaspoon", 0.0049289216],
      tbsp: ["US tablespoon", 0.0147867648],
      cup: ["US cup", 0.2365882365],
      pint: ["US pint", 0.473176473],
      quart: ["US quart", 0.946352946],
      gal: ["US gallon", 3.785411784]
    }
  },

  temperature: {
    title: "🌡️ Temperature",
    defaultFrom: "c",
    defaultTo: "f",
    temperature: true,
    units: {
      c: ["Celsius"],
      f: ["Fahrenheit"],
      k: ["Kelvin"]
    }
  },

  time: {
    title: "⏰ Time",
    defaultFrom: "h",
    defaultTo: "min",
    units: {
      ms: ["Millisecond", 0.001],
      s: ["Second", 1],
      min: ["Minute", 60],
      h: ["Hour", 3600],
      day: ["Day", 86400],
      week: ["Week", 604800],
      month: ["Month / 30 days", 2592000],
      year: ["Year / 365 days", 31536000]
    }
  },

  speed: {
    title: "🚗 Speed",
    defaultFrom: "kmh",
    defaultTo: "ms",
    units: {
      ms: ["Meter per second", 1],
      kmh: ["Kilometer per hour", 0.2777777778],
      mph: ["Mile per hour", 0.44704],
      knot: ["Knot", 0.514444],
      mach: ["Mach / approx.", 343]
    }
  },

  data: {
    title: "💾 Data",
    defaultFrom: "mb",
    defaultTo: "gb",
    units: {
      bit: ["Bit", 1],
      b: ["Byte", 8],
      kb: ["Kilobyte KB", 8000],
      mb: ["Megabyte MB", 8000000],
      gb: ["Gigabyte GB", 8000000000],
      tb: ["Terabyte TB", 8000000000000],
      kib: ["Kibibyte KiB", 8192],
      mib: ["Mebibyte MiB", 8388608],
      gib: ["Gibibyte GiB", 8589934592],
      tib: ["Tebibyte TiB", 8796093022208]
    }
  },

  energy: {
    title: "🔋 Energy",
    defaultFrom: "kwh",
    defaultTo: "j",
    units: {
      j: ["Joule", 1],
      kj: ["Kilojoule", 1000],
      cal: ["Calorie", 4.184],
      kcal: ["Kilocalorie", 4184],
      wh: ["Watt-hour", 3600],
      kwh: ["Kilowatt-hour", 3600000]
    }
  },

  power: {
    title: "⚡ Power",
    defaultFrom: "kw",
    defaultTo: "hp",
    units: {
      w: ["Watt", 1],
      kw: ["Kilowatt", 1000],
      mw: ["Megawatt", 1000000],
      hp: ["Horsepower HP", 745.699872]
    }
  },

  pressure: {
    title: "🌬️ Pressure",
    defaultFrom: "bar",
    defaultTo: "pa",
    units: {
      pa: ["Pascal", 1],
      hpa: ["Hectopascal", 100],
      kpa: ["Kilopascal", 1000],
      mpa: ["Megapascal", 1000000],
      bar: ["Bar", 100000],
      mbar: ["Millibar", 100],
      atm: ["Atmosphere", 101325],
      psi: ["PSI", 6894.757293]
    }
  },

  electricVoltage: {
    title: "🔌 Voltage",
    defaultFrom: "v",
    defaultTo: "mv",
    units: {
      uv: ["Microvolt", 0.000001],
      mv: ["Millivolt", 0.001],
      v: ["Volt", 1],
      kv: ["Kilovolt", 1000]
    }
  },

  electricCurrent: {
    title: "🔋 Current",
    defaultFrom: "a",
    defaultTo: "ma",
    units: {
      ua: ["Microampere", 0.000001],
      ma: ["Milliampere", 0.001],
      a: ["Ampere", 1],
      ka: ["Kiloampere", 1000]
    }
  },

  resistance: {
    title: "🧲 Resistance",
    defaultFrom: "ohm",
    defaultTo: "kohm",
    units: {
      mohm: ["Milliohm", 0.001],
      ohm: ["Ohm", 1],
      kohm: ["Kiloohm", 1000],
      mohm2: ["Megaohm", 1000000]
    }
  }
};

const tabs = document.getElementById("tabs");
const inputValue = document.getElementById("inputValue");
const outputValue = document.getElementById("outputValue");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const resultText = document.getElementById("resultText");

let currentCategory = "length";

function createTabs() {
  Object.keys(categories).forEach(key => {
    const button = document.createElement("button");

    button.className = "tab";
    button.textContent = categories[key].title;
    button.onclick = () => changeCategory(key);

    if (key === currentCategory) {
      button.classList.add("active");
    }

    tabs.appendChild(button);
  });
}

function changeCategory(category) {
  currentCategory = category;

  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");

    if (tab.textContent === categories[category].title) {
      tab.classList.add("active");
    }
  });

  loadUnits();
  convert();
}

function loadUnits() {
  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  const units = categories[currentCategory].units;

  Object.keys(units).forEach(key => {
    const option1 = document.createElement("option");
    option1.value = key;
    option1.textContent = `${units[key][0]} (${getSymbol(key)})`;

    const option2 = document.createElement("option");
    option2.value = key;
    option2.textContent = `${units[key][0]} (${getSymbol(key)})`;

    fromUnit.appendChild(option1);
    toUnit.appendChild(option2);
  });

  fromUnit.value = categories[currentCategory].defaultFrom;
  toUnit.value = categories[currentCategory].defaultTo;
}

function convert() {
  const value = parseFloat(inputValue.value);

  if (isNaN(value)) {
    outputValue.value = "";
    resultText.textContent = "Enter a value to convert";
    return;
  }

  const from = fromUnit.value;
  const to = toUnit.value;

  let result;

  if (categories[currentCategory].temperature) {
    result = convertTemperature(value, from, to);
  } else {
    const fromFactor = categories[currentCategory].units[from][1];
    const toFactor = categories[currentCategory].units[to][1];

    result = value * fromFactor / toFactor;
  }

  outputValue.value = formatNumber(result);
  resultText.textContent =
    `${formatNumber(value)} ${getSymbol(from)} = ${formatNumber(result)} ${getSymbol(to)}`;
}

function convertTemperature(value, from, to) {
  let celsius;

  if (from === "c") celsius = value;
  if (from === "f") celsius = (value - 32) * 5 / 9;
  if (from === "k") celsius = value - 273.15;

  if (to === "c") return celsius;
  if (to === "f") return celsius * 9 / 5 + 32;
  if (to === "k") return celsius + 273.15;
}

function formatNumber(number) {
  if (!isFinite(number)) {
    return "Cannot calculate";
  }

  if (
    Math.abs(number) >= 1e9 ||
    (Math.abs(number) < 0.000001 && number !== 0)
  ) {
    return number.toExponential(6);
  }

  return Number(number.toFixed(10)).toLocaleString("en-US");
}

function getSymbol(unit) {
  const symbols = {
    nm: "nm",
    um: "µm",
    mm: "mm",
    cm: "cm",
    dm: "dm",
    m: "m",
    km: "km",
    inch: "in",
    ft: "ft",
    yd: "yd",
    mile: "mi",
    nmi: "nmi",

    mm2: "mm²",
    cm2: "cm²",
    m2: "m²",
    ar: "a",
    ha: "ha",
    km2: "km²",
    acre: "acre",

    ug: "µg",
    mg: "mg",
    g: "g",
    dkg: "dkg",
    kg: "kg",
    q: "q",
    t: "t",
    oz: "oz",
    lb: "lb",
    stone: "st",

    ml: "ml",
    cl: "cl",
    dl: "dl",
    l: "l",
    m3: "m³",
    tsp: "tsp",
    tbsp: "tbsp",
    cup: "cup",
    pint: "pt",
    quart: "qt",
    gal: "gal",

    c: "°C",
    f: "°F",
    k: "K",

    ms: "ms",
    s: "s",
    min: "min",
    h: "h",
    day: "day",
    week: "week",
    month: "month",
    year: "year",

    kmh: "km/h",
    mph: "mph",
    knot: "kn",
    mach: "Mach",

    bit: "bit",
    b: "B",
    kb: "KB",
    mb: "MB",
    gb: "GB",
    tb: "TB",
    kib: "KiB",
    mib: "MiB",
    gib: "GiB",
    tib: "TiB",

    j: "J",
    kj: "kJ",
    cal: "cal",
    kcal: "kcal",
    wh: "Wh",
    kwh: "kWh",

    w: "W",
    kw: "kW",
    mw: "MW",
    hp: "HP",

    pa: "Pa",
    hpa: "hPa",
    kpa: "kPa",
    mpa: "MPa",
    bar: "bar",
    mbar: "mbar",
    atm: "atm",
    psi: "psi",

    uv: "µV",
    mv: "mV",
    v: "V",
    kv: "kV",

    ua: "µA",
    ma: "mA",
    a: "A",
    ka: "kA",

    mohm: "mΩ",
    ohm: "Ω",
    kohm: "kΩ",
    mohm2: "MΩ"
  };

  return symbols[unit] || unit;
}

function setValue(value) {
  inputValue.value = value;
  convert();
}

function clearValue() {
  inputValue.value = "";
  outputValue.value = "";
  resultText.textContent = "Enter a value to convert";
  inputValue.focus();
}

document.getElementById("swapBtn").addEventListener("click", () => {
  const temp = fromUnit.value;

  fromUnit.value = toUnit.value;
  toUnit.value = temp;

  convert();
});

inputValue.addEventListener("input", convert);
fromUnit.addEventListener("change", convert);
toUnit.addEventListener("change", convert);

createTabs();
loadUnits();
convert();