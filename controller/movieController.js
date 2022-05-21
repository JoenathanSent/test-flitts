const axios = require("axios");

const BASE_URL = "https://omdbapi.com/?apikey=faf7e5bb&s&";

class MovieController {
  static async getMovies(req, res, next) {
    const { title } = req.body;
    let { page, type, year } = req.body;
    page = Number(page);
    year = Number(year);
    type = type.toLowerCase();
    if (!page || typeof page !== "number") {
      page = 1;
    }
    if (
      !type ||
      (type !== "movie" && type !== "series" && type !== "episode")
    ) {
      type = null;
    }
    if (!year || typeof year !== "number") {
      year = null;
    }
    try {
      if (!title) {
        throw { name: "Bad Request", message: "Please input movie title!" };
      }
    } catch (err) {
      next(err);
    }
    axios({
      url: `${BASE_URL}&s=${title}&page=${page}&type=${type}&y=${year}`,
      method: "get",
    })
      .then((resp) => {
        res.status(200).json({
          list: resp.data.Search,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static async getMovieDetail(req, res, next) {
    const { title } = req.body;
    let { id, type, year, plot } = req.body;
    id = Number(id);
    year = Number(year);
    type = type.toLowerCase();
    plot = plot.toLowerCase();
    if (!id || typeof id !== "number") {
      id = undefined;
    }
    if (
      !type ||
      (type !== "movie" && type !== "series" && type !== "episode")
    ) {
      type = null;
    }
    if (!year || typeof year !== "number") {
      year = null;
    }
    if (plot !== "short" || plot !== "full") {
      plot = "short";
    }
    try {
      if (!title) {
        throw { name: "Bad Request", message: "Please input movie title!" };
      }
    } catch (err) {
      next(err);
    }
    axios({
      url: `${BASE_URL}&t=${title}&i=${id}&type=${type}&y=${year}&plot=${plot}`,
      method: "get",
    })
      .then((resp) => {
        res.status(200).json({
          list: resp.data,
        });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = MovieController;
