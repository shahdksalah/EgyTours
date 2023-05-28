
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

        function replaceInfoImages(id, value, query) {
            document.getElementById(id).setAttribute('src', value);
          }

          
        function showInput(id, imgid) {
            var inp = document.getElementById(id);
            inp.hidden = false;
            inp.addEventListener('change', (event) => {
              var imgsrc = URL.createObjectURL(event.target.files[0]);
              replaceInfoImages(imgid, imgsrc);
              var img = document.getElementById(imgid);
              img.style.border = 'solid 4px red';
              inp.hidden = true;
            })
          }

