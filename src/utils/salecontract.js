import store from '@/store'
function cutnull(data) {
  for (const x in data) {
    if (data[x] === null || data[x] === undefined || data[x] === '') { // 如果是null 把直接内容转为 ''
      data[x] = ''
    } else {
      if (Array.isArray(data[x])) { // 是数组遍历数组 递归继续处理
        data[x] = data[x].map(z => {
          return cutnull(z)
        })
      }
      if (typeof (data[x]) === 'object') { // 是json 递归继续处理
        data[x] = cutnull(data[x])
      }
    }
  }
  return data
}
const needdata = cutnull(JSON.parse(localStorage.getItem('getprintdata')))
const repositorydata = cutnull(JSON.parse(localStorage.getItem('setrepository')))

let cardata = {}
function judgeiscar() {
  const needcar = needdata.saleContractDetailVos.filter(item => {
    return item.productCode.substr(0, 2) === '01'
  })
  cardata = cutnull(needcar[0])
  console.log('repositorydata', repositorydata)
}
const selectcompany = localStorage.getItem('selectcompany')
let imgurl = ''
if (selectcompany === '1' || selectcompany === 1) {
  imgurl = 'static/print/2607d2ec-a7d4-4900-a726-9c360bc0c8f4.001.png'
} else if (selectcompany === '2' || selectcompany === 2) {
  imgurl = 'static/print/printimg2.png'
} else if (selectcompany === '3' || selectcompany === 3) {
  imgurl = 'static/print/printimg3.png'
} else if (selectcompany === '4' || selectcompany === 4) {
  imgurl = 'static/print/printimg4.png'
} else if (selectcompany === '5' || selectcompany === 5) {
  imgurl = 'static/print/printimg5.png'
} else if (selectcompany === '6' || selectcompany === 6) {
  imgurl = 'static/print/printimg6.png'
}

