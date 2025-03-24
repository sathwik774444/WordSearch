const word = document.getElementById('word');
const mess = document.getElementById('display');
const form = document.getElementById('formtype');

form.addEventListener("submit" , async(e)=>{
    check(e);
});

async function checksend(e)
{
    findtheelement(e);
}
async function send(e){
    try{
        e.preventDefault();
            const tempword = word.value;
            const tempmess = mess.value;
            const response = await fetch("http://localhost:3000/send" , {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({ word : tempword , message : tempmess}),
            });
        // alert("Data sucessfully updated");
           if(response.ok){
              alert("Data saved successfully");
              word.value = "";
              mess.value = "";
           }
    }
    catch(error){
        alert('frontend is having problem');
    }
}

async function findtheelement(e){
    try {
      e.preventDefault();
      const tempword = word.value; // Get input value
      const response = await fetch(`http://localhost:3000/get/${tempword}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
          alert("Data already exists");
      } else {
        send(e);
      }
    } catch (error) {
      alert("Frontend is having a problem.");
    }
  }


async function find(e){
    try {
      e.preventDefault();
      const tempword = word.value; // Get input value
      const response = await fetch(`http://localhost:3000/get/${tempword}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
          const data = await response.json(); // Parse the JSON response
          mess.value = data;
      } else {
        mess.value = "";
        alert("word not found enter the description about it");
      }
    } catch (error) {
      alert("Frontend is having a problem.");
    }
  }
  
async function check(e){
    var tempword = word.value;
    if(tempword.length==0)
    {
        alert("Please Enter a word");
    }
    else{
        if(mess.value === "")
        {
            find(e);
        }
        else{
            checksend(e);
        }
    }
}
