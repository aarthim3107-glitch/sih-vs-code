window.onload=function(){
 let s=localStorage.getItem("selectedScheme")||"Please visit Model A first";
 let l=localStorage.getItem("loanAmount")||"50000";
 let sub=localStorage.getItem("subsidy")||"15%";
 let b=localStorage.getItem("businessType")||"Business";
 let sn=sub.replace(/[^0-9]/g,'')||"15";
 document.getElementById("schemeName").value=s;
 document.getElementById("bizType").value=b;
 document.getElementById("loan").value=l;
 document.getElementById("sub").value=sn;
 document.getElementById("fromA").innerHTML=`✅ Connected to Model A<br><b>${s}</b><br>Business: ${b} | Amount: ₹${parseInt(l).toLocaleString('en-IN')}`;
}
function calcEMI(){
 let L=parseFloat(document.getElementById('loan').value);
 let s=parseFloat(document.getElementById('sub').value);
 let r=parseFloat(document.getElementById('int').value)/12/100;
 let n=parseFloat(document.getElementById('ten').value);
 let subAmt=L*s/100; let pay=L-subAmt;
 let emi=(pay*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
 document.getElementById('result').style.display='block';
 document.getElementById('nextBtn').style.display='block';
 document.getElementById('result').innerHTML=`<b style="color:green">Subsidy: ₹${subAmt.toLocaleString('en-IN')}</b><br>You Pay Only: ₹${pay.toLocaleString('en-IN')}<br>EMI: ₹${emi.toFixed(0)}/month for ${n} months<br><small>Save: ₹${subAmt.toLocaleString('en-IN')}</small>`;
 localStorage.setItem("calculatedEMI",emi.toFixed(0));
 localStorage.setItem("payableAmount",pay);
}