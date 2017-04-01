export class Hero {
  id: number;
  name: string;
}


export class Hero2 {
  // TypeScript 编译器为每个public构造函数参数生成一个公共字段，
  // 在创建新的英雄实例时，自动把参数值赋给这些公共字段。
  constructor(
    public id: number,
    public name: string,
    public power: string,
    public alterEgo?: string // 双重性格，可选择的属性。
  ) {  }
}
