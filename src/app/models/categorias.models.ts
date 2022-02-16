export class CatMix{
  constructor(
      public id_categoria_mixto: number,
      public nombre: string,
      public visible: number,
  ){}
}
export class CatLeg{
  constructor(
      public id_cl: number,
      public categoria: string,
      public activo: number,
  ){}
}