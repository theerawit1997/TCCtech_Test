using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using TCCtech_MyTest_Server.Data;
using TCCtech_MyTest_Server.Models;
using TCCtech_MyTest_Server.Data;
using TCCtech_MyTest_Server.Models;

namespace TCCtech_MyTest_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoreDataController : ControllerBase
    {
        private readonly MySqlDbContext _dbContext;

        public ScoreDataController(MySqlDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("add")]
        public IActionResult AddScore([FromBody] ScoreData scoreData)
        {
            using var connection = _dbContext.GetConnection();
            connection.Open();

            var query = "INSERT INTO score_data (name, score) VALUES (@name, @score)";
            using var cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@name", scoreData.Name);
            cmd.Parameters.AddWithValue("@score", scoreData.Score);

            var result = cmd.ExecuteNonQuery();
            return result > 0 ? Ok("Score added successfully!") : BadRequest("Failed to add score.");
        }

        [HttpGet("all")]
        public IActionResult GetAllScores()
        {
            using var connection = _dbContext.GetConnection();
            connection.Open();

            var query = "SELECT * FROM score_data";
            using var cmd = new MySqlCommand(query, connection);
            using var reader = cmd.ExecuteReader();

            var scores = new List<ScoreData>();
            while (reader.Read())
            {
                scores.Add(new ScoreData
                {
                    Id = reader.GetInt32("id"),
                    Name = reader.GetString("name"),
                    Score = reader.GetInt32("score"),
                    Timestamp = reader.GetDateTime("timestamp")
                });
            }

            return Ok(scores);
        }
    }
}
