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
<div style="text-align: center">
    	      <div style="display: flex;align-items: center; justify-content: center;">

      <img src="/static/fenqi/img1.jpeg" width="100%" height="1500" alt="nwow (1).jpg" style="-aw-left-pos:-0.25pt; -aw-rel-hpos:page; -aw-rel-vpos:paragraph; -aw-top-pos:-13.34pt; -aw-wrap-type:none; margin-left:0pt; margin-top:548pt; position:absolute; z-index:1999" />
      </div>

      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
        <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
        <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt">
        <span style="width:97.15pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:97.15pt"></span>
      </p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:9pt; text-align:center; text-indent:-9pt">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <img src="/static/fenqi/img2.png" width="90%" height="150" alt="" style="-aw-left-pos:-37.78pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:-12.69pt; -aw-wrap-type:none; margin-top:625px; position:absolute; z-index:1999" />
      <img src="/static/fenqi/img3.png" width="100%" height="1500" alt="" style="-aw-left-pos:-25.3pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:17.7pt; -aw-wrap-type:none; margin-left:-25.3pt; margin-top:600px;  z-index:80" />
      <p style="margin:0pt; display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img5.png" width="221" height="40" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0.3pt; -aw-wrap-type:through; margin:0pt 9pt" /></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Bookman Old Style'; font-size:14pt; font-weight:bold">            BRAND</span>
        <span style="font-family:'Bookman Old Style'; font-size:14pt; font-weight:bold">NEW INSTALLMENT GUIDE</span></p>
      <p style="margin:0pt; text-indent:36pt">
        <span style="font-family:'Bookman Old Style'; font-size:11pt; font-weight:bold">Date Released</span>
        <span style="font-family:'Bookman Old Style'; font-size:11pt; font-weight:bold">____________________________________________</span>
        <span style="width:1.26pt; text-indent:0pt; display:inline-block"></span>
      </p>
      <p style="margin:0pt; text-indent:36pt">
        <span style="font-family:'Bookman Old Style'; font-size:11pt; font-weight:bold">Name of Customer</span>
        <span style="font-family:'Bookman Old Style'; font-size:11pt; font-weight:bold"></span>
        <span style="width:2.18pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:11pt; font-weight:bold">____________${needdata.customerName}___________________________</span></p>
              <p style="margin:0pt; text-indent:36pt">
        <span style="font-family:'Bookman Old Style'; font-size:11pt; font-weight:bold">Address: ______________${needdata.address}_____________________</span>
        <span style="font-family:'Bookman Old Style'; font-size:11pt; font-weight:bold">_________________</span></p>
      <table cellspacing="0" cellpadding="0" style="border-collapse:collapse; width: 100%;text-align: center;">
        <tr style="height:44.5pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:122.25pt">
<!--             <img src="9479c74d-987e-49a4-9c19-27188981c608.006.png" width="734" height="596" alt="" style="-aw-left-pos:-9.3pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:7.2pt; -aw-wrap-type:none; margin-left:-9.3pt; margin-top:7.2pt; position:absolute; z-index:-65456" />
 -->            <p style="margin:0pt; line-height: 19px;">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">UNIT PURCHASED: ${cardata.productTypeName}</span></p>
          </td>
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:118.8pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">MOTOR</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">NO.${cardata.motorCode}</span></p>
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">CHASIS NO. ${cardata.carCode}</span></p>
          </td>
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:119.3pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">GROSS</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">AMOUNT</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">:${needdata.installmentAllMoney}</span></p>
          </td>
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:140.7pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">TERMS:${needdata.installmentCount}</span></p>
          </td>
        </tr>
        <tr style="height:44.5pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:122.25pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">COLOR:${cardata.color}</span></p>
          </td>
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:118.8pt">
            <p style="margin:0pt;line-height: 19px;">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">BATTERY</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">NO.${cardata.batteryCode}</span></p>
            <p style="margin:0pt;line-height: 19px;">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">CHARGER NO.${cardata.chargeCode}</span></p>
          </td>
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:119.3pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">DOWN PAYMENT:${needdata.firstMoney}</span></p>
          </td>
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:140.7pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">MONTHLY PAYMENT:${needdata.eachMoney}</span></p>
          </td>
        </tr>
        <tr style="height:31.1pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:122.25pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">REBATE</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:400.4pt">
            <p style="margin:0pt;line-height: 19px;">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">100 pesos rebate</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">for every updated payment (on or before due date).</span></p>
            <p style="margin:0pt;line-height: 19px;">
              <span style="font-family:'Bookman Old Style'; font-size:10pt">Good as cash or units that availed in 3 months terms and pick up payments are also not included.</span></p>
          </td>
        </tr>
        <tr style="height:16.6pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:122.25pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">PICK UP PAYMENT</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:400.4pt">
            <p style="margin:0pt;line-height: 19px;">
              <span style="font-family:'Bookman Old Style'; font-size:10pt">Only for customers who are not capable to go in nearest store to pay their monthly payment.</span></p>
            <p style="margin:0pt;line-height: 19px;">
              <span style="font-family:'Bookman Old Style'; font-size:10pt">(If have emergency, pregnant and person with disability and senior citizens)</span></p>
          </td>
        </tr>
        <tr style="height:16.6pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:122.25pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">CHANGE TERM</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:400.4pt">
            <p style="margin:0pt;line-height: 19px;">
              <span style="font-family:'Bookman Old Style'; font-size:10pt">If the payment could not settle within the certain terms, there will be an adjustment in the gross amount and monthly payment.</span></p>
          </td>
        </tr>
        <tr style="height:19.3pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:122.25pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">PENALTY</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:400.4pt">
            <p style="margin:0pt;line-height: 19px;">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">Three (</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">3)days</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">after the due date, 10% of monthly payment will be added.</span></p>
            <p style="margin:0pt;line-height: 19px;">
              <span style="color:#ff0000; font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">For lapsed Contract</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">, additional 10% of all unpaid monthly payment will be addedmonthly.</span></p>
          </td>
        </tr>
        <tr style="height:20.65pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:122.25pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">DEPOSIT OF UNIT</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:400.4pt">
            <p style="margin:0pt; line-height: 19px;">
              <span style="font-family:Calibri; font-size:11pt">Upon reaching Fifteen (15) days delayed payments from due date will deposit of unit.</span></p>
            <p style="margin:0pt;line-height: 19px;">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">In case of special situation</span>
              <span style="font-family:Calibri; font-size:11pt">, the company have the rights</span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">to lock or cut the power</span>
              <span style="font-family:Calibri; font-size:11pt">of the purchased unit. (The company reserves the right for the final explanation)</span></p>
          </td>
        </tr>
        <tr style="height:22pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:122.25pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">GRACE PERIOD</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:400.4pt">
            <p style="margin:0pt; text-align:justify; line-height: 19px;">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">Thirty (30) days grace period</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">t</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">o pay all the arrears includ</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">ing penalties and other</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">charges</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">from</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt"></span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">the day unit was deposited in branch.</span></p>
          </td>
        </tr>
        <tr style="height:16.15pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:122.25pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">REPOSSESSION</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:400.4pt">
            <p style="margin:0pt; line-height: 19px;">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:normal">If the payment still not settle</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">within 30 days</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:normal">, the unit will send back to warehouse and will not be returned.</span></p>
          </td>
        </tr>
        <tr style="height:65.2pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:122.25pt">
            
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">WHOM TO PAY</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:400.4pt">
            <p style="margin:0pt; line-height: 19px;">
              <span style="font-family:'Bookman Old Style'; font-size:10pt">Authorized collectors and office cashiers only.</span></p>
            <p style="margin:0pt; line-height: 19px;">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-style:italic; font-weight:bold">THE COMPANY DO</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-style:italic; font-weight:bold">N</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-style:italic; font-weight:bold">’T HAVE A</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-style:italic; font-weight:bold">HOUSE COLLECTOR.</span></p>
            <p style="margin:0pt; line-height: 19px;">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">ALWAYS ASK FOR COMPANY RECEIPT</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-style:italic; font-weight:bold">.</span></p>
            <p style="margin:0pt; line-height: 19px;">
              <span style="font-family:'Bookman Old Style'; font-size:10pt">Any payment without receipt will not be honored by the company</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">even it was</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">collected by</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">ana</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">uthorized</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">employee</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">or not by the company.</span></p>
            <p style="margin:0pt; line-height: 19px;">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">PLEASE KEEP RECEIPTS FOR FUTUREREFERENCES.</span></p>
          </td>
        </tr>
        <tr style="height:26.5pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:122.25pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">MAINTENANCE</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:400.4pt">
            <p style="margin:0pt;line-height: 19px;">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:normal">The custo</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:normal">mer shall observe strictly the basic maintenance of the</span>
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:normal">Electric Motor Vehicle</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:normal">as stated in the</span>
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:normal">Electric Motor Vehicle</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:normal">Manual.</span></p>
          </td>
        </tr>
        <tr style="height:26.05pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:122.25pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">WARRANTY</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:400.4pt">
            <p style="margin:0pt;line-height: 19px;">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">LIFETIME</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">FREE SERVICE +</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">WARRANTY</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">stated in warranty agreement card provided by the company.</span></p>
          </td>
        </tr>
        <tr style="height:44.05pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:122.25pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">WARRANTY</span></p>
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">LIMITATIONS</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:400.4pt">
            <p style="margin:0pt; text-align:justify;line-height: 19px;">
              <span style="font-family:'Bookman Old Style'; font-size:10pt">Engine modification is strictly prohibited. If proven, warranty will be automatically null and void. Other warranty conditions are clearly stated on</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">WARRANTY POLICY AND GUIDELINES</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">issued by the company. Please read for further information.</span></p>
          </td>
        </tr>
        <tr style="height:0pt">
          <td style="width:133.05pt; border:none"></td>
          <td style="width:129.6pt; border:none"></td>
          <td style="width:130.1pt; border:none"></td>
          <td style="width:151.5pt; border:none"></td>
        </tr>
      </table>
      <p style="margin:0pt">
        <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">IMPORTANT REMINDERS:</span></p>
      <ol type="1" style="margin:0pt; padding-left:0pt">
        <li style="line-height: 14px;font-family:'Bookman Old Style'; font-size:9pt; margin:0pt 0pt 0pt 9pt; text-align:justify; text-indent:0pt">
          <span style="font-family:'Bookman Old Style'; font-size:9pt">In case of accident or any unintended incident, unit will be deposit to the branch. Check up and repair will be conducted. Company not holds the liability to any missing or damage parts. Repair charges required.</span></li>
        <li style="line-height: 14px;font-family:'Bookman Old Style'; font-size:9pt; margin:0pt 0pt 0pt 13.46pt; padding-left:0.04pt; text-align:justify; text-indent:0pt">
          <span style="font-family:'Bookman Old Style'; font-size:9pt">For pull out unit, VENDEE must pay the amount for any missing or damage major and minor parts together with the charger of his/her</span>
          <span style="font-family:'Bookman Old Style'; font-size:9pt">ebike</span>
          <span style="font-family:'Bookman Old Style'; font-size:9pt">.</span></li>
        <li style="line-height: 14px;text-align: left;font-family:'Bookman Old Style'; font-size:9pt; margin:0pt 0pt 0pt 13.46pt; padding-left:0.04pt; text-indent:0pt">
          <span style="font-family:'Bookman Old Style'; font-size:9pt">The duplicate key will release maximum of 10 days after fully paid.</span></li>
      </ol>
      <p style="line-height: 14px;margin:0pt 0pt 0pt 4.5pt; text-align:justify; text-indent:18pt">
        <span style="width:13.5pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:9pt">I hereby state that I fully understand the preceding guidelines and hereby declare that I will strictly observe its provisions stated above.</span></p>
      <p style="line-height: 14px;margin:0pt 0pt 0pt 22.5pt; padding-left:18pt; text-indent:-18pt">
        <span style="width:13.5pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:36pt"></span>
        <span style="font-family:'Bookman Old Style'; font-size:9pt">And I signed to prove my willingness to adhere to it on my free will without pressure from anybody.</span></p>
      <p style="line-height: 14px;margin:0pt 0pt 0pt 378pt; text-indent:18pt">
        <span style="font-family:'Bookman Old Style'; font-size:10pt">With my conformity, </span></p>
      <p style="margin:0pt;line-height: 14px;">
        <span style="font-family:'Bookman Old Style'; font-size:10pt">Prepared</span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt">by:_</span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt">____________________</span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt"></span>
        <span style="width:3.4pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:11pt">________________________</span>
        <span style="font-family:'Bookman Old Style'; font-size:11pt"></span></p>
      <p style="margin:0pt">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt">Signature over Printed Name</span>
        </p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">“The company reserves the right for the final explanation</span>
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">.</span></p>
      <p style="font-size:10pt; display: flex;align-items: center;justify-content: center;">
        <span style="-aw-bookmark-end:_Hlk12280740"></span>
        <img src="/static/fenqi/img5.png" width="188" height="60"  style="-aw-left-pos:0pt; -aw-rel-hpos:page; -aw-rel-vpos:paragraph; -aw-top-pos:-0.03pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="margin:0pt; text-align:center;    line-height: 2px;">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center;line-height: 12px;">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Gungsuh; font-size:16pt; font-weight:bold; text-decoration:underline">SALESCERTIFICATION</span></p>
      <p style="margin:0pt; text-align:center;line-height: 18px;">
        <span style="font-family:'Times New Roman'; font-size:12pt">This is to certify that the Sales Invoice No.____________ was </br> issued to ____________${needdata.customerName}__________</span>
      <p style="margin:0pt; text-align:center;line-height: 18px;">
        <span style="font-family:'Times New Roman'; font-size:12pt">Of</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">______${needdata.address}____________________</span>
        <span style="font-family:'Times New Roman'; font-size:12pt"></span>
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xad;</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xad;</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xad;</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xad;</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xad;</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">for</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">the</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">purchased in</br></span>
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold; text-decoration:underline">INSTALLMENT</span>
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold; text-decoration:underline">BASIS</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">of</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">one</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">Electric Motor Vehicle</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">d</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">escribed hereunder:</span></p>
      <p style="margin:0pt;    line-height: 14px;">
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">DATE PURCHASED：</span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">_____________________________</span></p>
      <p style="margin:0pt;    line-height: 14px;">
        
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">MODEL OF VEHICLE：</span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">_____${cardata.productTypeName}_____</span></p>
      <p style="margin:0pt;    line-height: 14px;">
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">COLOR：</span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">__________${cardata.color}_____</span></p>
      <p style="margin:0pt;    line-height: 14px;">
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">MOTOR NUMBER：</span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">_____${cardata.motorCode}_____</span></p>
      <p style="margin:0pt;    line-height: 14px;">
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">VEHICLE NUMBER：</span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">_________${cardata.carCode}____</span></p>
      <p style="margin:0pt;    line-height: 14px;">
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">BATTERY NUMBER：</span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">_____${cardata.batteryCode}___</span></p>
      <p style="margin:0pt;    line-height: 14px;">
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">CHARGER NUMBER：</span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt">___________${cardata.chargeCode}_______</span></p>
        <p style="margin:0pt;    line-height: 14px;">
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">COTROLLER NUMBER：</span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt">_______${cardata.controlCode}_______</span></p>
      <p style="margin:0pt;    line-height: 10px;">
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">NOTE:</span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt">Not</span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt">to sell, assign, lease, pledge or otherwise encumber the subject chattel, or convey in any</br> matter whatsoever our right to purchased it to</br> any other third person without the prior written consent to the</span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt">VENDOR</span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt">.</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Bookman Old Style'; font-size:12pt">______________________________</span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>

        <span style="font-family:'Bookman Old Style'; font-size:12pt">  _________________________</span></p>
