using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactJokes.Data;
using ReactJokes.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactJokes.Web.ViewModels;

namespace ReactJokes.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JokesController : ControllerBase
    {
        private string _connectionString;

        public JokesController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getrandomjoke")]
        public Joke GetRandomJoke()
        {
            var joke = JokeApi.GetJoke();
            var jokesRepo = new JokesRepository(_connectionString);
            if (jokesRepo.NewJoke(joke.Number))
            {
                jokesRepo.AddJoke(joke);
            }
            return jokesRepo.GetByNumber(joke.Number);
        }

        [HttpGet]
        [Route("getalljokes")]
        public List<Joke> GetAllJokes()
        {
            var jokesRepo = new JokesRepository(_connectionString);
            return jokesRepo.GetAllJokes();
        }

        [HttpPost]
        [Route("likedislikejoke")]
        public void LikeDislikeJoke(LikeDislikeViewModel vm)
        {
            var ulj = new UserLikedJoke
            {
                UserId = GetCurrentUser().Id,
                JokeId = vm.JokeId,
                Liked = vm.Like,
                Date = DateTime.Now
            };

            var jokesRepo = new JokesRepository(_connectionString);
            jokesRepo.LikeDislikeJoke(ulj);
        }
        
        [HttpGet]
        [Route("getlikesdislikescount")]
        public int GetLikesDislikesCount(int jokeId, bool liked)
        {
            var jokesRepo = new JokesRepository(_connectionString);
            var result = jokesRepo.GetLikesDislikesCount(jokeId, liked);
            return result;
        }

        [HttpPost]
        [Route("deleteuserlikedjoke")]
        public void DeleteUserLikedJoke(DeleteUserLikedJokeViewModel vm)
        {
            var userId = GetCurrentUser().Id;
            var jokesRepo = new JokesRepository(_connectionString);
            jokesRepo.DeleteUserLikedJoke(userId, vm.JokeId);
        }

        [HttpGet]
        [Route("getpreviousinteraction")]
        public bool? GetPreviosInteraction(int jokeId)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return false;
            }
            var userId = GetCurrentUser().Id;
            var jokesRepo = new JokesRepository(_connectionString);
            var ulj = jokesRepo.GetUserLikedJoke(userId, jokeId);
            if(ulj == null)
            {
                return false;
            }
            return true;
        }

        private User GetCurrentUser()
        {
            var userRepo = new UserRepository(_connectionString);
            return userRepo.GetByEmail(User.Identity.Name);
        }
    }
}
