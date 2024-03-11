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

/*** Constants ***/

const baseURL = "https://redpers.nl/wp-json/wp/v2/posts?categories=";
const perPage = "&per_page=3";

const apiURLVoorpagina = "https://redpers.nl/wp-json/wp/v2/posts?per_page=4";
const apiURLBinnenland = baseURL + 9 + perPage;
const apiURLBuitenland = baseURL + 1010 + perPage;
const apiURLColumns = baseURL + 10 + perPage;
const apiURLEconomie = baseURL + 6 + perPage;
const apiURLKunstMedia = baseURL + 4 + perPage;
const apiURLPodcast = baseURL + 3211 + perPage;
const apiURLPolitiek = baseURL + 63 + perPage;
const apiURLWetenschap = baseURL + 94 + perPage;

/*** Routes & data ***/

app.get("/", function (request, response) {
  Promise.all([
    fetchJson(apiURLVoorpagina),
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
      voorpaginaData,
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
        voorpagina: voorpaginaData,
        binnenland: binnenlandData,
        buitenland: buitenlandData,
        columns: columnsData,
        economie: economieData,
        kunstmedia: kunstmediaData,
        podcast: podcastData,
        politiek: politiekData,
        wetenschap: wetenschapData,
      });
    }
  );
});

app.get("/:categories", function (request, response) {
  fetchJson(
    `https://redpers.nl/wp-json/wp/v2/posts?categories=${request.params.categories}`
  ).then((categoryData) => {
    response.render("category", {
      category: categoryData,
    });
  });
});

app.get("/:categories/:id", function (request, response) {
  fetchJson(`https://redpers.nl/wp-json/wp/v2/posts/${request.params.id}`).then(
    (articleData) => {
      response.render("article", {
        article: articleData,
      });
    }
  );
});
