using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace ReactJokes.Data
{
    public class JokesContext: DbContext
    {
        private string _connectionString;

        public JokesContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach(var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            modelBuilder.Entity<UserLikedJoke>()
                .HasKey(lj => new { lj.UserId, lj.JokeId });

            modelBuilder.Entity<UserLikedJoke>()
                .HasOne(lj => lj.User)
                .WithMany(u => u.UserLikedJokes)
                .HasForeignKey(lj => lj.UserId);

            modelBuilder.Entity<UserLikedJoke>()
                .HasOne(lj => lj.Joke)
                .WithMany(j => j.UserLikedJokes)
                .HasForeignKey(lj => lj.JokeId);
        }

        public DbSet<Joke> Jokes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserLikedJoke> UserLikedJokes { get; set; }
    }
}
