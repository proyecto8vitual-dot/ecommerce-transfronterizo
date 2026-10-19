\# Plataforma E-commerce Transfronteriza B2B/B2C



Proyecto académico desarrollado para la materia \*\*Proyecto 8\*\* de la Licenciatura en Desarrollo de Sistemas Web.



\## Descripción



La plataforma simula un sistema de comercio electrónico transfronterizo B2B/B2C. Permite registrar usuarios, iniciar sesión, consultar un catálogo, agregar productos al carrito y calcular el costo total de importación (\*Landed Cost\*).



El cálculo considera el valor de los productos, país de origen y destino, método de transporte, aranceles, impuestos y otros costos.



\## Integrantes



\- Eduardo Ceja Robles

\- Christian Iván Huerta Martínez



\## Tecnologías utilizadas



| Área | Tecnología |

|---|---|

| Frontend | Next.js, React, TypeScript y Tailwind CSS |

| Backend | Django y Django REST Framework |

| Autenticación | JWT |

| Base de datos | PostgreSQL |

| Caché | Redis Cloud |

| Control de versiones | Git y GitHub |



\## Arquitectura



El proyecto está dividido en frontend y backend:



```text

Usuario

&#x20;  |

&#x20;  v

Next.js / React

&#x20;  |

&#x20;  v

Django REST API

&#x20;  |

&#x20;  +---- PostgreSQL

&#x20;  |

&#x20;  +---- Redis Cloud

```



PostgreSQL almacena la información persistente del sistema, mientras que Redis se utiliza como caché para los cálculos de Landed Cost.



\## Funcionalidades



\- Registro de usuarios.

\- Inicio y cierre de sesión.

\- Autenticación mediante JWT.

\- Protección de endpoints.

\- Catálogo de productos.

\- Agregar productos al carrito.

\- Modificar cantidades.

\- Eliminar productos.

\- Persistencia temporal del carrito mediante `localStorage`.

\- Selección de país de origen y destino.

\- Selección del método de transporte.

\- Cálculo de Landed Cost.

\- Integración con PostgreSQL.

\- Caché mediante Redis Cloud.

\- Diseño adaptable para diferentes tamaños de pantalla.



\## Flujo principal



```text

Registro

&#x20;  |

Inicio de sesión

&#x20;  |

Catálogo

&#x20;  |

Carrito

&#x20;  |

Datos de importación

&#x20;  |

Landed Cost

&#x20;  |

Django REST API

&#x20;  |

PostgreSQL / Redis

```



\## Autenticación



El sistema utiliza JWT para proteger los recursos que requieren autenticación.



Después de iniciar sesión, el backend genera un token de acceso. El frontend lo envía en las peticiones protegidas mediante:



```text

Authorization: Bearer TOKEN\_DE\_ACCESO

```



El endpoint de Landed Cost requiere un token válido.



\## PostgreSQL



PostgreSQL funciona como base de datos principal del backend.



La configuración se realiza mediante variables de entorno:



```env

DB\_NOMBRE=ecommerce\_transfronterizo

DB\_USUARIO=usuario\_ecommerce

DB\_CONTRASENA=TU\_CONTRASENA

DB\_HOST=localhost

DB\_PUERTO=5432

```



Las credenciales reales se almacenan en `backend/.env`, archivo excluido de GitHub mediante `.gitignore`.



\## Redis



Redis Cloud se utiliza para almacenar temporalmente los resultados del cálculo de Landed Cost.



Cuando se realiza una petición, Django primero consulta Redis. Si existe un cálculo idéntico, utiliza el resultado almacenado. Si no existe, realiza el cálculo y lo guarda durante 5 minutos.



Para comprobar su funcionamiento, la API puede devolver:



```json

"origen\_cache": false

```



cuando el cálculo fue realizado por Django, o:



```json

"origen\_cache": true

```



cuando el resultado fue recuperado desde Redis.



\## Instalación



\### Backend



Acceder a la carpeta:



```bash

cd backend

```



Crear y activar el entorno virtual:



```bash

py -3.14 -m venv venv

venv\\Scripts\\activate

```



Instalar las dependencias:



```bash

pip install django djangorestframework django-cors-headers djangorestframework-simplejwt psycopg psycopg-binary python-dotenv redis django-redis

```



Crear el archivo `.env` utilizando `backend/.env.example` como referencia.



Aplicar las migraciones:



```bash

python manage.py migrate

```



Verificar la configuración:



```bash

python manage.py check

```



Iniciar Django:



```bash

python manage.py runserver

```



El backend estará disponible en:



```text

http://127.0.0.1:8000

```



\### Frontend



Desde otra terminal:



```bash

cd frontend

npm install

npm run dev

```



La aplicación estará disponible en:



```text

http://localhost:3000

```



\## Variables de entorno



El archivo `backend/.env.example` contiene la estructura necesaria:



```env

DB\_NOMBRE=ecommerce\_transfronterizo

DB\_USUARIO=usuario\_ecommerce

DB\_CONTRASENA=TU\_CONTRASENA

DB\_HOST=localhost

DB\_PUERTO=5432



REDIS\_HOST=TU\_HOST\_REDIS

REDIS\_PORT=TU\_PUERTO\_REDIS

REDIS\_USUARIO=default

REDIS\_CONTRASENA=TU\_CONTRASENA\_REDIS

```



Las contraseñas reales no deben almacenarse en GitHub.



\## Endpoints principales



\### Registro



```text

POST /api/cuentas/registro/

```



Registra un nuevo usuario.



\### Inicio de sesión



```text

POST /api/cuentas/iniciar-sesion/

```



Valida las credenciales y genera los tokens JWT.



\### Landed Cost



```text

POST /api/cuentas/landed-cost/

```



Calcula el costo de importación y requiere autenticación JWT.



\## Prueba del sistema



Para comprobar el flujo completo:



1\. Registrar un usuario.

2\. Iniciar sesión.

3\. Acceder al catálogo.

4\. Agregar productos al carrito.

5\. Modificar cantidades si es necesario.

6\. Acceder al cálculo de importación.

7\. Seleccionar origen, destino y transporte.

8\. Realizar el cálculo de Landed Cost.

9\. Revisar el desglose de costos.

10\. Repetir el cálculo para comprobar el uso de Redis.



El resultado presenta el subtotal de productos, transporte, aranceles, impuestos, otros costos y costo total.



\## Seguridad



El proyecto implementa:



\- Contraseñas gestionadas por Django.

\- Autenticación mediante JWT.

\- Protección del endpoint de Landed Cost.

\- Variables de entorno para credenciales.

\- Exclusión del archivo `.env` mediante `.gitignore`.



\## Consideraciones



El proyecto fue desarrollado con fines académicos. Los porcentajes de aranceles, impuestos y costos de transporte son valores definidos para demostrar el funcionamiento del cálculo de Landed Cost.



En una implementación comercial, estos datos deberían obtenerse de fuentes oficiales o servicios especializados.



\## Repositorio



```text

https://github.com/proyecto8vitual-dot/ecommerce-transfronterizo

```



\## Autores



Eduardo Ceja Robles  

Christian Iván Huerta Martínez



Licenciatura en Desarrollo de Sistemas Web  

Proyecto 8

