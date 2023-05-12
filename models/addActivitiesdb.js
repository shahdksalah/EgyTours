const Schema = mongoose.Schema;
app.use(express.urlencoded({extended:true}));

const ActivitySchema = new Schema ({
    Name:{
        type:String,
        trim:true,
        required:true,
    },
    Type:{
        type:String,
        required:true,
        trim:true
    },
    Picture:{
        data:Buffer,
        contentType:String
    },
    BriefDes:{
        type:String,
        required:true,
        trim:true
    },
    DetailedDes:{
        type:String,
        required:true,
        trim:true
    },
    Plan:{
        type:String,
        required:true,
        trim:true
    },
    CancelDet:{
        type:String,
        required:true,
        trim:true
    },
    Duration:{
        type:String,
        required:true,
        trim:true
    },
    PickupDet:
    {
        type:String,
        required:true,
        trim:true
    },
    AvailableDate:
    {
        type:String,
        required:true,
        trim:true
    }

},{timestamp:true});

const Activity= mongoose.model('Activity',ActivitySchema);
module.exports=Activity;