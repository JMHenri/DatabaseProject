$(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const docID = urlParams.get('Document_ID')

  fetch('/api/myDocs')
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    for(let i of data) {
      if(i.Document_ID === docID){
        $('.viewReport').append(
          `<p>${i.Text}</p>`
        )
      }
    }
  })

  $('#ignoreDoc').click(function (e) {
    e.preventDefault();
    fetch(`/api/ignoreDoc?Document_ID=${docID}`)
    .then(() => {

    });
  });
  $('#escalateDoc').click(function (e) {
    e.preventDefault();
    fetch(`/api/escalateDoc?Document_ID=${docID}`)
    .then(() => {
      
    });

  });
})