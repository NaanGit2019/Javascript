function validatedata()
{
var formdata={};
formdata["taskdetail"]=document.getElementById("Task").value;
formdata["taskdate"]=document.getElementById("taskdate").value;
formdata["taskstatus"]=document.getElementById("taskstatus").value;

if(!formdata["taskdate"]||!formdata["taskdate"]||!formdata["taskstatus"])
{alert("All fieilds are mandatory")
    console.log(formdata);}
    else{
    console.log(formdata)
    insertnewrecord(formdata);

resetform()}
}


function insertnewrecord(data)
{
    var table=document.getElementById("tasklist").getElementsByTagName('tbody')[0];
    var newrow=table.insertRow(table.length);
    var values = Object.values(data); // Get an array of the values
    console.log(values.length);
    for(i=0;i<=values.length-1;i++)
        {
            console.log(i)
           var cell= cell+i;
           cell=newrow.insertCell(i);
           cell.innerHTML=values[i];
           if(i>1)
            {
                cell=newrow.insertCell(i+1);
                cell.innerHTML='<a onclick="edittask(this)" class="action">EDIT</a> <a onclick="Deletetask(this)" class="action">Delete</a>';
            }
        }
        
}   
function resetform()
{
    var inputs = document.querySelectorAll("#taskeditor input");
// Loop through each input element and set its value to an empty string
inputs.forEach(function(input) {
    input.value = "";
});
    // var newrow=table.insertRow(table.length);
    
}

//Edit listed data 
function edittask(td)
{
selectedrow=td.parentElement.parentElement
console.log(selectedrow);
document.getElementById("Task").value=selectedrow.cells[0].innerHTML;
document.getElementById("taskdate").value=selectedrow.cells[1].innerHTML
document.getElementById("taskstatus").value=selectedrow.cells[2].innerHTML;
}
//Delete the task
function Deletetask(td)
{
if(confirm("Are you sure to delete the task ?"))
    {
        row=td.parentElement.parentElement
        //document.getElementById("tasklist").deleterow(row.rowindex);
        document.getElementById("tasklist").deleteRow(row.rowIndex);

    }
}


//Load the Data into excel 
let workbook,worksheet;


  //let workbook, worksheet;

  document.getElementById('upload-excel').addEventListener('change', handleFile, false);

  function handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
      const data = new Uint8Array(e.target.result);
      workbook = XLSX.read(data, {type: 'array'});
      worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});

      displayTable(jsonData);
    };

    reader.readAsArrayBuffer(file);
  }

  function displayTable(data) {
    const tbody = document.querySelector('#data-table tbody');
    tbody.innerHTML = '';

    data.forEach((row, rowIndex) => {
      if (rowIndex === 0) return; // Skip header row
      const tr = document.createElement('tr');

      row.forEach((cell, cellIndex) => {
        const td = document.createElement('td');
        td.contentEditable = true;
        td.innerText = cell;
        tr.appendChild(td);
      });

      const actionTd = document.createElement('td');
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Delete';
      deleteBtn.onclick = () => deleteRow(rowIndex);
      actionTd.appendChild(deleteBtn);
      tr.appendChild(actionTd);

      tbody.appendChild(tr);
    });

    const tr = document.createElement('tr');
    for (let i = 0; i < 3; i++) {
      const td = document.createElement('td');
      td.contentEditable = true;
      tr.appendChild(td);
    }
    const actionTd = document.createElement('td');
    const addBtn = document.createElement('button');
    addBtn.innerText = 'Add';
    addBtn.onclick = () => addRow(tr);
    actionTd.appendChild(addBtn);
    tr.appendChild(actionTd);
    tbody.appendChild(tr);
  }

  function deleteRow(rowIndex) {
    const table = document.getElementById('data-table');
    table.deleteRow(rowIndex);
  }

  function addRow(tr) {
    const newRow = document.createElement('tr');
    for (let i = 0; i < 3; i++) {
      const td = document.createElement('td');
      td.contentEditable = true;
      td.innerText = tr.children[i].innerText;
      newRow.appendChild(td);
    }
    const actionTd = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.onclick = () => deleteRow(newRow.rowIndex);
    actionTd.appendChild(deleteBtn);
    newRow.appendChild(actionTd);

    const tbody = document.querySelector('#data-table tbody');
    tbody.insertBefore(newRow, tr);

    for (let i = 0; i < 3; i++) {
      tr.children[i].innerText = '';
    }
  }

  document.getElementById('export-btn').addEventListener('click', () => {
    const table = document.getElementById('data-table');
    const newWorkbook = XLSX.utils.table_to_book(table);
    const wbout = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'binary' });

    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }

    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });