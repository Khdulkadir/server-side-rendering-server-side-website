/*** Express setup & start ***/

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from "./helpers/fetch-json.js";

// Importeer het npm pakket express uit de node_modules map
import express, { response } from "express";

// Maak een nieuwe express app aan
const app = express();

// Stel ejs in als template engine
app.set("view engine", "ejs");

// Stel de map met ejs templates in
app.set("views", "./views");

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static("public"));

// Zorgt dat werken met request data makkelijker wordt
app.use(express.urlencoded({ extended: true }));

// Stel het poortnummer in waar express op moet gaan luisteren
app.set("port", process.env.PORT || 8000);

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});

/*** Routes & data ***/

const categoryRoutes = [
  { name: "binnenland", id: 9 },
  { name: "buitenland", id: 1010 },
  { name: "columns", id: 10 },
  { name: "economie", id: 6 },
  { name: "kunst-en-media", id: 4 },
  { name: "podcast", id: 3211 },
  { name: "politiek", id: 63 },
  { name: "wetenschap", id: 94 },
];

const baseURL = "https://redpers.nl/wp-json/wp/v2/posts?categories=";
const perPage = "&per_page=3";
const apiURLs = categoryRoutes.map((route) => baseURL + route.id + perPage);

const apiURLPosts = "https://redpers.nl/wp-json/wp/v2/posts?per_page=4";
const apiURLBinnenland = apiURLs[0];
const apiURLBuitenland = apiURLs[1];
const apiURLColumns = apiURLs[2];
const apiURLEconomie = apiURLs[3];
const apiURLKunstMedia = apiURLs[4];
const apiURLPodcast = apiURLs[5];
const apiURLPolitiek = apiURLs[6];
const apiURLWetenschap = apiURLs[7];

app.get("/", function (request, response) {
  Promise.all([
    fetchJson(apiURLPosts),
    fetchJson(apiURLBinnenland),
    fetchJson(apiURLBuitenland),
    fetchJson(apiURLColumns),
    fetchJson(apiURLEconomie),
    fetchJson(apiURLKunstMedia),
    fetchJson(apiURLPodcast),
    fetchJson(apiURLPolitiek),
    fetchJson(apiURLWetenschap),
  ]).then(
    ([
      postsData,
      binnenlandData,
      buitenlandData,
      columnsData,
      economieData,
      kunstmediaData,
      podcastData,
      politiekData,
      wetenschapData,
    ]) => {
      response.render("index", {
        posts: postsData,
        binnenland: binnenlandData,
        buitenland: buitenlandData,
        columns: columnsData,
        economie: economieData,
        kunstmedia: kunstmediaData,
        podcast: podcastData,
        politiek: politiekData,
        wetenschap: wetenschapData,
        categoryRoutes: categoryRoutes,
      });
    }
  );
});

categoryRoutes.forEach((categoryOptions) => {
  app.get(`/${categoryOptions.name}`, function (request, response) {
    fetchJson(baseURL + categoryOptions.id).then((categoryData) => {
      response.render("category", {
        category: categoryData,
        categoryRoutes: categoryRoutes,
      });
    });
  });
});

categoryRoutes.forEach((categoryOption) => {
  app.get(`/${categoryOption.name}/:id`, function (request, response) {
    fetchJson(
      `https://redpers.nl/wp-json/wp/v2/posts/${request.params.id}`
    ).then((categoryData) => {
      response.render("category-article", {
        category: categoryData,
      });
    });
  });
});
