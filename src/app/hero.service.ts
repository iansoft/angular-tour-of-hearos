import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';


// 数据使用者并不知道本服务会如何获取数据。
// 我们的HeroService服务可以从任何地方获取英雄的数据。
// 它可以从网络服务器获取，可以从浏览器的局部存储区获取，也可以从模拟的数据源。
// 这就是从组件中移除数据访问代码的美妙之处。
// 这样我们可以随时改变数据访问的实现方式，而无需对使用英雄的组件作任何改动。
// 这有点类似于C#写 interface

@Injectable()
export class HeroService {
    private heroesUrl = 'api/heroes';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    // getHeroes(): void {} // stub
    getHeroes(): Promise<Hero[]> {
        // return Promise.resolve(HEROES);

        // Angular 的http.get返回一个 RxJS 的Observable对象。 Observable（可观察对象）是一个管理异步数据流的强力方式。 后面我们还会进一步学习可观察对象。
        // 现在，我们先利用toPromise操作符把Observable直接转换成Promise对象，回到已经熟悉的地盘。
        return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
    }

    // getHeroesSlowly(): Promise<Hero[]> {
    //     return new Promise(resolve => {
    //         // Simulate server latency with 2 second delay
    //         setTimeout(() => resolve(this.getHeroes()), 2000);
    //     });
    // }

    getHero(id: number): Promise<Hero> {
        // return this.getHeroes()
        //             .then(heroes => heroes.find(hero => hero.id === id));

        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {
        const heroes = this.http
            .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
        return heroes;
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