judgeiscar()
const content = `
<div style="text-align: center;">
      <div style="display: flex;align-items: center; justify-content: center;">
        <img src="/test/static/xianjin/img1.jpg" width="100%" height="1000" alt="nwow (1).jpg" style="-aw-left-pos:-2pt; -aw-rel-hpos:page; -aw-rel-vpos:paragraph; -aw-top-pos:-15.45pt; -aw-wrap-type:none; margin-left:0pt; margin-top:350pt; position:absolute; z-index:1999" />
      </div>
      <div style="margin-top: 65px; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS________${repositorydata.address}_____________</span>
      </div>
      <div style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.__${repositorydata.phone}_______</span>
      </div>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="font-size:8pt; line-height:108%; margin:0pt 0pt 8pt">
        <br style="page-break-before:always; clear:both" /></p>
      <div style="font-size:8pt;width:100%;">
        <div style="width:100%; height:812pt;display: flex;align-items: center; justify-content: center;">
          <img src="/test/static/xianjin/img2.png" width="100%" height="125" alt="BACK.jpg" style="margin-left:15pt; margin-top:300pt; position:absolute; z-index:1999;display: flex;align-items: center; justify-content: center;" />
          <img src="/test/static/xianjin/img3.png" width="100%" height="1080" alt="" style=" margin-left:0pt; margin-top:640pt; position:absolute; z-index:17;display: flex;align-items: center; justify-content: center;" />
         
        <br style="page-break-before:always; clear:both" />
      </div>
        <div style="padding-top: 900px"></div>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt;display: flex;justify-content: center;align-items: center;">
        <img src="/test/static/xianjin/img5.png" width="165" height="46" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0.02pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'High Tower Text'; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS________${repositorydata.address}_____________</span></p>
      <p style="margin:0pt;text-align:center">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.__${repositorydata.phone}_______</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Gungsuh; font-size:16pt; font-weight:bold; text-decoration:underline">SALESCERTIFICATION</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center;">
        <span style="font-family:'Times New Roman'; font-size:12pt">This is to certify that the Sales Invoice No.______ was issued to _______${needdata.customerName}_______________</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">__________</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">_</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:12pt">Of</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">______________${needdata.address}____________________________</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">______</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xad;</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xad;</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xad;</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xad;</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xad;</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">f</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">or the</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">purchased in</span>
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold; text-decoration:underline">CASH</span></br>
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold; text-decoration:underline"></span>
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold; text-decoration:underline">BASIS</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">of</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">one</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">Electric Motor Vehicle</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">d</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">escribed hereunder:</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">DATE PURCHASED</span>
        <span style="width:25.44pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">:</span>
        <span style="width:31.92pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">_____________________________</span></p>
      <p style="margin:0pt">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">MODEL OF VEHICLE</span>
        <span style="width:14.4pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">:</span>
        <span style="width:31.92pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">______${cardata.productTypeName}_________</span></p>
      <p style="margin:0pt">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">COLOR</span>
        <span style="width:26.89pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">:</span>
        <span style="width:31.92pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">_____${cardata.color}________________________</span></p>
      <p style="margin:0pt">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">MOTOR NUMBER</span>
        <span style="width:0.01pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">:</span>
        <span style="width:31.92pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">_________${cardata.motorCode}____________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">         VEHICLE NUMBER</span>
        <span style="width:26.42pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">:</span>
        <span style="width:31.92pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">__________${cardata.carCode}___________________</span></p>
      <p style="margin:0pt">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">BATTERY</span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">NUMBER</span>
        <span style="width:23.75pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">:</span>
        <span style="width:31.92pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">______${cardata.batteryCode}_______________________</span></p>
      <p style="margin:0pt">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">CHARGER NUMBER</span>
        <span style="width:20.17pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">:</span>
        <span style="width:31.92pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt">________${cardata.chargeCode}_____________________</span></p>
        <p style="margin:0pt">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">COTROLLER NUMBER</span>
        <span style="width:20.17pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">:</span>
        <span style="width:31.92pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt">________${cardata.controlCode}_____________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Bookman Old Style'; font-size:12pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">NOTE:</span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt">Not</span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt">to sell, assign, lease, pledge or otherwise encumber the subject chattel, or convey in any matter whatsoever our right to purchased it to any other third person without the prior written consent to the</span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt">VENDOR</span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt">.</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Bookman Old Style'; font-size:12pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Bookman Old Style'; font-size:12pt">____________________________</span>
        <span style="width:12pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt">_________________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:11pt">Customer’s Signature over Printed Name            </span>
        <span style="width:34.79pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Times New Roman'; font-size:11pt">NWOW</span>
        <span style="font-family:'Times New Roman'; font-size:11pt">Marketing Representative</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Bookman Old Style'; font-size:12pt">&#xa0;</span></p>
<!--       <img src="bca2f14c-20dd-4380-a9d9-c6d31aa9268b.006.png" width="791" height="1" alt="" style="-aw-left-pos:5pt; -aw-rel-hpos:page; -aw-rel-vpos:paragraph; -aw-top-pos:8.7pt; -aw-wrap-type:none; margin-left:-0.38pt; margin-top:8.32pt; position:absolute; z-index:0" />
 -->      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <p style="margin:0pt; display: flex;align-items: center;justify-content: center;">
        <img src="/test/static/xianjin/img5.png" width="194" height="45" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0.61pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS________${repositorydata.address}_____________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.__${repositorydata.phone}_______</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <h1 style="margin:0pt; page-break-after:avoid; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">WARRANTY POLICY AND GUIDELINES</span></h1>
      <p style="font-size:9pt; line-height:105%; margin:0pt 0pt 0.2pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">1.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
<!--         <img src="bca2f14c-20dd-4380-a9d9-c6d31aa9268b.008.png" width="675" height="390" alt="" style="-aw-left-pos:20.96pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:3.47pt; -aw-wrap-type:none; margin-left:-11.69pt; margin-top:3.47pt; position:absolute; z-index:-65522" />
 -->        <span style="font-family:Arial; font-size:9pt; font-weight:bold">NWOW MARKETING</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal; line-height: 20px">shall not be liable under this warranty if any damage or defect result from  (</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">i</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal; line-height: 20px">) misuse, abuse,  neglect   improper shipping  or  installation; (ii) disasters such as fire, flood, lightning or improper electric current; or (iii) service   or alteration by anyone other than an authorized NWOW MARKETING representative; (iv) damages incurred through    irresponsible use, or other non-recommended practices.</span></p>
      <p style="margin:0pt 0pt 0pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">2.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Arial; font-size:9pt; font-style:italic; font-weight:bold; line-height: 20px">If the E-Bike will use for business or personal purpose, family use like delivering or use in any heavy activities that may exceed in its maximum load weight and may cause any damage or defect in E-Bike, warranty period of all affected parts will</span>
        <span style="font-family:Arial; font-size:9pt; font-style:italic; font-weight:bold">be going</span>
        <span style="font-family:Arial; font-size:9pt; font-style:italic; font-weight:bold">to be half of its original warranty period.     </span></p>
      <p style="font-size:9pt; line-height:105%; margin:0pt 0pt 0.2pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">3.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal; line-height: 20px">You must retain your bill of sale or other proof of purchase to receive warranty service.</span></p>
      <p style="font-size:9pt; line-height:105%; margin:0pt 0pt 0.2pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">4.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal; line-height: 20px">No warranty extension will be granted for any replacement part(s) furnished to the purchaser in fulfillment of this warranty.</span></p>
      <p style="font-size:9pt; line-height:105%; margin:0pt 0pt 0.2pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">5.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">LIFETIME FREE SERVICE.</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal; line-height: 20px">Any service taken are free of charge. Only the parts which are not cover by the limited warranty will charged by the company.</span></p>
      <p style="margin:0pt 0pt 0pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">6.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal; line-height: 20px">The company offers free home service to the Major malfunction of the unit (</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal; line-height: 20px">i</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal; line-height: 20px">)electrical problem(ii)flat tire and any   troubleshooting occurs which cause the E-Bike not to run. Home service will be schedule and the company</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal; line-height: 20px">exerts</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal; line-height: 20px">its effort    to repair the malfunction within 48hours. The customer will be responsible to inform the company for any major malfunction    of the E-Bike. The company will just service the E-bike to the place registered on our system.</span></p>
      <p style="font-size:9pt; line-height:105%; margin:0pt 0pt 0.2pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">7.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">All the payment must</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">settle</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal; line-height: 20px">before any warranty or service applied. The company has the right to delay our service warranty for our client who didn’t pay their monthly amortization on time. </span></p>
      <p style="margin:0pt 0pt 2.05pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">8.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Arial; font-size:9pt; font-style:italic; font-weight:bold">If the unit has been installed or customized with other parts by anyone other than an authorized company   representative like roof, basket, saddle or others for business or overload use, warranty of major parts and all affected parts will be voided.</span></p>
      <p style="margin:0pt 0pt 2.05pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">9.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <a name="_Hlk28588957">
          <span style="font-family:Calibri; font-size:10pt; font-weight:normal">Ifthee</span>
          <span style="font-family:Calibri; font-size:10pt; font-weight:normal">-bike</span>
          <span style="font-family:Calibri; font-size:10pt; font-weight:normal">wasalreadydone</span>
          <span style="font-family:Calibri; font-size:10pt; font-weight:normal"></span>
          <span style="font-family:Calibri; font-size:10pt; font-weight:normal">fixedinstore,branch</span>
          <span style="font-family:Calibri; font-size:10pt; font-weight:normal"></span>
          <span style="font-family:Calibri; font-size:10pt; font-weight:normal">willinformcustomertoclaimthe</span>
          <span style="font-family:Calibri; font-size:10pt; font-weight:normal"></span>
          <span style="font-family:Calibri; font-size:10pt; font-weight:normal">ebike</span>
          <span style="font-family:Calibri; font-size:10pt; font-weight:normal">andtherewillbe</span>
          <span style="font-family:Calibri; font-size:10pt; font-weight:bold">7</span>
          <span style="font-family:Calibri; font-size:10pt; font-weight:bold">daysFREEparking</span>
          <span style="font-family:Calibri; font-size:10pt; font-weight:bold">.</span>
          <span style="font-family:Calibri; font-size:10pt; font-weight:normal">Afterthe7</span>
          <span style="font-family:Calibri; font-size:10pt; font-weight:normal">daysFREEparking,ifcustomerstillnotclaimthee</span>
          <span style="font-family:Calibri; font-size:10pt; font-weight:normal">-bike,therewillbe</span>
          <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">P20.00 charged per day</span>
          <span style="font-family:Calibri; font-size:10pt; font-weight:normal">as parking fee in store within 60 days. And company not holds any responsibility for</span>
          <span style="font-family:Calibri; font-size:10pt; font-weight:normal">anydamage</span></a>
      </p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0pt 32.65pt; text-align:center">
        <span style="font-family:Arial; font-size:11pt">--------------</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:11pt">                     I hereby understand the Company policy and Guidelines regarding with the warranty.</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:11pt">   _____________________________                           </span>
        <span style="width:16.05pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:11pt">_________________________       </span></p>
      <p style="margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:10pt">  Customer’s Signature</span>
        <span style="font-family:Arial; font-size:10pt">over</span>
        <span style="font-family:Arial; font-size:10pt">Printed Name                   </span>
        <span style="width:8.78pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:10pt">NWOW Marketing Representative</span></p>
        <div style="display: flex;align-items: center;justify-content: center;padding-top: 400px"> 
          <img src="/test/static/xianjin/img6.png" width="773" height="670" alt="" style="-aw-left-pos:-21.55pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:-3.4pt; -aw-wrap-type:none; margin-top:-3.4pt; position:absolute; z-index:19" />
        </div>
      
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Arial; font-size:10pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt">
        <span style="font-family:'Sakkal Majalla'; font-size:11pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:11pt">   _____________________________                           </span>
        <span style="width:16.05pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:11pt">_________________________       </span></p>
<!--       <img src="bca2f14c-20dd-4380-a9d9-c6d31aa9268b.006.png" width="791" height="1" alt="" style="-aw-left-pos:2176.4pt; -aw-rel-hpos:page; -aw-rel-vpos:paragraph; -aw-top-pos:12.4pt; -aw-wrap-type:none; margin-left:-69.47pt; margin-top:12.02pt; position:absolute; z-index:10" />
 -->      <p style="margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:10pt">  Customer’s Signature over Printed Name                   </span>
        <span style="width:8.78pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:10pt">NWOW Marketing Representative</span></p>
        <div style="display: flex;align-items: center;justify-content: center;padding-top: 90px">
                <img src="/test/static/xianjin/img5.png" width="165" height="54" style="-aw-left-pos:199.64pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0.85pt; -aw-wrap-type:none; margin-top:0.85pt; position:absolute; z-index:8" />

        </div>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Arial; font-size:10pt">&#xa0;</span></p>
      <p style="margin:0pt 0pt 8pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS________${repositorydata.address}_____________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.__${repositorydata.phone}_______</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:14pt; font-weight:bold">WAIVER OF LIABILITY</span></p>
<!--       <img src="bca2f14c-20dd-4380-a9d9-c6d31aa9268b.011.png" width="372" height="212" alt="" style="-aw-left-pos:106.13pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:11.76pt; -aw-wrap-type:none; margin-left:106.13pt; margin-top:11.76pt; position:absolute; z-index:-65526" />
 -->      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt 0pt 8pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:10pt">This hereby releases</span>
        <span style="font-family:'Times New Roman'; font-size:10pt; font-weight:bold">NWOW Marketing</span>
        <span style="font-family:'Times New Roman'; font-size:10pt">from any and all liabilities upon apprehension/s of Mr. / Ms. __________${needdata.customerName}___________________ by any government agencies for all types of traffic violation and from any all injuries suffered by him / her or by third person/s, financial or otherwise, while driving the above describe</span>
        <span style="font-family:'Times New Roman'; font-size:10pt">Electric Motor Vehicle</span>
        <span style="font-family:'Times New Roman'; font-size:10pt">unit. I, ________________________________________, fully understand and agreed to the foregoing.</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span></p>
      <p style="margin:0pt; padding-left:36pt; text-indent:-36pt">
        <span style="font-family:'Times New Roman'; font-size:10pt">___________________________________</span>
        <span style="width:2.5pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Times New Roman'; font-size:10pt">____</span>
        <span style="font-family:'Times New Roman'; font-size:10pt">____________________________</span></p>
      <p style="margin:0pt; padding-left:36pt; text-indent:-36pt">
        <span style="font-family:'Times New Roman'; font-size:10pt">Signature over printed name Buyer</span>
        <span style="width:27.93pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Times New Roman'; font-size:10pt">Date</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:10pt"></span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:10pt">Signed in presence of:</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:10pt">___________________________________</span>
        <span style="width:2.5pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Times New Roman'; font-size:10pt">________________________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:10pt">        Sales and Service Representative</span>
        <span style="width:25.05pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Times New Roman'; font-size:10pt">Date</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; display: flex;align-items: center;justify-content: center;">
        <img src="/test/static/xianjin/img5.png" width="181" height="48" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:1.25pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS________${repositorydata.address}_____________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.__${repositorydata.phone}_______</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:11pt">Name of Customer: ______${needdata.customerName}______________________     </span>
        <span style="width:0.7pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:11pt">Date: ___________________</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt; padding-left:0.5pt; text-indent:-0.5pt;padding-top: 10px">
        <span style="font-family:Arial; font-size:11pt">Unit purchase: ____${cardata.productTypeName}______${cardata.color}_____________________       </span>
        <span style="width:33.62pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:11pt">Branch: ________${needdata.saleRepositoryName}__________</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
<!--       <img src="bca2f14c-20dd-4380-a9d9-c6d31aa9268b.013.png" width="659" height="413" alt="" style="-aw-left-pos:17.25pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:57.05pt; -aw-wrap-type:none; margin-left:17.25pt; margin-top:57.05pt; position:absolute; z-index:-65528" />
 -->      <p style="font-size:11pt; line-height:108%; margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:'Arial Rounded MT'; font-size:11pt; font-weight:bold">DELIVERY CHECK LIST </span></p>
      <table cellspacing="0" cellpadding="0" style="border-collapse:collapse; width:100%">
        <tr style="height:16.25pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">ERV</span>
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">and ERVS</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.7pt">
            <p style="margin:0pt; text-align:center">
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">T-</span>
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">KING</span>
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">,</span>
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">M3</span>
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">and ARS</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:125.7pt">
            <p style="margin:0pt; text-align:center">
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">HERO and        WARRIOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:11.8pt; text-indent:-11.8pt">
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">GB2</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt; padding-left:11.8pt; text-indent:-11.8pt">
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">    E-PEDICAB</span></p>
          </td>
        </tr>
        <tr style="height:10.85pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HEADLIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HEAD LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HEAD LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HEADLIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HEAD LIGHT</span></p>
          </td>
        </tr>
        <tr style="height:14.9pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SIGNAL LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SIGNAL LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SIGNAL LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:7.3pt; text-indent:-7.3pt">
              <span style="width:7.3pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SIGNAL LIGTHS</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE SENSOR</span></p>
          </td>
        </tr>
        <tr style="height:13.55pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE LIGHTS</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BATTERY</span></p>
          </td>
        </tr>
        <tr style="height:12.65pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:bottom; width:116.1pt">
            <p style="margin:0pt; text-align:center">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TAIL LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.7pt">
            <p style="margin:0pt; text-align:center">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TAIL LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">              TAIL LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TAIL LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PANEL BOARD</span></p>
          </td>
        </tr>
        <tr style="height:12.2pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REVERSE MODE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.7pt">
            <p style="margin:0pt; text-align:center">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">          PARKING LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REVERSE MODE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HORN</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">CHARGER</span></p>
          </td>
        </tr>
        <tr style="height:11.75pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HORN</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">              REVERSE MODE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HORN</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SPEED SELECTOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">RAINCOAT</span></p>
          </td>
        </tr>
        <tr style="height:10.85pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REMOTE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HORN</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REMOTE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">AUTO DRIVE SYSTEM</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PLATE</span></p>
          </td>
        </tr>
        <tr style="height:14.9pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SPEED SELECTOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REMOTE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SPEED SELECTOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PEDAL BOOSTER</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SAFETY LOCK</span></p>
          </td>
        </tr>
        <tr style="height:13.55pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE SENSOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SPEED SELECTOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE SENSOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE SENSOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HORN</span></p>
          </td>
        </tr>
        <tr style="height:13.1pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PANEL BOARD</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE SENSOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PANEL BOARD</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BATTERY</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PEDAL</span></p>
          </td>
        </tr>
        <tr style="height:12.2pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SCRATCHES</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">              PANEL BOARD</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SCRATCHES</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SCRATCHES</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SCRATCHES</span></p>
          </td>
        </tr>
        <tr style="height:11.75pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BATTERY</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SCRATCHES</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BATTERY</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BATTERY</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REVERSE MODE</span></p>
          </td>
        </tr>
        <tr style="height:11.3pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PLATE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">              BATTERY</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PLATE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TIRE PRESSURE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TIRE PRESSURE</span></p>
          </td>
        </tr>
        <tr style="height:11.3pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TIRE PRESSURE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">               PLATE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TIRE PRESSURE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PANEL BOARD</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:10.85pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">CHARGER</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TIRE PRESSURE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt; text-align:center">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">CHARGER</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">CHARGER</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:13.05pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HELMET</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">              RAINCOAT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">CHARGER</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">               HELMET</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">RAINCOAT</span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">(WARRIOR)</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">             ALIGNMENT                   </span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:101.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HELMET</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">RAINCOAT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:16.65pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE LOCK</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">              ALIGNMENT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">RAINCOAT</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">               ALIGNMENT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SIDE MIRROR</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">            WINDSHIEL(HERO) </span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:101.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SIDE MIRROR</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PLATE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:40.5pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">           SIDE MIRROR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">               PLATE                                                    </span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">                SIDE MIRROR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt; text-align:center">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HAND BRAKE LEVER</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SAFETY LOCK</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">FOOT MAP</span></p>
            <p style="font-size:11pt; line-height:200%; margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">FOOT REST MAP</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
          </td>
        </tr>
      </table>
      <div style="padding-top: 20px"></div>
      <p style="font-size:12pt; line-height:108%; margin:0pt 0pt 4.6pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:12pt; line-height:108%; margin:0pt 0pt 4.6pt; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">CERTIFICATE OF RELEASE</span></p>
      <p style="font-size:12pt; line-height:108%; margin:0pt 0pt 4.6pt 72pt; text-align:justify; text-indent:36pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 4.6pt">
        <span style="font-family:Calibri; font-size:11pt">This is to certify that the</span>
        <span style="font-family:'Times New Roman'; font-size:11pt">Electric Motor Vehicle</span>
        <span style="font-family:Calibri; font-size:11pt">describe</span>
        <span style="font-family:Calibri; font-size:11pt">above</span>
        <span style="font-family:Calibri; font-size:11pt">was physically released, received and accepted by</br> Mr. / Ms. ________${needdata.customerName}________________ in A-1 condition as stated in the attached confirmation letter.</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 4.6pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">Make / Type: ______CASH___________________________</span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">Model: _________${cardata.productTypeName}_____________________________</span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">Chassis Number: ________${cardata.carCode}______________________</span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">Motor Number: ___________${cardata.motorCode}____________________</span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">Charger Number: _______${cardata.chargeCode}_______________________</span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">Color: _____________${cardata.color}__________________________</span></p>
      <p style="margin:0pt 154.95pt 0pt 0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11.5pt; line-height:108%; margin:0pt; text-align:center;">
        <span style="font-family:Calibri; font-size:11.5pt">_________________________</span>
        <span style="width:34.21pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11.5pt">_________________________</span>
      <p style="margin:0pt; padding-left:36pt; text-indent:-36pt">
        <span style="font-family:'Times New Roman'; font-size:12pt">Signature over printed name</span>
        <span style="width:4.71pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Times New Roman'; font-size:12pt">Date</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:12pt">Buyer             </span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:12pt">Signed in presence of:</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:12pt">____</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">_________________________</span>
        <span style="width:18pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11.5pt">_________________________</span>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:12pt">Sales and Service Representative</span>
        <span style="width:18.06pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Times New Roman'; font-size:12pt">                 Branch Manager</span></p>
    </div>
    <br style="clear:both; mso-break-type:section-break; page-break-before:always" />
    <div>
      <p style="margin:0pt; padding-left:0.5pt; text-indent:-0.5pt;display: flex;align-items:center;justify-content: center;">
        <img src="/test/static/xianjin/img5.png" width="171" height="47"  style="-aw-left-pos:166.2pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0.75pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="line-height:10pt; margin:0pt 0pt 8pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS________${repositorydata.address}_____________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.__${repositorydata.phone}_______</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">&#xa0;</span></p>
      <p style="line-height:10pt; margin:0pt 0pt 8pt; text-align:justify">
        <span style="font-family:Calibri; font-size:12pt; font-weight:bold">Refund Policy for</span>
        <span style="font-family:Calibri; font-size:14pt; font-weight:bold">Purchase New E-bikes</span></p>
      <p style="margin:0pt 10pt 0pt 0pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">Your e-bike is a big investment. We want to make sure you really do want an electric bike and that you have chosen the right one before we deliver it to you, as returning it is not easy. We stand behind everything we sell.</span></p>
      <p style="margin:0pt 26pt 0pt 0pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <ol type="1" style="margin:0pt; padding-left:0pt">
        <li style="font-family:Calibri; font-size:11pt; margin:0pt 26pt 0pt 31.35pt; padding-left:4.65pt; text-align:justify; text-indent:0pt">
          <span style="font-family:Calibri; font-size:11pt">When</span>
          <span style="font-family:Calibri; font-size:11pt">it comes to returning units that have NO DEFECTS, but are instead because customer has changed their mind.</span></li>
      </ol>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">                                           =EXCHANGE=</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Calibri; font-size:11pt">Within s</span>
        <span style="font-family:Calibri; font-size:11pt">even</span>
        <span style="font-family:Calibri; font-size:11pt">(7) days including the day you purchased.</span></p>
      <p style="margin:0pt 1pt 0pt 108pt; text-align:justify; text-indent:-17.95pt">
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">If during inspection any damage was found on the e-bike, customer will have to pay for the parts with scratches and broken parts.</span></p>
      <p style="margin:0pt 36pt 0pt 108pt; text-align:justify; text-indent:-17.95pt">
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">To complete your exchange process, we require original receipt or proof of purchase.</span></p>
      <p style="margin:0pt 0pt 0pt 108pt; text-align:justify; text-indent:-17.95pt">
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">Exchange may be available for items of the same or greater value.</span></p>
      <p style="margin:0pt 5pt 0pt 108pt; text-align:justify; text-indent:-17.95pt">
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">For instalment basis, due date of your payment will follow the date you purchased the first unit.</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">= REFUND</span>
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">=</span></p>
      <p style="margin:0pt 0pt 0pt 108pt; text-align:justify; text-indent:-17.95pt">
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">Within seven (7) days including the day you purchased, there will be a re-stocking fee of</span>
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">5%</span>
        <span style="font-family:Calibri; font-size:11pt">on the</span>
        <span style="font-family:Calibri; font-size:11pt">original</span>
        <span style="font-family:Calibri; font-size:11pt">cash price of the purchased unit. However, if during inspection any damage was found on the e-bike, customer will have to pay for the parts with scratches and broken parts.</span></p>
      <p style="margin:0pt 0pt 0pt 108pt; text-align:justify; text-indent:-17.95pt">
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">To complete your return, we require original receipt or proof of purchase.</span></p>
      <p style="margin:0pt 0pt 0pt 54pt; text-align:justify; text-indent:-18pt">
        <span style="font-family:Wingdings; font-size:11pt"></span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">If seven (7) days have passed since your purchase</span>
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">,</span>
        <span style="font-family:Calibri; font-size:11pt">we cannot offer you a refund or an exchange.</span></p>
      <p style="margin:0pt 0pt 0pt 36pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <ol start="2" type="1" style="margin:0pt; padding-left:0pt">
        <li style="font-family:Calibri; font-size:11pt; margin:0pt 0pt 0pt 31.4pt; padding-left:4.6pt; text-align:justify; text-indent:0pt">
          <span style="font-family:Calibri; font-size:11pt">When it comes to returning units that have</span>
          <span style="font-family:Calibri; font-size:11pt; font-weight:bold">DEFECTS/PROBLEMS on MAJOR PARTS</span>
          <span style="font-family:Calibri; font-size:11pt">such as;</span></li>
      </ol>
      <p style="margin:0pt 0pt 0pt 114pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">a.</span>
        <span style="width:20.95pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:143pt"></span>
        <span style="font-family:Calibri; font-size:11pt">CHASSIS</span>
        <span style="width:70.98pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:251pt"></span>
        <span style="font-family:Calibri; font-size:11pt">b.  DYNAMO</span></p>
      <p style="margin:0pt 0pt 0pt 114pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">c.</span>
        <span style="width:21.57pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:143pt"></span>
        <span style="font-family:Calibri; font-size:11pt">CONTROLLER</span>
        <span style="width:48.54pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:251pt"></span>
        <span style="font-family:Calibri; font-size:11pt">d.  BATTERY</span></p>
      <ul type="disc" style="margin:0pt; padding-left:0pt">
        <li style="font-family:serif; font-size:11pt; margin:0pt 0pt 0pt 82.11pt; padding-left:7.89pt; text-align:justify; text-indent:0pt">
          <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REFUND/EXCHANGE</span></li>
      </ul>
      <p style="margin:0pt 7pt 0pt 108pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font-family:Calibri; font-size:11pt">Within thirty (30) days including the day you purchased, if the e-bike was found to be defective on its major parts, please contact or inform the company for a 100% refund or replacement.</span></p>
      <p style="margin:0pt 7pt 0pt 108pt; text-align:justify; text-indent:-17.95pt">
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font-family:Calibri; font-size:11pt">However, if during inspection any damage was found on the e-bike, customer will have to pay for the parts with scratches and broken parts.</span></p>
      <p style="margin:0pt 0pt 0pt 108pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font-family:Calibri; font-size:11pt">Exchange may be available for items of the same or greater value</span></p>
      <p style="margin:0pt 10pt 0pt 108pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font-family:Calibri; font-size:11pt">For instalment basis, due date of your payment will follow the date your unit was changed.</span></p>
      <p style="margin:0pt 6pt 0pt 0pt; text-align:justify">
        <span style="width:108pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:108pt"></span>
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font-family:Calibri; font-size:11pt">To complete your return/exchange process, we re</span>
        <span style="font-family:Calibri; font-size:11pt">quire original receipt or proof</span></p>
      <p style="margin:0pt 6pt 0pt 0pt; text-align:justify">
        <span style="width:108pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:108pt"></span>
        <span style="font-family:Calibri; font-size:11pt">Of</span>
        <span style="font-family:Calibri; font-size:11pt">purchase</span>
        <span style="font-family:Calibri; font-size:11pt">.</span></p>
      <p style="margin:0pt 6pt 0pt 54pt; text-align:justify; text-indent:-18pt">
        <span style="font-family:Wingdings; font-size:11pt"></span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">If thirty (30) days have passed since your purchase</span>
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">,</span>
        <span style="font-family:Calibri; font-size:11pt">we cannot offer you a refund or an exchange.</span></p>
      <p style="margin:0pt 16pt 0pt 36pt; text-align:justify; text-indent:-18pt">
        <span style="font-family:Wingdings; font-size:7.33pt; vertical-align:super"></span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">We will process the refund/exchange due to you as soon as possible and in any event, within 3-8 days from the day we received your returned e-bike.</span></p>
      <p style="margin:0pt 16pt 0pt 36pt; text-align:justify; text-indent:-18pt">
        <span style="font-family:Wingdings; font-size:7.33pt; vertical-align:super"></span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Wingdings; font-size:7.33pt; vertical-align:super">&#xa0;</span></p>
      <p style="margin:0pt 0pt 0pt 324pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">With my conformity</span>
        <span style="font-family:Calibri; font-size:11pt">,</span></p>
      <p style="margin:0pt 0pt 0pt 18pt; text-align:center;">
        <span style="font-family:Calibri; font-size:11pt">______________________________</span>
        <span style="width:107.64pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:290pt"></span>
        <span style="width:34pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11pt">_________________________</span></p>
      <p style="margin:0pt 0pt 0pt 18pt; text-align:center;padding-left: 90px">
        <span style="font-family:Calibri; font-size:11pt">NWOW Marketing Representative</span>
        <span style="width:118.23pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:289pt"></span>
        <span style="font-family:Calibri; font-size:11pt">Signature</span>
        <span style="font-family:Calibri; font-size:11pt">over</span>
        <span style="font-family:Calibri; font-size:11pt">Printed Name</span></p>
      <p style="margin:0pt 0pt 0pt 334pt; text-align:justify">
        <span style="font-family:Calibri; font-size:10pt">(Customer)</span></p>
        <div style="padding-top: 20px"></div>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 8pt 39pt; display: flex;align-items: center;justify-content: center;">
        <img src="/test/static/xianjin/img5.png" width="171" height="47" style="-aw-left-pos:173.25pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:1.75pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="line-height:10pt; margin:0pt 0pt 8pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS________${repositorydata.address}_____________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.__${repositorydata.phone}_______</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>

      <p style="margin:0pt; text-align:center;">
<!--         <img src="bca2f14c-20dd-4380-a9d9-c6d31aa9268b.015.png" width="625" height="12" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:character; -aw-rel-vpos:line; -aw-top-pos:0pt; -aw-wrap-type:inline" /></p>
 -->      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 9.8pt">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">Date: February 25, 2017 </span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 10.65pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TO:ALL</span>
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">E-BIKE USERS</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 14.25pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">FROM: TAILG/NWOW </span></p>
      <h1 style="margin:0pt; page-break-after:avoid; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">SUBJECT: </span>
        <span style="font-family:'Times New Roman'; font-size:10pt; font-weight:bold">E-BIKE BATTERY CONCERNS</span></h1>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 11.8pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0.1pt 26.95pt; text-indent:-18pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">1.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">CHARGING</span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 45.45pt; text-indent:-18.5pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">1.1</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">The lifespan of lead-acid battery is around 400 cycles of charge-discharge, so the charging timing matters a lot, the battery usually needs to be charged after 60% to 70% consumption of power, also must be totally discharged 1 time monthly (means fully consume the power and recharge). </span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 45.45pt; text-indent:-18.5pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">1.2</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">After usage of e-bike, Leave about 30 minutes rest time for the battery before recharge.</span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 45.45pt; text-indent:-18.5pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">1.3</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">Avoid the charging being exposed to direct sunlight, high temperature, raining, or wet environment. </span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 45.45pt; text-indent:-18.5pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">1.4</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">Avoid long-time overcharging, this overcharging means the time of charging after the indicator turns green, because even the indicator turns green, the battery is still being charged with a small slow flow of current. </span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 45.45pt; text-indent:-18.5pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">1.5</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">Since the electricity capacity of battery decreases naturally during the storage period, the brand-new storage battery also needs to be charged monthly. </span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0.1pt 26.95pt; text-indent:-18pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">2.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REFILLING</span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 45.45pt; text-indent:-18.5pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">2.1</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">High temperature of charging environment, large current from charger, long-time usage of battery will cause the battery lack of fluid.  The obvious symptom of lacking fluid is the indicator of charger does not change color into green, and also the temperature of battery gets higher during charging.   The battery fluid can be refilled if confirmed short, the following are specific ways:</span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 63.7pt; text-indent:-18pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">1.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">Discharge the battery to cut-off voltage </span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 63.7pt; text-indent:-18pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">2.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">Open the battery surface cover, remove the safety valve, inject the battery fluid with a syringe one by one, usually 10 to 12 ml for 12AH battery; 14 to 16 ml for 20 AH battery</span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 63.7pt; text-indent:-18pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">3.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">Fully charge the refilled battery </span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 63.7pt; text-indent:-18pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">4.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">Drain out the visible fluid inside the battery</span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 63.7pt; text-indent:-18pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">5.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">Clean the surface of the battery, put back the safety valve and glue the cover </span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 45.45pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt 0pt 0pt 288pt; text-align:center; text-indent:36pt">
        <span style="font-family:Calibri; font-size:11pt">With my conformity</span>
        <span style="font-family:Calibri; font-size:11pt">,</span></p>
      <p style="margin:0pt 0pt 0pt 288pt; text-align:center; text-indent:36pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt 0pt 0pt 18pt; text-align:center;">
        <span style="font-family:Calibri; font-size:11pt">______________________________</span>
        <span style="width:107.64pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:290pt"></span>
        <span style="width:34pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11pt">_________________________</span></p>
      <p style="margin:0pt 0pt 0pt 18pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">NWOW Marketing Representative</span>
        <span style="width:118.23pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:289pt"></span>
        <span style="font-family:Calibri; font-size:11pt">Signature Over Printed Name</span></p>
      <p style="margin:0pt 0pt 0pt 334pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt">(Customer)</span></p>
      <p style="font-size:9pt; line-height:108%; margin:2.45pt 0pt 1pt">
<!--         <img src="bca2f14c-20dd-4380-a9d9-c6d31aa9268b.016.png" width="655" height="2" alt="" style="-aw-left-pos:58.25pt; -aw-rel-hpos:page; -aw-rel-vpos:page; -aw-top-pos:748.5pt; -aw-wrap-type:topbottom" /></p>
 -->      <p style="font-size:9pt; line-height:108%; margin:2.45pt 0pt 1pt">
        <span style="font-family:Cambria; font-size:9pt; font-style:italic">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:2.45pt 0pt 1pt">
        <span style="font-family:Cambria; font-size:9pt; font-style:italic">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:2.45pt 0pt 1pt; text-align:center">
        <span style="font-family:Cambria; font-size:9pt; font-style:italic">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:2.45pt 0pt 1pt; text-align:center">
        <span style="font-family:Cambria; font-size:9pt; font-style:italic">www.nwow.com.ph</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; display: flex;align-items: center;justify-content: center;">
        <img src="/test/static/xianjin/img5.png" width="234" height="48" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:1.1pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS________${repositorydata.address}_____________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.__${repositorydata.phone}_______</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:14pt; line-height:108%; margin:0pt 0pt 0pt 4.85pt; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:14pt; font-weight:bold">ROAD TRAFFIC SIGNS</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0pt 8.2pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:98%; margin:0pt 0pt 0.1pt 36pt">
        <span style="font-family:'Times New Roman'; font-size:11pt; font-style:italic">Signs that inform roads users of traffic laws and regulations which, if disregarded, with constitute an offense.</br> These signs indicate the only direction (s) in which the motorist is obliged to follow.</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0pt 53.25pt; text-indent:-18pt">
        <span style="color:#7030a0; font-family:Wingdings; font-size:11pt; font-style:normal; text-decoration:none; vertical-align:baseline">❖</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="color:#7030a0;width: 100%; font-family:'Times New Roman'; font-size:11pt; font-style:italic; font-weight:bold">WARNING SIGNS</span>
        
        </p>
        <img src="/test/static/xianjin/img7.png" width="698" height="597" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:21.45pt; -aw-wrap-type:through;" />
      <p style="font-size:11pt; line-height:108%; margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">__________________________________</span>
        <span style="width:210.35pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:right; -aw-tabstop-pos:518.6pt"></span>
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">__________________________________</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">Customer over printed name &amp; signature</span>
        <span style="width:216.81pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:right; -aw-tabstop-pos:518.6pt"></span>
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">Branch Rep. printed name &amp; signature</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt">
        <span style="color:#7030a0; font-family:'Times New Roman'; font-size:11pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0pt 53.25pt">
        <span style="color:#7030a0; font-family:'Times New Roman'; font-size:11pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0pt 53.25pt; text-indent:0pt">
        <span style="color:#7030a0; font-family:Wingdings; font-size:11pt; font-style:normal; text-decoration:none; vertical-align:baseline">❖</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="color:#7030a0; font-family:'Times New Roman'; font-size:11pt; font-style:italic; font-weight:bold">REGULATORY SIGNS</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0pt 53.25pt; text-indent:0pt">
        <span style="color:#7030a0; font-family:Wingdings; font-size:11pt; font-style:normal; text-decoration:none; vertical-align:baseline">❖</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="color:#7030a0; font-family:'Times New Roman'; font-size:11pt; font-style:italic; font-weight:bold">ROAD CONSTRUCTION SIGNS</span></p>
        <img src="/test/static/xianjin/img8.png" width="698" height="566" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:33.15pt; -aw-wrap-type:square; margin:0pt 9pt" />
      <p style="font-size:11pt; line-height:108%; margin:0pt">
        <img src="/test/static/xianjin/img9.png" width="624" height="220" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:character; -aw-rel-vpos:line; -aw-top-pos:0pt; -aw-wrap-type:inline" /></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">__________________________________</span>
        <span style="width:210.35pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:right; -aw-tabstop-pos:518.6pt"></span>
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">__________________________________</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">Customer over printed name &amp; signature</span>
        <span style="width:216.81pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:right; -aw-tabstop-pos:518.6pt"></span>
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">Branch Rep. printed name &amp; signature</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
        <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
        <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
        <div style="padding-top: 300px"></div>
      <p style="margin:0pt;display: flex;align-items: center;justify-content: center;">
        <img src="/test/static/xianjin/img5.png" width="199" height="55" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'High Tower Text'; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS________${repositorydata.address}_____________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.__${repositorydata.phone}_______</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Gungsuh; font-size:16pt; font-weight:bold; text-decoration:underline">SALESCERTIFICATION</span></p>
      <p style="margin:0pt; text-align:center;">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:12pt">This is to certify that the Sales Invoice No.______ was issued to ________${needdata.customerName}______________</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">___________</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:12pt">of</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">________________${needdata.address}_____________________________________</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xad;</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xad;</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xad;</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xad;</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xad;</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">for</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">the</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">purchased in</span>
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold; text-decoration:underline">CASH</br></span>
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold; text-decoration:underline"></span>
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold; text-decoration:underline">BASIS</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">of</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">one</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">Electric Motor Vehicle</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">d</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">escribed hereunder:</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">DATE PURCHASED</span>
        <span style="width:25.44pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">:</span>
        <span style="width:31.92pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">_____________________________</span></p>
      <p style="margin:0pt">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">MODEL OF VEHICLE</span>
        <span style="width:14.4pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">:</span>
        <span style="width:31.92pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">___________${cardata.productTypeName}__________________</span></p>
      <p style="margin:0pt">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">COLOR</span>
        <span style="width:26.89pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">:</span>
        <span style="width:31.92pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">__________${cardata.color}___________________</span></p>
      <p style="margin:0pt">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">MOTOR NUMBER</span>
        <span style="width:0.01pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">:</span>
        <span style="width:31.92pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">________${cardata.motorCode}_____________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">         VEHICLE NUMBER</span>
        <span style="width:26.42pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">:</span>
        <span style="width:31.92pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">_____________${cardata.carCode}________________</span></p>
      <p style="margin:0pt">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">BATTERY</span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">NUMBER</span>
        <span style="width:23.75pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">:</span>
        <span style="width:31.92pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">__________${cardata.batteryCode}____________________</span></p>
      <p style="margin:0pt">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">CHARGER NUMBER</span>
        <span style="width:20.17pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">:</span>
        <span style="width:31.92pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt">______________${cardata.chargeCode}_______________</span></p>
        <p style="margin:0pt">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">CONTROLER NUMBER</span>
        <span style="width:20.17pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">:</span>
        <span style="width:31.92pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt">______________${cardata.controlCode}_______________</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Bookman Old Style'; font-size:12pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">NOTE:</span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt">Not</span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt">to sell, assign, lease, pledge or otherwise encumber the subject chattel, or convey in any matter whatsoever our right to purchased it to any other third person without the prior written consent to the</span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt">VENDOR</span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt">.</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:'Bookman Old Style'; font-size:12pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Bookman Old Style'; font-size:12pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Bookman Old Style'; font-size:12pt">____________________________</span>
        <span style="width:12pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt">_________________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:11pt">Customer’s Signature over Printed Name            </span>
        <span style="width:34.79pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Times New Roman'; font-size:11pt">NWOW</span>
        <span style="font-family:'Times New Roman'; font-size:11pt">Marketing Representative</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Bookman Old Style'; font-size:12pt">&#xa0;</span></p>
<!--       <img src="bca2f14c-20dd-4380-a9d9-c6d31aa9268b.006.png" width="791" height="1" alt="" style="-aw-left-pos:5pt; -aw-rel-hpos:page; -aw-rel-vpos:paragraph; -aw-top-pos:8.7pt; -aw-wrap-type:none; margin-left:-0.38pt; margin-top:8.32pt; position:absolute; z-index:20" />
 -->      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <p style="margin:0pt; display: flex;align-items: center;justify-content: center;">
        <img src="/test/static/xianjin/img5.png" width="194" height="45"  style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0.61pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS________${repositorydata.address}_____________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.__${repositorydata.phone}_______</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <h1 style="margin:0pt; page-break-after:avoid; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">WARRANTY POLICY AND GUIDELINES</span></h1>
      <p style="font-size:9pt; line-height:105%; margin:0pt 0pt 0.2pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">10.</span>
        <span style="font:7.0pt 'Times New Roman'"></span>
<!--         <img src="bca2f14c-20dd-4380-a9d9-c6d31aa9268b.022.png" width="419" height="257" alt="" style="-aw-left-pos:117pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:14.3pt; -aw-wrap-type:none; margin-left:84.35pt; margin-top:14.3pt; position:absolute; z-index:-65503" />
 -->        <span style="font-family:Arial; font-size:9pt; font-weight:bold">NWOW MARKETING</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">shall not be liable under this warranty if any damage or defect result from  (</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">i</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">) misuse, abuse,  neglect   improper shipping  or  installation; (ii) disasters such as fire, flood, lightning or improper electric current; or (iii) service   or alteration by anyone other than an authorized NWOW MARKETING representative; (iv) damages incurred through    irresponsible use, or other non-recommended practices.</span></p>
      <p style="margin:0pt 0pt 0pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">11.</span>
        <span style="font:7.0pt 'Times New Roman'"></span>
        <span style="font-family:Arial; font-size:9pt; font-style:italic; font-weight:bold">If the E-Bike will use for business or personal purpose, family use like delivering or use in any heavy activities that may exceed in its maximum load weight and may cause any damage or defect in E-Bike, warranty period of all affected parts will be going to be half of its original warranty period.     </span></p>
      <p style="font-size:9pt; line-height:105%; margin:0pt 0pt 0.2pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">12.</span>
        <span style="font:7.0pt 'Times New Roman'"></span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">You must retain your bill of sale or other proof of purchase to receive warranty service.</span></p>
      <p style="font-size:9pt; line-height:105%; margin:0pt 0pt 0.2pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">13.</span>
        <span style="font:7.0pt 'Times New Roman'"></span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">No warranty extension will be granted for any replacement part(s) furnished to the purchaser in fulfillment of this warranty.</span></p>
      <p style="font-size:9pt; line-height:105%; margin:0pt 0pt 0.2pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">14.</span>
        <span style="font:7.0pt 'Times New Roman'"></span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">LIFETIME FREE SERVICE.</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">Any service taken are free of charge. Only the parts which are not cover by the limited warranty will charged by the company.</span></p>
      <p style="margin:0pt 0pt 0pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">15.</span>
        <span style="font:7.0pt 'Times New Roman'"></span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">The company offers free home service to the Major malfunction of the unit (</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">i</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">)electrical problem(ii)flat tire and any   troubleshooting occurs which cause the E-Bike not to run. Home service will be schedule and the company</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">exerts</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">its effort    to repair the malfunction within 48hours. The customer will be responsible to inform the company for any major malfunction    of the E-Bike. The company will just service the E-bike to the place registered on our system.</span></p>
      <p style="font-size:9pt; line-height:105%; margin:0pt 0pt 0.2pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">16.</span>
        <span style="font:7.0pt 'Times New Roman'"></span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">All the payment must settle before any warranty or service applied. The company has the right to delay our service warranty for our client who didn’t pay their monthly amortization on time. </span></p>
      <p style="margin:0pt 0pt 2.05pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">17.</span>
        <span style="font:7.0pt 'Times New Roman'"></span>
        <span style="font-family:Arial; font-size:9pt; font-style:italic; font-weight:bold">If the unit has been installed or customized with other parts by anyone other than an authorized company   representative like roof, basket, saddle or others for business or overload use, warranty of major parts and all affected parts will be voided. </span></p>
      <p style="font-size:10pt; line-height:101%; margin:1.75pt 1.4pt 0pt 22.45pt; orphans:0; text-align:justify; widows:0">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">9</span>
        <span style="font-family:Arial; font-size:10pt; font-weight:bold">.</span>
        <a name="_Hlk28589442">
          <span style="font-family:Calibri; font-size:10pt"></span>
          <span style="font-family:Calibri; font-size:10pt">Ifthee</span>
          <span style="font-family:Calibri; font-size:10pt">-bike</span>
          <span style="font-family:Calibri; font-size:10pt">wasalreadydone</span>
          <span style="font-family:Calibri; font-size:10pt"></span>
          <span style="font-family:Calibri; font-size:10pt">fixedinstore,branch</span>
          <span style="font-family:Calibri; font-size:10pt"></span>
          <span style="font-family:Calibri; font-size:10pt">willinformcustomertoclaimthe</span>
          <span style="font-family:Calibri; font-size:10pt"></span>
          <span style="font-family:Calibri; font-size:10pt">ebike</span>
          <span style="font-family:Calibri; font-size:10pt">andtherewillbe</span>
          <span style="font-family:Calibri; font-size:10pt; font-weight:bold">7</span>
          <span style="font-family:Calibri; font-size:10pt; font-weight:bold">daysFREEparking</span>
          <span style="font-family:Calibri; font-size:10pt; font-weight:bold">.</span>
          <span style="font-family:Calibri; font-size:10pt">Afterthe7</span>
          <span style="font-family:Calibri; font-size:10pt">daysFREEparking,ifcustomerstillnotclaimthee</span>
          <span style="font-family:Calibri; font-size:10pt">-bike,therewillbe</span>
          <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">P20.00 charged per day</span>
          <span style="font-family:Calibri; font-size:10pt">as parking fee in store within 60 days. And company not holds any responsibility for</span>
          <span style="font-family:Calibri; font-size:10pt">anydamage</span>
          <span style="font-family:Calibri; font-size:10pt">.</span></a>
      </p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0pt 0.5pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:11pt">--------------</span></p>
      <p style="font-size:10pt; line-height:106%; margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:10pt">I hereby understand the Company policy and Guidelines regarding with the warranty.</span></p>
      <p style="margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:11pt">   _____________________________                           </span>
        <span style="width:16.05pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:11pt">_________________________       </span></p>
      <p style="margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:10pt">  Customer’s Signature over Printed Name                   </span>
        <span style="width:8.78pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:10pt">NWOW Marketing Representative</span></p>
      <p style="margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:10pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Arial; font-size:10pt">&#xa0;</span></p>
      <img src="/test/static/xianjin/img10.png" width="773" height="670" alt="" style="-aw-left-pos:-25.3pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:-3.05pt; -aw-wrap-type:none; text-align: center; margin-top:-3.05pt; z-index:37" />
      <p style="font-size:11pt; line-height:108%; margin:0pt">
        <span style="font-family:'Sakkal Majalla'; font-size:11pt; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:10pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">____________________________                           </span>
        <span style="width:4.57pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11pt">____________________________                           </span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">Customer’s Signature over Printed Name                   </span>
        <span style="width:19.7pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11pt">NWOW Marketing Representative</span></p>
<!--       <img src="bca2f14c-20dd-4380-a9d9-c6d31aa9268b.006.png" width="791" height="1" alt="" style="-aw-left-pos:2176.4pt; -aw-rel-hpos:page; -aw-rel-vpos:paragraph; -aw-top-pos:8.1pt; -aw-wrap-type:none; margin-left:-69.47pt; margin-top:7.72pt; position:absolute; z-index:28" />
 -->      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt 0pt 8pt;display: flex;align-items: center;justify-content: center;">
        <img src="/test/static/xianjin/img5.png" width="165" height="31" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0.81pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS________${repositorydata.address}_____________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.__${repositorydata.phone}_______</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:14pt; font-weight:bold">WAIVER OF LIABILITY</span></p>
<!--       <img src="bca2f14c-20dd-4380-a9d9-c6d31aa9268b.024.png" width="372" height="228" alt="" style="-aw-left-pos:122.2pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:10.15pt; -aw-wrap-type:none; margin-left:122.2pt; margin-top:10.15pt; position:absolute; z-index:-65508" />
 -->      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:14pt; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt 0pt 8pt; text-align:center;">
        <span style="font-family:'Times New Roman'; font-size:12pt">This hereby releases</span>
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">NWOW Marketing</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">from any and all liabilities upon apprehension/s of Mr. / Ms.</br> _____________________________ by any government agencies for all types of traffic violation and from</br> any all injuries suffered by him / her or by third person/s, financial or otherwise, while driving the above</br> describe</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">Electric Motor Vehicle</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">unit. I, ____${needdata.customerName}_______, fully understand </br>and agreed to the foregoing.</span></p>
      <p style="margin:0pt; padding-left:36pt; text-indent:-36pt">
        <span style="font-family:'Times New Roman'; font-size:12pt">___________________________________</span>
        <span style="width:3pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Times New Roman'; font-size:12pt">________________________________Signature over printed name</span>
        <span style="font-family:'Times New Roman'; font-size:12pt"></span>
        <span style="font-family:'Times New Roman'; font-size:12pt"></span>
        <span style="font-family:'Times New Roman'; font-size:12pt"></span>
        <span style="font-family:'Times New Roman'; font-size:12pt"></span>
        <span style="font-family:'Times New Roman'; font-size:12pt"></span>
        <span style="font-family:'Times New Roman'; font-size:12pt"></span>
        <span style="font-family:'Times New Roman'; font-size:12pt"></span>
        <span style="font-family:'Times New Roman'; font-size:12pt">Date</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:12pt">Buyer</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:12pt">Signed in presence of:</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:12pt">___________________________________</span>
        <span style="width:3pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Times New Roman'; font-size:12pt">________________________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:12pt">Sales and Service Representative</span>
        <span style="width:18.06pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Times New Roman'; font-size:12pt">  Date</span>
        <span style="font-family:'Times New Roman'; font-size:12pt"></span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
        <div style="padding-top: 50px"></div>
      <p style="margin:0pt;display: flex;align-items: center;justify-content: center;">
        <img src="/test/static/xianjin/img5.png" width="165" height="43" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS________${repositorydata.address}_____________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.__${repositorydata.phone}_______</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:11pt">Name of Customer: ___________${needdata.customerName}_________________     </span>
        <span style="width:0.7pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:11pt">Date: ___________________</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:11pt">Unit purchase: ___${cardata.productTypeName}______${cardata.color}______________________                   Branch: ________${needdata.saleRepositoryName}__________</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
<!--       <img src="bca2f14c-20dd-4380-a9d9-c6d31aa9268b.013.png" width="659" height="413" alt="" style="-aw-left-pos:17.25pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:57.05pt; -aw-wrap-type:none; margin-left:17.25pt; margin-top:57.05pt; position:absolute; z-index:-65502" />
 -->      <p style="font-size:11pt; line-height:108%; margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:'Arial Rounded MT'; font-size:11pt; font-weight:bold">DELIVERY CHECK LIST </span></p>
      <table cellspacing="0" cellpadding="0" style="border-collapse:collapse; margin:0pt 9pt; width:100%">
        <tr style="height:16.25pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">ERV</span>
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">and ERVS</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.7pt">
            <p style="margin:0pt; text-align:center">
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">T-</span>
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">KING</span>
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">,</span>
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">M3</span>
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">and ARS</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:125.7pt">
            <p style="margin:0pt; text-align:center">
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">HERO and        WARRIOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:11.8pt; text-indent:-11.8pt">
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">GB2</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt; padding-left:11.8pt; text-indent:-11.8pt">
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">     E-PEDICAB</span></p>
          </td>
        </tr>
        <tr style="height:10.85pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HEADLIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HEAD LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HEAD LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HEADLIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HEAD LIGHT</span></p>
          </td>
        </tr>
        <tr style="height:14.9pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SIGNAL LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SIGNAL LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SIGNAL LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:7.3pt; text-indent:-7.3pt">
              <span style="width:7.3pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SIGNAL LIGTHS</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE SENSOR</span></p>
          </td>
        </tr>
        <tr style="height:13.55pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE LIGHTS</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BATTERY</span></p>
          </td>
        </tr>
        <tr style="height:12.65pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:bottom; width:116.1pt">
            <p style="margin:0pt; text-align:center">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TAIL LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.7pt">
            <p style="margin:0pt; text-align:center">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TAIL LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">              TAIL LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TAIL LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PANEL BOARD</span></p>
          </td>
        </tr>
        <tr style="height:12.2pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REVERSE MODE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.7pt">
            <p style="margin:0pt; text-align:center">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">          PARKING LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REVERSE MODE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HORN</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">CHARGER</span></p>
          </td>
        </tr>
        <tr style="height:11.75pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HORN</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">              REVERSE MODE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HORN</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SPEED SELECTOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">RAINCOAT</span></p>
          </td>
        </tr>
        <tr style="height:10.85pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REMOTE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HORN</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REMOTE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">AUTO DRIVE SYSTEM</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PLATE</span></p>
          </td>
        </tr>
        <tr style="height:14.9pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SPEED SELECTOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REMOTE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SPEED SELECTOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PEDAL BOOSTER</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SAFETY LOCK</span></p>
          </td>
        </tr>
        <tr style="height:13.55pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE SENSOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SPEED SELECTOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE SENSOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE SENSOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HORN</span></p>
          </td>
        </tr>
        <tr style="height:13.1pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PANEL BOARD</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE SENSOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PANEL BOARD</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BATTERY</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PEDAL</span></p>
          </td>
        </tr>
        <tr style="height:12.2pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SCRATCHES</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">              PANEL BOARD</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SCRATCHES</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SCRATCHES</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SCRATCHES</span></p>
          </td>
        </tr>
        <tr style="height:11.75pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BATTERY</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SCRATCHES</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BATTERY</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BATTERY</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REVERSE MODE</span></p>
          </td>
        </tr>
        <tr style="height:11.3pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PLATE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">              BATTERY</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PLATE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TIRE PRESSURE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TIRE PRESSURE</span></p>
          </td>
        </tr>
        <tr style="height:11.3pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TIRE PRESSURE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">               PLATE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TIRE PRESSURE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PANEL BOARD</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:10.85pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">CHARGER</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TIRE PRESSURE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt; text-align:center">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">CHARGER</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">CHARGER</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:13.05pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HELMET</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">              RAINCOAT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">CHARGER</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">               HELMET</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">RAINCOAT</span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">(WARRIOR)</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">             ALIGNMENT                   </span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:101.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HELMET</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">RAINCOAT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:16.65pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE LOCK</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">              ALIGNMENT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">RAINCOAT</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">               ALIGNMENT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SIDE MIRROR</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">            WINDSHIEL(HERO) </span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:101.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SIDE MIRROR</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PLATE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:40.5pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">           SIDE MIRROR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">               PLATE                                                    </span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">                SIDE MIRROR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="margin:0pt; text-align:center">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HAND BRAKE LEVER</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SAFETY LOCK</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">FOOT MAP</span></p>
            <p style="font-size:11pt; line-height:200%; margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">FOOT REST MAP</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
          </td>
        </tr>
      </table>
      <p style="font-size:12pt; line-height:108%; margin:0pt 0pt 4.6pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:12pt; line-height:108%; margin:0pt 0pt 4.6pt; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">CERTIFICATE OF RELEASE</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 4.6pt">
        <span style="font-family:Calibri; font-size:11pt">This is to certify that the</span>
        <span style="font-family:'Times New Roman'; font-size:11pt">Electric Motor Vehicle</span>
        <span style="font-family:Calibri; font-size:11pt">describe</span>
        <span style="font-family:Calibri; font-size:11pt">above</span>
        <span style="font-family:Calibri; font-size:11pt">was physically released, received and accepted by</br> Mr. / Ms. ______${needdata.customerName}__________________ in A-1 condition as stated in the attached confirmation letter.</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 4.6pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">                             Make / Type: ______________CASH___________________</span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">                             Model: ______________${cardata.productTypeName}________________________</span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">                             Chassis Number: __________${cardata.carCode}____________________</span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">                             Motor Number: __________${cardata.motorCode}_____________________</span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">                             Charger Number: _______${cardata.chargeCode}_______________________</span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
       
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">                             Color: _________${cardata.color}______________________________</span></p>
      <p style="margin:0pt 154.95pt 0pt 0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11.5pt; line-height:108%; margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:11.5pt">_________________________</span>
        <span style="width:34.21pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11.5pt">                                           _____________</span>
        <span style="font-family:Calibri; font-size:11.5pt">____</span></p>
      <p style="margin:0pt; padding-left:36pt; text-indent:-36pt">
        <span style="font-family:'Times New Roman'; font-size:12pt">Signature over printed name</span>
        <span style="width:4.71pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Times New Roman'; font-size:12pt">Date</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:12pt">Buyer          </span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:12pt">Signed in presence of:</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:12pt">____</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">_________________________       </span>
        <span style="width:18pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11.5pt">_____________</span>
        <span style="font-family:Calibri; font-size:11.5pt">____</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:12pt">Sales and Service Representative</span>
        <span style="width:18.06pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Times New Roman'; font-size:12pt">                 Branch Manager</span></p>
    </div>
    <br style="clear:both; mso-break-type:section-break; page-break-before:always" />
    <div style="padding-top: 20px"></div>
    <div>
      <p style="margin:0pt;display: flex;align-items: center;justify-content: center;">
        <img src="/test/static/xianjin/img5.png" width="165" height="43" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS________${repositorydata.address}_____________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.__${repositorydata.phone}_______</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="line-height:10pt; margin:0pt 0pt 8pt; text-align:justify">
        <span style="font-family:Calibri; font-size:12pt; font-weight:bold">Refund Policy for</span>
        <span style="font-family:Calibri; font-size:14pt; font-weight:bold">Purchase New E-bikes</span></p>
      <p style="margin:0pt 10pt 0pt 0pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">Your e-bike is a big investment. We want to make sure you really do want an electric bike and that you have chosen the right one before we deliver it to you, as returning it is not easy. We stand behind everything we sell.</span></p>
      <p style="margin:0pt 26pt 0pt 0pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <ol start="2" type="1" style="margin:0pt; padding-left:0pt">
        <li style="font-family:Calibri; font-size:11pt; margin:0pt 26pt 0pt 31.35pt; padding-left:4.65pt; text-align:justify; text-indent:0pt">
          <span style="font-family:Calibri; font-size:11pt">When it comes to returning units that have NO DEFECTS, but are instead because customer has changed their mind.</span></li>
      </ol>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">                                           =EXCHANGE=</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Symbol; font-size:11pt"></span>
        <span style="font-family:Calibri; font-size:11pt">Within seven</span>
        <span style="font-family:Calibri; font-size:11pt">(7) days including the day you purchased.</span></p>
      <p style="margin:0pt 1pt 0pt 108pt; text-align:justify; text-indent:-17.95pt">
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">If during inspection any damage was found on the e-bike, customer will have to pay for the parts with scratches and broken parts.</span></p>
      <p style="margin:0pt 36pt 0pt 108pt; text-align:justify; text-indent:-17.95pt">
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">To complete your exchange process, we require original receipt or proof of purchase.</span></p>
      <p style="margin:0pt 0pt 0pt 108pt; text-align:justify; text-indent:-17.95pt">
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">Exchange may be available for items of the same or greater value.</span></p>
      <p style="margin:0pt 5pt 0pt 108pt; text-align:justify; text-indent:-17.95pt">
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">For instalment basis, due date of your payment will follow the date you purchased the first unit.</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">= REFUND</span>
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">=</span></p>
      <p style="margin:0pt 0pt 0pt 108pt; text-align:justify; text-indent:-17.95pt">
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">Within seven (7) days including the day you purchased, there will be a re-stocking fee of</span>
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">5%</span>
        <span style="font-family:Calibri; font-size:11pt">on the cash price of the purchased unit. However, if during inspection any damage was found on the e-bike, customer will have to pay for the parts with scratches and broken parts.</span></p>
      <p style="margin:0pt 0pt 0pt 108pt; text-align:justify; text-indent:-17.95pt">
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">To complete your return, we require original receipt or proof of purchase.</span></p>
      <p style="margin:0pt 0pt 0pt 54pt; text-align:justify; text-indent:-18pt">
        <span style="font-family:Wingdings; font-size:11pt"></span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">If seven (7) days have passed since your purchase</span>
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">,</span>
        <span style="font-family:Calibri; font-size:11pt">we cannot offer you a refund or an exchange.</span></p>
      <p style="margin:0pt 0pt 0pt 36pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <ol start="3" type="1" style="margin:0pt; padding-left:0pt">
        <li style="font-family:Calibri; font-size:11pt; margin:0pt 0pt 0pt 31.4pt; padding-left:4.6pt; text-align:justify; text-indent:0pt">
          <span style="font-family:Calibri; font-size:11pt">When it comes to returning units that have</span>
          <span style="font-family:Calibri; font-size:11pt; font-weight:bold">DEFECTS/PROBLEMS on MAJOR PARTS</span>
          <span style="font-family:Calibri; font-size:11pt">such as;</span></li>
      </ol>
      <p style="margin:0pt 0pt 0pt 114pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">a.</span>
        <span style="width:20.95pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:143pt"></span>
        <span style="font-family:Calibri; font-size:11pt">CHASSIS</span>
        <span style="width:70.98pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:251pt"></span>
        <span style="font-family:Calibri; font-size:11pt">b.  DYNAMO</span></p>
      <p style="margin:0pt 0pt 0pt 114pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">c.</span>
        <span style="width:21.57pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:143pt"></span>
        <span style="font-family:Calibri; font-size:11pt">CONTROLLER</span>
        <span style="width:48.54pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:251pt"></span>
        <span style="font-family:Calibri; font-size:11pt">d.  BATTERY</span></p>
      <ul type="disc" style="margin:0pt; padding-left:0pt">
        <li style="font-family:serif; font-size:11pt; margin:0pt 0pt 0pt 82.11pt; padding-left:7.89pt; text-align:justify; text-indent:0pt">
          <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REFUND/EXCHANGE</span></li>
      </ul>
      <p style="margin:0pt 7pt 0pt 108pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font-family:Calibri; font-size:11pt">Within thirty (30) days including the day you purchased, if the e-bike was found to be defective on its major parts, please contact or inform the company for a 100% refund or replacement.</span></p>
      <p style="margin:0pt 7pt 0pt 108pt; text-align:justify; text-indent:-17.95pt">
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font-family:Calibri; font-size:11pt">However, if during inspection any damage was found on the e-bike, customer will have to pay for the parts with scratches and broken parts.</span></p>
      <p style="margin:0pt 0pt 0pt 108pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font-family:Calibri; font-size:11pt">Exchange may be available for items of the same or greater value</span></p>
      <p style="margin:0pt 10pt 0pt 108pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font-family:Calibri; font-size:11pt">For instalment basis, due date of your payment will follow the date your unit was changed.</span></p>
      <p style="margin:0pt 6pt 0pt 0pt; text-align:justify">
        <span style="width:108pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:108pt"></span>
        <span style="font-family:Calibri; font-size:11pt">-</span>
        <span style="font-family:Calibri; font-size:11pt">To complete your return/exchange process, we re</span>
        <span style="font-family:Calibri; font-size:11pt">quire original receipt or proof</span></p>
      <p style="margin:0pt 6pt 0pt 0pt; text-align:justify">
        <span style="width:108pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:108pt"></span>
        <span style="font-family:Calibri; font-size:11pt">of purchase</span>
        <span style="font-family:Calibri; font-size:11pt">.</span></p>
      <p style="margin:0pt 6pt 0pt 54pt; text-align:justify; text-indent:-18pt">
        <span style="font-family:Wingdings; font-size:11pt"></span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">If thirty (30) days have passed since your purchase</span>
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">,</span>
        <span style="font-family:Calibri; font-size:11pt">we cannot offer you a refund or an exchange.</span></p>
      <p style="margin:0pt 16pt 0pt 36pt; text-align:justify; text-indent:-18pt">
        <span style="font-family:Wingdings; font-size:7.33pt; vertical-align:super"></span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">We will process the refund/exchange due to you as soon as possible and in any event, within 3-8 days from the day we received your returned e-bike.</span></p>
      <p style="margin:0pt 0pt 0pt 288pt; text-align:justify; text-indent:36pt">
        <span style="font-family:Calibri; font-size:11pt">With my conformity</span>
        <span style="font-family:Calibri; font-size:11pt">,</span></p>
      <p style="margin:0pt 0pt 0pt 288pt; text-align:justify; text-indent:36pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt 0pt 0pt 18pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">______________________________</span>
        <span style="width:107.64pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:290pt"></span>
        <span style="width:34pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11pt">_________________________</span></p>
      <p style="margin:0pt 0pt 0pt 18pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">NWOW Marketing Representative</span>
        <span style="width:118.23pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:289pt"></span>
        <span style="font-family:Calibri; font-size:11pt">Signature Over Printed Name</span></p>
      <p style="margin:0pt 0pt 0pt 334pt; text-align:justify">
        <span style="font-family:Calibri; font-size:10pt">(Customer)</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; display: flex;align-items: center;justify-content: center;">
        <img src="/test/static/xianjin/img5.png" width="234" height="48" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:1.1pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <a name="_Hlk13506534"></a>
        <span style="font-family:Calibri; font-size:8pt">ADDRESS________${repositorydata.address}_____________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.__${repositorydata.phone}_______</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:14pt; font-weight:bold">ROAD TRAFFIC SIGNS</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0pt 8.2pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:98%; margin:0pt 0pt 0.1pt 36pt">
        <span style="font-family:'Times New Roman'; font-size:11pt; font-style:italic">Signs that inform roads users of traffic laws and regulations which, if disregarded, with constitute an offense.</br> These signs indicate the only direction (s) in which the motorist is obliged to follow.</span></p>
      <p style="font-size:11pt; line-height:98%; margin:0pt 0pt 0.1pt 36pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0pt 53.25pt; text-indent:-18pt">
        <span style="color:#7030a0; font-family:Wingdings; font-size:11pt; font-style:normal; text-decoration:none; vertical-align:baseline">❖</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="color:#7030a0; font-family:'Times New Roman'; font-size:11pt; font-style:italic; font-weight:bold">WARNING SIGNS</span></p>
      <p style="font-size:11pt; line-height:98%; margin:0pt 0pt 0.1pt 36pt">
        <span style="font-family:'Times New Roman'; font-size:11pt; font-style:italic">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:98%; margin:0pt 0pt 0.1pt 36pt">
        <img src="/test/static/xianjin/img7.png" width="698" height="542" alt="" style="-aw-left-pos:-19.15pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:18.3pt; -aw-wrap-type:through;" /></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">__________________________________</span>
        <span style="width:210.35pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:right; -aw-tabstop-pos:518.6pt"></span>
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">__________________________________</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">Customer over printed name &amp; signature</span>
        <span style="width:216.81pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:right; -aw-tabstop-pos:518.6pt"></span>
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">Branch Rep. printed name &amp; signature</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0pt 53.25pt">
        <span style="color:#7030a0; font-family:'Times New Roman'; font-size:11pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0pt 53.25pt">
        <span style="color:#7030a0; font-family:'Times New Roman'; font-size:11pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0pt 53.25pt">
        <span style="color:#7030a0; font-family:'Times New Roman'; font-size:11pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0pt 53.25pt; text-indent:0pt">
        <span style="color:#7030a0; font-family:Wingdings; font-size:11pt; font-style:normal; text-decoration:none; vertical-align:baseline">❖</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="color:#7030a0; font-family:'Times New Roman'; font-size:11pt; font-style:italic; font-weight:bold">REGULATORY SIGNS</span></p>
        <span style="color:#7030a0; font-family:Wingdings; font-size:11pt; font-style:normal; text-decoration:none; vertical-align:baseline">❖</span>
        <span style="color:#7030a0; font-family:'Times New Roman'; font-size:11pt; font-style:italic; font-weight:bold">ROAD CONSTRUCTION SIGNS</span>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0pt 53.25pt; text-indent:0pt">
        
       
        <img src="/test/static/xianjin/img8.png" width="698" height="616" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:33.15pt; -aw-wrap-type:square; " />
        </p>
      <p style="font-size:11pt; line-height:108%; margin:0pt">
        <img src="/test/static/xianjin/img9.png" width="650" height="162" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:character; -aw-rel-vpos:line; -aw-top-pos:0pt; -aw-wrap-type:inline" /></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">__________________________________</span>
        <span style="width:210.35pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:right; -aw-tabstop-pos:518.6pt"></span>
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">__________________________________</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">Customer over printed name &amp; signature</span>
        <span style="width:216.81pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:right; -aw-tabstop-pos:518.6pt"></span>
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">Branch Rep. printed name &amp; signature</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt 0pt 8pt; padding-left:9pt; text-indent:-9pt">
        <img src="/test/static/xianjin/img11.jpeg" width="771" height="1004" style="-aw-left-pos:0pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:inline" /></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt">
        <img src="/test/static/xianjin/img12.png" width="764" height="999"  style="-aw-left-pos:0pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:inline" /></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:12pt; line-height:108%; margin:0pt 0pt 8pt; display: flex;align-items: center;justify-content: center;">
        <img src="/test/static/xianjin/img5.png" width="263" height="80"  style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:3.08pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="font-size:12pt; line-height:108%; margin:0pt 0pt 8pt">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:9pt">&#xa0;</span></p>
      <p style="line-height:10pt; margin:0pt 0pt 8pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS________${repositorydata.address}_____________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.__${repositorydata.phone}_______</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
<!--       <img src="bca2f14c-20dd-4380-a9d9-c6d31aa9268b.032.png" width="726" height="13" alt="" style="-aw-left-pos:-25pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:10.5pt; -aw-wrap-type:none; margin-left:-25.38pt; margin-top:10.12pt; position:absolute; z-index:29" />
 -->      <p style="font-size:9pt; line-height:108%; margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:9pt">&#xa0;</span></p>
      <p style="font-size:12pt; line-height:108%; margin:0pt 0pt 8pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:12pt; line-height:108%; margin:0pt 0pt 8pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:12pt; line-height:108%; margin:0pt 0pt 8pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:12pt; line-height:108%; margin:0pt 0pt 8pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">TO:</span>
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">VAL</span>
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">UE</span>
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">D</span>
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">CUSTOMERS</span></p>
      <p style="font-size:12pt; line-height:108%; margin:0pt 0pt 8pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">FROM:</span>
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">TAILG/NWOW MANAGEMENT</span></p>
      <p style="font-size:12pt; line-height:108%; margin:0pt 0pt 8pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">SUBJECT:  LTO REGISTRATION.</span></p>
      <p style="font-size:14pt; line-height:108%; margin:0pt 0pt 8pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:14pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:14pt; line-height:108%; margin:0pt 0pt 8pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:14pt; font-weight:bold">We would like to inform all of our valued customers those below.</span></p>
      <p style="font-size:12pt; line-height:108%; margin:0pt 0pt 8pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <ol type="1" style="margin:0pt; padding-left:0pt">
        <li style="font-family:'Times New Roman'; font-size:12pt; line-height:115%; margin:0pt 0pt 0pt 32pt; padding-left:4pt; text-align:justify; text-indent:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">For all customers who already purchase units</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">. (before February 25,</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">2017 customers)</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">, o</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">ur company promise that we will be the one who handle 1</span>
          <span style="font-family:'Times New Roman'; font-size:8pt; vertical-align:super">st</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">registration fee once LTO issue memorandum.</span></li>
      </ol>
      <p style="font-size:12pt; line-height:108%; margin:0pt 0pt 0pt 36pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <ol start="2" type="1" style="margin:0pt; padding-left:0pt">
        <li style="font-family:'Times New Roman'; font-size:12pt; line-height:115%; margin:0pt 0pt 0pt 32pt; padding-left:4pt; text-align:justify; text-indent:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">For all new customers who purchase units.</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">(on or after February 26, 2017 customers</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">),o</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">ur</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">company promise that we will be the one who handle 1</span>
          <span style="font-family:'Times New Roman'; font-size:8pt; vertical-align:super">st</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">registration fee once LTO issue memorandum. If later we against</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">our promise, w</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">e are</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">accept</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">customers to return units and we will return full payment.</span></li>
      </ol>
      <p style="font-size:12pt; line-height:108%; margin:0pt 0pt 8pt 36pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <p style="font-size:14pt; line-height:108%; margin:0pt 0pt 8pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:14pt; font-weight:bold">Note</span>
        <span style="font-family:'Times New Roman'; font-size:14pt; font-weight:bold">:</span></p>
      <ol type="1" style="margin:0pt; padding-left:0pt">
        <li style="font-family:'Times New Roman'; font-size:12pt; line-height:115%; margin:0pt 0pt 0pt 35pt; padding-left:4pt; text-align:justify; text-indent:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">This promise only includes LTO REGISTRATION. Not affect like against traffic rules those violations.</span></li>
        <li style="font-family:'Times New Roman'; font-size:12pt; line-height:115%; margin:0pt 0pt 0pt 35pt; padding-left:4pt; text-align:justify; text-indent:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">Please always obey traffic rules and wear helmet.</span></li>
        <li style="font-family:'Times New Roman'; font-size:12pt; line-height:115%; margin:0pt 0pt 0pt 35pt; padding-left:4pt; text-align:justify; text-indent:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">Bring a copy of your Sales Certificate or any proof of purchased.</span></li>
        <li style="font-family:'Times New Roman'; font-size:12pt; line-height:115%; margin:0pt 0pt 0pt 35pt; padding-left:4pt; text-align:justify; text-indent:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">For before LTO have new memorandum, please avoid main national roads and main highways (Ex: Edsa, Ayala, C3, C4, C5,</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">Roxas</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">Boulevard)</span></li>
        <li style="font-family:'Times New Roman'; font-size:12pt; line-height:115%; margin:0pt 0pt 0pt 35pt; padding-left:4pt; text-align:justify; text-indent:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">Don’t make an argument to law enforcers just explain that until now LTO didn’t release a latest Memorandum.</span></li>
        <li style="font-family:'Times New Roman'; font-size:12pt; line-height:115%; margin:0pt 0pt 0pt 35pt; padding-left:4pt; text-align:justify; text-indent:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">Always check your units if it is in good condition.</span></li>
      </ol>
      <p style="font-size:12pt; line-height:108%; margin:0pt 0pt 8pt 39pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt">(Signal light, head light, horn, break light, etc.)</span></p>
      <p style="font-size:12pt; line-height:108%; margin:0pt 0pt 8pt">
        <br style="page-break-before:always; clear:both" /></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0pt 39pt; display: flex;align-items: center;justify-content: center;">
        <img src="/test/static/xianjin/img5.png" width="263" height="72" style="-aw-left-pos:136pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" />
        <a name="_Hlk13506575"></a>
      </p>
      <p style="font-size:12pt; line-height:108%; margin:0pt 0pt 8pt 39pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="-aw-bookmark-end:_Hlk13506575"></span>
        <span style="font-family:Calibri; font-size:8pt">ADDRESS________${repositorydata.address}_____________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.__${repositorydata.phone}_______</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="line-height:10pt; margin:0pt 0pt 8pt; text-align:justify">
<!--         <img src="bca2f14c-20dd-4380-a9d9-c6d31aa9268b.034.png" width="625" height="12" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:character; -aw-rel-vpos:line; -aw-top-pos:0pt; -aw-wrap-type:inline" /></p>
 -->      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 9.8pt">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">Date: February 25, 2017 </span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 10.65pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TO:ALL</span>
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">E-BIKE USERS</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 14.25pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">FROM: TAILG/NWOW </span></p>
      <h1 style="margin:0pt; page-break-after:avoid; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">SUBJECT: </span>
        <span style="font-family:'Times New Roman'; font-size:10pt; font-weight:bold">E-BIKE BATTERY CONCERNS</span></h1>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 11.8pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0.1pt 26.95pt; text-indent:-18pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">3.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">CHARGING</span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 45.45pt; text-indent:-18.5pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">3.1</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">The lifespan of lead-acid battery is around 400 cycles of charge-discharge, so the charging timing matters a lot, the battery usually needs to be charged after 60% to 70% consumption of power, also must be totally discharged 1 time monthly (means fully consume the power and recharge). </span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 45.45pt; text-indent:-18.5pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">3.2</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">After usage of e-bike, Leave about 30 minutes rest time for the battery before recharge.</span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 45.45pt; text-indent:-18.5pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">3.3</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">Avoid the charging being exposed to direct sunlight, high temperature, raining, or wet environment. </span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 45.45pt; text-indent:-18.5pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">3.4</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">Avoid long-time overcharging, this overcharging means the time of charging after the indicator turns green, because even the indicator turns green, the battery is still being charged with a small slow flow of current. </span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 45.45pt; text-indent:-18.5pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">3.5</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">Since the electricity capacity of battery decreases naturally during the storage period, the brand-new storage battery also needs to be charged monthly. </span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0.1pt 26.95pt; text-indent:-18pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">4.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REFILLING</span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 45.45pt; text-indent:-18.5pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">4.1</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">High temperature of charging environment, large current from charger, long-time usage of battery will cause the battery lack of fluid.  The obvious symptom of lacking fluid is the indicator of charger does not change color into green, and also the temperature of battery gets higher during charging.   The battery fluid can be refilled if confirmed short, the following are specific ways:</span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 63.7pt; text-indent:-18pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">1.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">Discharge the battery to cut-off voltage </span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 63.7pt; text-indent:-18pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">2.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">Open the battery surface cover, remove the safety valve, inject the battery fluid with a syringe one by one, usually 10 to 12 ml for 12AH battery; 14 to 16 ml for 20 AH battery</span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 63.7pt; text-indent:-18pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">3.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">Fully charge the refilled battery </span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 63.7pt; text-indent:-18pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">4.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">Drain out the visible fluid inside the battery</span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 63.7pt; text-indent:-18pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-style:normal; text-decoration:none; vertical-align:baseline">5.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt">Clean the surface of the battery, put back the safety valve and glue the cover </span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 45.45pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt 0pt 0pt 288pt; text-align:center; text-indent:36pt">
        <span style="font-family:Calibri; font-size:11pt">With my conformity</span>
        <span style="font-family:Calibri; font-size:11pt">,</span></p>
      <p style="margin:0pt 0pt 0pt 288pt; text-align:center; text-indent:36pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt 0pt 0pt 18pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">______________________________</span>
        <span style="width:107.64pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:290pt"></span>
        <span style="width:34pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11pt">_________________________</span></p>
      <p style="margin:0pt 0pt 0pt 18pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">NWOW Marketing Representative</span>
        <span style="width:118.23pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:289pt"></span>
        <span style="font-family:Calibri; font-size:11pt">Signature Over Printed Name</span></p>
      <p style="margin:0pt 0pt 0pt 334pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt">(Customer)</span></p>
      <p style="font-size:9pt; line-height:108%; margin:2.45pt 0pt 1pt">
<!--         <img src="bca2f14c-20dd-4380-a9d9-c6d31aa9268b.035.png" width="655" height="2" alt="" style="-aw-left-pos:58.25pt; -aw-rel-hpos:page; -aw-rel-vpos:page; -aw-top-pos:748.5pt; -aw-wrap-type:topbottom" /></p>
 -->      <p style="font-size:9pt; line-height:108%; margin:2.45pt 0pt 1pt">
        <span style="font-family:Cambria; font-size:9pt; font-style:italic">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:2.45pt 0pt 1pt">
        <span style="font-family:Cambria; font-size:9pt; font-style:italic">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
    </div>
`
const datazzz = {
  needdata,
  content
}

export default datazzz
