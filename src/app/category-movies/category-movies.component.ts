import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-category-movies',
  templateUrl: './category-movies.component.html',
  styleUrls: ['./category-movies.component.scss']
})
export class CategoryMoviesComponent implements OnInit, OnDestroy {
  movies: any = [];
  category: string;
  error: string;
  paramSubscription: { unsubscribe: () => void };
  page = 1;
  pages = 0;
  totalResults = 0;
  query = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
  ) {}

  ngOnInit(): void {
    this.paramSubscription = this.activatedRoute.paramMap.subscribe(
      async params => {
        try {
          this.error = null;
          this.category = params.get('category');
          this.getMovies(1);
        } catch (error) {
          this.error = error.message;
        }
      }
    );
  }

  async getMovies(page ) {
    const result: any = await this.api.getCategoryRaw(this.category, page);
    console.log(result);
    this.page = result.page;
    this.pages = result.total_pages;
    this.totalResults = result.total_results;

    this.movies = [ ...result.results];
  }

  searchRaw = (query: string) => {

    this.api.searchMovieRaw(query).then( data => {
      const list: any = data
      const movies = Object.keys(list).map( key => list[key])
      this.movies = movies[3]
    })
    .catch( err => {
      console.log(err)
    })
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }
}
