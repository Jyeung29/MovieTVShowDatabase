let database = require("./database");
const express = require('express');
const app = express();
const url = require('url');
const port = process.env.PORT || 5000;

app.use(express.static('public')); //uses public folder to render HTML page

const ageRatingRange = ["\'G\'", "\'PG\'", "\'PG-13\'", "\'R\'", "\'NC-17\'"];

//Template GET method
//Change the URL in this function and JavaScript from /query? to some '/urlName?' keep the / and ?
app.get('/queryMovie?', function (req, res) {
    //Fill these in as needed based on the URL parameters
    let querySelects = "SELECT ";
    let queryFrom = " FROM MOVIES M ";
    let queryWhere = "";
    let queryGroupBy = "";
    let queryHaving = "";
    let queryOrderBy = "";

    //Bools that track if there needs to include a corresponding keyword
    let hasWhere = false;
    let hasGroupBy = false;
    let hasHaving = false;
    let hasOrderBy = false;

    //bools track if there needs new commas
    let commaSelect = false;
    let commaGroupBy = false;
    let commaOrderBy = false;

    //bools track if there needs to be AND in WHERE statement
    let andWhere = false;

    //Checks whether to default to SELECT *
    let noSelects = true;

    //Checks whether to add inner joins to FROM
    let fromGenre = false;
    let fromStudio = false;
    let fromStreamingService = false;
    let fromStreamingInfo = false;
    
    const parsedURL = url.parse(req.url, true); 
    let queriedURL = parsedURL.query; //Use this as if it was an object as seen below. Assume all values are strings. If numbers are bools are needed you can use data type conversion

    //Movie Atttributes to Show
    if(queriedURL.MV_ID == 'true') //IMPORTANT NOTE. FOR PARAMETER BOOLS YOU MUST HAVE IT EQUAL 'true' or 'false' with the QUOTES, THEY ARE NOT TRUE BOOLS AS IS
    {
        querySelects += "M.MV_ID";
        noSelects = false;
        commaSelect = true;
    }

    if(queriedURL.MVName == 'true')
    {
        noSelects = false;
        if(commaSelect == false) //always include for attribute to show sections for comma generation
        {
            commaSelect = true;
        }
        else
        {
            querySelects += ", ";
        }
        querySelects += "MVName";
    }

    if(queriedURL.MVSummary == 'true')
    {
        noSelects = false;
        if(commaSelect == false) 
        {
            commaSelect = true;
        }
        else
        {
            querySelects += ", ";
        }
        querySelects += "MVSummary";
    }

    if(queriedURL.MVReleaseYear == 'true')
    {
        noSelects = false;
        if(commaSelect == false)
        {
            commaSelect = true;
        }
         else
        {
            querySelects += ", ";
        }
        querySelects += "MVReleaseYear";
    }

    if(queriedURL.MVAgeRating == 'true')
    {
        noSelects = false;
        if(commaSelect == false)
        {
            commaSelect = true;
        }
         else
        {
            querySelects += ", ";
        }
        querySelects += "MVAgeRating";
    }

    if(queriedURL.MVRuntime == 'true')
    {
        noSelects = false;
        if(commaSelect == false)
        {
                commaSelect = true;
        }
        else
        {
            querySelects += ", ";
        }
        querySelects += "MVRuntime";
    }

    if(queriedURL.MVGenre == 'true')
    {
        noSelects = false;
        if(commaSelect == false)
        {
                commaSelect = true;
        }
        else
        {
            querySelects += ", ";
        }
        if(fromGenre == false)
        {
            fromGenre = true;
            queryFrom += "INNER JOIN MOVIEGENRES G ON M.MV_ID = G.MV_ID ";
        }
        querySelects += "MVGenre";
    }

    if(queriedURL.STName == 'true')
     {
        noSelects = false;
        if(commaSelect == false)
        {
            commaSelect = true;
        }
        else
        {
            querySelects += ", ";
        }
        if(fromStudio == false)
        {
            fromStudio = true;
            queryFrom += "INNER JOIN MOVIEPRODUCEDBY P ON P.MV_ID = M.MV_ID ";
            queryFrom += "INNER JOIN STUDIOS S ON S.ST_ID = P.ST_ID ";
        }
        querySelects += "STName";
    }       

    if(queriedURL.Country == 'true')
    {
        noSelects = false;
        if(commaSelect == false)
        {
            commaSelect = true;
        }
        else
        {
            querySelects += ", ";
        }
        if(fromStudio == false)
        {
            fromStudio = true;
            queryFrom += "INNER JOIN MOVIEPRODUCEDBY P ON P.MV_ID = M.MV_ID ";
            queryFrom += "INNER JOIN STUDIOS S ON S.ST_ID = P.ST_ID ";
        }
        querySelects += "CountryOfOrigin";
    }

    if(queriedURL.SSName == 'true')
    {
        noSelects = false;
        if(commaSelect == false)
        {
            commaSelect = true;
        }
        else
        {
            querySelects += ", ";
        }
        if(fromStreamingService == false)
        {
            fromStreamingService = true;
            if(fromStreamingInfo == false)
            {
                fromStreamingInfo = true;
                queryFrom += "INNER JOIN STREAMINGSERVICEMOVIES SSM ON SSM.MV_ID = M.MV_ID ";
            }
            queryFrom += "INNER JOIN STREAMINGSERVICES SS ON SSM.SS_ID = SS.SS_ID ";
        }
        querySelects += "SSName";
    }

    if(queriedURL.HasAds == 'true')
    {
        noSelects = false;
        if(commaSelect == false)
        {
            commaSelect = true;
        }
        else
        {
            querySelects += ", ";
        }
        if(fromStreamingService == false)
        {
            fromStreamingService = true;
            if(fromStreamingInfo == false)
            {
                fromStreamingInfo = true;
                queryFrom += "INNER JOIN STREAMINGSERVICEMOVIES SSM ON SSM.MV_ID = M.MV_ID ";
            }
            queryFrom += "INNER JOIN STREAMINGSERVICES SS ON SSM.SS_ID = SS.SS_ID ";
        }
        querySelects += "HasAds";
    }

    if(queriedURL.MVViewCount == 'true')
    {
        noSelects = false;
        if(commaSelect == false)
        {
            commaSelect = true;
        }
        else
        {
            querySelects += ", ";
        }
        if(fromStreamingInfo == false)
        {
            fromStreamingInfo = true;
            queryFrom += "INNER JOIN STREAMINGSERVICEMOVIES SSM ON SSM.MV_ID = M.MV_ID ";
        }
        querySelects += "MVViewCount";
    }

    if(queriedURL.MVReviewScore == 'true')
    {
        noSelects = false;
        if(commaSelect == false)
        {
            commaSelect = true;
        }
        else
        {
            querySelects += ", ";
        }
        if(fromStreamingInfo == false)
        {
            fromStreamingInfo = true;
            queryFrom += "INNER JOIN STREAMINGSERVICEMOVIES SSM ON SSM.MV_ID = M.MV_ID ";
        }
        querySelects += "MVReviewScore";
    }

    if(queriedURL.MVAvailability == 'true')
    {
        noSelects = false;
        if(commaSelect == false)
        {
            commaSelect = true;
        }
        else
        {
            querySelects += ", ";
        }
        if(fromStreamingInfo == false)
        {
            fromStreamingInfo = true;
            queryFrom += "INNER JOIN STREAMINGSERVICEMOVIES SSM ON SSM.MV_ID = M.MV_ID ";
        }
        querySelects += "MVAvailability";
    }

    if(queriedURL.MVIDBox == 'true')
    {
        if(!hasWhere) //Make sure to include this in all parameters that change WHERE query
        {
            queryWhere += "WHERE ";
            hasWhere = true;
        }
        queryWhere += "M.MV_ID=" + queriedURL.MVIDNum;
        andWhere = true;
    }

    if(queriedURL.MVNameBox == 'true')
    {
        if(!hasWhere)
        {
            queryWhere += "WHERE ";
            hasWhere = true;
        }
        else if(andWhere == true)
        {
            queryWhere += " AND ";
        }
        queryWhere += "MVName=" + queriedURL.MVNameText;
        andWhere = true;
    }

    if(queriedURL.MVAgeRatingBox == 'true' && 
        queriedURL.MVAgeRatingMin <= queriedURL.MVAgeRatingMax)
    {
        if(!hasWhere)
        {
            queryWhere += "WHERE ";
            hasWhere = true;
        }
        else if(andWhere == true)
        {
            queryWhere += " AND ";
        }

        if(queriedURL.MVAgeRatingMin == queriedURL.MVAgeRatingMax)
        {
            queryWhere += "MVAgeRating=" + ageRatingRange[parseInt(queriedURL.MVAgeRatingMin)];
        }
        else
        {
            queryWhere += "MVAgeRating IN (";
            let inComma = false;
            for(let i = parseInt(queriedURL.MVAgeRatingMin); i <= 
            parseInt(queriedURL.MVAgeRatingMax); i++)
            {
                if(inComma == false)
                {
                    queryWhere += ageRatingRange[i];
                    inComma = true;
                }
                else
                {
                    queryWhere += ", ";
                    queryWhere += ageRatingRange[i];
                }
            }
            queryWhere += ")";
        }
            
        andWhere = true;
    }

    if(queriedURL.MVReleaseYearBox == 'true' && 
        queriedURL.MVReleaseYearMin <= queriedURL.MVReleaseYearMax)
    {
        if(!hasWhere)
        {
            queryWhere += "WHERE ";
            hasWhere = true;
        }
        else if(andWhere == true)
        {
            queryWhere += " AND ";
        }

        if(queriedURL.MVReleaseYearMin == queriedURL.MVReleaseYearMax)
        {
            queryWhere += "MVReleaseYear=" + queriedURL.MVReleaseYearMin;
        }
        else
        {
            queryWhere += "MVReleaseYear >= " + queriedURL.MVReleaseYearMin 
                + " AND MVReleaseYear <= " + queriedURL.MVReleaseYearMax;
        }
            
        andWhere = true;
    }

    if(queriedURL.MVRuntimeBox == 'true' && 
        queriedURL.MVRuntimeMin <= queriedURL.MVRuntimeMax)
    {
        if(!hasWhere)
        {
            queryWhere += "WHERE ";
            hasWhere = true;
        }
        else if(andWhere == true)
        {
            queryWhere += " AND ";
        }

        if(queriedURL.MVRuntimeMin == queriedURL.MVRuntimeMax)
        {
            queryWhere += "MVRuntime=" + queriedURL.MVRuntimeMin;
        }
        else
        {
            queryWhere += "MVRuntime >= " + queriedURL.MVRuntimeMin 
                + " AND MVRuntime <= " + queriedURL.MVRuntimeMax;
        }
            
        andWhere = true;
    }
    
    if(queriedURL.MVGenreBox == 'true')
    {
        if(!hasWhere)
        {
            queryWhere += "WHERE ";
            hasWhere = true;
        }
        else if(andWhere == true)
        {
            queryWhere += " AND ";
        }
        if(fromGenre == false)
        {
            fromGenre = true;
            queryFrom += "INNER JOIN MOVIEGENRES G ON M.MV_ID = G.MV_ID ";
        }
        queryWhere += "MVGenre=" + queriedURL.MVGenreText;
        andWhere = true;
    }

    if(queriedURL.STNameBox == 'true')
    {
        if(!hasWhere)
        {
            queryWhere += "WHERE ";
            hasWhere = true;
        }
        else if(andWhere == true)
        {
            queryWhere += " AND ";
        }
        if(fromStudio == false)
        {
            fromStudio = true;
            queryFrom += "INNER JOIN MOVIEPRODUCEDBY P ON P.MV_ID = M.MV_ID ";
            queryFrom += "INNER JOIN STUDIOS S ON S.ST_ID = P.ST_ID ";
        }
        queryWhere += "STName=" + queriedURL.STNameText;
        andWhere = true;
    }

    if(queriedURL.CountryBox == 'true')
    {
        if(!hasWhere)
        {
            queryWhere += "WHERE ";
            hasWhere = true;
        }
        else if(andWhere == true)
        {
            queryWhere += " AND ";
        }
        if(fromStudio == false)
        {
            fromStudio = true;
            queryFrom += "INNER JOIN MOVIEPRODUCEDBY P ON P.MV_ID = M.MV_ID ";
            queryFrom += "INNER JOIN STUDIOS S ON S.ST_ID = P.ST_ID ";
        }
        queryWhere += "CountryOfOrigin=" + queriedURL.CountryText;
        andWhere = true;
    }

    if(queriedURL.SSNameBox == 'true')
    {
        if(!hasWhere)
        {
            queryWhere += "WHERE ";
            hasWhere = true;
        }
        else if(andWhere == true)
        {
            queryWhere += " AND ";
        }
        if(fromStreamingService == false)
        {
            fromStreamingService = true;
            if(fromStreamingInfo == false)
            {
                fromStreamingInfo = true;
                queryFrom += "INNER JOIN STREAMINGSERVICEMOVIES SSM ON SSM.MV_ID = M.MV_ID ";
            }
            queryFrom += "INNER JOIN STREAMINGSERVICES SS ON SSM.SS_ID = SS.SS_ID ";
        }
        console.log(queriedURL.SSNameText);
        queryWhere += "SSName=" + queriedURL.SSNameText;
        andWhere = true;
    }

    if(queriedURL.HasAdsBox == 'true')
    {
        if(!hasWhere)
        {
            queryWhere += "WHERE ";
            hasWhere = true;
        }
        else if(andWhere == true)
        {
            queryWhere += " AND ";
        }
        if(fromStreamingService == false)
        {
            fromStreamingService = true;
            if(fromStreamingInfo == false)
            {
                fromStreamingInfo = true;
                queryFrom += "INNER JOIN STREAMINGSERVICEMOVIES SSM ON SSM.MV_ID = M.MV_ID ";
            }
            queryFrom += "INNER JOIN STREAMINGSERVICES SS ON SSM.SS_ID = SS.SS_ID ";
        }
        queryWhere += "HasAds=true";
        andWhere = true;
    }

    if(queriedURL.MVViewCountBox == 'true' && 
        queriedURL.MVViewCountMin <= queriedURL.MVViewCountMax)
    {
        if(!hasWhere)
        {
            queryWhere += "WHERE ";
            hasWhere = true;
        }
        else if(andWhere == true)
        {
            queryWhere += " AND ";
        }
        if(fromStreamingInfo == false)
        {
            fromStreamingInfo = true;
            queryFrom += "INNER JOIN STREAMINGSERVICEMOVIES SSM ON SSM.MV_ID = M.MV_ID ";
        }
        if(queriedURL.MVViewCountMin == queriedURL.MVViewCountMax)
        {
            queryWhere += "MVViewCount=" + queriedURL.MVViewCountMin;
        }
        else
        {
            queryWhere += "MVViewCount >= " + queriedURL.MVViewCountMin 
                + " AND MVViewCount <= " + queriedURL.MVViewCountMax;
        }
        andWhere = true;
    }

    if(queriedURL.MVReviewScoreBox == 'true' && 
        queriedURL.MVReviewScoreMin <= queriedURL.MVReviewScoreMax)
    {
        if(!hasWhere)
        {
            queryWhere += "WHERE ";
            hasWhere = true;
        }
        else if(andWhere == true)
        {
            queryWhere += " AND ";
        }
        if(fromStreamingInfo == false)
        {
            fromStreamingInfo = true;
            queryFrom += "INNER JOIN STREAMINGSERVICEMOVIES SSM ON SSM.MV_ID = M.MV_ID ";
        }
        if(queriedURL.MVViewCountMin == queriedURL.MVViewCountMax)
        {
            queryWhere += "MVViewCount=" + queriedURL.MVReviewScoreMin;
        }
        else
        {
            queryWhere += "MVReviewScore >= " + queriedURL.MVReviewScoreMin 
                + " AND MVReviewScore <= " + queriedURL.MVReviewScoreMax;
        }
        andWhere = true;
    }

    if(queriedURL.MVAvailabilityBox == 'true')
    {
        if(!hasWhere)
        {
            queryWhere += "WHERE ";
            hasWhere = true;
        }
        else if(andWhere == true)
        {
            queryWhere += " AND ";
        }
        if(fromStreamingInfo == false)
        {
            fromStreamingInfo = true;
            queryFrom += "INNER JOIN STREAMINGSERVICEMOVIES SSM ON SSM.MV_ID = M.MV_ID ";
        }
        queryWhere += "MVAvailability=true";
        andWhere = true;
    }

    //Defaults to SELECT * when there are no specific Columns Specified to Show
    if(noSelects == true)
    {
        querySelects += "*";
    }
    console.log(querySelects + queryFrom + queryWhere + queryGroupBy + queryHaving + queryOrderBy);
    //Performs actual query. DO NOT CHANGE!
    database.conn.query(querySelects + queryFrom + queryWhere + queryGroupBy + queryHaving + queryOrderBy, function(err, data) {
        if(err) throw err; //throws error
        res.status(200).send(data); //sends query results to queryLogic method using /query
    });
 });
 
//sets up app server at the port
let server = app.listen(port, function (err) { 
    if(err) console.log("Error in server setup")
   console.log("Express App running at http://localhost:" + port);
});
