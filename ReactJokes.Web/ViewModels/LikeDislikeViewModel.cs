using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactJokes.Web.ViewModels
{
    public class LikeDislikeViewModel
    {
        public int JokeId { get; set; }
        public bool Like { get; set; }
    }
}
