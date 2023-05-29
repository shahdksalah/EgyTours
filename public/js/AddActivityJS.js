$('.date').datepicker({
  multidate: true,
	format: 'dd-mm-yyyy'
});

function reset()
{
      document.getElementById("ActName").value=null;
      document.getElementById("ActHeader").value=null;
     document.getElementById("ActType").value=null;
     document.getElementById("adv").value=null;
     document.getElementById("Actbrief").value=null;
     document.getElementById("Actdetails").value=null;
     document.getElementById("ActPlan").value=null;
     document.getElementById("ActCancel").value=null;
     document.getElementById("ActTime").value=null;
     document.getElementById("ActPickup").value=null;
     document.getElementById("ActPart").value=null;
     document.getElementById("starttime").value=null;
     document.getElementById("endtime").value=null;
     document.getElementById("price").value=null;
     document.getElementById("form-control date").value=null;
}