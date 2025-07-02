using System.Collections;
using jobscout_web.Server.Models;
using Newtonsoft.Json.Linq;
using SerpApi;

namespace jobscout_web.Server.Services;

public interface IJobServices
{
    public List<JobScoutResult> GetJobs(string jobTitle, string location, string? companies, string? workType);
}

public class JobServices : IJobServices
{
    private readonly ILogger<JobServices> _logger;

    public JobServices(ILogger<JobServices> logger)
    {
        _logger = logger;
    }

    public List<JobScoutResult> GetJobs(string jobTitle, string location, string? companies, string? workType)
    {
        _logger.LogInformation("GetJobs called with jobTitle: {jobTitle}, location: {location}, companies: {companies}, workType: {workType}", jobTitle, location, companies, workType);

        string? apiKey = Environment.GetEnvironmentVariable("SerpApiKey");

        var query = QueryBuilder(jobTitle, location, companies, workType);

        Hashtable parameters = BuildParameters(query);

        List<JobScoutResult> jobScoutResultsList = [];

        try
        {
            GoogleSearch search = new GoogleSearch(parameters, apiKey);
            JObject data = search.GetJson();
            JArray results = (JArray)data["organic_results"];
            var jobBoardsCount = 0;

            foreach (JObject result in results)
            {
                JobScoutResult jobScoutResult = new JobScoutResult
                {
                    Title = result["title"]?.ToString(),
                    Url = result["link"]?.ToString()
                };
                jobScoutResultsList.Add(jobScoutResult);

                if (jobScoutResult.Url is not null && IsBoardJob(jobScoutResult.Url))
                {
                    jobBoardsCount++;
                }
            }

            _logger.LogInformation("Found {count} job results and {jobBoardsCount} from job boards.", jobScoutResultsList.Count, jobBoardsCount);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching jobs");
            throw;
        }

        return jobScoutResultsList;
    }

    private bool IsBoardJob(string link)
    {
        try
        {
            Uri url = new Uri(link);
            string host = url.Host.ToLowerInvariant();
            if (host.Contains("linkedin.com") ||
                host.Contains("indeed.com") ||
                host.Contains("glassdoor.com"))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        catch (Exception)
        {
            return false;
        }
    }

    private string QueryBuilder(string jobTitle, string location, string? companies, string? workType)
    {
        var query = "Jobs in " + location;

        if (!string.IsNullOrEmpty(jobTitle))
            query += " for " + jobTitle;

        if (!string.IsNullOrEmpty(companies))
            query += " in " + companies;

        if (!string.IsNullOrEmpty(workType))
            query += " " + workType;

        return query;
    }

    private static Hashtable BuildParameters(string query)
    {
        Hashtable ht = new()
        {
            { "q", query },
            { "location", "New York" },
            { "hl", "en" },
            { "gl", "us" },
            { "num", "50" }, // Number of results to return
            //{ "engine", "google_jobs" },
            { "google_domain", "google.com" }
        };

        return ht;
    }
}

