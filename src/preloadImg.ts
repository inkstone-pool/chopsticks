export default async function preLoadImg(urls: string[]) {
  return Promise.allSettled(
    urls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = url
        img.onload = () => {
          resolve(img)
        }
        img.onerror = () => {
          reject(img)
        }
      })
    })
  )
}
