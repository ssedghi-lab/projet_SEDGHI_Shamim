import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CardListComponent } from './card-management/card-list/card-list.component';
import {CardFormComponent} from './card-management/card-form/card-form.component';
import { MaskCardCodePipe } from './card-management/card-mask-pipe/card-mask.pipe.component';
import { DirectivesDirective } from './card-management/directives/directives.directive';
import { Subscription } from 'rxjs';
import { HeaderComponent } from './header/header.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { User } from './shared/model/user';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule , HeaderComponent ,  CardListComponent , CardFormComponent , MaskCardCodePipe, ProductSearchComponent , DirectivesDirective , ReactiveFormsModule ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  authUserId?: string;
  private loginStatusSubscription: Subscription = new Subscription();
    constructor(private router: Router,  private backendReader: ApiService) { }
  title = 'TP06_SEDGHI_Shamim';

  goToUserProfile($event: MouseEvent) {
    $event.preventDefault();
    this.router.navigate(['/update'], { queryParams: { id: this.authUserId! } });
  }
  ngOnInit() {

    const tokenUser = this.backendReader.getUserFromToken();
    if (tokenUser) {
      console.log("token", tokenUser)
      this.backendReader.setLoginStatus(tokenUser);
    }

    this.loginStatusSubscription = this.backendReader.loginStatus$.subscribe(status => {
      this.authUserId = status;
      console.log("status ", status);
      if (!this.authUserId) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }
}