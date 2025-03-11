import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { Profile } from '../../model/Profile';
import { Subscription } from 'rxjs';
import {ReservationTableComponent} from '../reservation-table/reservation-table.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  imports: [
    ReservationTableComponent
  ],
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit, OnDestroy {

  username: string | null = null;
  profile: Profile = {};
  private paramMapSubscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.paramMapSubscription = this.route.paramMap.subscribe(params => {
      this.username = params.get('username');
      this.getProfile();
    });
  }

  ngOnDestroy(): void {
    this.paramMapSubscription.unsubscribe();
  }

  getProfile(): void {
    if (this.username) {
      this.authService.getProfile(this.username).subscribe({
        next: (profile) => {
          this.profile = profile;
          console.log(this.profile);

        }
      });
    }
  }
}