<p style="margin:0pt;    line-height: 10px;">
        <span style="font-family:'Times New Roman'; font-size:11pt">Customer’s Signature over Printed Name                                 </span>
        <span style="width:13.04pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Times New Roman'; font-size:11pt">NWOW</span>
        <span style="font-family:'Times New Roman'; font-size:11pt">Marketing Representative</span></p>
        <div style="padding-top: 20px"></div>
      <p style="margin:0pt;display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img5.png" width="197" height="57"  style="-aw-left-pos:0pt; -aw-rel-hpos:page; -aw-rel-vpos:paragraph; -aw-top-pos:5.33pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="margin:0pt; text-align:center;    line-height: 14px;">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:14.76pt; text-indent:0pt; display:inline-block"></span>
      </p>
      <p style="margin:0pt; text-align:center;    line-height: 10px;">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
   <h1 style="margin:0pt; page-break-after:avoid; text-align:center;    line-height: 10px;">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">WARRANTY POLICY AND GUIDELINES</span></h1>
      <p style="    line-height: 12px;font-size:9pt;  margin:0pt 0pt 0.2pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">1.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">NWOW MARKETING</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">shall not be liable under this warranty if any damage or defect result from  (</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">i</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">) misuse, abuse,  neglect   improper shipping  or  installation; (ii) disasters such as fire, flood, lightning or improper electric current; or (iii) service   or alteration by anyone other than an authorized NWOW MARKETING representative; (iv) damages incurred through    irresponsible use, or other non-recommended practices.</span></p>
      <p style="    line-height: 12px;margin:0pt 0pt 0pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">2.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Arial; font-size:9pt; font-style:italic; font-weight:bold">If the E-Bike will use for business or personal purpose, family use like delivering or use in any heavy activities that may exceed in its maximum load weight and may cause any damage or defect in E-Bike, warranty period of all affected parts will be going to be half of its original warranty period.     </span></p>
      <p style="    line-height: 12px;font-size:9pt; margin:0pt 0pt 0.2pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">3.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">You must retain your bill of sale or other proof of purchase to receive warranty service.</span></p>
      <p style="    line-height: 12px;font-size:9pt;  margin:0pt 0pt 0.2pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">4.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">No warranty extension will be granted for any replacement part(s) furnished to the purchaser in fulfillment of this warranty.</span></p>
      <p style="    line-height: 12px;font-size:9pt; margin:0pt 0pt 0.2pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">5.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">LIFETIME FREE SERVICE.</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">Any service taken are free of charge. Only the parts which are not cover by the limited warranty will charged by the company.</span></p>
      <p style="    line-height: 12px;margin:0pt 0pt 0pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">6.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">The company offers free home service to   the Major malfunction of   the   unit (</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">i</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">)electrical problem(ii)flat tire and any   troubleshooting occurs which cause the E-Bike not to run. Home service will be schedule and the company</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">exerts</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">its effort    to repair the malfunction within 48hours. The customer will be responsible to inform the company for any major malfunction    of the E-Bike. The company will just service the E-bike to the place registered on our system.</span></p>
      <p style="    line-height: 12px;font-size:9pt; margin:0pt 0pt 0.2pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">7.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">All the payment must settle before any warranty or service applied. The company has the right to delay our service warranty for our client who didn’t pay their monthly amortization on time. </span></p>
      <p style="    line-height: 12px;margin:0pt 0pt 2.05pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">8.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
        <span style="font-family:Arial; font-size:9pt; font-style:italic; font-weight:bold">If the unit has been installed or customized with other parts by anyone other than an authorized company   representative like roof, basket, saddle or others for business or overload use, warranty of major parts and all affected parts will be voided.</span></p>
      <p style="    line-height: 12px;font-size:10pt; line-height:101%; margin:1.75pt 1.4pt 0pt 22.45pt; orphans:0; text-align:justify; widows:0">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">9</span>
        <span style="font-family:Arial; font-size:10pt; font-weight:bold">.</span>
        <a name="_Hlk28588957"></a>
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
          <span style="-aw-bookmark-end:_Hlk28588957"></span>
          <span style="font-family:Calibri; font-size:10pt">.</span></a>
      </p>
      <p style="font-size:11pt; line-height:106%; margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:11pt">                     I hereby understand the Company policy and Guidelines regarding with the warranty. </span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt 0pt 0pt 0.3pt; text-indent:35.7pt">
        <span style="font-family:Arial; font-size:11pt">______________________</span>
        <span style="font-family:Arial; font-size:11pt">________</span>
        <span style="width:29.41pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:11pt">_________________________        </span></p>
      <p style="font-size:10pt; line-height:106%; margin:0pt 0pt 0pt 0.3pt; text-indent:35.7pt">
        <span style="font-family:Arial; font-size:10pt">Customer’s Signature</span>
        <span style="font-family:Arial; font-size:10pt">over</span>
        <span style="font-family:Arial; font-size:10pt">Printed Name</span>
        <span style="width:28.14pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:10pt">NWOW Marketing Representative</span></p>
      <p style="font-size:10pt; line-height:106%; margin:0pt 0pt 0pt 0.3pt; text-indent:35.7pt">
        <span style="font-family:Arial; font-size:10pt">&#xa0;</span></p>
      <img src="/static/fenqi/img6.png" width="779" height="594" alt="" style="-aw-left-pos:-43.5pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:6.5pt; -aw-wrap-type:none; margin-left:-43.5pt; margin-top:6.5pt; z-index:116" />
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:'Sakkal Majalla'; font-size:11pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:'Sakkal Majalla'; font-size:11pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:'Sakkal Majalla'; font-size:11pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:'Sakkal Majalla'; font-size:11pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:'Sakkal Majalla'; font-size:11pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:'Sakkal Majalla'; font-size:11pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:11pt">____________________________</span>
        <span style="width:4.04pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:11pt">____________________________</span></p>
 
      <p style="font-size:10pt; line-height:106%; margin:0pt; padding-left:27.3pt; text-indent:-27.3pt">
        <span style="font-family:Arial; font-size:10pt">Customer’s Signature</span>
        <span style="font-family:Arial; font-size:10pt">over</span>
        <span style="font-family:Arial; font-size:10pt">Printed Name   </span>
        <span style="width:13.59pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:10pt">NWOW Marketing Representative</span></p>
      <p style="font-size:10pt; line-height:106%; margin:0pt">
        <span style="font-family:Arial; font-size:10pt">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt">
        <span style="font-family:Calibri; font-size:10pt; font-weight:bold">&#xa0;</span></p>
             <img src="/static/fenqi/img5.png" width="156" height="57" style="-aw-left-pos:244.55pt; -aw-rel-hpos:page; -aw-rel-vpos:paragraph; -aw-top-pos:4.43pt; -aw-wrap-type:none; margin-top:4.43pt; z-index:35" />
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.014.png" width="671" height="216" alt="" style="-aw-left-pos:58.03pt; -aw-rel-hpos:page; -aw-rel-vpos:paragraph; -aw-top-pos:15.28pt; -aw-wrap-type:none; margin-left:22.03pt; margin-top:15.28pt; position:absolute; z-index:-65461" />
 -->      <p style="font-size:16pt; line-height:108%; margin:0pt 205.8pt 3.5pt 144pt; text-align:center">
        <span style="font-family:Calibri; font-size:16pt; font-weight:bold">WAIVER OF LIABILITY</span></p>
      <p style="margin:0pt 35.45pt 0pt 0pt; text-align:center;">
        <span style="font-family:Calibri; font-size:10pt">This hereby releases</span>
        <span style="font-family:Calibri; font-size:10pt; font-weight:bold">NWOW Marketing</span>
        <span style="font-family:Calibri; font-size:10pt">from any and all liabilities upon apprehension/s of Mr. / Ms.<br/> ____________${needdata.customerName}_________________ by any government agencies for all types of traffic violation and from any all injuries<br/> suffered by him / her or by third person/s, financial or otherwise, while driving the above describe</span>
        <span style="font-family:'Times New Roman'; font-size:10pt">Electric Motor<br/> Vehicle</span>
        <span style="font-family:Calibri; font-size:10pt">unit. </span></p>
      <p style="margin:0pt 35.45pt 0pt 0pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt">I, __________${needdata.customerName}______________________________, fully understand and agreed to the foregoing</span>
        <span style="font-family:Calibri; font-size:11pt">. </span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold; text-decoration:underline">____________________________</span>
        <span style="width:26.85pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold"></span>
        <span style="font-family:Calibri; font-size:11pt;">_______________</span></p>
      <p style="margin:0pt 60.2pt 0pt 0pt">
        <span style="font-family:Calibri; font-size:11pt">           Signature over printed name                                                                             </span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11pt">  Date   </span>
        <br />
        <span style="font-family:Calibri; font-size:11pt">            Buyer       </span></p>
      <p style="margin:0pt 35.45pt 0pt 0pt">
        <span style="font-family:Calibri; font-size:11pt"></span>
        <span style="font-family:Calibri; font-size:11pt"></span>
        <span style="font-family:Calibri; font-size:11pt">Signed in presence of:     </span></p>
      <p style="margin:0pt 35.45pt 0pt 0pt">
        <span style="font-family:Calibri; font-size:11pt; text-decoration:underline">_______________________________</span>
        <span style="width:10.17pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11pt"></span>
        <span style="font-family:Calibri; font-size:11pt"></span>
        <span style="font-family:Calibri; font-size:11pt">   _________________</span></p>
      <p style="margin:0pt 35.45pt 0pt 0pt">
        <span style="font-family:Calibri; font-size:11pt">Sales and Service Representative                  </span>
        <span style="font-family:Calibri; font-size:11pt"></span>
        <span style="width:23pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11pt"></span>
        <span style="font-family:Calibri; font-size:11pt"></span>
        <span style="font-family:Calibri; font-size:11pt">Branch Manager </span></p>
        <div style="padding-top: 50px"></div>
      <p style="margin:0pt; display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img5.png" width="264" height="83" style="-aw-left-pos:156pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0.75pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Monotype Corsiva'; font-size:9pt">&#xa0;</span></p>
      <p style="font-size:18pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:'Britannic Bold'; font-size:18pt; font-weight:bold">CO-MAKER’S STATEMENT</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.016.png" width="681" height="631" alt="" style="-aw-left-pos:-1.34pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:3.07pt; -aw-wrap-type:none; margin-left:-1.34pt; margin-top:3.07pt; position:absolute; z-index:-65462" />
      <img src="9479c74d-987e-49a4-9c19-27188981c608.017.png" width="151" height="1" alt="" style="-aw-left-pos:369.35pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:11.75pt; -aw-wrap-type:none; margin-left:368.98pt; margin-top:11.38pt; position:absolute; z-index:56" /> -->
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Name:</span>
        <span style="font-family:Arial; font-size:11pt">__________________________________</span>
        <span style="font-family:Arial; font-size:11pt">_______</span>
        <span style="font-family:Arial; font-size:11pt">___</span>
        <span style="font-family:Arial; font-size:11pt">____</span>
        <span style="font-family:Arial; font-size:11pt">__</span>
        <span style="font-family:Arial; font-size:11pt">__Age:_______</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Last           First              Middle Name</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center;">
        <span style="font-family:Arial; font-size:11pt">I agree to become a co-maker of the applicant Ms</span>
        <span style="font-family:Arial; font-size:11pt">. /</span>
        <span style="font-family:Arial; font-size:11pt">Mr</span>
        <span style="font-family:Arial; font-size:11pt">. /</span>
        <span style="font-family:Arial; font-size:11pt">Mrs. _________________</span>
        <span style="font-family:Arial; font-size:11pt">_____________</span>
        <span style="font-family:Arial; font-size:11pt">In<br/> signing the promissory note which evidence the</span>
        <span style="font-family:'Times New Roman'; font-size:11pt">Electric Motor Vehicle</span>
        <span style="font-family:Arial; font-size:11pt">Loan Applied for if granted         I am<br/> aware of the responsibilities which I will assume in signing such a note in case that the Principal Buyer can’t<br/> settle the said monthly dues I will be responsible of paying the said amount</span>
        <span style="font-family:Arial; font-size:11pt">.</span>
        <span style="font-family:Arial; font-size:11pt">I authorized you to obtain such<br/> information as you required concerning the statement made here under and agree that this document shall<br/> remain your property, whether or not due loan is granted</span>
        <span style="font-family:Arial; font-size:11pt">.</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt; font-weight:bold; text-decoration:underline">PERSONAL INFORMATION:</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt; font-weight:bold">&#xa0;</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.018.png" width="529" height="1" alt="" style="-aw-left-pos:85.8pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:9.65pt; -aw-wrap-type:none; margin-left:85.42pt; margin-top:9.28pt; position:absolute; z-index:57" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Present</span>
        <span style="font-family:Arial; font-size:11pt">Address: _________________________________</span></p>
      <img src="9479c74d-987e-49a4-9c19-27188981c608.019.png" width="508" height="1" alt="" style="-aw-left-pos:101.75pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:12.05pt; -aw-wrap-type:none; margin-left:101.38pt; margin-top:11.68pt; position:absolute; z-index:58" />
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Permanent Address: _________________________________</span></p>
      <img src="9479c74d-987e-49a4-9c19-27188981c608.020.png" width="542" height="1" alt="" style="-aw-left-pos:75.8pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:11.95pt; -aw-wrap-type:none; margin-left:75.42pt; margin-top:11.58pt; position:absolute; z-index:59" />
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Length of Stay: _________________________________</span></p>
      <img src="9479c74d-987e-49a4-9c19-27188981c608.021.png" width="173" height="1" alt="" style="-aw-left-pos:352.9pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:11.05pt; -aw-wrap-type:none; margin-left:352.52pt; margin-top:10.68pt; position:absolute; z-index:60" />
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Marital Status: _______________ No. of Children:_____________</span></p>
      <img src="9479c74d-987e-49a4-9c19-27188981c608.022.png" width="231" height="1" alt="" style="-aw-left-pos:309.7pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:10.1pt; -aw-wrap-type:none; margin-left:309.32pt; margin-top:9.72pt; position:absolute; z-index:61" />
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Contact No: _______________</span>
        <span style="font-family:Arial; font-size:11pt"> E-Mail: _____________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt; font-weight:bold; text-decoration:underline">EMP</span>
        <span style="font-family:Arial; font-size:11pt; font-weight:bold; text-decoration:underline">L</span>
        <span style="font-family:Arial; font-size:11pt; font-weight:bold; text-decoration:underline">OYMENT</span>
        <span style="font-family:Arial; font-size:11pt; font-weight:bold; text-decoration:underline">/BUSINESS DETAILS:</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt; font-weight:bold">&#xa0;</span></p>
      <img src="9479c74d-987e-49a4-9c19-27188981c608.023.png" width="135" height="1" alt="" style="-aw-left-pos:381.35pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:10.55pt; -aw-wrap-type:none; margin-left:380.98pt; margin-top:10.18pt; position:absolute; z-index:62" />
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Company</span>
        <span style="font-family:Arial; font-size:11pt">/Business</span>
        <span style="font-family:Arial; font-size:11pt">Name: ______________________________Contact</span>
        <span style="font-family:Arial; font-size:11pt">No.:______________________________</span></p>
      <img src="9479c74d-987e-49a4-9c19-27188981c608.024.png" width="445" height="1" alt="" style="-aw-left-pos:148.9pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:9.9pt; -aw-wrap-type:none; margin-left:148.52pt; margin-top:9.52pt; position:absolute; z-index:63" />
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Company/ Business</span>
        <span style="font-family:Arial; font-size:11pt">Address:</span></p>
      <img src="9479c74d-987e-49a4-9c19-27188981c608.025.png" width="96" height="1" alt="" style="-aw-left-pos:410.95pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:11.2pt; -aw-wrap-type:none; margin-left:410.58pt; margin-top:10.82pt; position:absolute; z-index:64" />
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Kind of Business: _______________________</span>
        <span style="font-family:Arial; font-size:11pt">Length of Service:______________________________</span></p>
      <img src="9479c74d-987e-49a4-9c19-27188981c608.018.png" width="529" height="1" alt="" style="-aw-left-pos:85.8pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:10.3pt; -aw-wrap-type:none; margin-left:85.42pt; margin-top:9.93pt; position:absolute; z-index:65" />
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Monthly Income:______________________________</span></p>
      <img src="9479c74d-987e-49a4-9c19-27188981c608.026.png" width="483" height="1" alt="" style="-aw-left-pos:120.4pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:11.05pt; -aw-wrap-type:none; margin-left:120.02pt; margin-top:10.68pt; position:absolute; z-index:66" />
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Other Source of Income:______________________________</span></p>
      <img src="9479c74d-987e-49a4-9c19-27188981c608.027.png" width="490" height="1" alt="" style="-aw-left-pos:115.4pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:10.95pt; -aw-wrap-type:none; margin-left:115.02pt; margin-top:10.58pt; position:absolute; z-index:67" />
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Monthly fixed expense:______________________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt; font-weight:bold">&#xa0;</span></p>
      <img src="9479c74d-987e-49a4-9c19-27188981c608.028.png" width="377" height="1" alt="" style="-aw-left-pos:199.95pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:9.75pt; -aw-wrap-type:none; margin-left:199.58pt; margin-top:9.38pt; position:absolute; z-index:68" />
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">How long have you known the applicant?______________________________</span></p>
      <img src="9479c74d-987e-49a4-9c19-27188981c608.029.png" width="459" height="1" alt="" style="-aw-left-pos:138pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:9.65pt; -aw-wrap-type:none; margin-left:137.62pt; margin-top:9.28pt; position:absolute; z-index:69" />
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Relation with the Applicant?______________________________</span></p>
      <img src="9479c74d-987e-49a4-9c19-27188981c608.030.png" width="259" height="1" alt="" style="-aw-left-pos:288.7pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:11.25pt; -aw-wrap-type:none; margin-left:288.32pt; margin-top:10.88pt; position:absolute; z-index:70" />
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Have you ever been a borrower? ______________________________</span>
        <span style="font-family:Arial; font-size:11pt">Where:______________________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">I hereby affirm that all information given above is true and correct.</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt;text-align: right;">
        <span style="font-family:Arial; font-size:11pt">__________________________________                  ____________________________________                                                                                     </span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Co-Maker’s Signature over Printed Name                    Principal Buyer Signature</span>
        <span style="font-family:Arial; font-size:11pt">over</span>
        <span style="font-family:Arial; font-size:11pt">Printed Name</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt;margin-left: 100px">Date Signed: _______________________                 Date Signed: _________________________                                                                </span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 8pt">
        <br style="page-break-before:always; clear:both" /></p>
      <img src="/static/fenqi/img5.png" width="228" height="72" style="-aw-left-pos:171.47pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:-0.88pt; -aw-wrap-type:none; margin-top:-0.88pt; z-index:114" />
      <p style="font-size:8pt; line-height:115%; margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="font-size:8pt; line-height:115%; margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="font-size:8pt; line-height:115%; margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="font-size:8pt; line-height:115%; margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="font-size:8pt; line-height:115%; margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Monotype Corsiva'; font-size:9pt">&#xa0;</span></p>
      <p style="font-size:18pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:'Britannic Bold'; font-size:18pt; font-weight:bold">CO-MAKER’S STATEMENT</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.016.png" width="681" height="631" alt="" style="-aw-left-pos:-1.34pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:3.07pt; -aw-wrap-type:none; margin-left:-1.34pt; margin-top:3.07pt; position:absolute; z-index:-65438" />
 --><!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.017.png" width="151" height="1" alt="" style="-aw-left-pos:369.35pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:11.75pt; -aw-wrap-type:none; margin-left:368.98pt; margin-top:11.38pt; position:absolute; z-index:82" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Name:</span>
        <span style="font-family:Arial; font-size:11pt">__________________________________</span>
        <span style="font-family:Arial; font-size:11pt">_______</span>
        <span style="font-family:Arial; font-size:11pt">___</span>
        <span style="font-family:Arial; font-size:11pt">____</span>
        <span style="font-family:Arial; font-size:11pt">__</span>
        <span style="font-family:Arial; font-size:11pt">__Age:_______</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Last           First              Middle Name</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center;">
        <span style="font-family:Arial; font-size:11pt">I agree to become a co-maker of the applicant Ms. / Mr. / Mrs. _________________</span>
        <span style="font-family:Arial; font-size:11pt">_____________</span>
        <span style="font-family:Arial; font-size:11pt">In</br> signing the promissory note which evidence the</span>
        <span style="font-family:'Times New Roman'; font-size:11pt">Electric Motor Vehicle</span>
        <span style="font-family:Arial; font-size:11pt">Loan Applied for if granted         I am</br> aware of the responsibilities which I will assume in signing such a note in case that the Principal Buyer can’t</br> settle the said monthly dues I will be responsible of paying the said amount</span>
        <span style="font-family:Arial; font-size:11pt">.</span>
        <span style="font-family:Arial; font-size:11pt">I authorized you to obtain such</br> information as you required concerning the statement made here under and agree that this document shall</br> remain your property, whether or not due loan is granted</span>
        <span style="font-family:Arial; font-size:11pt">.</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt; font-weight:bold; text-decoration:underline">PERSONAL INFORMATION:_________________________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt; font-weight:bold">&#xa0;</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.018.png" width="529" height="1" alt="" style="-aw-left-pos:85.8pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:9.65pt; -aw-wrap-type:none; margin-left:85.42pt; margin-top:9.28pt; position:absolute; z-index:83" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Present</span>
        <span style="font-family:Arial; font-size:11pt">Address:_________________________________</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.019.png" width="508" height="1" alt="" style="-aw-left-pos:101.75pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:12.05pt; -aw-wrap-type:none; margin-left:101.38pt; margin-top:11.68pt; position:absolute; z-index:84" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Permanent Address:_________________________________</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.020.png" width="542" height="1" alt="" style="-aw-left-pos:75.8pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:11.95pt; -aw-wrap-type:none; margin-left:75.42pt; margin-top:11.58pt; position:absolute; z-index:85" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Length of Stay:_________________________________</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.021.png" width="173" height="1" alt="" style="-aw-left-pos:352.9pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:11.05pt; -aw-wrap-type:none; margin-left:352.52pt; margin-top:10.68pt; position:absolute; z-index:86" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Marital Status:_____________________________ No. of Children:________________________</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.022.png" width="231" height="1" alt="" style="-aw-left-pos:309.7pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:10.1pt; -aw-wrap-type:none; margin-left:309.32pt; margin-top:9.72pt; position:absolute; z-index:87" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Contact No: ___________________</span>
        <span style="font-family:Arial; font-size:11pt"> E-Mail:______________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt; font-weight:bold; text-decoration:underline">EMP</span>
        <span style="font-family:Arial; font-size:11pt; font-weight:bold; text-decoration:underline">L</span>
        <span style="font-family:Arial; font-size:11pt; font-weight:bold; text-decoration:underline">OYMENT</span>
        <span style="font-family:Arial; font-size:11pt; font-weight:bold; text-decoration:underline">/BUSINESS DETAILS:</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt; font-weight:bold">&#xa0;</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.023.png" width="135" height="1" alt="" style="-aw-left-pos:381.35pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:10.55pt; -aw-wrap-type:none; margin-left:380.98pt; margin-top:10.18pt; position:absolute; z-index:88" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Company</span>
        <span style="font-family:Arial; font-size:11pt">/Business</span>
        <span style="font-family:Arial; font-size:11pt">Name: ______________________________Contact</span>
        <span style="font-family:Arial; font-size:11pt">No.:</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.024.png" width="445" height="1" alt="" style="-aw-left-pos:148.9pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:9.9pt; -aw-wrap-type:none; margin-left:148.52pt; margin-top:9.52pt; position:absolute; z-index:89" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Company/ Business</span>
        <span style="font-family:Arial; font-size:11pt">Address:_________________________________</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.025.png" width="96" height="1" alt="" style="-aw-left-pos:410.95pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:11.2pt; -aw-wrap-type:none; margin-left:410.58pt; margin-top:10.82pt; position:absolute; z-index:90" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Kind of Business: _______________________</span>
        <span style="font-family:Arial; font-size:11pt">_____________</span>
        <span style="font-family:Arial; font-size:11pt">__Length of Service:_______________________</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.018.png" width="529" height="1" alt="" style="-aw-left-pos:85.8pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:10.3pt; -aw-wrap-type:none; margin-left:85.42pt; margin-top:9.93pt; position:absolute; z-index:91" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Monthly Income:_______________________</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.026.png" width="483" height="1" alt="" style="-aw-left-pos:120.4pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:11.05pt; -aw-wrap-type:none; margin-left:120.02pt; margin-top:10.68pt; position:absolute; z-index:92" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Other Source of Income:_______________________</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.027.png" width="490" height="1" alt="" style="-aw-left-pos:115.4pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:10.95pt; -aw-wrap-type:none; margin-left:115.02pt; margin-top:10.58pt; position:absolute; z-index:93" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Monthly fixed expense:_______________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt; font-weight:bold">&#xa0;</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.028.png" width="377" height="1" alt="" style="-aw-left-pos:199.95pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:9.75pt; -aw-wrap-type:none; margin-left:199.58pt; margin-top:9.38pt; position:absolute; z-index:94" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">How long have you known the applicant?_______________________</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.029.png" width="459" height="1" alt="" style="-aw-left-pos:138pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:9.65pt; -aw-wrap-type:none; margin-left:137.62pt; margin-top:9.28pt; position:absolute; z-index:95" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Relation with the Applicant?_______________________</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.030.png" width="259" height="1" alt="" style="-aw-left-pos:288.7pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:11.25pt; -aw-wrap-type:none; margin-left:288.32pt; margin-top:10.88pt; position:absolute; z-index:96" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Have you ever been a borrower? _______________</span>
        <span style="font-family:Arial; font-size:11pt">Where:_______________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">I hereby affirm that all information given above is true and correct.</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt;text-align: right;">
        <span style="font-family:Arial; font-size:11pt">__________________________________                  ____________________________________                                                                                     </span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Co-Maker’s Signature over Printed Name                    Principal Buyer Signature</span>
        <span style="font-family:Arial; font-size:11pt">over</span>
        <span style="font-family:Arial; font-size:11pt">Printed Name</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Date Signed: _______________________                 Date Signed: _________________________                                                                </span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:108%; margin:0pt 0pt 8pt">
        <br style="page-break-before:always; clear:both" /></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img5.png" width="264" height="83"  style="-aw-left-pos:148.19pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:through; margin:0pt 9pt" /></p>
      <p style="font-size:8pt; line-height:115%; margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="font-size:8pt; line-height:115%; margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="font-size:8pt; line-height:115%; margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="font-size:8pt; line-height:115%; margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Monotype Corsiva'; font-size:9pt">&#xa0;</span></p>
      <p style="font-size:18pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:'Britannic Bold'; font-size:18pt; font-weight:bold">CO-MAKER’S STATEMENT</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.016.png" width="681" height="631" alt="" style="-aw-left-pos:-1.34pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:3.07pt; -aw-wrap-type:none; margin-left:-1.34pt; margin-top:3.07pt; position:absolute; z-index:-65422" />
 --><!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.017.png" width="151" height="1" alt="" style="-aw-left-pos:369.35pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:11.75pt; -aw-wrap-type:none; margin-left:368.98pt; margin-top:11.38pt; position:absolute; z-index:98" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Name:</span>
        <span style="font-family:Arial; font-size:11pt">__________________________________</span>
        <span style="font-family:Arial; font-size:11pt">_______</span>
        <span style="font-family:Arial; font-size:11pt">___</span>
        <span style="font-family:Arial; font-size:11pt">____</span>
        <span style="font-family:Arial; font-size:11pt">__</span>
        <span style="font-family:Arial; font-size:11pt">__Age:___</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Last           First              Middle Name</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center;">
        <span style="font-family:Arial; font-size:11pt">I agree to become a co-maker of the applicant Ms. / Mr. / Mrs. _________________</span>
        <span style="font-family:Arial; font-size:11pt">_____________</span>
        <span style="font-family:Arial; font-size:11pt">In</br> signing the promissory note which evidence the</span>
        <span style="font-family:'Times New Roman'; font-size:11pt">Electric Motor Vehicle</span>
        <span style="font-family:Arial; font-size:11pt">Loan Applied for if granted         I am</br> aware of the responsibilities which I will assume in signing such a note in case that the Principal Buyer can’t</br> settle the said monthly dues I will be responsible of paying the said amount</span>
        <span style="font-family:Arial; font-size:11pt">.</span>
        <span style="font-family:Arial; font-size:11pt">I authorized you to obtain such</br> information as you required concerning the statement made here under and agree that this document shall</br> remain your property, whether or not due loan is granted</span>
        <span style="font-family:Arial; font-size:11pt">.</span></p>
      <p style="margin:0pt; text-align:center;">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt; font-weight:bold; text-decoration:underline">PERSONAL INFORMATION:</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt; font-weight:bold">&#xa0;</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.018.png" width="529" height="1" alt="" style="-aw-left-pos:85.8pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:9.65pt; -aw-wrap-type:none; margin-left:85.42pt; margin-top:9.28pt; position:absolute; z-index:99" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Present</span>
        <span style="font-family:Arial; font-size:11pt">Address:_________________________________</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.019.png" width="508" height="1" alt="" style="-aw-left-pos:101.75pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:12.05pt; -aw-wrap-type:none; margin-left:101.38pt; margin-top:11.68pt; position:absolute; z-index:100" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Permanent Address:_________________________________</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.020.png" width="542" height="1" alt="" style="-aw-left-pos:75.8pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:11.95pt; -aw-wrap-type:none; margin-left:75.42pt; margin-top:11.58pt; position:absolute; z-index:101" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Length of Stay:_________________________________</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.021.png" width="173" height="1" alt="" style="-aw-left-pos:352.9pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:11.05pt; -aw-wrap-type:none; margin-left:352.52pt; margin-top:10.68pt; position:absolute; z-index:102" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Marital Status: _________________________________ No. of Children:_________________________________</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.022.png" width="231" height="1" alt="" style="-aw-left-pos:309.7pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:10.1pt; -aw-wrap-type:none; margin-left:309.32pt; margin-top:9.72pt; position:absolute; z-index:103" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Contact No: _____________________________</span>
        <span style="font-family:Arial; font-size:11pt">______ E-Mail:_________________________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt; font-weight:bold; text-decoration:underline">EMPLOYMENT</span>
        <span style="font-family:Arial; font-size:11pt; font-weight:bold; text-decoration:underline">/BUSINESS DETAILS:</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt; font-weight:bold">&#xa0;</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.023.png" width="135" height="1" alt="" style="-aw-left-pos:381.35pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:10.55pt; -aw-wrap-type:none; margin-left:380.98pt; margin-top:10.18pt; position:absolute; z-index:104" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Company</span>
        <span style="font-family:Arial; font-size:11pt">/Business</span>
        <span style="font-family:Arial; font-size:11pt">Name: ______________________________Contact</span>
        <span style="font-family:Arial; font-size:11pt">No.:_________________________________</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.024.png" width="445" height="1" alt="" style="-aw-left-pos:148.9pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:9.9pt; -aw-wrap-type:none; margin-left:148.52pt; margin-top:9.52pt; position:absolute; z-index:105" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Company/ Business</span>
        <span style="font-family:Arial; font-size:11pt">Address:_________________________________</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.025.png" width="96" height="1" alt="" style="-aw-left-pos:410.95pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:11.2pt; -aw-wrap-type:none; margin-left:410.58pt; margin-top:10.82pt; position:absolute; z-index:106" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Kind of Business: _______________________</span>
        <span style="font-family:Arial; font-size:11pt">_____________</span>
        <span style="font-family:Arial; font-size:11pt">__Length of Service:_________________________________</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.018.png" width="529" height="1" alt="" style="-aw-left-pos:85.8pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:10.3pt; -aw-wrap-type:none; margin-left:85.42pt; margin-top:9.93pt; position:absolute; z-index:107" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Monthly Income:_________________________________</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.026.png" width="483" height="1" alt="" style="-aw-left-pos:120.4pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:11.05pt; -aw-wrap-type:none; margin-left:120.02pt; margin-top:10.68pt; position:absolute; z-index:108" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Other Source of Income:_________________________________</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.027.png" width="490" height="1" alt="" style="-aw-left-pos:115.4pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:10.95pt; -aw-wrap-type:none; margin-left:115.02pt; margin-top:10.58pt; position:absolute; z-index:109" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Monthly fixed expense:_________________________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt; font-weight:bold">&#xa0;</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.028.png" width="377" height="1" alt="" style="-aw-left-pos:199.95pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:9.75pt; -aw-wrap-type:none; margin-left:199.58pt; margin-top:9.38pt; position:absolute; z-index:110" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">How long have you known the applicant?_________________________________</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.029.png" width="459" height="1" alt="" style="-aw-left-pos:138pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:9.65pt; -aw-wrap-type:none; margin-left:137.62pt; margin-top:9.28pt; position:absolute; z-index:111" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Relation with the Applicant?_________________________________</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.030.png" width="259" height="1" alt="" style="-aw-left-pos:288.7pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:11.25pt; -aw-wrap-type:none; margin-left:288.32pt; margin-top:10.88pt; position:absolute; z-index:112" />
 -->      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Have you ever been a borrower? _______________</span>
        <span style="font-family:Arial; font-size:11pt">Where:_________________________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">I hereby affirm that all information given above is true and correct.</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt;text-align: right;">
        <span style="font-family:Arial; font-size:11pt">__________________________________                  ____________________________________                                                                                     </span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Co-Maker’s Signature over Printed Name                    Principal Buyer Signature</span>
        <span style="font-family:Arial; font-size:11pt">over</span>
        <span style="font-family:Arial; font-size:11pt">Printed Name</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">Date Signed: _______________________                 Date Signed: _________________________                                                                </span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:108%; margin:0pt 0pt 8pt">
        <br style="page-break-before:always; clear:both" /></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img5.png" width="165" height="52"  style="-aw-left-pos:197.42pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:2.3pt; -aw-wrap-type:through; margin:0pt 9pt" /></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:14pt; line-height:108%; margin:0pt 0.5pt 7.65pt 0pt; text-align:center">
        <span style="font-family:'Book Antiqua'; font-size:14pt; font-weight:bold; text-decoration:underline">AGREEMENT LETTER</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
        <span style="font-family:Calibri; font-size:11pt">Date:</span>
        <span style="font-family:Calibri; font-size:11pt">_</span>
        <span style="font-family:Calibri; font-size:11pt">_________________   </span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 11.2pt">
        <span style="font-family:Calibri; font-size:11pt">Branch:  _________${repositorydata.address}_________</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10.85pt">
        <span style="font-family:Calibri; font-size:11pt">I, _______${needdata.customerName}________________, understand and agree that I will be the Second (2</span>
        <span style="font-family:Calibri; font-size:7.33pt; vertical-align:super">nd</span>
        <span style="font-family:Calibri; font-size:11pt">) Co-maker for approving Credit</br> Investigation (CI) to Installment customer(s) and approved the sale although not yet passed all lacking requirements</br> especially 2 Valid IDs and Billings (incomplete requirements).  </span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 8.15pt">
        <span style="font-family:Calibri; font-size:11pt; font-style:italic; text-decoration:underline">*Please check the LACKING requirements:</span></p>
      <p style="font-size:8pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:8pt; font-weight:bold; text-decoration:underline">BUYER:CO-MAKER:</span></p>
      <p style="font-size:8pt; line-height:108%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:8pt; font-weight:bold">&#xa0;</span></p>
      <table cellspacing="0" cellpadding="0" style="border-collapse:collapse; margin-left:0pt;margin: 0 auto">
        <tr style="height:25.6pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.1pt">
            <img src="/static/fenqi/img7.png" width="26" height="18" alt="" style="-aw-left-pos:2.95pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:-1.95pt; -aw-wrap-type:none; margin-left:2.7pt; margin-top:-2.2pt; position:absolute; z-index:37" />
            <p style="font-size:7pt; line-height:108%; margin:0pt;margin-left: 1px; text-align:center">
              <span style="font-family:'Times New Roman'; font-size:7pt; font-weight:bold;margin-left: 10px">   BRGY</span>
              <span style="font-family:'Times New Roman'; font-size:7pt; font-weight:bold">CLEARANCE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.15pt">
            <img src="/static/fenqi/img7.png" width="26" height="18" alt="" style="-aw-left-pos:2.95pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:-1.95pt; -aw-wrap-type:none; margin-left:2.7pt; margin-top:-2.2pt; position:absolute; z-index:38" />
            <p style="font-size:7pt; line-height:108%; margin:0pt; text-align:center">
              <span style="font-family:'Times New Roman'; font-size:7pt; font-weight:bold">   ELECTRIC BILL</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.15pt">
            <img src="/static/fenqi/img7.png" width="26" height="18" alt="" style="-aw-left-pos:2.95pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:-1.95pt; -aw-wrap-type:none; margin-left:2.7pt; margin-top:-2.2pt; position:absolute; z-index:39" />
            <p style="font-size:7pt; line-height:108%; margin:0pt; text-align:center">
              <span style="font-family:'Times New Roman'; font-size:7pt; font-weight:bold">   PAYSLIP BILL</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.15pt">
            <img src="/static/fenqi/img7.png" width="26" height="18" alt="" style="-aw-left-pos:2.95pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:-1.95pt; -aw-wrap-type:none; margin-left:2.7pt; margin-top:-2.2pt; position:absolute; z-index:40" />
            <p style="font-size:7pt; line-height:108%; margin:0pt; text-align:center">
              <span style="font-family:'Times New Roman'; font-size:7pt; font-weight:bold;margin-left: 10px">   BRGY CLEARANCE</span></p>
          </td>
        </tr>
        <tr style="height:26.5pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.1pt">
            <img src="/static/fenqi/img7.png" width="26" height="18" alt="" style="-aw-left-pos:2.95pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:-1.95pt; -aw-wrap-type:none; margin-left:2.7pt; margin-top:-2.2pt; position:absolute; z-index:41" />
            <p style="font-size:7pt; line-height:108%; margin:0pt; text-align:center">
              <span style="font-family:'Times New Roman'; font-size:7pt; font-weight:bold">2</span>
              <span style="font-family:'Times New Roman'; font-size:7pt; font-weight:bold">VALID ID</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.15pt">
            <img src="/static/fenqi/img7.png" width="26" height="18" alt="" style="-aw-left-pos:2.95pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:-1.95pt; -aw-wrap-type:none; margin-left:2.7pt; margin-top:-2.2pt; position:absolute; z-index:42" />
            <p style="font-size:7pt; line-height:108%; margin:0pt; text-align:center">
              <span style="font-family:'Times New Roman'; font-size:7pt; font-weight:bold">   WATER BILL</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.15pt">
            <img src="/static/fenqi/img7.png" width="26" height="18" alt="" style="-aw-left-pos:2.95pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:-1.95pt; -aw-wrap-type:none; margin-left:2.7pt; margin-top:-2.2pt; position:absolute; z-index:43" />
            <p style="font-size:7pt; line-height:108%; margin:0pt; text-align:center">
              <span style="font-family:'Times New Roman'; font-size:7pt; font-weight:bold;margin-left: 10px">   BUSINESS PERMIT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.15pt">
            <img src="/static/fenqi/img7.png" width="26" height="18" alt="" style="-aw-left-pos:2.95pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:-1.95pt; -aw-wrap-type:none; margin-left:2.7pt; margin-top:-2.2pt; position:absolute; z-index:44" />
            <p style="font-size:7pt; line-height:108%; margin:0pt; text-align:center">
              <span style="font-family:'Times New Roman'; font-size:7pt; font-weight:bold">  2 VALID ID</span></p>
          </td>
        </tr>
      </table>
      <p style="font-size:11pt; line-height:108%; margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 11pt">
        <span style="font-family:Calibri; font-size:11pt; font-style:italic; text-decoration:underline">*Please fill-up the Co-maker’s Statement:</span></p>
      <h1 style="margin:0pt 0.35pt 0pt 0pt; page-break-after:avoid; text-align:center">
        <span style="font-family:Britannic; font-size:14pt; font-weight:bold">CO-MAKER’S STATEMENT</span></h1>
      <h1 style="margin:0pt 0.35pt 0pt 0pt; page-break-after:avoid; text-align:center">
        <span style="font-family:Britannic; font-size:14pt; font-weight:normal">(Employee)</span></h1>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <!-- <img src="9479c74d-987e-49a4-9c19-27188981c608.041.png" width="550" height="419" alt="" style="-aw-left-pos:58pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:3.45pt; -aw-wrap-type:none; margin-left:58pt; margin-top:3.45pt; position:absolute; z-index:-65460" />
      <img src="9479c74d-987e-49a4-9c19-27188981c608.042.png" width="151" height="2" alt="" style="-aw-left-pos:369.45pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:11.35pt; -aw-wrap-type:none; margin-left:369.08pt; margin-top:10.98pt; position:absolute; z-index:36" /> -->
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
        <span style="font-family:Calibri; font-size:11pt">Name: _</span>
        <span style="font-family:Calibri; font-size:11pt">___________________________________________________Age:________________________</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
        <span style="font-family:Calibri; font-size:11pt">                            Last                    First                  Middle Name</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center;">
        <span style="font-family:Calibri; font-size:11pt">I agree to become a co-maker of the applicant Ms</span>
        <span style="font-family:Calibri; font-size:11pt">. /</span>
        <span style="font-family:Calibri; font-size:11pt">Mr</span>
        <span style="font-family:Calibri; font-size:11pt">. /</span>
        <span style="font-family:Calibri; font-size:11pt">Mrs. ______________________________</span>
        <span style="font-family:Calibri; font-size:11pt">in</span>
        <span style="font-family:Calibri; font-size:11pt">signing the</br> promissory note which evidence the</span>
        <span style="font-family:'Times New Roman'; font-size:11pt">Electric Motor Vehicle</span>
        <span style="font-family:Calibri; font-size:11pt">Loan Applied for if granted. I am aware of the</br> responsibilities which I will assume in signing such a note in case that the Principal Buyer can’t settle the said</br> monthly dues I will be responsible of paying the said amount. I authorized you to obtain such information as you</br> required concerning the statement made here under and agree that</span>
        <span style="font-family:Calibri; font-size:11pt">this document</span>
        <span style="font-family:Calibri; font-size:11pt">shall remain your property</br>, whether or not due loan is granted.</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold; text-decoration:underline">PERSONAL INFORMATION:</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">Present Address: </span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">Permanent Address:</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">Length of Stay: </span></p>
      <p style="margin:0pt 103.5pt 0pt 0pt">
        <span style="font-family:Calibri; font-size:11pt">Marital Status</span>
        <span style="font-family:Calibri; font-size:11pt">: _</span>
        <span style="font-family:Calibri; font-size:11pt">________________________________ No. of Children: Contact No</span>
        <span style="font-family:Calibri; font-size:11pt">: _</span>
        <span style="font-family:Calibri; font-size:11pt">__________________________________ E-Mail:_______________________ </span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">__________________________________                  ___________________________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">Co-Maker’s Signature over Printed Name                   Principal Buyer Signature</span>
        <span style="font-family:Calibri; font-size:11pt">over</span>
        <span style="font-family:Calibri; font-size:11pt">Printed Name</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">Date Signed: _______________________                 Date Signed: ________________________                      </span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">NOTE:</span>
        <span style="font-family:Calibri; font-size:10pt; font-style:italic">This agreement will be effective start April 11, 2019. Failure to fill-up and sign this agreement will consider further disciplinary action</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">.</span></p>
        <div style="padding-top: 200px"></div>
      <p style="margin:0pt 0pt 10pt; display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img5.png" width="197" height="86" style="-aw-left-pos:0pt; -aw-rel-hpos:page; -aw-rel-vpos:paragraph; -aw-top-pos:1.1pt; -aw-wrap-type:through;margin:0pt 9pt" /></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt">
        <span style="width:179.08pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:center; -aw-tabstop-pos:261.7pt"></span>
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <h1 style="margin:0pt; page-break-after:avoid; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">PROMISSORY NOTE</span></h1>
      <h1 style="margin:0pt; page-break-after:avoid">
        <span style="font-family:'Times New Roman'; font-size:10pt; font-weight:bold">&#xa0;</span></h1>
      <div style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; clear:both; margin:0pt">
        <p style="margin:0pt; padding-left:307.3pt; padding-right:4pt; padding-top:5pt; text-indent:-303.3pt">
          <span style="font-family:Calibri; font-size:11pt; font-style:italic">Date Granted: _______</span>
          <span style="font-family:Calibri; font-size:11pt; font-style:italic">______________________           Maturity Date: _________________________</span></p>
        <p style="margin:0pt; padding-left:307.3pt; padding-right:4pt; text-indent:-303.3pt">
          <span style="font-family:Calibri; font-size:11pt; font-style:italic">Unit Purchased: __</span>
          <span style="font-family:Calibri; font-size:11pt; font-style:italic">_____${cardata.productTypeName}_____________________          </span>
          <span style="font-family:Calibri; font-size:11pt; font-style:italic">Color: __</span>
          <span style="font-family:Calibri; font-size:11pt; font-style:italic">_____${cardata.color}_________________________</span></p>
        <p style="margin:0pt; padding-left:307.3pt; padding-right:4pt; text-indent:-303.3pt">
          <span style="font-family:Calibri; font-size:11pt; font-style:italic">Motor Number: _________${cardata.motorCode}____________________          Battery Number: ________${cardata.batteryCode}_______________                   </span></p>
        <p style="margin:0pt; padding-left:307.3pt; padding-right:4pt; text-indent:-303.3pt">
          <span style="font-family:Calibri; font-size:11pt; font-style:italic">Gross Amount: __</span>
          <span style="font-family:Calibri; font-size:11pt; font-style:italic">_______${needdata.installmentAllMoney}____________________           Down Payment</span>
          <span style="font-family:Calibri; font-size:11pt; font-style:italic">:</span>
          <span style="font-family:Calibri; font-size:11pt; font-style:italic">_________${needdata.firstMoney}_______________</span></p>
        <p style="margin:0pt; padding-left:307.3pt; padding-right:4pt; text-indent:-303.3pt">
          <span style="font-family:Calibri; font-size:11pt; font-style:italic">Total Balance: _____________________________           Terms of payment: __________${needdata.installmentCount}____________</span></p>
        <p style="margin:0pt; padding-left:307.3pt; padding-right:4pt; text-indent:-303.3pt">
          <span style="font-family:Calibri; font-size:11pt; font-style:italic">Monthly Amortization: _______________________</span></p>
        <p style="margin:0pt; padding-left:307.3pt; padding-right:4pt; text-indent:-303.3pt">
          <span style="font-family:Calibri; font-size:10pt; font-style:italic">&#xa0;</span></p>
        <p style="margin:0pt; padding-bottom:1pt; padding-left:4pt; padding-right:4pt; text-align:center;">
          <span style="font-family:Arial; font-size:8pt; font-style:italic">Date of installment: First Installment t</span>
          <span style="font-family:Arial; font-size:8pt; font-style:italic">o fall due on _______________________________</span>
          <span style="font-family:Arial; font-size:8pt; font-style:italic">and every ____${needdata.dayOfMonth}______</span>
          <span style="font-family:Arial; font-size:8pt; font-style:italic">of the month</span>
          <span style="font-family:Arial; font-size:8pt; font-style:italic">thereafter until the<br/> whole sum of the principal and interest shall have been fully paid.  Penalty of</span>
          <span style="font-family:Arial; font-size:8pt; font-style:italic; font-weight:bold">TEN PERCENT (10%)</span>
          <span style="font-family:Arial; font-size:8pt; font-style:italic">shall be imposed per</span>
          <span style="font-family:Arial; font-size:8pt; font-style:italic; font-weight:bold">Month</span>
          <span style="font-family:Arial; font-size:8pt; font-style:italic">on the amount of<br/> installment due from date of default until fully paid.</span></p>
      </div>
      <p style="margin:0pt; text-align:justify; text-indent:36pt">
        <span style="font-family:Calibri; font-size:8pt">FOR VALUE RECEIVED, I/WE jointly and severally promise to pay</span>
        <span style="font-family:Calibri; font-size:8pt">NWOW MARKETING with its principal address at</span>
        <span style="font-family:Calibri; font-size:8pt">Sta Rosa</span>
        <span style="font-family:Calibri; font-size:8pt">,</span>
        <span style="font-family:Calibri; font-size:8pt">Laguna</span>
        <span style="font-family:Calibri; font-size:8pt">, and the</span>
        <span style="font-family:Calibri; font-size:8pt">sum of</span></p>
      <p style="margin:0pt; text-align:justify; text-indent:36pt">
        <span style="font-family:Calibri; font-size:8pt">PhP</span>
        <span style="font-family:Calibri; font-size:8pt">_______________________________________________</span>
        <span style="font-family:Calibri; font-size:8pt">________</span>
        <span style="font-family:Calibri; font-size:8pt">_ (P______________).</span></p>
      <p style="margin:0pt 0pt 10pt; text-align:justify; text-indent:36pt">
        <span style="font-family:Calibri; font-size:8pt">Any partially unpaid installment shall be considered as one past due amortization and any partial period less than one week/month of past due shall be considered one month for purposes of computing interests, penalties and charges.</span></p>
      <p style="margin:0pt 0pt 10pt; text-align:justify; text-indent:36pt">
        <span style="font-family:Calibri; font-size:8pt">I/WE agree that if any of the said installments is not paid when due, the whole amount remaining unpaid shall immediately become due and payable. </span></p>
      <p style="margin:0pt 0pt 10pt; text-align:justify; text-indent:36pt">
        <span style="font-family:Calibri; font-size:8pt">If any installment under this note is not paid at its maturity, I/WE further agree to pay, jointly and severally an additional amount equivalent to TEN PERCENT (10</span>
        <span style="font-family:Calibri; font-size:8pt">) %</span>
        <span style="font-family:Calibri; font-size:8pt">of the total sum due per month for and as penalty charge until the account is fully paid together with the further sum of THIRTY PERCENT (30%) of all amounts due and owing for and as attorney’s fees, inclusive of cost and extrajudicial expenses incurred in the collection of the account.</span></p>
      <p style="margin:0pt 0pt 10pt; text-align:justify; text-indent:36pt">
        <span style="font-family:Calibri; font-size:8pt">In the event of an extreme and unusual change in value of the peso caused by extraordinary inflation or deflation or any other similar reason, the basis for the payment of this note shall be the value of the peso at the time the obligation herein was incurred, as provided in Article 1250 of New Civil Code.</span></p>
      <p style="margin:0pt 0pt 10pt; text-align:justify">
        <span style="width:36pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:36pt"></span>
        <span style="font-family:Calibri; font-size:8pt">I/WE hereby agree and authorize</span>
        <span style="font-family:Calibri; font-size:8pt">NWOW MARKETING</span>
        <span style="font-family:Calibri; font-size:8pt">. to encumber, assign or sell to any person or entity any right which may have under this Note and/or any assignment, mortgage lien, pledge or other encumbrances constituted in favor of</span>
        <span style="font-family:Calibri; font-size:8pt">NWOW MARKETING</span>
        <span style="font-family:Calibri; font-size:8pt">pursuant to the provisions of the loan agreement and this Note, if any the consent herein granted is recognized and acknowledged by me/us as a waiver, to all intents and purposes of whatever right I/we may have to notice of actual encumbrances or assignment.</span></p>
      <p style="margin:0pt 0pt 10pt; text-align:justify">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:8pt">That I, the borrower fully understands all the features</span>
        <span style="font-family:Calibri; font-size:8pt">ofthe</span>
        <span style="font-family:Calibri; font-size:8pt">product as well as the term and conditions set forth in granting this loan.</span></p>
      <p style="margin:0pt 0pt 10pt; text-align:justify">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:8pt">In case of judicial execution in virtue of this note or any part of it, debtors waive all their rights under the provisions of Section 13, Rule 39 of the 1997 Rules of Civil procedure.</span></p>
      <p style="margin:0pt 0pt 10pt; text-align:justify">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:8pt">Any all actions arising from or connected with this note shall be brought only in the proper courts of</span>
        <span style="font-family:Calibri; font-size:8pt">Sta Rosa</span>
        <span style="font-family:Calibri; font-size:8pt">, Laguna</span>
        <span style="font-family:Calibri; font-size:8pt">or place of execution of this note at the election of NWOW MARKETING or holder, as the case may be. All other venue provided in the Rules of Court is hereby waived.</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Times New Roman'; font-size:8pt">I/WE hereby</span>
        <span style="font-family:'Times New Roman'; font-size:8pt">affix my/our signature(s) at</span>
        <span style="font-family:'Times New Roman'; font-size:8pt">Sta Rosa</span>
        <span style="font-family:'Times New Roman'; font-size:8pt">, Laguna</span>
        <span style="font-family:'Times New Roman'; font-size:8pt">,</span>
        <span style="font-family:'Times New Roman'; font-size:8pt">Philippines, on ___________________________________.</span></p>
      <table cellspacing="0" cellpadding="0" style="border-collapse:collapse; width:100%">
        <tr style="height:8.95pt">
          <td style="background-color:#bfbfbf; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.52pt; padding-right:5.52pt; vertical-align:top; width:229.15pt">
            <h1 style="margin:0pt; page-break-after:avoid; text-align:center">
              <a name="_Hlk12375169">
                <span style="font-family:'Times New Roman'; font-size:10pt; font-weight:bold">PRINCIPAL BUYER</span></a>
            </h1>
          </td>
          <td style="background-color:#ffffff; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.52pt; padding-right:5.52pt; vertical-align:top; width:2.8pt">
            <h2 style="font-size:8pt; font-weight:normal; line-height:115%; margin:2pt 0pt 0pt; page-break-after:avoid; page-break-inside:avoid">
              <span style="color:#2f5496; font-family:'Calibri Light'; font-size:8pt">&#xa0;</span></h2>
          </td>
          <td style="background-color:#cccccc; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.52pt; padding-right:5.52pt; vertical-align:top; width:247pt">
            <h1 style="margin:0pt; page-break-after:avoid; text-align:center">
              <span style="font-family:'Times New Roman'; font-size:10pt; font-weight:bold">CO-MAKER</span></h1>
          </td>
        </tr>
        <tr style="height:10.65pt">
          <td style="background-color:#ffffff; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.52pt; padding-right:5.52pt; vertical-align:top; width:229.15pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:8pt">Signature: _________________________________________</span>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:8pt">Name in Print: _____________________________________</span>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:8pt">Address: _________________________________________</span>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:8pt">________________________________________________</span>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:8pt">&#xad;</span>
              <span style="font-family:Calibri; font-size:8pt">&#xad;</span>
              <span style="font-family:Calibri; font-size:8pt">&#xad;</span>
              <span style="font-family:Calibri; font-size:8pt">&#xad;</span>
              <span style="font-family:Calibri; font-size:8pt">&#xad;</span>
              <span style="font-family:Calibri; font-size:8pt">&#xad;</span>
              <span style="font-family:Calibri; font-size:8pt">&#xad;</span>
              <span style="font-family:Calibri; font-size:8pt">&#xad;</span>
              <span style="font-family:Calibri; font-size:8pt">&#xad;</span>
              <span style="font-family:Calibri; font-size:8pt">&#xad;</span>
              <span style="font-family:Calibri; font-size:8pt">___________________________________________________</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:8pt">Contact Number: ____________________________________</span></p>
          </td>
          <td style="background-color:#ffffff; padding-left:5.9pt; padding-right:5.9pt; vertical-align:top; width:2.8pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
          </td>
          <td style="background-color:#ffffff; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.52pt; padding-right:5.52pt; vertical-align:top; width:247pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:8pt">I agree to become a co-maker to this Promissory Note.  I am aware of the responsibility which I will assume in signing such a note.</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:8pt">Signature: _____________________________________________</span>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:8pt">Name in Print: _____________________________________</span>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:8pt">Address: _________________________________________</span>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:8pt">________________________________________________</span>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:8pt">&#xad;</span>
              <span style="font-family:Calibri; font-size:8pt">&#xad;</span>
              <span style="font-family:Calibri; font-size:8pt">&#xad;</span>
              <span style="font-family:Calibri; font-size:8pt">&#xad;</span>
              <span style="font-family:Calibri; font-size:8pt">&#xad;</span>
              <span style="font-family:Calibri; font-size:8pt">&#xad;</span>
              <span style="font-family:Calibri; font-size:8pt">&#xad;</span>
              <span style="font-family:Calibri; font-size:8pt">&#xad;</span>
              <span style="font-family:Calibri; font-size:8pt">&#xad;</span>
              <span style="font-family:Calibri; font-size:8pt">&#xad;</span>
              <span style="font-family:Calibri; font-size:8pt">Contact Number: _________________________________________</span></p>
          </td>
        </tr>
        <tr style="height:10.65pt">
          <td style="background-color:#ffffff; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.52pt; padding-right:5.52pt; vertical-align:top; width:229.15pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
          </td>
          <td style="background-color:#ffffff; padding-left:5.9pt; padding-right:5.9pt; vertical-align:top; width:2.8pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
          </td>
          <td style="background-color:#ffffff; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.52pt; padding-right:5.52pt; vertical-align:top; width:247pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:8.9pt">
          <td style="background-color:#ffffff; border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.52pt; padding-right:5.52pt; vertical-align:top; width:229.15pt">
            <p style="margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
          </td>
          <td style="background-color:#ffffff; padding-left:5.9pt; padding-right:5.9pt; vertical-align:top; width:2.8pt">
            <p style="margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
          </td>
          <td style="background-color:#ffffff; border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.52pt; padding-right:5.52pt; vertical-align:top; width:247pt">
            <p style="margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
          </td>
        </tr>
      </table>
      <p style="font-size:11pt; line-height:115%; margin:0pt">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SIGNED IN THE PRESENCE OF:</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">____________________________</span>
        <span style="width:24.11pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11pt">___________________________</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">Name and Signature of Witness</span>
        <span style="width:34.04pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11pt">Name and Signature of Witness</span>
        <span style="-aw-bookmark-end:_Hlk12375169"></span>
      </p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img5.png" width="229" height="59" style="-aw-left-pos:169pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="font-size:12pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:'Britannic Bold'; font-size:12pt; font-weight:bold">DEED OF CONDITIONAL SALE</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.045.png" width="698" height="849" alt="" style="-aw-left-pos:-0.95pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:13.94pt; -aw-wrap-type:none; margin-left:-0.95pt; margin-top:13.94pt; position:absolute; z-index:-65506" />
 -->      <p style="font-size:9pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">KNOW ALL MEN BY THESE PRESENTS:</span></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center;">
        <span style="width:64.55pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:64.55pt"></span>
        <span style="font-family:Arial; font-size:9pt">This</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">AGREEMENT</span>
        <span style="font-family:Arial; font-size:9pt">made and</span>
        <span style="font-family:Arial; font-size:9pt">executed</span>
        <span style="font-family:Arial; font-size:9pt">in</span>
        <span style="font-family:Arial; font-size:9pt"></span>
        <span style="font-family:Arial; font-size:9pt">___________, __________</span>
        <span style="font-family:Arial; font-size:9pt">, Philippines</span>
        <span style="font-family:Arial; font-size:9pt">.</span></p>
      <p style="margin:0pt 9.35pt 10pt 0pt; text-align:center">
        <span style="font-family:Arial; font-size:9pt">This ______________ day</span>
        <span style="font-family:Arial; font-size:9pt">of _</span>
        <span style="font-family:Arial; font-size:9pt">__________________ by and between:          </span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">NWOW</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">MARKETING</span>
        <span style="font-family:Arial; font-size:9pt">represented by   </span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">MARY ROSE LANGIT</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">LIU situated</span>
        <span style="font-family:Arial; font-size:10pt">in</span>
        <span style="font-family:Arial; font-size:9pt">_____________________</span>
        <span style="font-family:Arial; font-size:10pt">, Philippines, herein</span>
        <span style="font-family:Arial; font-size:9pt">called the</span>
        <span style="font-family:Arial; font-size:9pt; font-style:italic; font-weight:bold">VENDOR</span>
        <span style="font-family:Arial; font-size:9pt">;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt 0pt 0pt 216pt; text-align:center">
        <span style="font-family:Arial; font-size:9pt">-  </span>
        <span style="font-family:Arial; font-size:9pt">And</span>
        <span style="font-family:Arial; font-size:9pt">   -</span></p>
      <p style="margin:0pt 0pt 0pt 216pt; text-align:center">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Arial; font-size:9pt">__________________________________________and a</span>
        <span style="font-family:Arial; font-size:9pt">resident of ________________________________________________ hereinafter called the</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">VENDEE</span>
        <span style="font-family:Arial; font-size:9pt">.</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt 0pt 0pt 180pt; text-align:center; text-indent:36pt">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">WITNESSETH:</span></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Arial; font-size:9pt">1. That the</span>
        <span style="font-family:Arial; font-size:9pt">VENDORis</span>
        <span style="font-family:Arial; font-size:9pt">the absolute owner of a certain Electric Motor Vehicle which more particularly describe as follows to wit:</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.046.png" width="207" height="1" alt="" style="-aw-left-pos:182.65pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:8.05pt; -aw-wrap-type:none; margin-left:182.28pt; margin-top:7.68pt; position:absolute; z-index:16" />
 -->      <p style="margin:0pt 0pt 0pt 36pt; text-align:center; text-indent:36pt">
        <span style="font-family:Arial; font-size:9pt">Model</span>
        <span style="width:14.49pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:9pt">:_____________${cardata.productTypeName}____________________</span>
        <span style="width:33.5pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
      </p>
      <p style="margin:0pt 0pt 0pt 36pt; text-align:center; text-indent:36pt">
        <span style="font-family:Arial; font-size:9pt">Color</span>
        <span style="width:14.49pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:9pt">:____________${cardata.color}_____________________</span></p>
      <img src="9479c74d-987e-49a4-9c19-27188981c608.046.png" width="207" height="1" alt="" style="-aw-left-pos:182.65pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:9.15pt; -aw-wrap-type:none; margin-left:182.28pt; margin-top:8.78pt; position:absolute; z-index:18" />
      <p style="margin:0pt 0pt 0pt 36pt; text-align:center; text-indent:36pt">
        <span style="font-family:Arial; font-size:9pt">Motor No</span>
        <span style="width:34.99pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:9pt">:____________${cardata.motorCode}_____________________</span></p>
      <img src="9479c74d-987e-49a4-9c19-27188981c608.046.png" width="207" height="1" alt="" style="-aw-left-pos:182.65pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:9.7pt; -aw-wrap-type:none; margin-left:182.28pt; margin-top:9.32pt; position:absolute; z-index:19" />
      <p style="margin:0pt 0pt 0pt 36pt; text-align:center; text-indent:36pt">
        <span style="font-family:Arial; font-size:9pt">Battery No</span>
        <span style="width:29.48pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:9pt">:_________${cardata.batteryCode}________________________</span></p>
      <p style="margin:0pt 0pt 0pt 36pt; text-align:center; text-indent:36pt">
        <span style="font-family:Arial; font-size:9pt">Charger No</span>
        <span style="width:25.48pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:9pt">:___________${cardata.chargeCode}______________________</span></p>
      <img src="9479c74d-987e-49a4-9c19-27188981c608.046.png" width="207" height="1" alt="" style="-aw-left-pos:182.65pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0.5pt; -aw-wrap-type:none; margin-left:182.28pt; margin-top:0.12pt; position:absolute; z-index:20" />
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align: justify;">
        <span style="font-family:Arial; font-size:9pt">2. That</span>
        <span style="font-family:Arial; font-size:9pt">for and in consideration of the total sum of_____________________________________ </br>___________________________________________________________</span>
        <span style="font-family:Arial; font-size:9pt">PESOS (</span>
        <span style="font-family:Arial; font-size:9pt">P_______________</span>
        <span style="font-family:Arial; font-size:9pt">)</span>
        <span style="font-family:Arial; font-size:9pt">The</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">VENDOR</span>
        <span style="font-family:Arial; font-size:9pt">, sells the</br> above described proper</span>
        <span style="font-family:Arial; font-size:9pt">t</span>
        <span style="font-family:Arial; font-size:9pt">y to</span>
        <span style="font-family:Arial; font-size:9pt">the VENDEE</span>
        <span style="font-family:Arial; font-size:9pt">;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">A.)</span>
        <span style="font-family:Arial; font-size:9pt">The sum of ______________________________________PESOS (______________</span>
        <span style="font-family:Arial; font-size:9pt">) (</span>
        <span style="font-family:Arial; font-size:9pt">Down Payment</span>
        <span style="font-family:Arial; font-size:9pt">)</span>
        <span style="font-family:Arial; font-size:9pt">shall</span>
        <span style="font-family:Arial; font-size:9pt">be               </span>
        <span style="font-family:Arial; font-size:9pt">paidin</span>
        <span style="font-family:Arial; font-size:9pt">cash upon</span>
        <span style="font-family:Arial; font-size:9pt">signingof</span>
        <span style="font-family:Arial; font-size:9pt">this agreement, and the balance of _______________________</span>
        <span style="font-family:Arial; font-size:9pt">_____________________</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">PESOS (</span>
        <span style="font-family:Arial; font-size:9pt">P__________________) shall be payable in (</span>
        <span style="font-family:Arial; font-size:9pt">T</span>
        <span style="font-family:Arial; font-size:9pt">erms) _____________________________until the full purchase price has been paid.</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">B</span>
        <span style="font-family:Arial; font-size:9pt">.) Monthly Installments shall be paid on or before every   _________   day of every month.</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">C</span>
        <span style="font-family:Arial; font-size:9pt">.) Said monthly installment shall be paid as follows to wit:</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">                     From     ___________________ 20__</span>
        <span style="font-family:Arial; font-size:9pt">_</span>
        <span style="font-family:Arial; font-size:9pt">__to      _____________________ 20__</span>
        <span style="font-family:Arial; font-size:9pt">__</span>
        <span style="font-family:Arial; font-size:9pt">_</span>
        <span style="font-family:Arial; font-size:9pt">.</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">     In further consideration of our receipt of the chattel and until the full purchase price thereof is fully paid, we hereby jointly and severally agree and bind ourselves to the following terms and condition, to wit:</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">1.)  The chattel shall remain the property of the seller and the title to said personal property shall be vested in the VENDEE only upon payment in full of the whole of the said purchased price as herein provided.</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">2</span>
        <span style="font-family:Arial; font-size:9pt">.) Any monthly installment due and paid shall bear interest at the rate</span>
        <span style="font-family:Arial; font-size:9pt">of</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">TEN</span>
        <span style="font-family:Arial; font-size:9pt">(</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">10</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">%)</span>
        <span style="font-family:Arial; font-size:9pt"></span>
        <span style="font-family:Arial; font-size:9pt">percent</span>
        <span style="font-family:Arial; font-size:9pt">per</span>
        <span style="font-family:Arial; font-size:9pt">month, computed from the date of default until paid; If there is no payment within</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">ONE (</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">1)</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">month</span>
        <span style="font-family:Arial; font-size:9pt">we</span>
        <span style="font-family:Arial; font-size:9pt">have the right to take back the</span>
        <span style="font-family:'Times New Roman'; font-size:11pt">Electric Motor Vehicle</span>
        <span style="font-family:Arial; font-size:8pt">.</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">3.) Not to sell, assign, lease, pledge or otherwise encumber the subject chattel, or convey in any matter whatsoever our rights to purchased it to any other third person without the prior written consent to the VENDOR.</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">4.) Acceptance by the VENDOR of payments of any part of the obligation after due date shall not be considered or understood as extending the time for the payment of any of the installment mentioned or as a modification of any of the conditions hereof:</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">5.) Whenever any action is brought by the VENDOR for violation of any of the terms</span>
        <span style="font-family:Arial; font-size:9pt">and condition</span>
        <span style="font-family:Arial; font-size:9pt">of this</span>
        <span style="font-family:Arial; font-size:9pt">agreement,</span>
        <span style="font-family:Arial; font-size:9pt">the VENDEE shall be liable to the VENDOR jointly and severally,</span>
        <span style="font-family:Arial; font-size:9pt">for the</span>
        <span style="font-family:Arial; font-size:9pt">payment of the further sum equivalent to thirty (30%) percent of all sums</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.047.png" width="708" height="842" alt="" style="-aw-left-pos:-0.95pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:9.61pt; -aw-wrap-type:none; margin-left:-0.95pt; margin-top:9.61pt; position:absolute; z-index:-65505" />
 -->      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">Due</span>
        <span style="font-family:Arial; font-size:9pt">and owing for Attorney’s Fee which in no case shall not be less than One thousand (P1000.00) Pesos plus an amount equivalent to</span>
        <span style="font-family:Arial; font-size:9pt">Twenty (</span>
        <span style="font-family:Arial; font-size:9pt">20</span>
        <span style="font-family:Arial; font-size:9pt">%) percent</span>
        <span style="font-family:Arial; font-size:9pt">of the total sum due per month for and as penalty charge.</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">6.) The buyers hereby expressly undertake to make payments only to authorized representatives of the VENDOR without exception in exchange for company official receipts; otherwise, such payments shall not be honored, in which case we bind ourselves to be responsible for damages that may be caused to the VENDOR which may forthwith avail of all remedies herein provided for in case of default or violation of this contract.</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">7.) All the other terms and conditions and stipulation embodied in Warranty Agreement Card shall be similarly accorded full and strict observance.</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">8</span>
        <span style="font-family:Arial; font-size:9pt">.) Pending payment of the full purchase price, the above describe property, located</span>
        <span style="font-family:Arial; font-size:10pt">in</span>
        <span style="font-family:Arial; font-size:9pt">Sta Rosa</span>
        <span style="font-family:Calibri; font-size:10pt">, Laguna</span>
        <span style="font-family:Arial; font-size:10pt">, and</span>
        <span style="font-family:Arial; font-size:9pt">now in the actual possession of the</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">VENDEE</span>
        <span style="font-family:Arial; font-size:9pt">, is hereby conveyed to the</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">VENDOR</span>
        <span style="font-family:Arial; font-size:9pt">by way of chattel</span>
        <span style="font-family:Arial; font-size:9pt">mortgageas</span>
        <span style="font-family:Arial; font-size:9pt">security for the payment of the unpaid balance</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">,</span>
        <span style="font-family:Arial; font-size:9pt">under the express understanding that if the said</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold"></span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">VENDEE</span>
        <span style="font-family:Arial; font-size:9pt">,his</span>
        <span style="font-family:Arial; font-size:9pt">heirs or assigns shall become null  and void:</span>
        <span style="font-family:Arial; font-size:9pt">otherwise it shall remain in full force and effect and shall be enforceable in accordance with the provisions of the Chattel Mortgage Law in Connections with Article 1484 of the new Civil Code.</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">9.) The</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">VENDEE</span>
        <span style="font-family:Arial; font-size:9pt">must inform first the company if he/she will change address. Company will have the rights to hold the purchased unit if failed to follow.</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">10.)</span>
        <a name="_Hlk24531359">
          <span style="font-family:Arial; font-size:9pt">Any sale, mortgage or transfer of unit without prior notice is a violation of this contract. In addition, VENDEE still must pay his/her unpaid monthly payment.</span></a>
      </p>
      <p style="margin:0pt; text-align:justify">
        <span style="-aw-bookmark-end:_Hlk24531359"></span>
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">IN WITNESS WHEREOF, the parties hereunto set their hand this ____________</span>
        <span style="font-family:Arial; font-size:9pt">________</span>
        <span style="font-family:Arial; font-size:9pt">day</span>
        <span style="font-family:Arial; font-size:9pt">of _</span>
        <span style="font-family:Arial; font-size:9pt">______________</span>
        <span style="font-family:Arial; font-size:9pt">_______</span>
        <span style="font-family:Arial; font-size:9pt">at _</span>
        <span style="font-family:Arial; font-size:9pt">_____________________________</span>
        <span style="font-family:Arial; font-size:9pt">Sta Rosa</span>
        <span style="font-family:Calibri; font-size:10pt">, Laguna</span>
        <span style="font-family:Arial; font-size:10pt">,</span>
        <span style="font-family:Arial; font-size:10pt">Philippines</span>
        <span style="font-family:Arial; font-size:9pt">.</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xad;</span>
        <span style="font-family:Arial; font-size:9pt">&#xad;</span>
        <span style="width:15.96pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:9pt">_</span>
        <span style="font-family:Arial; font-size:9pt">_______________</span>
        <span style="font-family:Arial; font-size:9pt">____</span>
        <span style="font-family:Arial; font-size:9pt">_                                                                 ___________________</span>
        <span style="font-family:Arial; font-size:9pt">___</span>
        <span style="font-family:Arial; font-size:9pt">_</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">                MARY ROSE LANGIT LIU                                                                            </span>
        <span style="font-family:Arial; font-size:9pt; font-style:italic; font-weight:bold">VENDEE</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt; font-style:italic; font-weight:bold">VENDOR</span></p>
      <img src="9479c74d-987e-49a4-9c19-27188981c608.048.png" width="105" height="1" alt="" style="-aw-left-pos:364.25pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:8.95pt; -aw-wrap-type:none; margin-left:363.88pt; margin-top:8.57pt; position:absolute; z-index:26" />
      <img src="9479c74d-987e-49a4-9c19-27188981c608.048.png" width="105" height="1" alt="" style="-aw-left-pos:76.45pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:8.95pt; -aw-wrap-type:none; margin-left:76.08pt; margin-top:8.57pt; position:absolute; z-index:21" />
      <img src="9479c74d-987e-49a4-9c19-27188981c608.048.png" width="105" height="1" alt="" style="-aw-left-pos:76.45pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:8.95pt; -aw-wrap-type:none; margin-left:76.08pt; margin-top:8.57pt; position:absolute; z-index:22" />
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">ID C</span>
        <span style="font-family:Arial; font-size:9pt">ARD &amp; NO</span>
        <span style="width:10.49pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:9pt">:_____________________________</span>
        <span style="width:33.5pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:9pt">ID C</span>
        <span style="font-family:Arial; font-size:9pt">ARD &amp; NO</span>
        <span style="width:10.49pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:9pt">:_____________________________</span></p>
      <img src="9479c74d-987e-49a4-9c19-27188981c608.048.png" width="105" height="1" alt="" style="-aw-left-pos:364.25pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:7.45pt; -aw-wrap-type:none; margin-left:363.88pt; margin-top:7.08pt; position:absolute; z-index:27" />
      <img src="9479c74d-987e-49a4-9c19-27188981c608.048.png" width="105" height="1" alt="" style="-aw-left-pos:76.45pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:7.45pt; -aw-wrap-type:none; margin-left:76.08pt; margin-top:7.08pt; position:absolute; z-index:23" />
      <img src="9479c74d-987e-49a4-9c19-27188981c608.048.png" width="105" height="1" alt="" style="-aw-left-pos:76.45pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:7.45pt; -aw-wrap-type:none; margin-left:76.08pt; margin-top:7.08pt; position:absolute; z-index:24" />
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">ISSUED O</span>
        <span style="font-family:Arial; font-size:9pt">N</span>
        <span style="width:22.49pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:9pt">:_____________________________</span>
        <span style="width:23.5pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:9pt">ISSUED O</span>
        <span style="font-family:Arial; font-size:9pt">N</span>
        <span style="width:22.49pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:9pt">:_____________________________</span></p>
      <img src="9479c74d-987e-49a4-9c19-27188981c608.048.png" width="105" height="1" alt="" style="-aw-left-pos:364.25pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:9.3pt; -aw-wrap-type:none; margin-left:363.88pt; margin-top:8.93pt; position:absolute; z-index:28" />
      <img src="9479c74d-987e-49a4-9c19-27188981c608.048.png" width="105" height="1" alt="" style="-aw-left-pos:76.45pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:9.3pt; -aw-wrap-type:none; margin-left:76.08pt; margin-top:8.93pt; position:absolute; z-index:25" />
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">ISSUED A</span>
        <span style="font-family:Arial; font-size:9pt">T</span>
        <span style="width:24.49pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:9pt">:_____________________________</span>
        <span style="width:16pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:9pt">ISSUED A</span>
        <span style="font-family:Arial; font-size:9pt">T</span>
        <span style="width:21.99pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:9pt">:_____________________________</span>
        <span style="width:33.5pt; text-indent:0pt; display:inline-block"></span>
      </p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">Signed</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">in</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">The Presence Of:</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">     1. ____________________________                                                2. ___________________________</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">ACKNOWLEDGEMENT</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">REPU</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">B</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">LIC</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">OF THE</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">PHILIPPINES</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">)</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">PROVINCE OF</span>
        <span style="width:9.99pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">)</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">_______</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">)</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">BEFORE ME, a Notary Public in and for the Provinc</span>
        <span style="font-family:Arial; font-size:9pt">e of</span>
        <span style="font-family:Arial; font-size:9pt">Cavite</span>
        <span style="font-family:Arial; font-size:9pt">this _______ day of _______</span>
        <span style="font-family:Arial; font-size:9pt">, personally appeared ______</span>
        <span style="font-family:Arial; font-size:9pt">_______</span>
        <span style="font-family:Arial; font-size:9pt">_____</span>
        <span style="font-family:Arial; font-size:9pt">______</span>
        <span style="font-family:Arial; font-size:9pt">_and _______________</span>
        <span style="font-family:Arial; font-size:9pt">____________</span>
        <span style="font-family:Arial; font-size:9pt">who has satisfactorily proven to me their identities though their Identification Card and Number.</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">                 That they are the same persons who presented the</span>
        <span style="font-family:Arial; font-size:9pt">foregoingDEED</span>
        <span style="font-family:Arial; font-size:9pt">OF CONDITIONAL SALE OF</span>
        <span style="font-family:'Times New Roman'; font-size:11pt">Electric Motor</span>
        <span style="font-family:'Times New Roman'; font-size:11pt">Vehicle</span>
        <span style="font-family:Arial; font-size:9pt">which</span>
        <span style="font-family:Arial; font-size:9pt">they voluntarily signed in my presence.</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">This instrument</span>
        <span style="font-family:Arial; font-size:9pt">consistsof</span>
        <span style="font-family:Arial; font-size:9pt">TWO (2) pages including the page wherein this acknowledgement is written.</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">WITNESS MY HAND AND NOTORIAL SEAL</span>
        <span style="font-family:Arial; font-size:9pt">on the date and place first above written.</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">DOC NO</span>
        <span style="font-family:Arial; font-size:9pt">.   ____________</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">PAGE NO. ____________</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">BOOK NO.____________</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Arial; font-size:9pt">SERIES OF ___________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt 0pt 10pt;display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img5.png" width="224" height="60" style="-aw-left-pos:173.5pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:11pt"></span>
        <span style="font-family:Arial; font-size:11pt">Name of Customer: ____________________________      Date: ___________________</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:11pt">Unit purchase: _______________________________        Branch: __________________</span></p>
      <p style="margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:'Arial Rounded MT'; font-size:11pt; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:'Arial Rounded MT'; font-size:11pt; font-weight:bold">DELIVERY CHECK LIST </span></p>
      <table cellspacing="0" cellpadding="0" style="border-collapse:collapse; text-align: center; margin:0 auto;text-align: center;">
        <tr style="height:16.25pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="margin:0pt">
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold"></span>
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
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold"></span>
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
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold"></span>
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
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold"></span>
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
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">              SIDE MIRROR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">               PLATE                                                    </span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">                SIDE MIRROR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
<!--             <img src="9479c74d-987e-49a4-9c19-27188981c608.050.png" width="659" height="413" alt="" style="-aw-left-pos:-202.26pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:-266.31pt; -aw-wrap-type:none; margin-left:-202.26pt; margin-top:-266.31pt; position:absolute; z-index:-65457" />
 -->            <p style="margin:0pt; text-align:center">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HAND BRAKE LEVER</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SAFETY LOCK</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">FOOT MAP</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">FOOT REST MAP</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
          </td>
        </tr>
      </table>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:12pt; line-height:103%; margin:0pt 0pt 0.65pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:12pt; line-height:115%; margin:0pt 0pt 4.6pt; text-align:center">
        <span style="font-family:Calibri; font-size:12pt; font-weight:bold">CERTIFICATE OF RELEASE</span></p>
      <p style="font-size:11.5pt; line-height:103%; margin:0pt 0pt 0.65pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt">This is to certify that the</span>
        <span style="font-family:'Times New Roman'; font-size:11pt">Electric Motor Vehicle</span>
        <span style="font-family:Calibri; font-size:11.5pt">describe below was physically released, received and accepted</br> by Mr. / Ms. ___________________________________ in A-1 condition as stated in the attached confirmation</br> letter. </span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">                             Make / Type: _________________________________</span></p>
        <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">                             Model: _________________________________</span></p>
        <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">                             Chassis Number: _________________________________</span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">                             Motor Number: ______________________________________</span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">                             Charger Number: ______________________________</span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">                             Color: _______________________________</span></p>
      <p style="margin:0pt 154.95pt 0pt 0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11.5pt; line-height:115%; margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:11.5pt">_________________________</span>
        <span style="width:0.81pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11.5pt">_____________</span>
        <span style="font-family:Calibri; font-size:11.5pt">____</span></p>
      <p style="margin:0pt; padding-left:36pt; text-indent:-36pt">
        <span style="font-family:'Times New Roman'; font-size:12pt">Signature over printed name Buyer</span>
        <span style="width:4.71pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Times New Roman'; font-size:12pt">Date</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:12pt"></span></p>
      <p style="margin:0pt">
        <span style="width:97.15pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:97.15pt"></span>
        <span style="width:10.85pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
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

        <div style="padding-top: 30px"></div>
      <p style="margin:0pt; display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img5.png" width="224" height="60" style="-aw-left-pos:163pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="line-height:10pt; margin:0pt 0pt 10pt; text-align:justify">
        <span style="font-family:Calibri; font-size:12pt; font-weight:bold">Refund Policy for</span>
        <span style="font-family:Calibri; font-size:14pt; font-weight:bold">Purchase New E-bikes</span></p>
      <p style="margin:0pt 10pt 0pt 0pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">Your e-bike is a big investment. We want to make sure you really do want an electric bike and that you have chosen the right one before we deliver it to you, as returning it is not easy. We stand behind everything we sell.</span></p>
      <p style="margin:0pt 26pt 0pt 0pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <ol type="1" style="margin:0pt; padding-left:0pt">
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
      <p style="margin:0pt 0pt 0pt 90pt; text-align:justify; text-indent:-17.95pt">
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REFUND/EXCHANGE</span></p>
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
      <p style="margin:0pt 16pt 0pt 0pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt 16pt 0pt 36pt; text-align:center;">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt 22pt 0pt 288pt; text-indent:36pt">
        <span style="font-family:Calibri; font-size:11pt">With my conformity</span>
        <span style="font-family:Calibri; font-size:11pt">,</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:14pt">&#xa0;</span></p>
      <p style="margin:0pt 0pt 0pt 18pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">______________________________</span>
        <span style="width:107.64pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:290pt"></span>
        <span style="width:34pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11pt">_________________________</span></p>
      <p style="margin:0pt 0pt 0pt 18pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">NWOW Marketing Representative</span>
        <span style="width:118.23pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:289pt"></span>
        <span style="font-family:Calibri; font-size:11pt">Signature</span>
        <span style="font-family:Calibri; font-size:11pt">over</span>
        <span style="font-family:Calibri; font-size:11pt">Printed Name</span></p>
      <p style="margin:0pt 0pt 0pt 334pt; text-align:justify">
        <span style="font-family:Calibri; font-size:10pt">(Customer)</span></p>
      <p style="font-size:10pt; line-height:108%; margin:0pt 0pt 8pt">
        <br style="page-break-before:always; clear:both" /></p>
      <p style="line-height:10pt; margin:0pt 0pt 10pt; display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img5.png" width="191" height="54" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0.3pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt; text-align:center">
        <img src="9479c74d-987e-49a4-9c19-27188981c608.052.png" width="696" height="10" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:character; -aw-rel-vpos:line; -aw-top-pos:0pt; -aw-wrap-type:inline" /></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 9.8pt">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 9.8pt">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">Date: February 25, 2017 </span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10.65pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TO:ALL</span>
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">E-BIKE USERS</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 14.25pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">FROM: TAILG/NWOW </span></p>
      <h1 style="margin:0pt; page-break-after:avoid; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">SUBJECT: </span>
        <span style="font-family:'Times New Roman'; font-size:10pt; font-weight:bold">E-BIKE BATTERY CONCERNS</span></h1>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 11.8pt">
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
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 45.45pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
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
        <span style="font-family:Calibri; font-size:11pt">Signature</span>
        <span style="font-family:Calibri; font-size:11pt">over</span>
        <span style="font-family:Calibri; font-size:11pt">Printed Name</span></p>
      <p style="margin:0pt 0pt 0pt 334pt; text-align:justify">
        <span style="font-family:Calibri; font-size:10pt">(Customer)</span></p>
      <p style="font-size:9pt; line-height:115%; margin:2.45pt 0pt 1pt">
