var map=L.map('map').setView([8.7139,77.7567],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);
var userMarker=L.marker([8.7139,77.7567]).addTo(map).bindPopup("You - Entrepreneur").openPopup();
var partnerMarker=L.marker([8.7239,77.7667]).addTo(map).bindPopup("Canara Bank");
var routeLine=null;
const pts={bank:[8.7239,77.7667],dic:[8.7339,77.7467],supplier:[8.7039,77.7667],training:[8.7139,77.7867]};
window.onload=function(){
 let s=localStorage.getItem("selectedScheme")||"PMMY Scheme";
 let l=localStorage.getItem("loanAmount")||"50000";
 let b=localStorage.getItem("businessType")||"Business";
 let emi=localStorage.getItem("calculatedEMI")||"Not calculated";
 document.getElementById("infoBox").innerHTML=`✅ From Model A & B<br>Scheme: <b>${s}</b> | Business: <b>${b}</b><br>Loan: ₹${parseInt(l).toLocaleString('en-IN')} | EMI: ₹${emi}/month`;
}
function changePartner(){
 let v=document.getElementById("partner").value; let c=pts[v];
 if(partnerMarker)map.removeLayer(partnerMarker);
 partnerMarker=L.marker(c).addTo(map).bindPopup(v).openPopup();
 if(routeLine)map.removeLayer(routeLine);
 document.getElementById("routeCard").style.display='none';
}
function useMyLocation(){
 navigator.geolocation.getCurrentPosition(pos=>{
  let lat=pos.coords.latitude, lon=pos.coords.longitude;
  map.setView([lat,lon],14);
  if(userMarker)map.removeLayer(userMarker);
  userMarker=L.marker([lat,lon]).addTo(map).bindPopup("You are here").openPopup();
 });
}
function findRoute(){
 let u=userMarker.getLatLng(), p=partnerMarker.getLatLng();
 if(routeLine)map.removeLayer(routeLine);
 routeLine=L.polyline([u,p],{color:'blue',weight:6}).addTo(map);
 map.fitBounds([u,p],{padding:[80,80]});
 let d=map.distance(u,p);
 document.getElementById("routeCard").style.display='block';
 document.getElementById("routeInfo").innerHTML=`Distance: <b>${(d/1000).toFixed(1)} km</b> | Time: <b>${Math.round(d/400)} mins</b> | Auto Fare: ₹${Math.round(d/30)}<br>Partner: ${document.getElementById("partner").selectedOptions[0].text}`;
}
function openGMap(){
 let p=partnerMarker.getLatLng(), u=userMarker.getLatLng();
 window.open(`https://www.google.com/maps/dir/${u.lat},${u.lng}/${p.lat},${p.lng}/`,'_blank');
}