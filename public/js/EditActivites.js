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

        