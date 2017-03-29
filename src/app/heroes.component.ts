import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

// heroService = new HeroService(); // don't do this
// 但这不是个好主意，有很多理由，例如：
// 我们的组件得弄清楚该如何创建HeroService。 如果有一天我们修改了HeroService的构造函数，我们不得不找出创建过此服务的每一处代码，并修改它。 围着补丁代码转圈很容易导致错误，还会增加测试负担。
// 我们每次使用new都会创建一个新的服务实例。 如果这个服务需要缓存英雄列表，并把这个缓存共享给别人呢？怎么办？ 没办法，做不到。
// 我们把AppComponent锁定到HeroService的一个特定实现。 我们很难在不同的场景中切换实现。 例如，能离线操作吗？能在测试时使用不同的模拟版本吗？这可不容易。
// 如果……如果……嘿！这下我们可有得忙了！

@Component({
  moduleId: module.id,
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],  // 样式只会在component中，不回泄露到外面去。
  // providers: [HeroService]
})
export class HeroesComponent implements OnInit {
  // title = 'Tour of Heroes';
  selectedHero: Hero;
  heroes: Hero[];

  // 构造函数
  // 定义了一个heroService的参数
  // 构造函数是为了简单的初始化工作而设计的。例如把构造函数的参数赋值给属性。
  // 它的负担不应该过于沉重。
  // 我们应该能在测试中创建一个组件，而不用担心它会做实际的工作 — 例如和服务器通讯，直到我们主动要求它做这些。
  constructor(
    private heroService: HeroService,
    private router: Router,
  ) {}

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    // this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        console.log(hero);
        this.heroes.push(hero);
        this.selectedHero = null;
    });
  }

  delete(hero: Hero): void {
    this.heroService
        .delete(hero.id)
        .then(() => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero) { this.selectedHero = null; }
        });
  }
}
// template:`
//   <h1>{{title}}</h1>
//   <h2>{{hero.name}} details!</h2>
//   <div><label>id: </label>{{hero.id}}</div>
//   <div>
//     <label>name: </label>
//     <input value="{{hero.name}}" placeholder="name">
//   </div>
//   `










