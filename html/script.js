const myModal = new mdb.Modal(document.getElementById('exampleModal'), {
    backdrop: true
});

getData();

document.querySelector('.bAdd').onclick = function(){
    document.querySelector('.frm').reset(); 
    myModal.show();
}

//ADD
document.querySelector('.bCreate').onclick = function(){
    let title = document.getElementById('title').value; 
    let description = document.getElementById('content').value;
    let published = document.getElementById('published').checked;
    let check = 0;
    if(published){
        check = 1;
    }

    fetch('https://api-crud-yrvv.onrender.com/api/tutorials',{
            method:"POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(
                {
                    title: title,
                    description: description,
                    published: check
                }
            )
        })
      .then(res=>res.json())
      .then(json=>{
        console.log(json);
        getData();
      })

    myModal.hide();
}

//Delete
function deleteItem(tr){
    console.log(tr.parentElement.parentElement.cells[0].innerText);

    let id = tr.parentElement.parentElement.cells[0].innerText;

    fetch('https://api-crud-yrvv.onrender.com/api/tutorials/' + id, {
        method:"DELETE",
        headers: {
            'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    "Content-type": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
    
        }
    })
    .then(res=>res.json())
    .then(json=>{
        getData();
        console.log(json)
    })
    .catch(error => console.log('error', error));
}

function getData(){
    fetch('https://api-crud-yrvv.onrender.com/api/tutorials')
    .then(res => res.json())
    .then(json => {
        let tr = '';

        let published = '';


        json.forEach(element => {
            if (element.published == 1) {
                published = '<span class="badge badge-warning rounded-pill d-inline">Awaiting</span>';
            } else {
                published = '<span class="badge badge-success rounded-pill d-inline">Publish</span>';
            }

            console.log(element.published)
            tr += `
                <tr>
                    <td>${element.id}</td>
                    <td>
                        <p class="fw-bold mb-1">${element.title}</p>
                    </td>
                    <td>
                        <p class="fw-normal mb-1">${element.description}</p>
                    </td>
                    <td>
                        ${published}
                    </td>
                    <td>
                        <button type="button" class="btn btn-warning btn-rounded btn-sm fw-bold" data-mdb-ripple-color="dark">
                            Edit
                        </button>
                        <button onclick="deleteItem(this)" type="button" class="btn btn-danger btn-rounded btn-sm fw-bold" data-mdb-ripple-color="dark">
                            Delete
                        </button>
                    </td>
                </tr>
                                `;
            });

        document.querySelector('tbody').innerHTML = tr;
    })
}