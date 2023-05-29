
const updateHotel = async (req,res)=>{
    var types=[];
    
    var reqtypes = req.body.finaltypes.split(',');
    var reqprices = req.body.finalprices.split(',');
    for(var i=0; i<reqtypes.length-1;i++){
        types[i] ={
            Name: reqtypes[i],
            Price: reqprices[i],
        }
    }

    var caption = req.body.about.substring(0, 50) + "...";

    // var paths = req.files.imgpaths;;
    // for (var i = 0; i < numOfImgs; i++) {
    //     extension = imgFile[i].name.split('.')[1];
    //     uploadPath = __dirname + '/../public/images/Hotels/' + req.body.name + (i + 1) + '.' + extension;
    //     imgFile[i].mv(uploadPath);
    //     paths[i] = req.body.name + (i + 1) + '.' + extension;
    // }

    await Hotel.findByIdAndUpdate(req.body.id,{
        Name:req.body.name,
        Location:req.body.location,
        Caption: caption,
        About:req.body.about,
        PropAmens:req.body.finalamens,
        RoomFeatures:req.body.finalfeats,
        RoomTypes:types,
    })
}