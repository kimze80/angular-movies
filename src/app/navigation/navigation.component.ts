import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ApiService } from '../services/api.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  faBars = faBars;
  savedLength: number;
  constructor(private storage: StorageService, private api: ApiService) {}
  query = '';
  results: any[] = [];

  ngOnInit(): void {
    this.savedLength = this.storage.getLength();
    this.storage.observableLength.subscribe((data: number) => {

      this.savedLength = data;
    });
  }
}
