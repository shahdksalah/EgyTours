
        function updateDate(showdate,confirmdate)
        {
            document.getElementById(showdate).style.display="block";
            document.getElementById(confirmdate).style.display="block";

        }
        function confirmDate(currid,dateid,showdate)
        {
            document.getElementById(dateid).value =document.getElementById(showdate).value;
            document.getElementById(currid).style.display="none";
            document.getElementById(showdate).style.display="none";

        }
        function deleteDate(dateid)
        {
            document.getElementById(dateid).style.display="none";
        }

        function replaceInfoImages(id, value,inp) {
          document.getElementById(id).setAttribute('src', value);
          let del = "\\";
          var finalid = inp.split(del).slice(2);
          console.log(finalid);
          document.getElementById(id).setAttribute('alt', finalid);
        }
        
        function showInput(id, imgid) {
          var inp = document.getElementById(id);
          inp.hidden = false;
          inp.addEventListener('change', (event) => {
            var imgsrc = URL.createObjectURL(event.target.files[0]);
            replaceInfoImages(imgid, imgsrc,inp.value);
            var img = document.getElementById(imgid);
            img.style.border = 'solid 4px red';
            inp.hidden = true;
          })
        }


        function editdates()
          {
             var count=0;
             var arr=[];
             var date=document.querySelectorAll(`[id^="dateinput"]`);
             var adddates=document.getElementById("form-control date");
             var alldates=document.getElementById("alldates");

             console.log(adddates.value);
             console.log(adddates.value.length);
              

  for(var j=0;j<adddates.value.length;j++)
  {
    if(adddates.value[j]===","){
      count++;
    }
  }

  for(var k =0;k<= count;k++)
  {
    arr.push(adddates.value.split(',')[k]);
  }


           
            console.log(date);
            
          
            for (var i = 0; i < date.length; i++) {
              alldates.value += `${date[i].value},`;
            }

            for (var z = 0; z < arr.length; z++) {
              alldates.value += `${arr[z]},`;
            }

            console.log(alldates.value);
      
          
           
          
            
          }
        
      