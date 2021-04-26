using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace ReactJokes.Api
{
    public static class JokeApi
    {
        public static JokeResult GetJoke()
        {
            var client = new HttpClient();
            var url = "https://official-joke-api.appspot.com/jokes/programming/random";
            var json = client.GetStringAsync(url).Result;
            var jokeArr = JsonConvert.DeserializeObject<List<JokeResult>>(json);
            return jokeArr[0];
        }
    }
}
