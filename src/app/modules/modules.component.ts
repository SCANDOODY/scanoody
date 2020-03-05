import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NbMenuService } from '@nebular/theme';
import { DataTransporterService } from '../injectables/data-transporter.service';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit, OnDestroy {
  newUserMenu = [
    {
      title: 'Food Expiry Notification',
      id: 'foodExp',
      link: ['module-description']
    },
    {
      title: 'Receipe Suggestion',
      id: 'receipeSugg',
      link: ['module-description'],
    },
    {
      title: 'Storage of food',
      id: 'foodStorage',
      link: ['module-description'],
    },
    {
      title: 'Feedback for different products',
      id: 'feedback',
      link: ['module-description'],
    },
  ];
  userMenu = [
    {
      title: 'To Dashborad',
      id: 'dashboard',
      link: ['dashboard']
    },
    {
      title: 'In Kitchen',
      id: 'kitchen',
      link: ['kitchen']
    },
    {
      title: 'Add Item',
      id: 'addItem',
      link: ['add-item'],
    },
    {
      title: 'Add Recipe',
      id: 'addRecipe',
      link: ['add-recipe'],
    }
  ];
  
  user: firebase.User;
  alive = true;
  selectedMenu: string;
  constructor(private readonly authService: AuthService,
    private readonly nbMenuService: NbMenuService,
    private readonly transporter: DataTransporterService,
    private readonly router: Router) {
    this.authService.getUserState().subscribe(user => {
      this.user = user
      if (!user) {
        this.setDescription('foodExp');
        this.router.navigate(['home/module-description'])
      }
    });
    this.nbMenuService.onItemClick().pipe(takeWhile(() => this.alive)).subscribe((s) => {
      this.setDescription(s.item['id']);
    });
  }

  ngOnInit() {
  }
  setDescription(id: string) {
    switch (id) {
      case 'foodExp':
        this.transporter.moduleDescription = 'This notifies you the expiry of the food so that you can you use it beforehand.'
        return;
      case 'receipeSugg':
        this.transporter.moduleDescription = 'This gives you the receipes with the latest food that have to be used.'
        return;
      case 'foodStorage':
        this.transporter.moduleDescription = 'This will signify you which food to be stored where around the year.'
        return;
      case 'feedback':
        this.transporter.moduleDescription = 'This feature will give you feedback depending on which same product of different company to  offere more expiry range.'
        return;
      default:
        return;
    }
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
