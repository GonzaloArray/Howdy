export const fetchCountryName = async () => {
  const url = 'https://restcountries.com/v3.1/all?fields=name'

  const res = await fetch(url)
  const data = await res.json()
  const restCountry = data?.map(e => {
    return {
      value: e?.name?.common?.toLowerCase(),
      title: e?.name?.common
    }
  })

  return restCountry
}