<!--         <img src="9479c74d-987e-49a4-9c19-27188981c608.053.png" width="655" height="2" alt="" style="-aw-left-pos:58.25pt; -aw-rel-hpos:page; -aw-rel-vpos:page; -aw-top-pos:748.5pt; -aw-wrap-type:topbottom" /></p>
 -->      <p style="font-size:9pt; line-height:115%; margin:2.45pt 0pt 1pt">
        <span style="font-family:Cambria; font-size:9pt; font-style:italic">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:115%; margin:2.45pt 0pt 1pt">
        <span style="font-family:Cambria; font-size:9pt; font-style:italic">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:115%; margin:2.45pt 0pt 1pt; text-align:center">
        <span style="font-family:Cambria; font-size:9pt; font-style:italic">www.nwow.com.ph</span></p>
      <p style="margin:0pt 0pt 10pt">
        <span style="font-family:Calibri; font-size:10pt">&#xa0;</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 0pt 18pt">
        <span style="font-family:Calibri; font-size:10pt">&#xa0;</span></p>
      <p style="margin:0pt 0pt 10pt; display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img5.png" width="240" height="75" style="-aw-left-pos:176.65pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
        <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.055.png" width="417" height="50" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:8.45pt; -aw-wrap-type:none; margin-left:105.55pt; margin-top:8.45pt; position:absolute; z-index:49" />
 -->
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.056.png" width="582" height="6" alt="" style="-aw-left-pos:47.25pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:20.65pt; -aw-wrap-type:none; margin-left:47.25pt; margin-top:20.65pt; position:absolute; z-index:50" />
 -->      <p style="margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:14pt; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt 0pt 0pt 13.5pt; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:14pt; font-weight:bold">ROAD TRAFFIC SIGNS</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 0pt 8.2pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:98%; margin:0pt 0pt 0.1pt 36pt">
        <span style="font-family:'Times New Roman'; font-size:11pt; font-style:italic">Signs that inform roads users of traffic laws and regulations which, if disregarded, with constitute an offense. These signs indicate the only direction (s) in which the motorist is obliged to follow.</span></p>
        <span style="color:#7030a0; font-family:Wingdings; font-size:11pt; font-style:normal; text-decoration:none; vertical-align:baseline">❖</span>
        <span style="color:#7030a0; font-family:'Times New Roman'; font-size:11pt; font-style:italic; font-weight:bold">WARNING SIGNS</span>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0pt 53.25pt; text-indent:-18pt">

        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <img src="/static/fenqi/img10.png" width="698" height="626" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:21.45pt; -aw-wrap-type:through;margin:0pt 9pt;text-align: center;" />
        </p>
      <p style="font-size:11pt; line-height:115%; margin:0pt">
        <span style="color:#7030a0; font-family:'Times New Roman'; font-size:11pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0pt 53.25pt; text-indent:0pt">
        <span style="color:#7030a0; font-family:Wingdings; font-size:11pt; font-style:normal; text-decoration:none; vertical-align:baseline">❖</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="color:#7030a0; font-family:'Times New Roman'; font-size:11pt; font-style:italic; font-weight:bold">REGULATORY SIGNS</span></p>
        <span style="color:#7030a0; font-family:Wingdings; font-size:11pt; font-style:normal; text-decoration:none; vertical-align:baseline">❖</span>
        <span style="color:#7030a0; font-family:'Times New Roman'; font-size:11pt; font-style:italic; font-weight:bold">ROAD CONSTRUCTION SIGNS</span>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0pt 53.25pt; text-indent:0pt">

        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <img src="/static/fenqi/img8.png" width="698" height="645" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:33.15pt; -aw-wrap-type:square; text-align: center; margin:0pt 9pt" />
        </p>
      <p style="font-size:11pt; line-height:115%; margin:0pt">
        <img src="/static/fenqi/img9.png" width="679" height="178" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:character; -aw-rel-vpos:line; -aw-top-pos:0pt; -aw-wrap-type:inline;text-align: center; margin:0pt 9pt" /></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">__________________________________</span>
        <span style="width:210.35pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:right; -aw-tabstop-pos:518.6pt"></span>
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">__________________________________</span></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">Customer over printed name &amp; signature</span>
        <span style="width:219.06pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:right; -aw-tabstop-pos:518.6pt"></span>
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">Branch Rep. printed name &amp; signature</span></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt;display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img5.png" width="213" height="65" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:-0.01pt; -aw-wrap-type:through; margin:0pt 9pt" /></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
        <span style="width:459pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:459pt"></span>
        <span style="color:#404040; font-family:'Felix Titling'; font-size:7pt; font-style:italic"></span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'High Tower Text'; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Bookman Old Style'; font-size:14pt; font-weight:bold">BRAND</span>
        <span style="font-family:'Bookman Old Style'; font-size:14pt; font-weight:bold">NEW INSTALLMENT GUIDE</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Bookman Old Style'; font-size:14pt; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt; text-indent:36pt">
        <span style="font-family:'Bookman Old Style'; font-size:11pt; font-weight:bold">Date Released</span>
        <span style="width:27.26pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:11pt; font-weight:bold">:</span>
        <span style="font-family:'Bookman Old Style'; font-size:11pt; font-weight:bold">__________________________________</span>
        <span style="font-family:'Bookman Old Style'; font-size:11pt; font-weight:bold"></span></p>
      <p style="margin:0pt; text-indent:36pt">
        <span style="font-family:'Bookman Old Style'; font-size:11pt; font-weight:bold">Name of</span>
        <span style="font-family:'Bookman Old Style'; font-size:11pt; font-weight:bold">Customer</span>
        <span style="font-family:'Bookman Old Style'; font-size:11pt; font-weight:bold"></span>
        <span style="width:2.18pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:11pt; font-weight:bold">:_</span>
        <span style="font-family:'Bookman Old Style'; font-size:11pt; font-weight:bold">_________${needdata.customerName}_________________________</span>
        <span style="font-family:'Bookman Old Style'; font-size:11pt; font-weight:bold"></span></p>
        <p style="margin:0pt; text-indent:36pt">
        <span style="font-family:'Bookman Old Style'; font-size:11pt; font-weight:bold">Address</span>
        <span style="width:2.18pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:11pt; font-weight:bold">:_</span>
        <span style="font-family:'Bookman Old Style'; font-size:11pt; font-weight:bold">_____________${needdata.address}_____________________</span>
        <span style="font-family:'Bookman Old Style'; font-size:11pt; font-weight:bold"></span></p>
      <table cellspacing="0" cellpadding="0" style="border-collapse:collapse; width:100%; text-align: center;">
        <tr style="height:36.4pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:136pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">UNIT PURCHASED:${cardata.productTypeName}</span></p>
          </td>
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:118.8pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">MOTOR</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">NO.${cardata.motorCode}</span></p>
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">&#xa0;</span></p>
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">CHASIS NO.${cardata.carCode}</span></p>
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">&#xa0;</span></p>
          </td>
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:119.3pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">GROSS</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">AMOUNT</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">:${needdata.installmentAllMoney}</span></p>
          </td>
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:145.2pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">TERMS:${needdata.installmentCount}</span></p>
          </td>
        </tr>
        <tr style="height:34.6pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:136pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">COLOR:${cardata.color}</span></p>
          </td>
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:118.8pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">BATTERY</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">NO.${cardata.batteryCode}</span></p>
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">&#xa0;</span></p>
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">CHARGER NO.${cardata.chargeCode}</span></p>
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">&#xa0;</span></p>
          </td>
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:119.3pt">
<!--             <img src="9479c74d-987e-49a4-9c19-27188981c608.061.jpeg" width="444" height="383" alt="" style="-aw-left-pos:-142.18pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:-5.1pt; -aw-wrap-type:none; margin-left:-142.18pt; margin-top:-5.1pt; position:absolute; z-index:-65524" />
 -->            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">DOWN PAYMENT:${needdata.firstMoney}</span></p>
          </td>
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:145.2pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">MONTHLY PAYMENT:${needdata.eachMoney}</span></p>
          </td>
        </tr>
        <tr style="height:16.6pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:136pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">REBATE</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:404.9pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">100 pesos rebate</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">for every updated payment (on or before due date).</span></p>
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt">Good as cash or units that availed in 3 months terms and pick up payments are not included.</span></p>
          </td>
        </tr>
        <tr style="height:16.6pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:136pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">PICK UP PAYMENT</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:404.9pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt">Only for customers who are not capable to go in nearest store to pay their monthly payment.</span></p>
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt">(If have emergency, pregnant and person with disability and senior citizens)</span></p>
          </td>
        </tr>
        <tr style="height:16.6pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:136pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">CHANGE TERM</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:404.9pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt">If the payment could not settle within the certain terms, there will be an adjustment in the gross amount and monthly payment.</span></p>
          </td>
        </tr>
        <tr style="height:14.8pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:136pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">PENALTY</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:404.9pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">Three (</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">3)days</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">after the due date, 10% of monthly payment will be added.</span></p>
            <p style="margin:0pt">
              <span style="color:#ff0000; font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">For lapsed Contract</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">, additional 10% of all unpaid monthly payment will be addedmonthly.</span></p>
          </td>
        </tr>
        <tr style="height:15.25pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:136pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">DEPOSIT OF UNIT</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:404.9pt">
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt">Upon reaching Fifteen (15) days delayed payments from due date will deposit of unit.</span></p>
            <p style="margin:0pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">In case of special situation</span>
              <span style="font-family:Calibri; font-size:11pt">, the company have the rights</span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">to lock or cut the power</span>
              <span style="font-family:Calibri; font-size:11pt">of the purchased unit. (The company reserves the right for the final explanation)</span></p>
          </td>
        </tr>
        <tr style="height:22pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:136pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">GRACE PERIOD</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:404.9pt">
            <p style="margin:0pt; text-align:justify">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">Thirty (30) days grace period</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">t</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">o pay all the arrears includ</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">ing penalties and other</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">charges</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">from</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt"></span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">the day unit was deposited in branch.</span></p>
          </td>
        </tr>
        <tr style="height:16.15pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:136pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">REPOSSESSION</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:404.9pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:normal">If the payment still not settle</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">within 30 days</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:normal">, the unit will send back to warehouse and will not be returned.</span></p>
          </td>
        </tr>
        <tr style="height:71.05pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:136pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">&#xa0;</span></p>
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">&#xa0;</span></p>
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">&#xa0;</span></p>
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">WHOM TO PAY</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:404.9pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt">Authorized collectors and office cashiers only.</span></p>
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-style:italic; font-weight:bold">THE COMPANY DO</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-style:italic; font-weight:bold">N</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-style:italic; font-weight:bold">’T HAVE A</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-style:italic; font-weight:bold">HOUSE COLLECTOR.</span></p>
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">ALWAYS ASK FOR COMPANY RECEIPT</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-style:italic; font-weight:bold">.</span></p>
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt">Any payment without receipt will not be honored by the company</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">even it was</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">collected by</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">ana</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">uthorized</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">employee</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">or not by the company.</span></p>
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">PLEASE KEEP RECEIPTS FOR FUTUREREFERENCES.</span></p>
          </td>
        </tr>
        <tr style="height:22.45pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:136pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">MAINTENANCE</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:404.9pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:normal">The custo</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:normal">mer shall observe strictly the basic maintenance of</span>
              <span style="font-family:'Bookman Old Style'; font-size:9pt; font-weight:normal">the</span>
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:normal">Electric Motor</span>
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:normal">Vehicle</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:normal">as</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:normal">stated in the</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:normal">Electric</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:normal">M</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:normal">otor</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:normal">V</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:normal">ehicle</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:normal">Manual.</span></p>
          </td>
        </tr>
        <tr style="height:24.7pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:136pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">WARRANTY</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:404.9pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">LIFETIME</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">FREE SERVICE +</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">WARRANTY</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">stated in warranty agreement card provided by the company.</span></p>
          </td>
        </tr>
        <tr style="height:36.95pt">
          <td style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:136pt">
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">&#xa0;</span></p>
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">WARRANTY</span></p>
            <p style="margin:0pt">
              <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">LIMITATIONS</span></p>
          </td>
          <td colspan="3" style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:404.9pt">
            <p style="margin:0pt; text-align:justify">
              <span style="font-family:'Bookman Old Style'; font-size:10pt">Engine modification is strictly prohibited. If proven, warranty will be automatically null and void. Other warranty conditions are clearly stated on</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">WARRANTY POLICY AND GUIDELINES</span>
              <span style="font-family:'Bookman Old Style'; font-size:10pt">issued by the company. Please read for further information.</span></p>
          </td>
        </tr>
        <tr style="height:0pt">
          <td style="width:146.8pt; border:none"></td>
          <td style="width:129.6pt; border:none"></td>
          <td style="width:130.1pt; border:none"></td>
          <td style="width:156pt; border:none"></td>
        </tr>
      </table>
      
      <p style="margin:0pt">
        <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">IMPORTANT REMINDERS:</span></p>
      <ol start="4" type="1" style="margin:0pt; padding-left:0pt">
        <li style="font-family:'Bookman Old Style'; font-size:9pt; margin:0pt 0pt 0pt 9pt; text-align:justify; text-indent:0pt">
          <span style="font-family:'Bookman Old Style'; font-size:9pt">In case of accident or any unintended incident, unit will be deposit to the branch. Check up and repair will be conducted. Company not holds the liability to any missing or damage parts. Repair charges required.</span></li>
        <li style="font-family:'Bookman Old Style'; font-size:9pt; margin:0pt 0pt 0pt 13.46pt; padding-left:0.04pt; text-align:justify; text-indent:0pt">
          <span style="font-family:'Bookman Old Style'; font-size:9pt">For pull out unit, VENDEE must pay the amount for any missing or damage major and minor parts together with the charger of his/her</span>
          <span style="font-family:'Bookman Old Style'; font-size:9pt">ebike</span>
          <span style="font-family:'Bookman Old Style'; font-size:9pt">.</span></li>
        <li style="font-family:'Bookman Old Style'; font-size:9pt; margin:0pt 0pt 0pt 13.46pt; padding-left:0.04pt; text-indent:0pt">
          <span style="font-family:'Bookman Old Style'; font-size:9pt">The duplicate key will release maximum of 10 days after fully paid.</span></li>
      </ol>
      <p style="margin:0pt 0pt 0pt 4.5pt; text-align:justify; text-indent:18pt">
        <span style="width:13.5pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:9pt">I hereby state that I fully understand the preceding guidelines and hereby declare that I will strictly observe its provisions stated above.</span></p>
      <p style="margin:0pt 0pt 0pt 22.5pt; padding-left:18pt; text-indent:-18pt">
        <span style="width:13.5pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:36pt"></span>
        <span style="font-family:'Bookman Old Style'; font-size:9pt">And I signed to prove my willingness to adhere to it on my free will without pressure from anybody.</span></p>
      <p style="margin:0pt 0pt 0pt 22.5pt; padding-left:18pt; text-indent:-18pt">
        <span style="font-family:'Bookman Old Style'; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt 0pt 0pt 378pt; text-indent:18pt">
        <span style="font-family:'Bookman Old Style'; font-size:10pt">With my conformity, </span></p>
      <p style="margin:0pt">
        <span style="font-family:'Bookman Old Style'; font-size:10pt">Prepared</span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt">by:_</span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt">____________________</span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt">__</span>
        <span style="width:3.4pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:11pt">________________________</span></p>
      <p style="margin:0pt">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt">Signature over Printed Name</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Bookman Old Style'; font-size:10pt">                                                                                                                               Customer</span></p>
      <p style="font-size:10pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt; font-style:italic; font-weight:bold">“The company reserves the right for the final explanation.”</span></p>
      <p style="margin:0pt;display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img5.png" width="213" height="58"  style="-aw-left-pos:185pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0.4pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'High Tower Text'; font-size:9pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Gungsuh; font-size:16pt; font-weight:bold; text-decoration:underline">SALESCERTIFICATION</span></p>
      <p style="margin:0pt; text-align:center;">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:12pt">This is to certify that the Sales Invoice No.______ was issued to ______${needdata.address}________________</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">___________</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:12pt">Of</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">_________________________${needdata.customerName}____________________________</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">______</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xad;</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xad;</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xad;</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xad;</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xad;</span>
        <span style="font-family:'Times New Roman'; font-size:12pt"></span>
        <span style="font-family:'Times New Roman'; font-size:12pt">for the</span>
        <span style="font-family:'Times New Roman'; font-size:12pt">purchased in</br></span>
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold; text-decoration:underline">INSTALLMENT</span>
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
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">________${cardata.productTypeName}_____________________</span></p>
      <p style="margin:0pt">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">COLOR</span>
        <span style="width:26.89pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">:</span>
        <span style="width:31.92pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">______${cardata.color}_______________________</span></p>
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
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">_______${cardata.carCode}______________________</span></p>
      <p style="margin:0pt">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">BATTERY</span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">NUMBER</span>
        <span style="width:23.75pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">:</span>
        <span style="width:31.92pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">___________${cardata.batteryCode}__________________</span></p>
      <p style="margin:0pt">
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">CHARGER NUMBER</span>
        <span style="width:20.17pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">:</span>
        <span style="width:31.92pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:'Bookman Old Style'; font-size:12pt">______________${cardata.chargeCode}_______________</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Bookman Old Style'; font-size:12pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center;">
        <span style="font-family:'Bookman Old Style'; font-size:12pt; font-weight:bold">NOTE:</span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt">Not</span>
        <span style="font-family:'Bookman Old Style'; font-size:10pt">to sell, assign, lease, pledge or otherwise encumber the subject chattel, or convey in any</br> matter whatsoever our right to purchased it to any other third person without the prior written consent to</br> the</span>
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
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.009.png" width="791" height="1" alt="" style="-aw-left-pos:5pt; -aw-rel-hpos:page; -aw-rel-vpos:paragraph; -aw-top-pos:8.7pt; -aw-wrap-type:none; margin-left:-0.38pt; margin-top:8.32pt; position:absolute; z-index:117" />
 -->      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <p style="margin:0pt;display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img5.png" width="228" height="50" style="-aw-left-pos:173.3pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0.6pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <h1 style="margin:0pt; page-break-after:avoid; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">WARRANTY POLICY AND GUIDELINES</span></h1>
      <p style="font-size:9pt; line-height:105%; margin:0pt 0pt 0.2pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">9.</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
