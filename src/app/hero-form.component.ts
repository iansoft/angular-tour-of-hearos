import { Component } from '@angular/core';
import { Hero2 } from './hero';

@Component({
  moduleId: module.id,
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html'
})
export class HeroFormComponent {
    powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

    model = new Hero2(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

    submitted = false;

    onSubmit() { this.submitted = true; }

    newHero() {
      this.model = new Hero2(42, '', '');
    }

    // TODO: Remove this when we're done
    // 增加diagnostic属性，它返回这个模型的 JSON 形式。
    // 在开发过程中，它用于调试，最后清理时会丢弃它。
    get diagnostic() { return JSON.stringify(this.model); }
}


