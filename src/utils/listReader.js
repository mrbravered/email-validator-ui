export default (file) => new Promise((resolve, reject) => {
  let reader = new FileReader()
  reader.onload = (e) => {
    console.log(e.target.result)
    resolve(e.target.result)
  }
  reader.onerror = (e) => reject()
  reader.readAsText(file)
})