<!--         <img src="9479c74d-987e-49a4-9c19-27188981c608.064.png" width="415" height="254" alt="" style="-aw-left-pos:109pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:8.95pt; -aw-wrap-type:none; margin-left:76.35pt; margin-top:8.95pt; position:absolute; z-index:-65523" />
 -->        <span style="font-family:Arial; font-size:9pt; font-weight:bold">NWOW MARKETING</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">shall not be liable under this warranty if any damage or defect result from  (</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">i</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">) misuse, abuse,  neglect   improper shipping  or  installation; (ii) disasters such as fire, flood, lightning or improper electric current; or (iii) service   or alteration by anyone other than an authorized NWOW MARKETING representative; (iv) damages incurred through    irresponsible use, or other non-recommended practices.</span></p>
      <p style="margin:0pt 0pt 0pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">10.</span>
        <span style="font:7.0pt 'Times New Roman'"></span>
        <span style="font-family:Arial; font-size:9pt; font-style:italic; font-weight:bold">If the E-Bike will use for business or personal purpose, family use like delivering or use in any heavy activities that may exceed in its maximum load weight and may cause any damage or defect in E-Bike, warranty period of all affected parts will be going to be half of its original warranty period.     </span></p>
      <p style="font-size:9pt; line-height:105%; margin:0pt 0pt 0.2pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">11.</span>
        <span style="font:7.0pt 'Times New Roman'"></span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">You must retain your bill of sale or other proof of purchase to receive warranty service.</span></p>
      <p style="font-size:9pt; line-height:105%; margin:0pt 0pt 0.2pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">12.</span>
        <span style="font:7.0pt 'Times New Roman'"></span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">No warranty extension will be granted for any replacement part(s) furnished to the purchaser in fulfillment of this warranty.</span></p>
      <p style="font-size:9pt; line-height:105%; margin:0pt 0pt 0.2pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">13.</span>
        <span style="font:7.0pt 'Times New Roman'"></span>
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">LIFETIME FREE SERVICE.</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">Any service taken are free of charge. Only the parts which are not cover by the limited warranty will charged by the company.</span></p>
      <p style="margin:0pt 0pt 0pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">14.</span>
        <span style="font:7.0pt 'Times New Roman'"></span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">The company offers free home service to the Major malfunction of the unit (</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">i</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">)electrical problem(ii)flat tire and any   troubleshooting occurs which cause the E-Bike not to run. Home service will be schedule and the company</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">exerts</span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">its effort    to repair the malfunction within 48hours. The customer will be responsible to inform the company for any major malfunction    of the E-Bike. The company will just service the E-bike to the place registered on our system.</span></p>
      <p style="font-size:9pt; line-height:105%; margin:0pt 0pt 0.2pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">15.</span>
        <span style="font:7.0pt 'Times New Roman'"></span>
        <span style="font-family:Arial; font-size:9pt; font-weight:normal">All the payment must settle before any warranty or service applied. The company has the right to delay our service warranty for our client who didn’t pay their monthly amortization on time. </span></p>
      <p style="margin:0pt 0pt 2.05pt 32.65pt; text-align:justify; text-indent:-10.2pt">
        <span style="font-family:Arial; font-size:9pt; font-style:normal; font-weight:bold; text-decoration:none; vertical-align:baseline">16.</span>
        <span style="font:7.0pt 'Times New Roman'"></span>
        <span style="font-family:Arial; font-size:9pt; font-style:italic; font-weight:bold">If the unit has been installed or customized with other parts by anyone other than an authorized company   representative like roof, basket, saddle or others for business or overload use, warranty of major parts and all affected parts will be voided. </span></p>
      <p style="font-size:10pt; line-height:101%; margin:1.75pt 1.4pt 0pt 22.45pt; orphans:0; text-align:justify; widows:0">
        <span style="font-family:Arial; font-size:9pt; font-weight:bold">9</span>
        <span style="font-family:Arial; font-size:10pt; font-weight:bold">.</span>
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
        <span style="font-family:Calibri; font-size:10pt">.</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 0pt 0.5pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
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
        <span style="font-family:Arial; font-size:10pt">  Customer’s Signature over Printed Name                   </span>
        <span style="width:8.78pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:10pt">NWOW Marketing Representative</span></p>
      <img src="/static/fenqi/img6.png" width="773" height="670" alt="" style="-aw-left-pos:-29pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:-0.05pt; -aw-wrap-type:none; margin-left:-29pt; margin-top:-0.05pt; z-index:15" />
      <p style="margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      
      <p style="margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:10pt">&#xa0;</span></p>
      <p style="margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:11pt">_____________________________                           </span>
        <span style="width:25.22pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:11pt">_________________________       </span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.009.png" width="791" height="1" alt="" style="-aw-left-pos:2.9pt; -aw-rel-hpos:page; -aw-rel-vpos:paragraph; -aw-top-pos:17.85pt; -aw-wrap-type:none; margin-left:-0.38pt; margin-top:17.48pt; position:absolute; z-index:120" />
 -->      <p style="margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:10pt">Customer’s Signature over Printed Name                   </span>
        <span style="width:14.33pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:10pt">NWOW Marketing Representative</span></p>
      <p style="margin:0pt 0pt 10pt; display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img5.png" width="227" height="57" style="-aw-left-pos:175.8pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:11.75pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="margin:0pt 0pt 10pt">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.067.png" width="372" height="228" alt="" style="-aw-left-pos:112.45pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:10.5pt; -aw-wrap-type:none; margin-left:112.45pt; margin-top:10.5pt; position:absolute; z-index:-65528" />
 -->      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:14pt; font-weight:bold">WAIVER OF LIABILITY</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt 0pt 10pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:10.5pt">This hereby releases</span>
        <span style="font-family:'Times New Roman'; font-size:10.5pt; font-weight:bold">NWOW Marketing</span>
        <span style="font-family:'Times New Roman'; font-size:10.5pt">from any and all liabilities upon apprehension/s of Mr. / Ms. _____________________________ by any government agencies for all types of traffic violation and from any all injuries suffered by him / her or by third person/s, financial or otherwise, while driving the above describe Electric Motor Vehicle unit. I, ________________________________________, fully understand and agreed to the foregoing.</span></p>
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
        <span style="font-family:'Times New Roman'; font-size:12pt">  Date</span></p>
      <p style="margin:0pt 0pt 10pt">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
      <p style="margin:0pt; display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img5.png" width="216" height="66" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt">
        <span style="font-family:Arial; font-size:9pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:11pt">Name of Customer: ____________________________     </span>
        <span style="width:0.7pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:11pt">Date: ___________________</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Arial; font-size:11pt">Unit purchase: _______________________________       </span>
        <span style="width:33.62pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Arial; font-size:11pt">Branch: __________________</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
