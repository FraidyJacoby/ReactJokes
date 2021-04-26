using Newtonsoft.Json;
using System;

namespace ReactJokes.Api
{
    public class JokeResult
    {
        [JsonProperty("Id")]
        public int Number { get; set; }
        public string Setup { get; set; }
        public string Punchline { get; set; }
    }
}
