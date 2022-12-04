const ACCESS_TOKEN = "REDACTED";

mapboxgl.accessToken = ACCESS_TOKEN;

// gets the user's location from browser data
function getLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by this browser.");
    return;
  }
  navigator.geolocation.getCurrentPosition(showPosition, noLocation);
}

// if geolocation is disabled, this set of coordinates are used
function noLocation(err) {
  console.log(err);
  showPosition([-0.1308206, 51.5229378]);
}

// creates the map, zoomed in and centered on given location
function showPosition(position) {
  let [long, lat] = Array.isArray(position)
    ? position
    : [position.coords.longitude, position.coords.latitude];
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    attributionControl: false,
    center: [long, lat],
    zoom: 13,
  });
  addRows(long, lat, map);
}

// object containing the preset data
const mockObj = {
  1: [
    "Becca Wilson",
    "Henri Artisse",
    "Nik Wallenda",
    "Joe Coltrane",
    "Hank Greene",
  ],
  2: [
    "Open Concert",
    "Street Painting",
    "Tightrope Juggling",
    "Jazz Improv",
    "Live Performance",
  ],
  3: [
    [0.0125, -0.0125],
    [0.01, 0.01],
    [-0.015, 0.001],
    [-0.01, 0.02],
    [-0.025, -0.015],
  ],
  4: ["1", "2", "3", "4", "5"],
};

// adds the presets to the html table, calls reverse geocoding and marker setup
async function addRows(long, lat, map) {
  let mainTable = document.getElementById("main-table");
  for (let k = 0; k < 5; k++) {
    let tmpLong = long + mockObj[3][k][0];
    let tmpLat = lat + mockObj[3][k][1];
    let tmpArtist = mockObj[1][k];
    let tmpEvent = mockObj[2][k];
    createMarker(tmpLat, tmpLong, tmpArtist, tmpEvent, map);
    let data = await getData([tmpLong, tmpLat]);
    mockObj[3][k] = data.split(",")[0];
  }
  for (let j = 0; j < 5; j++) {
    let newRow = mainTable.insertRow();
    imgCell = newRow.insertCell();
    imgCell.className = "owner-img-container";
    let img = document.createElement("img");
    img.src = `/images/${mockObj[4][j]}.png`;
    img.className = "owner-img";
    imgCell.appendChild(img);
    for (let i = 1; i <= 3; i++) {
      let cellElement = newRow.insertCell();
      let textCell = document.createTextNode(mockObj[i][j]);
      cellElement.appendChild(textCell);
    }
  }
}

// takes a set of coordinates and returns an address (reverse geocoding)
async function getData(coords) {
  let urlData = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords}.json?access_token=${ACCESS_TOKEN}`;
  const response = await fetch(urlData);
  const objData = await response.json();
  return objData["features"][0]["place_name"];
}

// creates a custom marker on the map and sets up it's properties
function createMarker(lat, long, artist, event, map) {
  let popUp = new mapboxgl.Popup({
    offset: 25,
    closeButton: false,
    className: "mapboxgl-popup",
  }).setHTML(`<h1>${artist}<br>${event}</h1>`);
  const el = document.createElement("div");
  el.className = "marker";
  const marker = new mapboxgl.Marker(el)
    .setLngLat([long, lat])
    .addTo(map)
    .setPopup(popUp);
}

getLocation();