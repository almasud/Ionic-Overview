import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiResult, Movie, MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  public movies: Movie[] = [];

  constructor(private _movieSerivce: MovieService, private _loadingController: LoadingController) { }

  ngOnInit() {
    this.loadMovies();
  }

  private async loadMovies() {
    const loading = await this._loadingController.create({
      message: "Loading...",
      spinner: "bubbles"
    });
    loading.present();

    this._movieSerivce.getTopRatedMovies()
      .subscribe({
        next: (data) => {
          loading.dismiss();
          this.movies = [...this.movies, ...data.items];
          console.log(data)
        }, 
        error: (e) => {
          loading.dismiss();
          console.log(e.message)
        }
      })
  }

}
