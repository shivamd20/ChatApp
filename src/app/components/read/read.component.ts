import { Component, OnInit } from '@angular/core';
import { Tutorial } from '../../modules/ngrxstate/models/tutorial.model';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { RemoveTutorial } from '../../modules/ngrxstate/actions/tutorial.actions';

@Component({
    selector: 'app-read',
    templateUrl: './read.component.html',
    styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
    tutorials$: Observable<Tutorial>;

    constructor(private store: Store) {
        this.tutorials$ = this.store.select(state => state.tutorials.tutorials)
    }

    delTutorial(name) {
        this.store.dispatch(new RemoveTutorial(name))
    }

    ngOnInit() { }
}
