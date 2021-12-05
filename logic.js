var myMap = L.map("map", {
  center: [14.5995, 120.9842],
  zoom: 11
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var link = "static/data/phWF.json";

// function chooseColor(VP) {
//   switch (VP) {
//   case "VP: MARCOS, BONGBONG (IND)":
//     return "red";
//   case "VP: ROBREDO, LENI DAANG MATUWID (LP)":
//     return "yellow";
//   case "VP: ESCUDERO, CHIZ (IND)":
//     return "blue";
//   case "VP: CAYETANO, ALAN PETER (IND)":
//     return "green";
//   default:
//     return "black";
//   }
// }

d3.json(link, function(data) {
  L.geoJson(data, {
    // style: function(feature) {
    //   return {
    //     color: "white",
    //     fillColor: chooseColor(feature.properties.VP),
    //     fillOpacity: 0.5,
    //     weight: 1.5
    //   };
    // },
    onEachFeature: function(feature, layer) {
      layer.on({
         mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      layer.bindPopup("<h1>" + feature.properties.PROVINCE + "</h1> <hr> <h4>" + feature.properties.PRES + "</h4> <h4>" + feature.properties.VP + "</h4> ");
    }
  }).addTo(myMap);
});

