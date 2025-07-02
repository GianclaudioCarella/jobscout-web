using jobscout_web.Server.Models;
using jobscout_web.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace jobscout_web.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JobsController : ControllerBase
    {       
        private readonly ILogger<JobsController> _logger;
        public IJobServices _jobServices { get; set; }

        public JobsController(ILogger<JobsController> logger, IJobServices jobServices)
        {
            _logger = logger;
            _jobServices = jobServices;
        }

        [HttpGet(Name = "GetJobs")]
        public IEnumerable<JobScoutResult> Get(string jobTitle, string location, string? companies, string? workType)
        {
            _logger.LogInformation("GetJobs called with jobTitle: {jobTitle}, location: {location}, companies: {companies}, workType: {workType}", jobTitle, location, companies, workType);

            var jobScoutResultsList = _jobServices.GetJobs(jobTitle, location, companies, workType);

            _logger.LogInformation("Found {count} job results.", jobScoutResultsList.Count);

            return jobScoutResultsList;
        }
    }    
}
