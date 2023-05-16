function Update(index)
        {
         document.getElementById("updateInfo").style.display="block";
        }
        function Delete(index)
        {
         document.getElementById("c").style.display="block";
        }
        function reset()
        {
         document.getElementById("ActName").value=null;
     document.getElementById("ActType").value=null;
     document.getElementById("Actbrief").value=null;
     document.getElementById("Actdetails").value=null;
     document.getElementById("ActPlan").value=null;
     document.getElementById("ActCancel").value=null;
     document.getElementById("ActTime").value=null;
     document.getElementById("ActPickup").value=null;
     document.getElementById("date").value=null;
        }
        function del()
        {
            document.getElementById("msg").style.display="block";
        }
        function cancel()
        {
            document.getElementById("c").style.display="none";
        }

/*
            function submit()
            {
                const files= document.getElementById("file");
                const formData=new FormData();
                var pic=new FormData();
                for (let i = 0; i < files.files.length; i++) {
                    formData.append('file',files.files[i]);
                  }
                  console.log(formData);
                var name=document.querySelector('#ActName').value;
                var type=document.querySelector('#ActType').value;
                var pic=document.querySelector('#file').value;
                var brief=document.querySelector('#Actbrief').value;
                var details=document.querySelector('#Actdetails').value;
                var plan=document.querySelector('#ActPlan').value;
                var cancel=document.querySelector('#ActCancel').value;
                var time=document.querySelector('#ActTime').value;
                var pickup=document.querySelector('#ActPickup').value;
                var date=document.querySelector('#date').value;
        console.log(pic);
        var obj={
            Aname:name,
            Atype:type,
            Apics:pic,
            Abrief:brief,
            Adetails:details,
            Aplan:plan,
            Acancel:cancel,
            Atime:time,
            Apickup:pickup,
            Adate:date
        };
        formData.append("object",obj);
        fetch('http://localhost:8080/AddActivity/submit',{
            method:"POST",
            body:formData,
            headers:{
               "Content-type":"application/json"
            },
    
             //body:JSON.stringify(obj),
        });
        console.log(name);
            }
   */         