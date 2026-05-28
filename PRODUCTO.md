# COPEOSPIL Ltda. — Plataforma Web

---

## Resumen ejecutivo

COPEOSPIL Ltda. (Cooperativa Eléctrica de Servicios Públicos de Ingeniero Luiggi, La Pampa) cuenta con una plataforma web institucional que comunica sus servicios a la comunidad y centraliza la gestión de contenidos a través de un panel de administración interno. El sistema está orientado a dos audiencias: los vecinos y asociados que buscan información sobre los servicios de la cooperativa, y el equipo administrativo que necesita publicar noticias, comunicados y necrológicas de forma rápida y autónoma, sin depender de terceros.

---

## Módulos del sistema

### Sitio público

El sitio público es accesible para cualquier visitante, sin necesidad de registro.

- **Inicio**
  Página de bienvenida con la identidad visual de la cooperativa. Muestra un slider automático con las últimas novedades publicadas (hasta 10 entradas de las categorías generales y de servicios marcadas como destacadas). Incluye tres tarjetas de acceso rápido: números de emergencia y contacto por área, lugares habilitados para el pago de facturas, y un acceso directo al portal de autogestión online para consulta y pago de facturas.

- **Institucional**
  Presenta la historia de la cooperativa (fundada en 1958), su misión, visión y valores, y el listado completo de las autoridades vigentes del Consejo de Administración con sus respectivos cargos. Incluye un slider de imágenes institucionales con rotación automática.

- **Servicios**
  Grilla de acceso a los cinco servicios que brinda la cooperativa. Cada servicio tiene su propia página con imagen de portada, descripción general, características destacadas en tarjetas visuales, una sección de preguntas frecuentes en formato acordeón, y un slider de novedades propias de ese servicio, actualizado en tiempo real desde el panel de administración.

- **Pagos y Facturas**
  Enlace de acceso al portal externo de autogestión online, donde los asociados pueden consultar sus facturas, realizar pagos y descargar comprobantes en PDF. El acceso está disponible tanto desde la barra de navegación como desde la tarjeta de inicio.

- **Navegación y pie de página**
  La barra de navegación es responsiva: en escritorio muestra los enlaces directos; en dispositivos móviles o al hacer scroll se convierte en un menú hamburguesa lateral. El pie de página incluye dirección física, todos los teléfonos de guardia por servicio, el correo institucional y accesos directos a las redes sociales (Instagram, Facebook y WhatsApp).

---

### Panel de administración

El panel está protegido por usuario y contraseña. Solo acceden las personas con credenciales habilitadas.

- **Inicio de sesión**
  Formulario de acceso con email y contraseña. Incluye la opción "¿Olvidaste tu contraseña?" que genera automáticamente una contraseña temporal y la envía por correo electrónico al usuario registrado.

- **Crear noticia**
  Formulario para redactar y publicar una nueva nota o comunicado. Campos disponibles: título, resumen (opcional), contenido completo e imagen adjunta (JPG, PNG, WEBP, hasta 5 MB). El usuario debe seleccionar la categoría de la publicación; el sistema muestra únicamente las categorías que le corresponden según su rol. Para noticias de servicios, existe la opción de marcar la publicación como "destacada en inicio", lo que la hace visible en el slider de la página principal.

- **Publicar necrológica**
  Formulario específico para comunicar el fallecimiento de un asociado o familiar. Campos disponibles: nombre del fallecido, mensaje de despedida, información del velatorio y sepelio, e imagen de acompañamiento (paloma, flores, etc.). Si no se sube imagen, el sistema utiliza una imagen de luto predeterminada. La necrológica se publica automáticamente en la categoría Social y queda visible en la sección de necrológicas del servicio social del sitio público.

- **Ver y administrar noticias**
  Tabla completa de todas las noticias publicadas, con filtro por categoría. Desde aquí se puede editar o eliminar cualquier publicación. Al hacer clic sobre una noticia, el sistema genera una previsualización en formato "card" lista para redes sociales, con el logo de la cooperativa, el color institucional de la categoría, imagen y texto. Las necrológicas generan una card de estilo fúnebre con diseño diferenciado. Desde esta misma vista se puede descargar la card como archivo de imagen PNG para compartir en redes sociales.

- **Editar noticia**
  Formulario de edición completo que carga los datos actuales de la publicación y permite modificar todos los campos, incluida la imagen (manteniendo la anterior si no se sube una nueva) y la visibilidad en inicio.

