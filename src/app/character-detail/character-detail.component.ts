import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../service/character.service';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character: any;
  episodes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const id = +idParam;
        if (!isNaN(id)) {
          this.characterService.getCharacterById(id).subscribe(data => {
            this.character = data;
            this.episodes = data.episode;
          });
        } else {
          console.error('Invalid ID format');
          this.router.navigateByUrl("not-found")
        }
      } else {
        console.error('ID parameter is missing');
        this.router.navigateByUrl("not-found")
      }
    });
  }
}
