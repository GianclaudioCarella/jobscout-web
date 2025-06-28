using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using SerpApi;
using System.Collections;
using System.Text;

namespace jobscout_web.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JobsController : ControllerBase
    {       
        private readonly ILogger<JobsController> _logger;

        public JobsController(ILogger<JobsController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetJobs")]
        public IEnumerable<JobScoutResult> Get(string jobTitle, string location, string? companies, string? workType)
        {
            _logger.LogInformation("GetJobs called with jobTitle: {jobTitle}, location: {location}, companies: {companies}, workType: {workType}", jobTitle, location, companies, workType);

            string? apiKey = Environment.GetEnvironmentVariable("SerpApiKey");

            var query = "Jobs in " + location;

            if (!string.IsNullOrEmpty(jobTitle))
            {
                query = query + " for " + jobTitle;
            }

            if (!string.IsNullOrEmpty(companies))
            {
                query = query + " in " + companies;
            }

            if (!string.IsNullOrEmpty(workType))
            {
                query = query + " " + workType;
            }

            Hashtable ht = new Hashtable();
            ht.Add("q", query);
            ht.Add("location", location);
            ht.Add("hl", "en");
            ht.Add("gl", "us");
            //ht.Add("engine", "google_jobs ");
            ht.Add("google_domain", "google.com");

            StringBuilder stringBuilder = new StringBuilder();
            List<JobScoutResult> jobScoutResultsList = new List<JobScoutResult>();

            try
            {
                GoogleSearch search = new GoogleSearch(ht, apiKey);
                JObject data = search.GetJson();
                JArray results = (JArray)data["organic_results"];

                foreach (JObject result in results)
                {
                    JobScoutResult jobScoutResult = new JobScoutResult() { Title = result["title"].ToString(), Url = result["link"].ToString() };
                    jobScoutResultsList.Add(jobScoutResult);
                }
            }
            catch (SerpApiSearchException ex)
            {
                Console.WriteLine("Exception:");
                Console.WriteLine(ex.ToString());
            }

            _logger.LogInformation("Found {count} job results.", jobScoutResultsList.Count);

            return jobScoutResultsList;
        }
    }

    public class JobScoutResult
    {
        public string? Title { get; set; }
        public string? Url { get; set; }
    }
}