- **Mi Perfil**
  Sección personal donde el usuario puede ver su email y rol asignado, y cambiar su contraseña ingresando la actual y confirmando la nueva.

---

## Roles y permisos

El sistema define roles diferenciados que controlan qué categorías de noticias puede publicar cada usuario. Los permisos se verifican tanto en el frontend (mostrando solo las opciones disponibles) como en el backend (rechazando publicaciones fuera del alcance del rol).

| Rol          | Categorías que puede publicar                                               |
|--------------|-----------------------------------------------------------------------------|
| `superadmin` | Todas: AGUA, AGUA MINERAL, LUZ, INTERNET, SOCIAL, NOVEDADES, INICIO        |
| `admin`      | Novedades generales e Inicio                                                |
| `servicios`  | Todos los servicios: AGUA, LUZ, INTERNET, SOCIAL (no NOVEDADES ni INICIO)  |
| `agua`       | Solo AGUA                                                                   |
| `aguaMineral`| Solo AGUA MINERAL                                                           |
| `luz`        | Solo LUZ                                                                    |
| `internet`   | Solo INTERNET                                                               |
| `social`     | Solo SOCIAL (incluye necrológicas)                                          |

Todos los roles tienen acceso a las funciones generales del panel: crear noticias dentro de su alcance, ver el listado completo, editar, eliminar, descargar cards y cambiar su propia contraseña.

---

## Servicios cubiertos

- **Agua de Red**
  Suministro de agua potable captada de fuentes subterráneas, filtrada y desinfectada. Incluye red de distribución para toda la localidad, control de calidad periódico y atención ante reclamos por baja presión, cortes programados o solicitudes de nueva conexión.

- **Energía Eléctrica**
  Distribución de energía en media y baja tensión para zonas urbanas y rurales. Comprende alumbrado público, atención de emergencias, mantenimiento preventivo y conexiones para establecimientos agropecuarios.

- **Internet**
  Servicio de conectividad por fibra óptica con planes de distintas velocidades. Soporte técnico y expansión continua de la red hacia nuevos hogares.

- **Agua Mineral**
  Producción y distribución de agua purificada mediante sistema de ósmosis inversa y envasado industrial bajo normas sanitarias. Entrega a domicilios, empresas y comercios locales.

- **Servicio Social / Sepelio**
  Programa de bienestar para asociados que incluye el servicio de sepelio, programas de asistencia solidaria, actividades comunitarias y eventos cooperativos. Los asociados tienen acceso automático al servicio de sepelio.

---

## Funcionalidades destacadas

- **Slider de novedades en inicio:** muestra automáticamente las últimas noticias generales y las noticias de servicios marcadas como destacadas, con rotación cada 5 segundos y navegación manual por puntos.

- **Novedades embebidas en cada servicio:** cada página de servicio tiene su propio slider de noticias en tiempo real, alimentado exclusivamente por las publicaciones de esa categoría.

- **Descarga de cards para redes sociales:** desde el panel de administración, cualquier noticia puede exportarse como imagen PNG optimizada para compartir en Instagram, Facebook o WhatsApp, con diseño de marca incluido (logo, color de categoría, nombre de la cooperativa y URL del sitio).

- **Card de necrológica con diseño diferenciado:** las publicaciones de fallecidos generan una card de estilo fúnebre (fondo oscuro, cruz, Q.E.P.D.) visualmente distinta de las cards de noticias, lista para descarga y difusión en redes.

- **Control de permisos por categoría:** cada usuario del panel solo ve y puede publicar en las secciones que le corresponden según su área, evitando errores de publicación en categorías ajenas.

- **Opción "Publicar también en Inicio":** las noticias de servicios pueden marcarse como destacadas para que aparezcan en el slider principal del sitio, sin necesidad de crearlas dos veces.

- **Recuperación de contraseña automática:** si un administrador olvida su contraseña, puede solicitar una contraseña temporal directamente desde la pantalla de login, sin necesitar intervención técnica.

- **Visor de necrológicas en el sitio público:** la sección Social muestra un slider de necrológicas publicadas, con posibilidad de ver el detalle completo en un modal con diseño institucional.

- **Diseño responsivo:** el sitio adapta su navegación para dispositivos móviles, tabletas y escritorio, con menú hamburguesa y layout flexible.

- **Presencia en redes sociales:** el pie de página integra accesos directos a Instagram, Facebook y WhatsApp de la cooperativa.