<!--       <img src="9479c74d-987e-49a4-9c19-27188981c608.069.png" width="557" height="466" alt="" style="-aw-left-pos:55.65pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:52.95pt; -aw-wrap-type:none; margin-left:55.65pt; margin-top:52.95pt; position:absolute; z-index:-65522" />
 -->      <p style="font-size:11pt; line-height:115%; margin:0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:'Arial Rounded MT'; font-size:11pt; font-weight:bold">DELIVERY CHECK LIST </span></p>
      <table cellspacing="0" cellpadding="0" style="border-collapse:collapse; margin:0pt 9pt; width:100%;text-align: center;">
        <tr style="height:16.25pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold"></span>
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">ERV</span>
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">and ERVS</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">T-</span>
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">KING</span>
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">,</span>
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">M3</span>
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">and ARS</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:125.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">HERO and        WARRIOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:11.8pt; text-indent:-11.8pt">
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold"></span>
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">GB2</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:11.8pt; text-indent:-11.8pt">
              <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">    E-PEDICAB</span></p>
          </td>
        </tr>
        <tr style="height:10.85pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HEADLIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HEAD LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HEAD LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HEADLIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HEAD LIGHT</span></p>
          </td>
        </tr>
        <tr style="height:14.9pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SIGNAL LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SIGNAL LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SIGNAL LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:7.3pt; text-indent:-7.3pt">
              <span style="width:7.3pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SIGNAL LIGTHS</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE SENSOR</span></p>
          </td>
        </tr>
        <tr style="height:13.55pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE LIGHTS</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BATTERY</span></p>
          </td>
        </tr>
        <tr style="height:12.65pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:bottom; width:116.1pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TAIL LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TAIL LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">              TAIL LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TAIL LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PANEL BOARD</span></p>
          </td>
        </tr>
        <tr style="height:12.2pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REVERSE MODE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">          PARKING LIGHT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REVERSE MODE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HORN</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">CHARGER</span></p>
          </td>
        </tr>
        <tr style="height:11.75pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HORN</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">              REVERSE MODE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HORN</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SPEED SELECTOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">RAINCOAT</span></p>
          </td>
        </tr>
        <tr style="height:10.85pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REMOTE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HORN</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REMOTE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">AUTO DRIVE SYSTEM</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PLATE</span></p>
          </td>
        </tr>
        <tr style="height:14.9pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SPEED SELECTOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REMOTE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SPEED SELECTOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PEDAL BOOSTER</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SAFETY LOCK</span></p>
          </td>
        </tr>
        <tr style="height:13.55pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE SENSOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SPEED SELECTOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE SENSOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE SENSOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HORN</span></p>
          </td>
        </tr>
        <tr style="height:13.1pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PANEL BOARD</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE SENSOR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PANEL BOARD</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="width:2.8pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BATTERY</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:2.8pt; text-indent:-2.8pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PEDAL</span></p>
          </td>
        </tr>
        <tr style="height:12.2pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SCRATCHES</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">              PANEL BOARD</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SCRATCHES</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SCRATCHES</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SCRATCHES</span></p>
          </td>
        </tr>
        <tr style="height:11.75pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BATTERY</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SCRATCHES</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BATTERY</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BATTERY</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REVERSE MODE</span></p>
          </td>
        </tr>
        <tr style="height:11.3pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PLATE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">              BATTERY</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PLATE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TIRE PRESSURE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TIRE PRESSURE</span></p>
          </td>
        </tr>
        <tr style="height:11.3pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TIRE PRESSURE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:113.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">               PLATE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TIRE PRESSURE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PANEL BOARD</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:10.85pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">CHARGER</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TIRE PRESSURE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">CHARGER</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">CHARGER</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:13.05pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HELMET</span></p>
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">              RAINCOAT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">CHARGER</span></p>
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">               HELMET</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">RAINCOAT</span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">(WARRIOR)</span></p>
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">             ALIGNMENT                   </span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:101.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HELMET</span></p>
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">RAINCOAT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:16.65pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">BRAKE LOCK</span></p>
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">              ALIGNMENT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">RAINCOAT</span></p>
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">               ALIGNMENT</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SIDE MIRROR</span></p>
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">            WINDSHIEL(HERO) </span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:middle; width:101.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SIDE MIRROR</span></p>
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">PLATE</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:40.5pt">
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:116.1pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">              SIDE MIRROR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:113.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">               PLATE                                                    </span></p>
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">                SIDE MIRROR</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:125.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">HAND BRAKE LEVER</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:101.7pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">SAFETY LOCK</span></p>
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">FOOT MAP</span></p>
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">FOOT REST MAP</span></p>
          </td>
          <td style="padding-left:5.4pt; padding-right:5.4pt; vertical-align:top; width:149.2pt">
            <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10pt">
              <span style="font-family:Calibri; font-size:11pt; font-weight:bold">&#xa0;</span></p>
          </td>
        </tr>
      </table>
      <p style="font-size:12pt; line-height:115%; margin:0pt 0pt 4.6pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:12pt; line-height:115%; margin:0pt 0pt 4.6pt">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold"></span>
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">CERTIFICATE OF RELEASE</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 4.6pt">
        <span style="font-family:Calibri; font-size:11pt">This is to certify that</span>
        <span style="font-family:Calibri; font-size:10pt">the</span>
        <span style="font-family:'Times New Roman'; font-size:11pt">Electric Motor Vehicle</span>
        <span style="font-family:Calibri; font-size:11pt">describe</span>
        <span style="font-family:Calibri; font-size:11pt">above</span>
        <span style="font-family:Calibri; font-size:11pt">was physically released, received and accepted by Mr. </br>/ Ms. ________________________ in A-1 condition as stated in the attached confirmation letter.</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 4.6pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">                             Make / Type: _________________________________</span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">                             Model: ______________________________________</span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">                             Chassis Number: ______________________________</span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">                             Motor Number: _______________________________</span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="width:0.5pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36.25pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">Charger Number: ______________________________</span></p>
      <p style="margin:0pt 0pt 0.55pt; padding-left:0.5pt; text-align:center; text-indent:-0.5pt">
        <span style="width:0.5pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36.25pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">Color: _______________________________________</span></p>
      <p style="margin:0pt 154.95pt 0pt 0pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11.5pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:11.5pt; line-height:115%; margin:0pt; text-align:center;">
        <span style="font-family:Calibri; font-size:11.5pt">_________________________</span>
        <span style="width:34.21pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11.5pt">   _________________________</span>
        <span style="font-family:Calibri; font-size:11.5pt"></span></p>
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
        <span style="font-family:'Times New Roman'; font-size:12pt">Signed in presence of:</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:12pt"></span>
        <span style="font-family:'Times New Roman'; font-size:12pt">_________________________</span>
        <span style="width:18pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="width:36pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11.5pt">_________________________</span>
        <span style="font-family:Calibri; font-size:11.5pt"></span></p>
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
      <p style="margin:0pt; padding-left:0.5pt; text-indent:-0.5pt;display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img5.png" width="217" height="60" style="-aw-left-pos:152.35pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:1.1pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="line-height:10pt; margin:0pt 0pt 10pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="line-height:10pt; margin:0pt 0pt 10pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt"> ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt;text-align: center;">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt">
        <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">&#xa0;</span></p>
      <p style="line-height:10pt; margin:0pt 0pt 10pt; text-align:justify">
        <span style="font-family:Calibri; font-size:12pt; font-weight:bold">Refund Policy for</span>
        <span style="font-family:Calibri; font-size:14pt; font-weight:bold">Purchase New E-bikes</span></p>
      <p style="margin:0pt 10pt 0pt 0pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">Your e-bike is a big investment. We want to make sure you really do want an electric bike and that you have chosen the right one before we deliver it to you, as returning it is not easy. We stand behind everything we sell.       </span></p>
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
      <p style="margin:0pt 0pt 0pt 90pt; text-align:justify; text-indent:-17.95pt">
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">REFUND/EXCHANGE</span></p>
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
        <span style="font-family:Calibri; font-size:11pt">Of purchase</span>
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
      <p style="margin:0pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt 0pt 0pt 252pt; text-align:center; text-indent:36pt">
        <span style="font-family:Calibri; font-size:11pt">With my conformity</span>
        <span style="font-family:Calibri; font-size:11pt">,</span></p>
      <p style="margin:0pt 0pt 0pt 18pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">______________________________</span>
        <span style="width:107.64pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:290pt"></span>
        <span style="width:34pt; text-indent:0pt; display:inline-block"></span>
        <span style="font-family:Calibri; font-size:11pt">_________________________</span></p>
      <p style="margin:0pt 0pt 0pt 18pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">NWOW Marketing Representative</span>
        <span style="width:118.23pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:289pt"></span>
        <span style="font-family:Calibri; font-size:11pt">Signature</span>
        <span style="font-family:Calibri; font-size:11pt">over</span>
        <span style="font-family:Calibri; font-size:11pt">Printed Name</span></p>
      <p style="margin:0pt 0pt 0pt 334pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt">(Customer)</span></p>
      <p style="margin:0pt; display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img5.png" width="250" height="63" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:1.96pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt;text-align: center;">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:14pt; line-height:115%; margin:0pt 0pt 0pt 4.85pt; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:14pt; font-weight:bold">ROAD TRAFFIC SIGNS</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 0pt 8.2pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:98%; margin:0pt 0pt 0.1pt 36pt">
        <span style="font-family:'Times New Roman'; font-size:11pt; font-style:italic">Signs that inform roads users of traffic laws and regulations which, if disregarded, with constitute an offense. These signs indicate the only direction (s) in which the motorist is obliged to follow.</span></p>
        <span style="color:#7030a0;text-align: center; font-family:Wingdings; font-size:11pt; font-style:normal; text-decoration:none; vertical-align:baseline">❖</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="color:#7030a0; font-family:'Times New Roman';display: flex;align-items: center;justify-content: center; font-size:11pt; font-style:italic; font-weight:bold">WARNING SIGNS</span>
      <p style="font-size:11pt; line-height:108%;text-align: center; text-indent:-18pt">

        <img src="/static/fenqi/img10.png" width="698" height="631" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:21.45pt; -aw-wrap-type:through; text-align: center; margin:0 auto; " />
        </p>
      <p style="font-size:11pt; line-height:115%; margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt;text-align: center;">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">__________________________________</span>
        <span style="width:210.35pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:right; -aw-tabstop-pos:518.6pt"></span>
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">__________________________________</span></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt;text-align: center;">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">Customer over printed name &amp; signature</span>
        <span style="width:216.81pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:right; -aw-tabstop-pos:518.6pt"></span>
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">Branch Rep. printed name &amp; signature</span></p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0pt 53.25pt; text-indent:0pt;display: flex;align-items: center;justify-content: center;">
        <span style="color:#7030a0; font-family:Wingdings; font-size:11pt; font-style:normal; text-decoration:none; vertical-align:baseline">❖</span>
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <span style="color:#7030a0; font-family:'Times New Roman'; font-size:11pt; font-style:italic; font-weight:bold">REGULATORY SIGNS</span>
</p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0pt 53.25pt; text-indent:0pt;display: flex;align-items: center;justify-content: center;">

