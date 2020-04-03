$(() => {
  $('#citizenSearch').click((e) => {
    const name = $('#citizenSearchBox').val();
    e.preventDefault();
    fetch(`/api/citizensByName?name=${name}`)
    .then((res) => {
      return res.json();
    })
    .then((res)=>{
      for(let i of res){
        const append = $(`<div data-id="${i.Citizen_ID}" class="col-12">Name: ${i.First_Name} ${i.Last_Name}</div>`)
        $('.citizenList').append(append)
        append.click(function (e) {
          fetch(`/api/getCitizen?Citizen_ID=${$(this).data('id')}`)
          .then((data) => {
            return data.json()
          })
          .then((data) => {
            $('.citizensInvolved').append(
              `<div class="col-12" data-id="${data[0].Citizen_ID}">Name: ${data[0].First_Name} ${data[0].Last_Name}. ID: (${data[0].Citizen_ID})</div>`
            )
          })
        })
      }
    })
  })
})