import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/token/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private tokenService: TokenService) { }

  ngOnInit() {
  }

  logout() {
    this.tokenService.clearSession()
    this.router.navigate(['/'])
  }

}
