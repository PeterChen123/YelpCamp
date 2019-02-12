var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "GIF",
//         image: "https://i.pinimg.com/originals/cc/6e/dd/cc6edd8dd1998a1924aa9948bcf4a08a.gif"
        
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         }
//         else {
//             console.log("Newly Created Campground");
//             console.log(campground);
//         }
//     });



// var campgrounds = [
//     {name: "Chen", image: "https://i.pinimg.com/564x/03/0f/61/030f61c7d6f3edc33026974aae4d3f60.jpg"},
//     {name: "GIF", image: "https://i.pinimg.com/originals/cc/6e/dd/cc6edd8dd1998a1924aa9948bcf4a08a.gif"}
// ];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds", {campgrounds:allCampgrounds});
        }
    });
    
    //res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    });
    
    //campgrounds.push(newCampground);
    // redirect back to campgrounds page
    //res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Start the YelpCamp Server");
});