import { Component } from '@angular/core';

// 锚标签中的[routerLink]绑定。 我们把RouterLink指令

// 我们必须告诉它位置，所以我们把<router-outlet>标签添加到模板的底部。 
// RouterOutlet是RouterModule提供的指令之一。 
// 当我们在应用中导航时，路由器就把激活的组件显示在<router-outlet>里面。

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})

// <app-heroes></app-heroes>

export class AppComponent {
  title = 'Tour of Heroes';
  values = '';
  value = '';

  onKey(value: string) {
    this.values += value + ' | ';
  }

  update(value: string) { this.value = value; }

  // onKey(event: KeyboardEvent) { // with type info
  //     this.values += (<HTMLInputElement>event.target).value + ' | ';
  //   }
  // }
}

