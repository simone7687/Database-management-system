using back_end.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace back_end.DBContext
{
    public class PostgreSQLDbContext : DbContext 
    {
        private readonly string _connectionString;

        public PostgreSQLDbContext(string connectionString)
        {
            _connectionString = connectionString;
        }
        public PostgreSQLDbContext(PostgreSQLCredentialsModel credentials)
        {
            _connectionString = SetConnectionString(credentials);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public string SetConnectionString(PostgreSQLCredentialsModel credentials)
        {
            var builder = new NpgsqlConnectionStringBuilder
            {
                Host = credentials.Host,
                Username = credentials.User,
                Database = credentials.DBname,
                Port = string.IsNullOrEmpty(credentials.Port) ? 5432 : int.Parse(credentials.Port),
                Password = credentials.Password
            };
            return builder.ConnectionString;
        }
    }
}
