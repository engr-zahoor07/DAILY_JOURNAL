//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "On a bright, sunny day, I sat in the park beneath the tall trees, enjoying the soft breeze and the sound of a distant guitar. The world around me was alive with movement—children playing with a beach ball, a group of friends dancing on the grass, and a couple walking their dog along the path. Nearby, I could see a small boat drifting on the river, while an airplane flew high above the mountains in the distance. The smell of fresh bread and coffee from a nearby café made me hungry, so I grabbed my laptop and headed towards the street to grab a quick sandwich. It was one of those perfect moments when everything seemed to be in harmony with nature and life itself.";
const aboutContent = "I woke up to the sound of rain tapping against my window. The air was cool and fresh, and the clouds hung low over the city like a soft blanket. I made my way to the kitchen to brew a cup of coffee, but I couldn't help but think about the amazing vacation I had planned for the summer. I imagined myself relaxing on a hammock by the beach, watching the waves crash against the shore, while enjoying a slice of chocolate cake and a cool drink. My laptop was on the table, so I quickly checked my email and saw that my flight tickets for the trip had been confirmed. Excited, I grabbed my umbrella and headed out the door to the bus stop, eager to begin the next chapter of my adventure.";
const contactContent = "The small forest was the perfect escape from the hustle and bustle of the city. Walking down a quiet trail, I passed by giant trees with thick trunks, their leaves creating a natural canopy that shielded me from the sun. Every now and then, I would spot a squirrel darting across the path, or a colorful bird flying overhead. There was something magical about the woods, a sense of peace that couldn’t be found in the busy streets. As I reached a clearing, I took out my camera to capture the beauty of the moment—the soft sunlight filtering through the branches, the distant sound of a waterfall, and the scent of pine filling the air. It felt like I had found my own little corner of the world, where time didn’t matter and everything was just as it should be.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", (req, res) => {
  res.render("home", { Content: homeStartingContent, post: posts });
});

app.get("/contact", (req, res) => {
  res.render("contact", { Content: contactContent });
});

app.get("/about", (req, res) => {
  res.render("about", { Content: aboutContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    postTitle: req.body.postTitle,
    postBody: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/:strig", (req, res) => {
  let requestedTitle = _.lowerCase(req.params.strig);
  posts.forEach((post) => {
    let storedTitle = _.lowerCase(post.postTitle);
    if (storedTitle === requestedTitle) {
      res.render("post", { heading: post.postTitle, bodyPost: post.postBody });
    }
  })
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
