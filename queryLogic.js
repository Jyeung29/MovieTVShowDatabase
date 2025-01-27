//Name IDs and Attribute Names to have a number assigned to you for easy integration later. Prevents overlapping variable names

const baseUrl = 'http://localhost:5000'; //URL for the app server. Don't change!

//Query Button. Rename the Button in your own implementation with apprpriate number!
const qBtn1 = document.getElementById('queryButton1'); //button to do query
qBtn1.addEventListener('click', queryMovies); //listens for when query button is pressed to perform query
bQry1 = document.getElementById('basicQuery1'); //stores element address
const noResult1 = document.getElementById('noResult1');

//Example Checkboxes
const MV_ID1 = document.getElementById('MV_ID1');
const MVName1 = document.getElementById('MVName1');
const MVReleaseYear1 = document.getElementById('MVReleaseYear1');
const MVSummary1 = document.getElementById('MVSummary1');
const MVAgeRating1 = document.getElementById('MVAgeRating1');
const MVRuntime1 = document.getElementById('MVRuntime1');
const MVGenre1 = document.getElementById('MVGenre1');
const STName1 = document.getElementById('STName1');
const Country1 = document.getElementById('Country1');
const SSName1 = document.getElementById('SSName1');
const HasAds1 = document.getElementById('HasAds1');
const MVViewCount1 = document.getElementById('MVViewCount1');
const MVReviewScore1 = document.getElementById('MVReviewScore1');
const MVAvailability1 = document.getElementById('MVAvailability1');

//Example Condition Checkbox + Text
const MVIDBox1 = document.getElementById('MVIDBox1');
const MVIDNum1 = document.getElementById('MVIDNum1');
const MVNameBox1 = document.getElementById('MVNameBox1');
const MVNameText1 = document.getElementById('MVNameText1');
const MVReleaseYearBox1 = document.getElementById('MVReleaseYearBox1');
const MVReleaseYearMin1 = document.getElementById('MVReleaseYearMin1');
const MVReleaseYearMax1 = document.getElementById('MVReleaseYearMax1');
const MVAgeRatingBox1 = document.getElementById('MVAgeRatingBox1');
const MVAgeRatingMin1 = document.getElementById('MVAgeRatingMin1');
const MVAgeRatingMax1 = document.getElementById('MVAgeRatingMax1');
//Add option.remove and options.add for MVRuntimeMax1
const MVRuntimeBox1 = document.getElementById('MVRuntimeBox1');
const MVRuntimeMin1 = document.getElementById('MVRuntimeMin1');
const MVRuntimeMax1 = document.getElementById('MVRuntimeMax1');
const MVGenreBox1 = document.getElementById('MVGenreBox1');
const MVGenreText1 = document.getElementById('MVGenreText1');
const STNameBox1 = document.getElementById('STNameBox1');
const STNameText1 = document.getElementById('STNameText1');
const CountryBox1 = document.getElementById('CountryBox1');
const CountryText1 = document.getElementById('CountryText1');
const SSNameBox1 = document.getElementById('SSNameBox1');
const SSNameText1 = document.getElementById('SSNameText1');
const HasAdsBox1 = document.getElementById('HasAdsBox1');
const MVViewCountBox1 = document.getElementById('MVViewCountBox1');
const MVViewCountMin1 = document.getElementById('MVViewCountMin1');
const MVViewCountMax1 = document.getElementById('MVViewCountMax1');
const MVReviewScoreBox1 = document.getElementById('MVReviewScoreBox1');
const MVReviewScoreMin1 = document.getElementById('MVReviewScoreMin1');
const MVReviewScoreMax1 = document.getElementById('MVReviewScoreMax1');
const MVAvailabilityBox1 = document.getElementById('MVAvailableBox1');

