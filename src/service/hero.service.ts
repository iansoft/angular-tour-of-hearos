import { Injectable } from '@angular/core';
import { Hero } from '../model/hero';
import { HEROES } from '../mock/hero';


// 数据使用者并不知道本服务会如何获取数据。
// 我们的HeroService服务可以从任何地方获取英雄的数据。
// 它可以从网络服务器获取，可以从浏览器的局部存储区获取，也可以从模拟的数据源。
// 这就是从组件中移除数据访问代码的美妙之处。
// 这样我们可以随时改变数据访问的实现方式，而无需对使用英雄的组件作任何改动。
// 这有点类似于C#写 interface

@Injectable()
export class HeroService {
    // getHeroes(): void {} // stub
    getHeroes(): Promise<Hero[]> {
        return Promise.resolve(HEROES);
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getHeroes()), 2000);
        });
    }
}
