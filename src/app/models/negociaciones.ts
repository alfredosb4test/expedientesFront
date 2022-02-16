import { NegociacionNueva } from "./negociacion-nueva.model";

export const NEGOCIACIONES: NegociacionNueva[] = [
  {
    cliente: 'Big Bola',
    folio: 'N-01-16122021',
    estatus: 'Enviar al cliente',
    acciones: 'enviar',
    estado: 'nuevas',
    expanded: false,
    historico:[{
      estatus: 'estatus 1',
      date: 'DD/MM/YYYY',
    },
    {
      estatus: 'estatus 2',
      date: 'DD/MM/YYYY',
    },
    {
      estatus: 'estatus 3',
      date: 'DD/MM/YYYY',
    },
    {
      estatus: 'estatus 4',
      date: 'DD/MM/YYYY',
    }]
  },
  {
    cliente: 'Big Bola',
    folio: 'N-02-16122021',
    estatus: 'Pendiente por autorizar',
    acciones: '',
    estado: 'nuevas',
    expanded: false,
    historico:[]
  },
  {
    cliente: 'Big Bola',
    folio: 'N-05-16122021',
    estatus: 'Abierto',
    acciones: 'concretar',//concretar
    estado: 'abiertas',
    expanded: false,
    historico:[{
      estatus: 'estatus 1',
      date: 'DD/MM/YYYY',
    }]
  },
  {
    cliente: 'Big Bola',
    folio: 'N-06-16122021',
    estatus: 'Aceptada',
    acciones: '',
    estado: 'aceptadas',
    expanded: false,
    historico:[{
      estatus: 'estatus 1',
      date: 'DD/MM/YYYY',
    }]
  },
  {
    cliente: 'Big Bola',
    folio: 'N-03-16122021',
    estatus: 'Rechazadas',
    acciones: '',
    estado: 'rechazadas',
    expanded: false,
    historico:[{
      estatus: 'estatus 1',
      date: 'DD/MM/YYYY',
    }]
  },
  {
    cliente: 'Big Bola',
    folio: 'N-04-16122021',
    estatus: 'Rechazadas',//eliminar botones
    acciones: '',
    estado: 'rechazadas',
    expanded: false,
    historico:[{
      estatus: 'estatus 1',
      date: 'DD/MM/YYYY',
    }]
  }
];