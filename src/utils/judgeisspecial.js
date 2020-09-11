import { getEachMoney } from '@/api/Package'

export async function isSpecial({count = 122, typeId = 5, first = 300000} = {}) {
  const parms = {
    count,
    typeId,
    first
  }
 const result = await getEachMoney(parms)
//  console.log(result)
 return result
}