<span style="color:#7030a0; font-family:Wingdings; font-size:11pt; font-style:normal; text-decoration:none; vertical-align:baseline">❖</span>
    <span style="color:#7030a0; font-family:'Times New Roman'; font-size:11pt; font-style:italic; font-weight:bold">ROAD CONSTRUCTION SIGNS</span>
</p>
      <p style="font-size:11pt; line-height:108%; margin:0pt 0pt 0pt 53.25pt; text-indent:0pt; display: flex;align-items: center;justify-content: center;">
        
        <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
        <img src="/static/fenqi/img8.png" width="698" height="645" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:33.15pt; -aw-wrap-type:square; text-align: center;" />
        </p>
      <p style="font-size:11pt; line-height:115%; margin:0pt;display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img9.png" width="624" height="187" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:character; -aw-rel-vpos:line; -aw-top-pos:0pt; -aw-wrap-type:inline; text-align: center;" /></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt;text-align: center;">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">__________________________________</span>
        <span style="width:210.35pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:right; -aw-tabstop-pos:518.6pt"></span>
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">__________________________________</span></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt;text-align: center;">
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">Customer over printed name &amp; signature</span>
        <span style="width:216.81pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:right; -aw-tabstop-pos:518.6pt"></span>
        <span style="font-family:'Times New Roman'; font-size:9pt; font-style:italic; font-weight:bold">Branch Rep. printed name &amp; signature</span></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt 0pt 10pt; padding-left:9pt; text-indent:-9pt;display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img11.jpeg" width="771" height="996"  style="-aw-left-pos:0pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:inline;display: flex;align-items: center;justify-content: center;" /></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt;display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img12.png" width="764" height="994"  style="-aw-left-pos:0pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:inline;text-align: center;" /></p>
      <p style="font-size:12pt; line-height:115%; display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img5.png" width="263" height="80" style="-aw-left-pos:137pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:3.75pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="font-size:12pt; line-height:115%; margin:0pt 0pt 10pt">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:9pt">&#xa0;</span></p>
      <p style="line-height:10pt; margin:0pt 0pt 10pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt;text-align:center">
        <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:41.98pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:'Bookman Old Style'; font-size:10pt; font-weight:bold">&#xa0;</span></p>
      <img src="9479c74d-987e-49a4-9c19-27188981c608.078.png" width="726" height="13" alt="" style="-aw-left-pos:-25pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:10.5pt; -aw-wrap-type:none; margin-left:-25.38pt; margin-top:10.12pt; position:absolute; z-index:121" />
      <p style="font-size:9pt; line-height:115%; margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:9pt">&#xa0;</span></p>
      <p style="font-size:12pt; line-height:115%; margin:0pt 0pt 10pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:12pt; line-height:115%; margin:0pt 0pt 10pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:12pt; line-height:115%; margin:0pt 0pt 10pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:12pt; line-height:115%; margin:0pt 0pt 10pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">TO:</span>
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">VAL</span>
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">UE</span>
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">D</span>
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">CUSTOMERS</span></p>
      <p style="font-size:12pt; line-height:115%; margin:0pt 0pt 10pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">FROM:</span>
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">TAILG/NWOW MANAGEMENT</span></p>
      <p style="font-size:12pt; line-height:115%; margin:0pt 0pt 10pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt; font-weight:bold">SUBJECT:  LTO REGISTRATION.</span></p>
      <p style="font-size:14pt; line-height:115%; margin:0pt 0pt 10pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:14pt; font-weight:bold">&#xa0;</span></p>
      <p style="font-size:14pt; line-height:115%; margin:0pt 0pt 10pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:14pt; font-weight:bold">We would like to inform all of our valued customers those below.</span></p>
      <p style="font-size:12pt; line-height:115%; margin:0pt 0pt 10pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <ol type="1" style="margin:0pt; padding-left:0pt">
        <li style="font-family:'Times New Roman'; font-size:12pt; line-height:115%; margin:0pt 0pt 0pt 32pt; padding-left:4pt; text-align:justify; text-indent:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">For all customers who already purchase units</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">. (Before February 25,</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">2017 customers)</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">, o</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">ur company promise that we will be the one who handle 1</span>
          <span style="font-family:'Times New Roman'; font-size:8pt; vertical-align:super">st</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">registration fee once LTO issue memorandum.</span></li>
      </ol>
      <p style="font-size:12pt; line-height:115%; margin:0pt 0pt 0pt 36pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <ol start="2" type="1" style="margin:0pt; padding-left:0pt">
        <li style="font-family:'Times New Roman'; font-size:12pt; line-height:115%; margin:0pt 0pt 0pt 32pt; padding-left:4pt; text-align:justify; text-indent:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">For all new customers who purchase units.</span>
          <span style="font-family:'Times New Roman'; font-size:12pt">(On or after February 26, 2017 customers</span>
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
      <p style="font-size:12pt; line-height:115%; margin:0pt 0pt 10pt 36pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <p style="font-size:14pt; line-height:115%; margin:0pt 0pt 10pt; text-align:justify">
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
      <p style="font-size:12pt; line-height:115%; margin:0pt 0pt 10pt 39pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt">(Signal light, head light, horn, break light, etc.)</span></p>
      <p style="font-size:12pt; line-height:115%; margin:0pt 0pt 10pt">
        <br style="page-break-before:always; clear:both" /></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 0pt 39pt; display: flex;align-items: center;justify-content: center;">
        <img src="/static/fenqi/img5.png" width="263" height="72" style="-aw-left-pos:136pt; -aw-rel-hpos:margin; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:through; float:left; margin:0pt 9pt" /></p>
      <p style="font-size:12pt; line-height:115%; margin:0pt 0pt 10pt 39pt; text-align:justify">
        <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span></p>
      <p style="line-height:10pt; margin:0pt 0pt 10pt; text-align:justify">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt"> ADDRESS____________${repositorydata.address}________________</span></p>
      <p style="margin:0pt;text-align: center;">
        <span style="font-family:Calibri; font-size:8pt"></span>
     <span style="font-family:Calibri; font-size:8pt">CONTACT NO.____________${repositorydata.phone}__________________</span>
        <span style="width:16.63pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:360.95pt"></span>
      </p>
      <p style="margin:0pt; text-align:center">
        <span style="font-family:Calibri; font-size:8pt">MONDAY-SUNDAY 8:30am – 5:30pm</span></p>
      <p style="font-size:12pt; line-height:115%; margin:0pt 0pt 10pt; text-align:center">
        <img src="9479c74d-987e-49a4-9c19-27188981c608.080.png" width="625" height="12" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:character; -aw-rel-vpos:line; -aw-top-pos:0pt; -aw-wrap-type:inline" /></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 9.8pt">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">Date: February 25, 2017 </span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 10.65pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">TO:ALL</span>
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">E-BIKE USERS</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt 0pt 14.25pt; padding-left:0.5pt; text-indent:-0.5pt">
        <span style="font-family:Calibri; font-size:11pt; font-weight:bold">FROM: TAILG/NWOW </span></p>
      <h1 style="margin:0pt; page-break-after:avoid; text-align:center">
        <span style="font-family:'Times New Roman'; font-size:11pt; font-weight:bold">SUBJECT: </span>
        <span style="font-family:'Times New Roman'; font-size:10pt; font-weight:bold">E-BIKE BATTERY CONCERNS</span></h1>
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
        <span style="font-family:Calibri; font-size:11pt">Clean the surface of the battery, put back the safety valve and glue the cover</span></p>
      <p style="font-size:11pt; line-height:110%; margin:0pt 0pt 0pt 26.95pt">
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
        <span style="font-family:Calibri; font-size:11pt">Signature</span>
        <span style="font-family:Calibri; font-size:11pt">over</span>
        <span style="font-family:Calibri; font-size:11pt">Printed Name</span></p>
      <p style="margin:0pt 0pt 0pt 334pt; text-align:center">
        <span style="font-family:Calibri; font-size:10pt">(Customer)</span></p>
      <p style="margin:0pt 0pt 0pt 334pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="margin:0pt 0pt 0pt 334pt; text-align:center">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:115%; margin:2.45pt 0pt 0pt 26.95pt; text-align:center">
        <span style="font-family:Cambria; font-size:9pt; font-style:italic">&#xa0;</span></p>
      <p style="font-size:9pt; line-height:115%; margin:0pt 0pt 1pt 26.95pt; text-align:center">
        <img src="9479c74d-987e-49a4-9c19-27188981c608.081.png" width="655" height="2" alt="" style="-aw-left-pos:74.05pt; -aw-rel-hpos:page; -aw-rel-vpos:page; -aw-top-pos:739.1pt; -aw-wrap-type:topbottom" />
        <span style="font-family:Cambria; font-size:9pt; font-style:italic">www.nwow.com.ph</span></p>
      <p style="font-size:11pt; line-height:115%; margin:0pt">
        <span style="font-family:Calibri; font-size:11pt">&#xa0;</span></p>
    </div>
`
const datazzz = {
  needdata,
  content
}

export default datazzz
