$(() => {
  fetch('/api/myDocs')
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    for(let i of data) {
      $('.docQueue').append(
        `<div class="col-12"><a href="/view-report.html?Document_ID=${i.Document_ID}">${i.Document_Title}</a></div>`
      )
    }
  })
})