//Template for a query method. Please change method's name!
async function queryMovies(e) {
    e.preventDefault(); //Must Keep here! Prevents page from reloading when clicking button!
    console.log("Function acccessed");
    //the /query may be changed in your own implementation to be a new name.
    let queryURL = baseUrl + "/queryMovie?"; //base query URL that will be built on top of with parameters (google Node.js URL Parameters)

    //Parameters for Columns to Query For
    queryURL += "MV_ID="+ MV_ID1.checked; //adds the parameter to the URL and its value
    queryURL += "&MVName=" + MVName1.checked; //Remember to include the & before every parameter
    queryURL += "&MVReleaseYear=" + MVReleaseYear1.checked;
    queryURL += "&MVSummary=" + MVSummary1.checked;
    queryURL += "&MVAgeRating=" + MVAgeRating1.checked;
    queryURL += "&MVRuntime=" + MVRuntime1.checked;
    queryURL += "&MVGenre=" + MVGenre1.checked;
    queryURL += "&STName=" + STName1.checked;
    queryURL += "&Country=" + Country1.checked;
    queryURL += "&SSName=" + SSName1.checked;
    queryURL += "&HasAds=" + HasAds1.checked;
    queryURL += "&MVViewCount=" + MVViewCount1.checked;
    queryURL += "&MVReviewScore=" + MVReviewScore1.checked;
    queryURL += "&MVAvailability=" + MVAvailability1.checked;


    //Parameters for Query Conditions
    queryURL += "&MVIDBox=" + MVIDBox1.checked + "&MVIDNum=" + MVIDNum1.value; 
    queryURL += "&MVNameBox=" + MVNameBox1.checked + "&MVNameText=\"" 
    + encodeURIComponent(MVNameText1.value) + "\""; 

    queryURL += "&MVReleaseYearBox=" + MVReleaseYearBox1.checked + "&MVReleaseYearMin=" 
    + MVReleaseYearMin1.value + "&MVReleaseYearMax=" + MVReleaseYearMax1.value;
    
    queryURL += "&MVAgeRatingBox=" + MVAgeRatingBox1.checked + "&MVAgeRatingMin=" 
    + MVAgeRatingMin1.value + "&MVAgeRatingMax=" + MVAgeRatingMax1.value;
    queryURL += "&MVRuntimeBox=" + MVRuntimeBox1.checked + "&MVRuntimeMin=" 
    + MVRuntimeMin1.value + "&MVRuntimeMax=" + MVRuntimeMax1.value;
    queryURL += "&MVGenreBox=" + MVGenreBox1.checked + "&MVGenreText=\"" 
    + encodeURIComponent(MVGenreText1.value) + "\"";
    queryURL += "&STNameBox=" + STNameBox1.checked + "&STNameText=\"" 
    + encodeURIComponent(STNameText1.value) + "\"";
    queryURL += "&CountryBox=" + CountryBox1.checked + "&CountryText=\"" 
    + encodeURIComponent(CountryText1.value) + "\""; 
    queryURL += "&SSNameBox=" + SSNameBox1.checked + "&SSNameText=\"" 
    + encodeURIComponent(SSNameText1.value) + "\""; 
    console.log(SSNameText1.value);
    queryURL += "&HasAdsBox=" + HasAdsBox1.checked;
    queryURL += "&MVViewCountBox=" + MVViewCountBox1.checked + "&MVViewCountMin=" 
    + MVViewCountMin1.value + "&MVViewCountMax=" + MVViewCountMax1.value;
    queryURL += "&MVReviewScoreBox=" + MVReviewScoreBox1.checked + "&MVReviewScoreMin=" 
    + MVReviewScoreMin1.value + "&MVReviewScoreMax=" + MVReviewScoreMax1.value;
    queryURL += "&MVAvailabilityBox=" + MVAvailabilityBox1.checked;

    //For string inputs remember to put \" for quotes so JSON object can read them as strings
    const response = await fetch(queryURL, { method: 'GET'}) //Accesses GET method with URL /query
    .then(res => res.json()) //changes to JSON object List
    .catch(e => {
        console.log("error");
        error: e
    });
    let results = JSON.stringify(response); //Change JSON into String Array
    let row = JSON.parse(results); //Changes String Array into Proper Object Array
    if(row.length == 0)
    {
        noResult1.innerHTML = "No Results";
        bQry1.innerHTML = "";
    }
    else
    {
        noResult1.innerHTML = "";
        const keys = Object.keys(row[0]);
        let tableHTML = "";
        bQry1.innerHTML = "<tr>";
        for(let i = 0; i < keys.length; i++)
        {
            tableHTML += "<th>";
            tableHTML += keys[i];
            tableHTML += "</th>";
        }
        tableHTML += "</tr>";
        console.log("Rows:" + row.length);
        console.log("Columns:" + keys.length);
        for(let i = 0; i < row.length; i++)
        {
            tableHTML += "<tr>";
            const data = Object.values(row[i]);
            
            for(let j = 0; j < keys.length; j++)
            {
                tableHTML += "<td>";
                tableHTML += data[j];
                tableHTML += "</td>";
            }
            tableHTML += "</tr>";
        }
        bQry1.innerHTML = tableHTML;
    }
}