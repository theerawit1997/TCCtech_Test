using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;

namespace TCCtech_MyTest_Server.Data
{
    public class MySqlDbContext
    {
        private readonly string _connectionString;

        public MySqlDbContext(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public MySqlConnection GetConnection()
        {
            return new MySqlConnection(_connectionString);
        }
    }
}
