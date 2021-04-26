using System;
using System.Collections.Generic;
using System.Text;

namespace ReactJokes.Data
{
    public class Joke
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public string Setup { get; set; }
        public string Punchline { get; set; }
        public List<UserLikedJoke> UserLikedJokes { get; set; }
    }
}
