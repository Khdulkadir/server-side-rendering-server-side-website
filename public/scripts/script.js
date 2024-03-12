// Get the current date
const headerdatecurrentDate = new Date();

// Define the days of the week in Dutch
const headerdatedaysOfWeek = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];

// Define the months in Dutch
const headerdatemonths = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];

// Get the day of the week, month, and year
const headerdatedayOfWeek = headerdatedaysOfWeek[headerdatecurrentDate.getDay()];
const headerdatemonth = headerdatemonths[headerdatecurrentDate.getMonth()];
const headerdatedayOfMonth = headerdatecurrentDate.getDate();
const headerdateyear = headerdatecurrentDate.getFullYear();

// Construct the date string
const headerdatedateString = `${headerdatedayOfWeek} ${headerdatedayOfMonth} ${headerdatemonth}, ${headerdateyear}`;

// Find the paragraph element with the class "header-date" and set its text content to the constructed date string
const headerdatedateParagraph = document.querySelector('.header-date');
headerdatedateParagraph.textContent = headerdatedateString;

        

 // Get the paragraph element with the class "date"
        const articledateParagraph = document.querySelector('.article-date');

        // Get the date string from the paragraph's text content
        const articledateString = articledateParagraph.textContent;

        // Parse the date string
        const articledate = new Date(articledateString);

        // Define the months in Dutch (shortened version)
        const articledatemonths = ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];

        // Extract the month and day from the parsed date
        const articledatemonth = articledatemonths[articledate.getMonth()];
        const articledatedayOfMonth = articledate.getDate();

        // Construct the shortened date string
        const shortenedDateString = `${articledatedayOfMonth} ${articledatemonth}`;

        // Set the text content of the paragraph to the shortened date string
        articledateParagraph.textContent = shortenedDateString;