using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace ReactJokes.Data
{
    public class UserLikedJoke
    {
        [JsonIgnore]
        public Joke Joke { get; set; }
        public int JokeId { get; set; }

        [JsonIgnore]
        public User User { get; set; }
        public int UserId { get; set; }

        public DateTime Date { get; set; }
        public bool Liked { get; set; }
    }
}
