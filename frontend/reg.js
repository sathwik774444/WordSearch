function check()
{
    var eml=f1.email.value;
    let arr1=eml.split("");
    if(eml.length<=7)
    {
        alert("please enter the email of atleast 8 characters");
        f1.email.focus();
        return false;
    }
    else if(eml.length>=8)
    {
        let s=0;
        for(let i=0;i<arr1.length;i++)
        {
            if(arr1[i]=='@')
                {
                    s=1;
                }
        }
        if(s==0)
        {
            alert("Enter the valid email\"@\"");
        }  
        else
        {
            var pwd=f1.password.value;
            let arr=pwd.split("");
            if(pwd.length<=7)
            {
                alert("Please enter the password contain atleast 8 characters");
                document.getElementById('resolve').innerHTML="";
                f1.password.focus();
                return false;
            }
            else if(pwd.length>=8)
            {
                let count=0;
                let u=0;
                let l=0;
                for(let i=0;i<arr.length;i++)
                {
                    let val=Number.parseInt(arr[i]);
                    if(Number.isInteger(val))
                    {
                        count++;
                    }
                    else
                    {
                            if(arr[i] === arr[i].toUpperCase())
                            {
                                u++;
                            }
                            else if(arr[i] === arr[i].toLowerCase())
                            {
                                l++;
                            }
                    }
                }
                if(l>=1 && u>=1 && count>=1)
                {
                    document.getElementById('message').innerHTML="Strong password";
                    document.getElementById('button').innerHTML="<a>Done</a>";
                }
                else
                {
                    if(l==0)
                    {
                        document.getElementById('resolve').innerHTML="Lower case letter is missing in password";
                    }
                    else if(u==0)
                    {
                        document.getElementById('resolve').innerHTML="Upper case letter is missing in password";
                    }
                    document.getElementById('message').innerHTML="Weak password";
                }
        
            }
        }
    }
    
}
function showpassword()
{
    let pwd=f1.password.value;
    if(pwd.length==0)
    {
        document.getElementById('pass').innerHTML="Please enter the password";
    }
    else
    {
        document.getElementById('pass').innerHTML=pwd;
    }
}
function hidepassword()
{
    let pwd=f1.password.value;
    if(pwd.length>=8)
    {
        document.getElementById('pass').innerHTML="";   
    }
}