---

## Desarrollo a medida para COPEOSPIL

Esta plataforma no es un producto genérico ni una solución de terceros adaptada. Fue diseñada y construida desde cero exclusivamente para COPEOSPIL Ltda., teniendo en cuenta la identidad visual de la cooperativa, su estructura interna de áreas, sus necesidades de comunicación con la comunidad y la forma en que su equipo trabaja el día a día.

Cada decisión de diseño y funcionalidad responde a un requerimiento concreto de la cooperativa:

- Los **roles y permisos** reflejan exactamente la organización interna por áreas de servicio.
- Las **cards descargables** responden a la necesidad real de comunicar novedades en redes sociales con identidad de marca, sin depender de un diseñador.
- Las **necrológicas** son una funcionalidad específica del servicio social de la cooperativa, inexistente en soluciones genéricas de gestión de contenidos.
- Los **colores por categoría** (azul para agua, naranja para luz, violeta para internet, verde para social) son una decisión de identidad pensada para la cooperativa y su comunidad.

El resultado es una herramienta propia, que la cooperativa controla completamente, sin licencias externas, sin dependencia de plataformas de terceros y sin costos recurrentes de software.

---

## Stack tecnológico y criterios de elección

La plataforma fue construida con tecnología de punta, utilizando en todos los casos las versiones más recientes disponibles al momento del desarrollo. Esto garantiza soporte a largo plazo, mayor rendimiento y acceso a las últimas mejoras de seguridad.

### Frontend (lo que ve el usuario)

| Tecnología | Versión | Por qué se eligió |
|---|---|---|
| **React** | 19 (última) | La librería de interfaces más utilizada del mundo. Permite construir experiencias fluidas e interactivas sin recargar la página. |
| **React Router** | 7 (última) | Navegación entre secciones sin recargar el navegador, dando una experiencia de aplicación moderna. |
| **Vite** | 7 (última) | Herramienta de construcción ultrarrápida. El sitio carga en milisegundos y el proceso de desarrollo es ágil. |
| **CSS Modules** | — | Estilos aislados por componente, sin conflictos. Permite un diseño preciso y mantenible. |
| **html2canvas** | 1.4 | Permite generar las cards descargables como imagen PNG directamente en el navegador, sin servidor externo. |
| **Material UI Icons** | 7 (última) | Iconografía profesional y consistente en toda la interfaz. |

### Backend (el motor del sistema)

| Tecnología | Versión | Por qué se eligió |
|---|---|---|
| **Node.js + Express** | Express 5 (última) | Servidor web rápido y liviano, ideal para APIs REST. Express 5 es la versión más reciente con soporte nativo para async/await. |
| **PostgreSQL** | — | Base de datos relacional robusta, de código abierto y ampliamente probada en producción. Ideal para datos estructurados como noticias, usuarios y permisos. |
| **JWT (JSON Web Tokens)** | — | Sistema de autenticación sin estado: cada usuario lleva su identidad cifrada en el token, sin necesidad de sesiones en servidor. |
| **bcryptjs** | — | Cifrado de contraseñas con hash unidireccional. Las contraseñas nunca se guardan en texto plano. |
| **Multer** | 2 (última) | Gestión de subida de imágenes al servidor de forma segura y eficiente. |
| **Nodemailer** | 8 (última) | Envío de correos transaccionales (recuperación de contraseña) directamente desde el servidor. |

### Nivel técnico

El sistema implementa las mejores prácticas actuales de desarrollo web:

- **Autenticación segura** con tokens JWT, roles verificados en backend y frontend.
- **Arquitectura desacoplada** (frontend separado del backend), lo que permite escalar o modificar cada parte de forma independiente.
- **API REST** bien definida con endpoints protegidos por middleware de autenticación.
- **Gestión de archivos** con validación de tipo y tamaño en el servidor.
- **Diseño responsivo** construido con CSS puro sin frameworks pesados, lo que resulta en un sitio más rápido.
- **Código mantenible** organizado por componentes y responsabilidades claras.

En términos de pila tecnológica, la plataforma utiliza el mismo tipo de stack que usan empresas de tecnología de primer nivel. No es una web estática ni un gestor de contenidos instalado: es una aplicación web completa con base de datos, lógica de negocio y interfaz de usuario interactiva, construida específicamente para COPEOSPIL.

---

*Documento generado el 29 de abril de 2026. Refleja el estado actual del sistema según el código fuente del proyecto.*
