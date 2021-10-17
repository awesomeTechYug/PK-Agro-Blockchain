//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Welcome! Lets explore the creative use of blockchain in Agriculture";
const aboutContent = " An easy-to-use mobile interface and dedicated web app connects growers, brokers, buyers and logistics providers in one place. Pk Agro Blockchain transforms the way you do business through grain storage management software like - automating grain contracts, receival dockets, customer orders, and freight movements. PK Agro Blockchain captures the entire multi-crop value chain in one digital platform.";
const contactContent = "We would love to hear from you! Please get in touch, provide feedback or request to receive more information about our product.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts =[];

app.get("/", function(req, res){
  res.render("home", {startingContent:homeStartingContent, posts:posts });
});

app.get("/about", function(req, res){
  res.render("about", {about_content:aboutContent});
});

 app.get("/contact", function(req,res){
   res.render("contact",{contact_content:contactContent});
 });

// users page = customers, broker, producers and logestics

app.get("/customer", function(req, res){
  res.render("userspage/customer")
})
app.get("/broker", function(req, res){
  res.render("userspage/broker")
})
app.get("/producer", function(req, res){
  res.render("./userspage/producer")
})
app.get("/logestics", function(req, res){
  res.render("./userspage/logestics")
})

// Customer pages

app.get("/customer/:productName", function(req, res){
  const urlgot= req.params.productName;
  if(urlgot === "herbs"){
    res.render("./userspage/customer/customer-herbs");
  }else if(urlgot === "cosmetics"){
    res.render("./userspage/customer/customer-cosmetic")
  }else{
    res.render("./userspage/urlerror-message", {urlpassed: urlgot}); }
});

// Broker Pages
app.get("/broker/bid", function(req, res){
  res.render("./userspage/customer/brokerbids")
});


app.get("/logistics/agreement", function(req, res){
  res.render("./userspage/customer/smartagreement")
});

// PRoducer Pages
app.get("/producer/:urlName", function(req, res){
  const urlgot= req.params.urlName;
  if(urlgot === "fundraising" ){
    res.render("./userspage/producer/fundraising")
  }else if(urlgot === "sellharvest"){
    res.render("./userspage/producer/sellharvest")
  }  else{
    res.render("./userspage/urlerror-message", {urlpassed: urlgot}); }
});


// just practise. note used routes

 app.get("/compose", function(req,res){
   res.render("compose");
 });

app.post("/compose", function(req, res){
  const post={
    title: req.body.postTitle,
    content : req.body.postBody,
  };
  posts.push(post);

  res.redirect("/")
});


app.get("/posts/:postName", function(req, res){
  const requestedTitle = req.params.postName;
  posts.forEach(function(post){
    if(post.title === requestedTitle){
    res.render("post", {
      title: post.title,
      content: post.content
    });
    }
});

});




let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}



app.listen(port, function() {
  console.log("Server started ");
});
