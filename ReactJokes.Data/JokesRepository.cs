using Microsoft.EntityFrameworkCore;
using ReactJokes.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReactJokes.Data
{
    public class JokesRepository
    {
        private readonly string _connectionString;

        public JokesRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public bool NewJoke(int number)
        {
            using (var ctx = new JokesContext(_connectionString))
            {
                return ctx.Jokes.All(j => j.Number != number);
            }
        }

        public void AddJoke(JokeResult jr)
        {
            using (var ctx = new JokesContext(_connectionString))
            {
                ctx.Jokes.Add(new Joke
                {
                    Number = jr.Number,
                    Setup = jr.Setup,
                    Punchline = jr.Punchline
                });
                ctx.SaveChanges();
            }
        }

        public Joke GetByNumber(int number)
        {
            using (var ctx = new JokesContext(_connectionString))
            {
                return ctx.Jokes.FirstOrDefault(j => j.Number == number);
            }
        }

        public List<Joke> GetAllJokes()
        {
            using (var ctx = new JokesContext(_connectionString))
            {
                return ctx.Jokes.ToList();
            }
        }

        public void LikeDislikeJoke(UserLikedJoke ulj)
        {
            using (var ctx = new JokesContext(_connectionString))
            {
                ctx.UserLikedJokes.Add(ulj);
                ctx.SaveChanges();
            }
        }

        public int GetLikesDislikesCount(int jokeId, bool liked)
        {
            using (var ctx = new JokesContext(_connectionString))
            {
                return ctx.Jokes.FromSqlInterpolated
                    ($"SELECT * FROM UserLikedJokes WHERE JokeId = {jokeId} and Liked = {liked}").Count();
            }
        }

        public void DeleteUserLikedJoke(int userId, int jokeId)
        {
            using(var ctx = new JokesContext(_connectionString))
            {
                ctx.Database.ExecuteSqlInterpolated($"DELETE FROM UserLikedJokes WHERE UserId = {userId} AND JokeId = {jokeId}");
                ctx.SaveChanges();
            }
        }

        public UserLikedJoke GetUserLikedJoke(int userId, int jokeId)
        {
            using(var ctx = new JokesContext(_connectionString))
            {
                return ctx.UserLikedJokes.FirstOrDefault(ulj => ulj.UserId == userId && ulj.JokeId == jokeId);
            }
        }
    }
}
