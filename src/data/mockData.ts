import { Process } from '../types';

export const mockProcessData: Process = [
  {
    "etapa": "documentos",
    "estado": "Terminada",
    "archivos": [
      {
        "url": "https://dimomudratvmsrktlzve.supabase.co/storage/v1/object/public/findii/images/7bf4425f55a34cdea4ff315d0b4b4e78_1744993496.png?",
        "estado": "revisado", 
        "nombre": "7bf4425f55a34cdea4ff315d0b4b4e78_1744993496.png?",
        "archivo_id": "bf92784d-c1b5-4e3d-a82e-eab458231726",
        "comentario": "",
        "modificado": false,
        "fecha_modificacion": "2025-04-18T11:24:59.430174",
        "ultima_fecha_modificacion": "2025-04-18T11:24:59.430174"
      }
    ],
    "historial": [
      {
        "fecha": "2025-04-18T11:24:59.631543",
        "estado": "En revisión",
        "comentario": "Solicitud creada",
        "usuario_id": 10
      },
      {
        "fecha": "2025-04-26T11:24:59.631543",
        "estado": "Terminada",
        "comentario": "Solicitud revisada",
        "usuario_id": 10
      }
    ],
    "comentarios": "Sus documentos han sido recibidos y están en proceso de revisión",
    "fecha_actualizacion": "2025-04-18T11:24:59.631543",
    "requisitos_pendientes": [
      "Documentos en revisión"
    ]
  },
  {
    "etapa": "banco",
    "estado": "En revisión", 
    "archivos": [
        {
            "url": "https://dimomudratvmsrktlzve.supabase.co/storage/v1/object/public/findii/images/7bf4425f55a34cdea4ff315d0b4b4e78_1744993496.png?",
            "estado": "pendiente", 
            "nombre": "7bf4425f55a34cdea4ff315d0b4b4e78_1744993496.png?",
            "archivo_id": "bf92784d-c1b5-4e3d-a82e-eab458231726",
            "comentario": "",
            "modificado": false,
            "fecha_modificacion": "2025-04-18T11:24:59.430174",
            "ultima_fecha_modificacion": "2025-04-18T11:24:59.430174"
          }
    ],
    "historial": [
        {
            "fecha": "2025-04-26T11:24:59.631543",
            "estado": "En revisión",
            "comentario": "Solicitud creada",
            "usuario_id": 10
        }
    ],
    "viabilidad": "Pendiente",
    "comentarios": "",
    "fecha_actualizacion": "2025-04-18T11:24:59.631543"
  },
  {
    "etapa": "desembolso",
    "estado": "Pendiente",
    "historial": [],
    "comentarios": "",
    "desembolsado": false,
    "fecha_estimada": null,
    "fecha_actualizacion": "2025-04-18T11:24:59.631543"
  }
];