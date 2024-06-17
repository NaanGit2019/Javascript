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
                cell.innerHTML='<a onclick="edittask(this)">EDIT</a> <a onclick="Deletetask(this)">Delete</a>';
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